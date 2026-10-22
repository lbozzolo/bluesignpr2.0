#!/usr/bin/env bash
# Build the static site and publish it to the cPanel VPS.
#
#   npm run deploy:test   -> https://test.bluesignpr.com
#   npm run deploy:prod   -> https://bluesignpr.com (asks for confirmation, backs up first)
#
# Requires passwordless SSH (key) access as root. Root is only used to log in:
# every remote command and file write runs as the site owner via runuser, so
# root never operates on files the cPanel account controls.
# Override the host with DEPLOY_HOST=user@host and the port with DEPLOY_PORT=2222.
set -euo pipefail

TARGET="${1:-}"
HOST="${DEPLOY_HOST:-root@209.126.83.179}"
PORT="${DEPLOY_PORT:-22}"
OWNER="bluesignpr"
HOME_DIR="/home/$OWNER"

case "$TARGET" in
  test) DEST="$HOME_DIR/public_html/test.bluesignpr.com"; URL="https://test.bluesignpr.com" ;;
  prod) DEST="$HOME_DIR/public_html"; URL="https://bluesignpr.com" ;;
  *) echo "Usage: $0 test|prod" >&2; exit 1 ;;
esac

# Server-managed files that a deploy must never overwrite or delete:
# .htaccess holds the password protection / noindex (test) and cPanel rules.
EXCLUDES=(
  --exclude .htaccess
  --exclude cgi-bin
  --exclude .well-known
  --exclude php.ini
  --exclude .user.ini
  --exclude error_log
  --exclude test.bluesignpr.com
  # Unused originals kept in public/ but not published.
  --exclude 1-dark.jpg
  --exclude 1-dark.webp
)

SSH=(ssh -p "$PORT" -o BatchMode=yes -o ConnectTimeout=10)
AS_OWNER="runuser -u $OWNER --"
# Run a shell script (read from stdin) on the server as the site owner.
remote() { "${SSH[@]}" "$HOST" "$AS_OWNER bash -s"; }
cd "$(dirname "$0")/.."

echo "→ Checking SSH access to ${HOST}…"
if ! remote <<<"test -d '$DEST'"; then
  echo "✗ Cannot reach $HOST or $DEST does not exist." >&2
  echo "  If SSH asks for a password, authorize your key once with: ssh-copy-id -p $PORT $HOST" >&2
  exit 1
fi

if [[ "$TARGET" == "prod" ]]; then
  # The first switch from the old PHP site is done by hand; after that the
  # marker file exists and regular deploys are allowed.
  if ! remote <<<"test -f '$DEST/.bluesign-deployed'"; then
    echo "✗ Production has not been migrated from the old site yet (no .bluesign-deployed marker)." >&2
    exit 1
  fi
  read -r -p "Publish to PRODUCTION ($URL)? Type 'yes' to continue: " answer
  [[ "$answer" == "yes" ]] || { echo "Cancelled."; exit 1; }
fi

echo "→ Building…"
rm -rf dist
npm run build >/dev/null
test -f dist/client/index.html || { echo "✗ Build produced no index.html" >&2; exit 1; }

if [[ "$TARGET" == "prod" ]]; then
  STAMP="$(date +%Y%m%d-%H%M%S)"
  echo "→ Backing up production to $HOME_DIR/backups/site-${STAMP}.tar.gz…"
  remote <<EOF
set -e
mkdir -p '$HOME_DIR/backups' && chmod 700 '$HOME_DIR/backups'
tar -czf '$HOME_DIR/backups/site-$STAMP.tar.gz' -C '$DEST' --exclude ./test.bluesignpr.com .
# Keep the 10 most recent backups.
find '$HOME_DIR/backups' -maxdepth 1 -type f -name 'site-*.tar.gz' -printf '%T@ %p\n' \
  | sort -rn | tail -n +11 | cut -d' ' -f2- | xargs -r -d '\n' rm -f --
EOF
fi

echo "→ Uploading to ${DEST}…"
# The remote rsync runs as the site owner, so files are owned by it directly.
RSYNC=(rsync -rlz -e "ssh -p $PORT -o BatchMode=yes" --rsync-path="$AS_OWNER rsync")
# Pages, images and PHP: add/update only, so nothing else in the folder is touched.
"${RSYNC[@]}" "${EXCLUDES[@]}" dist/client/ "$HOST:$DEST/"
# Hashed JS/CSS bundles: mirror exactly so old builds don't pile up.
"${RSYNC[@]}" --delete dist/client/assets/ "$HOST:$DEST/assets/"

echo "→ Checking ${URL}…"
status="$(curl -s -o /dev/null -w '%{http_code}' "$URL/")"
echo "  HTTP $status (401 means it is password-protected, which is expected on test)"
echo "✓ Deployed to $URL"

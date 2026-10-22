#!/usr/bin/env bash
# Build the static site and publish it to the cPanel VPS.
#
#   npm run deploy:test   -> https://test.bluesignpr.com
#   npm run deploy:prod   -> https://bluesignpr.com (asks for confirmation, backs up first)
#
# Requires passwordless SSH (key) access as root. Override the host with
# DEPLOY_HOST=user@host and the port with DEPLOY_PORT=2222 if needed.
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
cd "$(dirname "$0")/.."

echo "→ Checking SSH access to ${HOST}…"
if ! "${SSH[@]}" "$HOST" "test -d '$DEST'"; then
  echo "✗ Cannot reach $HOST or $DEST does not exist." >&2
  echo "  If SSH asks for a password, authorize your key once with: ssh-copy-id -p $PORT $HOST" >&2
  exit 1
fi

if [[ "$TARGET" == "prod" ]]; then
  # The first switch from the old PHP site is done by hand; after that the
  # marker file exists and regular deploys are allowed.
  if ! "${SSH[@]}" "$HOST" "test -f '$DEST/.bluesign-deployed'"; then
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
  "${SSH[@]}" "$HOST" "mkdir -p '$HOME_DIR/backups' && chmod 700 '$HOME_DIR/backups' \
    && tar -czf '$HOME_DIR/backups/site-$STAMP.tar.gz' -C '$DEST' --exclude ./test.bluesignpr.com . \
    && ls -1t '$HOME_DIR'/backups/site-*.tar.gz | tail -n +11 | xargs -r rm --"
fi

echo "→ Uploading to ${DEST}…"
# Pages, images and PHP: add/update only, so nothing else in the folder is touched.
rsync -rlz -e "ssh -p $PORT" "${EXCLUDES[@]}" dist/client/ "$HOST:$DEST/"
# Hashed JS/CSS bundles: mirror exactly so old builds don't pile up.
rsync -rlz --delete -e "ssh -p $PORT" dist/client/assets/ "$HOST:$DEST/assets/"

echo "→ Fixing ownership and permissions…"
# Only the entries this deploy uploaded; the rest of the folder is left alone.
DEPLOYED=$(cd dist/client && ls -A | grep -vxE '\.htaccess|1-dark\.jpg|1-dark\.webp' | tr '\n' ' ')
"${SSH[@]}" "$HOST" "cd '$DEST' && chown -R $OWNER:$OWNER $DEPLOYED \
  && find $DEPLOYED -type d -exec chmod 755 {} + \
  && find $DEPLOYED -type f -exec chmod 644 {} +"

echo "→ Checking ${URL}…"
status="$(curl -s -o /dev/null -w '%{http_code}' "$URL/")"
echo "  HTTP $status (401 means it is password-protected, which is expected on test)"
echo "✓ Deployed to $URL"

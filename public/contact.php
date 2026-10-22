<?php
// Contact form handler: receives the form from /contact and emails it.
declare(strict_types=1);

const MAIL_TO = 'info@bluesignpr.com';
const MAIL_FROM = 'noreply@bluesignpr.com';
const MAIL_FROM_NAME = 'Blue Sign PR Website';
const RATE_LIMIT = 5;        // max messages per IP...
const RATE_WINDOW = 3600;    // ...per hour

header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

function field(string $name, int $max): string
{
    $value = trim((string)($_POST[$name] ?? ''));
    return mb_substr($value, 0, $max);
}

// Header fields must not contain line breaks (header injection).
function oneLine(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method']);
}

// Only accept submissions coming from this site.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== ($_SERVER['HTTP_HOST'] ?? '')) {
    respond(403, ['ok' => false, 'error' => 'origin']);
}

// Honeypot: real visitors never see this field. Pretend success to bots.
if (field('website', 200) !== '') {
    respond(200, ['ok' => true]);
}

$name = oneLine(field('name', 100));
$email = oneLine(field('email', 200));
$subject = oneLine(field('subject', 150));
$message = field('message', 5000);

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'invalid']);
}

// Simple per-IP rate limit stored in the system temp dir.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/bsp-contact-' . hash('sha256', $ip);
$now = time();
$hits = is_file($rateFile) ? (json_decode((string)file_get_contents($rateFile), true) ?: []) : [];
$hits = array_values(array_filter($hits, fn($t) => is_int($t) && $t > $now - RATE_WINDOW));
if (count($hits) >= RATE_LIMIT) {
    respond(429, ['ok' => false, 'error' => 'rate']);
}
$hits[] = $now;
file_put_contents($rateFile, json_encode($hits), LOCK_EX);

$mailSubject = 'Website enquiry: ' . ($subject !== '' ? $subject : 'Consultation request');
$body = "New message from the contact form on bluesignpr.com\n\n"
    . "Name:    {$name}\n"
    . "Email:   {$email}\n"
    . 'Subject: ' . ($subject !== '' ? $subject : '-') . "\n\n"
    . "{$message}\n\n"
    . "--\nSent " . gmdate('Y-m-d H:i') . " UTC from IP {$ip}\n";

$headers = [
    'From' => sprintf('=?UTF-8?B?%s?= <%s>', base64_encode(MAIL_FROM_NAME), MAIL_FROM),
    'Reply-To' => sprintf('=?UTF-8?B?%s?= <%s>', base64_encode($name), $email),
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => '8bit',
];

$sent = mail(
    MAIL_TO,
    '=?UTF-8?B?' . base64_encode($mailSubject) . '?=',
    $body,
    $headers,
    '-f' . MAIL_FROM
);

if (!$sent) {
    error_log('contact.php: mail() failed');
    respond(500, ['ok' => false, 'error' => 'send']);
}

respond(200, ['ok' => true]);

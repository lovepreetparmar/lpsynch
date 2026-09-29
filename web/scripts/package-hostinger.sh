#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
WEB="$ROOT/web"
OUT="$ROOT/hostinger-deploy"

echo "Building React app…"
(cd "$WEB" && npm run build)

rm -rf "$OUT"
mkdir -p "$OUT"
cp -R "$WEB/dist/"* "$OUT/"
cp "$ROOT/mail.php" "$OUT/mail.php"

echo "Hostinger package ready: $OUT"
echo "Upload everything inside hostinger-deploy/ to your staging public_html."

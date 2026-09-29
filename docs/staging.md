# Hostinger staging deployment (Phase 12)

## Prerequisites

- `redesign` branch builds cleanly: `cd web && npm ci && npm run build`
- Staging subdomain (e.g. `new.lpsynch.com`) pointed at a folder in Hostinger
- Production `public_html` backed up

## Deploy steps

1. Build locally or in CI:
   ```bash
   cd web && npm ci && npm run build
   ```
2. From repo root, run:
   ```bash
   cd web && npm run build && cd .. && rm -rf hostinger-deploy && mkdir hostinger-deploy && cp -R web/dist/* hostinger-deploy/ && cp mail.php hostinger-deploy/
   ```
   Or use `web/scripts/package-hostinger.sh` after fixing line endings if needed.
3. Upload **everything inside** `hostinger-deploy/` to staging `public_html` (includes `index.html`, `assets/`, `.htaccess`, `mail.php`).
5. Verify Apache rewrite: existing files and `mail.php` are served; other paths fall back to `index.html`.

## Smoke tests

- [ ] `https://staging/` loads homepage
- [ ] Direct navigation: `/about`, `/approach`, `/services`, `/people`, `/contact`
- [ ] Browser refresh on each route (no 404)
- [ ] Contact form POST → success/error states
- [ ] HTTPS, logo, team images, hero image
- [ ] `prefers-reduced-motion`: reduced animation
- [ ] Mobile layout and tap interactions
- [ ] SEO: title, description, `robots.txt`, `sitemap.xml`

## Production cutover

Only after staging approval: deploy `dist/` to production `public_html`, keep `mail.php`, archive legacy `index.php` as `index.legacy.php` if needed.

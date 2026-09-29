# LPSynch

Company website repository. The **legacy PHP site** stays at the repository root until production cutover. The **new React app** is in [`web/`](web/).

## New site

```bash
cd web
npm install
npm run dev
```

Routes: `/`, `/about`, `/approach`, `/services`, `/people`, `/contact`

Content is sourced from the existing PHP site (`index.php`) via `web/src/data/*` — do not invent company claims there.

The homepage uses the **Digital Flow** interaction system (`web/src/systems/digital-flow/`). Staging steps: [docs/staging.md](docs/staging.md). Audit: [docs/audit.md](docs/audit.md).

### Production build

```bash
cd web && npm ci && npm run build
```

Deploy `web/dist/` to Hostinger `public_html`, keep `mail.php` at the site root, and use `web/deploy/.htaccess` for SPA routing.

## Legacy

- `index.php`, `mail.php`, `img/`, etc.

## Branch

Develop on `redesign`; merge to `main` after staging approval.

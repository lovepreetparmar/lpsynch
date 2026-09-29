# LPSynch website (React)

See the repository [README](../README.md) for deployment and branch strategy.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

After `npm run build`, copy `deploy/.htaccess` to `dist/.htaccess` before uploading to Hostinger (or use the copy already in `dist` if you ran the deploy step from the root README).

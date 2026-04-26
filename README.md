# Roba International Group — Website

Static corporate site for **Roba International Pvt Ltd** and its sister companies.

## Deploying to Cloudflare Pages

This project is a fully static site — no build step required.

### Option 1 — Direct upload via dashboard
1. Go to **Cloudflare Dashboard → Workers & Pages → Create → Pages → Upload assets**.
2. Drag-and-drop this entire project folder.
3. Cloudflare will deploy in seconds.

### Option 2 — Git integration
1. Push this repo to GitHub / GitLab.
2. **Cloudflare Dashboard → Pages → Connect to Git** and select the repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** _(leave empty)_
   - **Build output directory:** `/`

### Option 3 — Wrangler CLI
```bash
npm install -g wrangler
wrangler login
wrangler pages deploy .
```

## Files

| File | Purpose |
|---|---|
| `index.html` | Single-page site (React via Babel standalone, all sections inline) |
| `app.jsx` | Main React app — sections, interactions |
| `companies.jsx` | Six-company portfolio component |
| `assets/` | Logo + imagery (immutable, 1y cache) |
| `_headers` | Cloudflare edge headers (security + caching) |
| `_redirects` | URL redirects (e.g. `/home` → `/`) |
| `_routes.json` | Routes config — excludes `/assets/*` from Functions |
| `wrangler.toml` | Wrangler CLI config |

## Local preview

Just open `index.html` in a browser, or:
```bash
npx wrangler pages dev .
```

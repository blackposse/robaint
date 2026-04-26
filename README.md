# Roba International Group — Website

Static corporate site for **Roba International Pvt Ltd** and its sister companies.
No build step required — open `index.html` in any browser.

## Deploying to Cloudflare Pages

### Option 1 — Direct upload (easiest)
1. **Cloudflare Dashboard → Workers & Pages → Create → Pages → Upload assets**
2. Drag-and-drop this entire project folder (or its zip).
3. Done.

### Option 2 — Connect to Git
1. Push this repo to GitHub or GitLab.
2. **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git** and select the repo.
3. **Build settings — IMPORTANT:**
   - **Framework preset:** `None`
   - **Build command:** _(leave empty)_
   - **Build output directory:** `/`
   - **Root directory:** `/`
4. Save and Deploy.

> ⚠️ Do **not** add a `wrangler.toml` to this project — Pages will incorrectly run `wrangler deploy` (Workers mode) instead of serving the static files. The build will fail with `Missing entry-point to Worker script`.

### Option 3 — Wrangler CLI
```bash
npm install -g wrangler
wrangler login
wrangler pages deploy .
```
(Use `wrangler pages deploy`, **not** `wrangler deploy`.)

## Files

| File | Purpose |
|---|---|
| `index.html` | Single-page site (React via Babel standalone, all sections inline) |
| `app.jsx` | Main React app — sections, interactions, tweaks |
| `data.jsx` | Six-company portfolio data |
| `map.jsx` | Original cartographic illustration of the trade corridor |
| `tweaks-panel.jsx` | Reusable tweaks UI shell |
| `assets/` | Logo + imagery (immutable, 1y cache via `_headers`) |
| `_headers` | Cloudflare edge headers (security + caching) |
| `_redirects` | URL redirects |
| `_routes.json` | Routes config |

## Local preview

Just open `index.html` in a browser, or:
```bash
npx wrangler pages dev .
```

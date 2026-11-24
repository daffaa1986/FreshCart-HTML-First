# FreshCart — Phase 8A: GitHub Pages Deployment Readiness Report

**Project:** `D:\projectweb\FreshCart-HTML-First`
**Repository:** `https://github.com/daffaa1986/FreshCart-HTML-First`
**Public URL:** `https://daffaa1986.github.io/FreshCart-HTML-First/`
**Date:** 2026-11-25
**Prepared by:** OpenCode

---

## Files Inspected

- `frontend/vite.config.js`
- `frontend/package.json`
- `frontend/index.html`
- `frontend/pages/**/*.html` (all pages incl. admin)
- `frontend/public/partials/header.html`, `footer.html`
- `frontend/src/js/shared/layout.js`
- `frontend/src/entries/*`
- `frontend/src/react/*`
- `frontend/src/js/shared/paths.js` (new)
- `.github/workflows/deploy.yml` (new)

## Files Changed and Created

| File | Action |
|------|--------|
| `frontend/vite.config.js` | Modified — added `base: '/FreshCart-HTML-First/'`, added Vite plugin rewriting root-absolute `href="/"` navigation links |
| `frontend/src/js/shared/paths.js` | Created — shared `BASE_URL` and `withBase()` helper |
| `frontend/src/js/shared/layout.js` | Modified — partials fetched via `withBase`, injected HTML rewritten, search navigation uses `withBase` |
| `frontend/src/react/components/ProductCatalog.jsx` | Modified — navigation URL uses `withBase` |
| `frontend/src/react/components/RecipeLibrary.jsx` | Modified — anchor hrefs use `withBase` |
| `frontend/src/react/mounts/mount-cart.jsx` | Modified — anchor hrefs use `withBase` |
| `frontend/src/react/mounts/mount-checkout.jsx` | Modified — anchor href and `window.location.assign` use `withBase` |
| `frontend/src/react/mounts/mount-order-confirmation.jsx` | Modified — anchor hrefs use `withBase` |
| `frontend/src/react/mounts/mount-order-history.jsx` | Modified — anchor hrefs use `withBase` |
| `frontend/src/react/mounts/mount-wishlist.jsx` | Modified — anchor href uses `withBase` |
| `.github/workflows/deploy.yml` | Created — GitHub Pages deployment workflow |

No UI redesign, backend, or database changes. No source files or docs deleted.

## Path Compatibility Findings

Root-absolute paths found and addressed:
- `href="/pages/..."`, `href="/index.html"` in HTML → rewritten at build time by Vite plugin to `/FreshCart-HTML-First/...`.
- `fetch('/partials/...')` and injected partial links → rewritten at runtime via `withBase` and partial HTML rewrite.
- `window.location.href` / `window.location.assign` navigation → `withBase`.
- React/JSX anchor hrefs → `withBase`.
- Asset paths (`/src/entries/...`, `/src/css/...`) → handled by Vite base at build time (hashed assets).
- External image URLs (Google Stitch) → unchanged.

## Build Result

- `npm ci`: PASS (129 packages, 0 vulnerabilities).
- `npm run build`: PASS (built in ~8.5s, 96 modules).

## Multi-Page Output Verification

- `frontend/dist/index.html`: exists.
- HTML pages in `dist/`: 20 (index + 18 pages + partials).
- All expected pages present: account, admin/*, cart, checkout, login, order-*, product-detail, products, recipes, register, wishlist.
- Generated asset paths include `/FreshCart-HTML-First/` base prefix.
- Remaining root-absolute nav hrefs in built HTML: 0.
- No `.env` or secret references in `dist/`: 0.

## Remaining Risks

1. Partial HTML files in `dist/partials/` retain root-absolute hrefs; rewritten at runtime by `injectPartial`. If JavaScript fails to load, navigation in header/footer would break.
2. Local dev server now serves at `http://127.0.0.1:5173/FreshCart-HTML-First/` (base path). README dev URL note is slightly outdated (non-blocking).
3. Actual GitHub Pages deployment not yet run; success depends on repository settings and workflow execution.
4. Image URLs still depend on external Google Stitch hosts (internet required).

## Manual GitHub Pages Settings Required

1. Repository → Settings → Pages.
2. Source: **GitHub Actions** (not "Deploy from a branch").
3. After pushing, the workflow will publish `frontend/dist/`.
4. Confirm the workflow run succeeds in the Actions tab.
5. Verify the site at `https://daffaa1986.github.io/FreshCart-HTML-First/`.

## Manual Git Commit/Push Commands

```bash
cd D:\projectweb\FreshCart-HTML-First
git add -A
git status --short
git check-ignore -v .env backend/.venv frontend/node_modules frontend/dist
git diff --cached --check
git commit -m "feat: prepare GitHub Pages deployment"
git push origin main
```

Then monitor the Actions tab for the deployment run.

---

## Final Audit (Phase 8A.5)

### Verified
- Only one workflow deploys Pages: `.github/workflows/deploy.yml` (no `static.yml` present).
- Production artifact comes exclusively from `frontend/dist/` (upload-pages-artifact path).
- No workflow publishes repository root.
- React navigation audit: all remaining root-absolute `href="/..."`, `window.location.href/assign` fixed via `withBase` (single comment reference in vite.config.js remains).
- Build: `npm ci` + `npm run build` PASS; 20 HTML entries; 0 secrets in dist.
- Git safety: `git diff --check` PASS (exit 0); no unexpected generated files or secrets in `git status`.
- Shared partials load via `withBase` and are rewritten at runtime; CSS/JS modules resolved by Vite base.

### Not Verified
- Live GitHub Pages deployment (pending manual push and workflow run).
- Browser runtime verification of header/footer, images, React islands, query/hash navigation under the real subpath URL (requires deployed site or local preview at base path).
- Local dev server URL change (now under `/FreshCart-HTML-First/`) not manually tested.

### Remaining Issues
- Partial HTML files in `dist/partials/` retain root-absolute hrefs; rewritten only if JS runs (degradation risk).
- README dev URL note slightly outdated.
- External Stitch image hosts still required (internet).
- LF/CRLF line-ending warnings during diff (cosmetic; core.autocrlf).

### Manual Deployment Requirements
1. GitHub repo Settings → Pages → Source = GitHub Actions.
2. Commit & push (commands in previous section).
3. Confirm workflow run succeeds in Actions tab.
4. Verify site at `https://daffaa1986.github.io/FreshCart-HTML-First/`.
5. Only then consider deployment complete.

---

## Deployment Fix Update (Post-Audit)

### Issues Identified
1. **Root-publishing workflow** (`.github/workflows/static.yml`) uploaded the entire repository (`path: '.'`), causing GitHub Pages to serve `README.md` instead of the app. **Removed.**
2. **Double base-prefix** in `vite.config.js` `rewriteBaseLinksPlugin`: the broad `href="\//g` regex also rewrote Vite-generated asset URLs (`href="/FreshCart-HTML-First/assets/..."` → double prefix). **Fixed** to target only navigation paths: `href="\/(pages\/|index\.html)`.

### Result After Fix
- `npm run build`: PASS.
- Double-prefix occurrences in `dist/`: 0.
- Root-absolute nav hrefs remaining: 0.
- `git diff --check`: PASS.

### Files Changed
- `.github/workflows/static.yml` — deleted.
- `frontend/vite.config.js` — plugin regex narrowed.

### Next Steps
1. Commit and push these changes.
2. Confirm the "Deploy FreshCart to GitHub Pages" workflow succeeds.
3. Hard-refresh the Pages URL (`Ctrl+F5`).
4. Verify the storefront (not README) loads with CSS/JS/navigation working.


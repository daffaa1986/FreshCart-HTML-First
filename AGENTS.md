# FreshCart — Agent Instructions

## Architecture (must preserve)
- Use **HTML First + Selective React**.
- Each customer/admin page is a separate HTML entry point under `frontend/`.
- HTML owns the page shell and static content. Do not convert entire pages into JSX.
- CSS/Tailwind owns presentation; JavaScript ES modules own shared browser interactions.
- React + JSX may only mount into explicitly designated roots such as `#home-flash-sale-root`, `#product-catalog-root`, `#cart-root`, and `#checkout-root`.
- Do not let vanilla JavaScript mutate DOM inside a React-owned root.
- Vite builds all HTML pages as a multi-page application.

## Source of truth
- Google Stitch originals and references are under `docs/stitch/`, `docs/design-system/`, and `docs/screenshots/`.
- Preserve the FreshCart look: forest-green primary palette, Inter typography, soft blue-gray surfaces, rounded cards, and the provided page layouts.
- Keep original page copy and image references unless the user asks to change them. Treat marketing metrics/guarantees as demo claims until verified.

## Code organization
- Shared header/footer markup lives in `frontend/public/partials/` and is loaded by `src/js/shared/layout.js`.
- Shared product data lives in `src/js/data/products.js`.
- Cart data has one shared store in `src/js/shared/cart-store.js`.
- Use reusable React components for interactive islands, not as a replacement for HTML pages.
- Do not duplicate product records or cart calculations across pages.

## Development workflow
- Inspect existing code before editing.
- Do not delete or overwrite Stitch source references.
- Prefer small, reviewable changes.
- Run `npm run build` from `frontend/` after significant frontend work.
- Clearly report what is functional, demo-only, placeholder, or not implemented.
- Never claim backend/payment/authentication is implemented unless it actually is.

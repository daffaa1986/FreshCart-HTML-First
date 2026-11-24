# FreshCart — Phase 5B Cart & Wishlist Manual Acceptance Checklist

Use a **separate browser profile** (or test window) so an existing user's cart/wishlist localStorage is not touched. Server: `cd frontend && npm run dev` → `http://127.0.0.1:5173/`.

## Cart
- [ ] From Catalog, click **+ Keranjang** on Brokoli (stok 8). Header cart badge becomes 1, subtotal equals catalog price.
- [ ] Click **+ Keranjang** again on the same product; quantity becomes 2 in the cart (no duplicate line).
- [ ] In Cart, use **+** and **−**; quantity and subtotal update; header badge matches.
- [ ] Click **−** until quantity 0; item is removed and empty state appears.
- [ ] Add items, refresh the page: cart contents, quantity and subtotal persist.
- [ ] Try to increase beyond stock (Brokoli 8): quantity clamps to 8 with a toast.
- [ ] Remove an item from Cart; header badge and subtotal update immediately.
- [ ] Add from Home, Catalog, Product Detail and Recipe detail; all appear in the same cart.

## Wishlist
- [ ] Toggle favorite on a ProductCard; header wishlist count becomes 1; toast appears.
- [ ] Toggle the same product again: it is removed, no duplicate entry.
- [ ] Open Wishlist page: saved product is listed; **Pindahkan ke keranjang** adds it to cart and removes it from wishlist.
- [ ] If a product is out of stock, the move button is disabled and shows **Stok habis**.
- [ ] Refresh: wishlist contents and header count persist.
- [ ] **Hapus semua** clears the list and shows the empty state.
- [ ] Unknown/removed product IDs in storage do not inflate the header count (code-level verified; manual check optional).

## Cross-page / header
- [ ] Header cart badge, total and wishlist badge update after actions on Home, Catalog, Product Detail, Recipe Detail, Cart, Wishlist.
- [ ] Checkout link from Cart still navigates (do not complete checkout).
- [ ] Header category navigation and footer links work on all pages.

## Responsive (Chrome DevTools)
- [ ] 375 px / 390 px: no horizontal overflow, quantity controls and remove buttons tappable, prices readable.
- [ ] 768 px tablet and 1280 px desktop: layout intact, empty states centered.
- [ ] Keyboard: Tab reaches quantity/remove/move buttons; focus visible.

## Record
Mark PASS / FAIL / NOT TESTED for each item. Attach screenshots for FAIL. Do not mark responsive rows PASS unless a real browser was used.

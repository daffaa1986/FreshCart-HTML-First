# FreshCart — Phase 5A.7.1 Manual Browser Acceptance Checklist

Server: `cd frontend && npm run dev -- --host 0.0.0.0`
Page: `http://127.0.0.1:5173/pages/recipes.html`
LAN test (optional): `http://<laptop-LAN-IP>:5173/pages/recipes.html` from a phone on the same Wi-Fi.

Use a browser profile/window with a **test cart** if you want to verify cart contents; do not clear an existing user's cart.

## A. Recipe detail
- [ ] Open **Rendang Daging Sapi** (search "Rendang", click *Lihat Detail*). Photo, 6 servings, 180 min, ingredients, steps, nutrition, allergens, storage visible.
- [ ] Open **Soto Padang** (id 106). Note "Daging sapi sandung lamur" shows **Belum tersedia di katalog** (link intentionally removed).
- [ ] Open **Avocado Toast** (id 201). "Roti gandum" shows **Belum tersedia di katalog**.
- [ ] Open one international recipe, e.g. **Sushi** or **Butter Chicken**. Linked products show name, price, stock.
- [ ] Check that no image is broken; fallback SVG appears only for the 10 known fallback recipes.

## B. Serving adjustment
- [ ] In Rendang, click **+** once: 6 → 7; every quantity recalculates (1000 g → ~1167 g).
- [ ] Click **−** repeatedly down to 1; the **−** button is disabled at 1.
- [ ] Click **+** repeatedly to 20; the **+** button is disabled at 20.
- [ ] Open a recipe with fractional quantities (e.g. 0.5 sdt) and verify readable decimals (0,25).
- [ ] Close modal, reopen the same recipe: it resets to the original serving count (recipe data is not mutated).

## C. Ingredient checklist
- [ ] Available ingredients are selectable; unavailable ones are disabled and labelled.
- [ ] Selecting/deselecting changes "Bahan dipilih" and "Estimasi subtotal".
- [ ] A 600 g ingredient against a 500 g pack shows **2 pack**; 3 butir against 10 butir shows 1 pack.
- [ ] A bagged/spoon unit (sdm/sdt) against a gram package shows the new warning **"Perkiraan 1 pack — satuan ... tidak dapat dikonversi ..."** and the summary warning about approximate subtotal.
- [ ] "Tambah semua yang tersedia" selects every available ingredient and updates subtotal.

## D. Cart integration
- [ ] Add 1 selected ingredient; verify toast, header cart count, and `Estimasi subtotal` vs cart page subtotal (catalog prices only).
- [ ] Add again; quantity merges (not duplicated as a new line) and respects stock.
- [ ] Use "Tambah semua yang tersedia" on a recipe; verify cart page lists exactly those products with expected pack counts.
- [ ] Repeatedly click the add button quickly; only one batch should be added (button disabled during add).
- [ ] Try a low-stock product (e.g. Brokoli, stok 8): requesting more clamps to stock and shows a toast.
- [ ] Out-of-stock/unavailable ingredients never appear in the cart.

## E. Modal / navigation
- [ ] Escape closes the modal and focus returns to the card/button that opened it.
- [ ] Backdrop click and the **Tutup** button close the modal.
- [ ] Hash `#resep/<slug>` appears when a detail opens; browser Back closes it; Forward reopens it.
- [ ] Filters/search state remains after closing the modal.

## F. Responsive (DevTools device toolbar)
- [ ] 375 px and 390 px: no horizontal scroll; modal fits; checklist text does not overlap; action buttons reachable; touch targets usable.
- [ ] 768 px tablet: two-column detail grid collapses cleanly, no overflow.
- [ ] 1280 px desktop: full layout, sticky modal header works while scrolling.
- [ ] Header category nav and footer links remain functional at all widths.

## G. Record results
For each checkbox record PASS / FAIL / NOT TESTED. Attach screenshots for any FAIL. Do not mark mobile rows PASS unless an actual browser/device was used.

# FreshCart — Phase 5D Manual Test Execution Guide

Panduan ini hanya untuk dokumentasi/persiapan. Menjalankan langkah di bawah tetap memerlukan browser sungguhan; hasil belum diisi.

## 1. Menjalankan Vite
```powershell
cd D:\projectweb\FreshCart-HTML-First\frontend
npm run dev
```
- Lokal: `http://127.0.0.1:5173/`
- LAN: verifikasi dengan `Get-NetIPAddress`, lalu pakai alamat IPv4 jaringan (saat ini `192.168.0.168`, dapat berubah).

## 2. Membuka FreshCart
Buka halaman sesuai kelompok test:
- Catalog: `/pages/products.html`
- Recipe: `/pages/recipes.html`
- Cart: `/pages/cart.html`
- Wishlist: `/pages/wishlist.html`
- Checkout: `/pages/checkout.html`
- Confirmation: `/pages/order-confirmation.html?order=<ORDER_ID>`
- History: `/pages/order-history.html`

## 3. Profil browser terpisah
Ganti `--user-data-dir` seperti di `docs/phase-5d-test-data-preparation.md`. Jangan memakai profil yang berisi cart/wishlist pengguna. Siapkan data uji sesuai dokumen tersebut sebelum kelompok test yang membutuhkan kondisi khusus.

## 4. Menjalankan per kelompok
1. **A — Catalog (CAT-01–CAT-06):** jalankan berurutan di katalog; catat hasil pencarian, filter, sortir, pagination, add to cart, dan empty state.
2. **B — Recipe (REC-01–REC-06):** buka detail Rendang/Soto Padang/Avocado Toast; uji porsi, checklist, dan tambah bahan. Catat header cart sebelum/sesudah.
3. **C — Cart & Wishlist (CART-01–CART-07):** gunakan data uji dari dokumen persiapan; uji quantity, subtotal, hapus, wishlist, pindah ke cart, stok, lalu refresh.
4. **D — Checkout (CHK-01–CHK-16):** isi form valid/invalid; uji validasi, tiga metode kirim (CHK-04/05/11), threshold (CHK-06), promo (CHK-07), dan masing-masing metode bayar (CHK-12–CHK-16). Catat status awal order.
5. **E — Order Integrity (ORD-01–ORD-06):** gunakan cart dengan produk unknown; verifikasi produk tersisa, wishlist tidak berubah, dan double submit. Untuk ORD-05 hanya gunakan fault injection di profil uji jika cara pemicunya sudah terverifikasi; jika tidak, tandai BLOCKED. Jangan mengubah kode produksi.
6. **F — Confirmation & History (CFH-01–CFH-05):** setelah order dibuat, cek detail, refresh, dan invalid order ID.
7. **G — Responsive & Accessibility (RES-01–RES-08):** DevTools device toolbar untuk 375/390/768/1280; catat sebagai **emulasi**. Uji HP fisik terpisah via IP LAN dan catat merek/model bila dilakukan.

## 5. Mencatat hasil
Untuk setiap case, isi di checklist:
- Actual result (apa yang terjadi)
- Status: PASS / FAIL / BLOCKED / NOT TESTED
- Browser & versi, tanggal, viewport
- Path screenshot atau "tidak ada"
- Catatan bug

Gunakan template di `docs/phase-5d-browser-acceptance-checklist.md` bagian Evidence Collection. Jangan mengubah status menjadi PASS tanpa bukti.

## 6. Melaporkan bug
Format minimum:
```
Bug ID: BUG-5D-001
Test ID: CHK-06
Halaman/URL: /pages/checkout.html
Browser/viewport: Chrome 131 / 390 px
Langkah reproduksi: 1) ... 2) ...
Expected: ...
Actual: ...
File sumber terduga: ...
Root cause (jika diketahui): ...
Screenshot: ...
```
Perbaikan hanya dilakukan minimal jika bug benar-benar direproduksi, lalu jalankan regression test dan `npm run build`.

## 7. Mengambil screenshot bukti
- Chrome/Edge: `F12` → ikon kamera (Capture screenshot) atau `Ctrl+Shift+P` → "Screenshot".
- Simpan dengan nama `<TEST-ID>-<viewport>.png`, mis. `CHK-06-390.png`.
- Simpan di folder bukti lokal (mis. `docs/evidence/5d/`) dan cantumkan path di checklist.
- Untuk halaman panjang, gunakan "Capture full size screenshot".

## 8. Selesai sesi
- Tutup profil uji. Profil utama tidak boleh terpengaruh.
- Rekap jumlah PASS/FAIL/BLOCKED/NOT TESTED di `docs/phase-5d-acceptance-report.md`.
- Jangan menyatakan Phase 5D selesai bila test kritis masih NOT TESTED/BLOCKED.

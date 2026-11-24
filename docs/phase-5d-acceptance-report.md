# FreshCart — Phase 5D Acceptance Report

Status: **belum selesai**. 6 test case dicatat PASS berdasarkan laporan manual dari project owner, sisanya 48 masih `NOT TESTED` karena pengujian manual browser belum dijalankan; tidak ada browser automation yang tersedia di sesi ini (browser tetap dapat dipakai secara manual).

## Tahap 1 — Verifikasi environment Phase 5D.2 (HTTP only)
- Vite sudah berjalan; `http://127.0.0.1:5173/` → **200**.
- Halaman yang dicek: `/pages/products.html`, `/pages/recipes.html`, `/pages/cart.html`, `/pages/wishlist.html`, `/pages/checkout.html`, `/pages/order-confirmation.html`, `/pages/order-history.html` → semuanya **200**.
- Alamat LAN terkonfirmasi ulang dengan `Get-NetIPAddress`: **192.168.0.168** (dapat berubah; verifikasi lagi sebelum uji HP).
- Browser automation tidak tersedia; **tidak ada klik, input form, atau interaksi UI yang dijalankan**. 6 test case dicatat PASS berdasarkan laporan manual, 48 test case masih `NOT TESTED`.

## 1–5. Ringkasan test case
| Metrik | Jumlah |
|---|---:|
| Total test case | 54 |
| PASS | 6 |
| FAIL | 0 |
| BLOCKED | 0 |
| NOT TESTED | 48 |

Rincian: CAT 6, REC 6, CART 7, CHK 16, ORD 6, CFH 5, RES 8. Detail ada di `docs/phase-5d-browser-acceptance-checklist.md`.

6 test case (CAT-05, REC-06, CART-01, CART-02, CART-03, CART-07) dicatat PASS berdasarkan laporan manual dari project owner. Metadata bukti (browser, versi, tanggal, viewport, screenshot) tidak tersedia → **Not recorded**.

8 test case (CART-04, CART-05, CHK-07, CHK-12–CHK-16) tetap NOT TESTED dengan catatan butuh konfirmasi detail: fitur dilaporkan bekerja oleh owner (wishlist, promo, pembayaran) namun skenario pengujian spesifik tidak terdokumentasi.

## Pembaruan Phase 5D.1 — Test Preparation & Checklist Refinement
- Test case sebelum: **48**. Sesudah: **54**.
- Test case ditambahkan: **CHK-11** (Terjadwal), **CHK-12–CHK-16** (QRIS, Virtual Account, E-Wallet, Kartu, COD sebagai test terpisah).
- Data diverifikasi dari source aktual: harga/stok produk (Brokoli Rp22.500/stok 8; Sirloin Rp68.000/stok 20; Telur Rp28.000/10 butir; Bayam Rp12.000; Jeruk Medan Rp38.000; Kacang Hijau Rp26.000); resep (Rendang id 103, 6 porsi/180 menit; Soto Padang id 106; Avocado Toast id 201; bahan sandung lamur & roti gandum tanpa productId); konfigurasi ongkir (15k/30k/20k), threshold Rp50.000, promo FRESH10; status pembayaran online/COD.
- Koreksi checklist: ekspektasi REC-03 dari "~1167 g" menjadi **1166,7 g** (pembulatan 1 desimal sesuai implementasi).
- Data yang **tidak bisa diverifikasi/menyesatkan**: subtotal persis Rp49.999 tidak dapat dibentuk dari harga katalog (semua kelipatan Rp500) → diganti Rp48.500 sebagai "di bawah threshold"; penjadwalan pengiriman belum punya UI input jadwal → CHK-11 hanya memverifikasi biaya, estimasi, dan label demo, bukan janji waktu nyata.
- Dokumen baru: `docs/phase-5d-test-data-preparation.md`, `docs/phase-5d-manual-test-guide.md`. Checklist dan report diperbarui dengan field evidence (browser/versi, tanggal, viewport, actual, status, screenshot, bug notes).
- Build: `npm run build` dijalankan ulang pada Phase 5D.1 → **berhasil** (~6,65 detik).
- Konfirmasi: **tidak ada perubahan kode produksi**, tidak ada localStorage dihapus, tidak ada `clearCart()` dijalankan, tidak ada status test diubah menjadi PASS.

## 6. Bug ditemukan & diperbaiki
Tidak ada bug baru yang ditemukan pada Phase 5D karena **tidak ada eksekusi browser**. Tidak ada perubahan kode produksi pada phase ini. Dua file dokumen dibuat:
- `docs/phase-5d-browser-acceptance-checklist.md`
- `docs/phase-5d-acceptance-report.md` (file ini)

Catatan: checklist lama (`recipe-browser-acceptance-checklist.md`, `cart-wishlist-acceptance-checklist.md`, `checkout-order-acceptance-checklist.md`) tetap dipertahankan sebagai sumber; tidak ada yang dihapus.

## 7. Build result
`npm run build` di `frontend/` → **berhasil** (Vite, ~5,27 detik, tanpa error).

## 8. Automated test result (dari phase sebelumnya, tidak dijalankan ulang di sini)
- Phase 5C: 23 asersi lulus (cart, validasi, ongkir, promo, order, riwayat).
- Phase 5C.1: 27 asersi lulus (integritas data, stok/harga otoritatif, guard, idempotency, threshold ongkir).
- Phase 5C.2: 16 integration checks lulus (cart valid+invalid, unknown tetap ada, gagal simpan, wishlist utuh, double submit).
- Phase 5C.2.1: 18 cleanup checks lulus (satu penghapusan per product ID, dedup, source check).
- HTTP source check sebelumnya: halaman checkout/cart/confirmation/history dan modul checkout → 200.

Hasil automated/HTTP tersebut **tidak** mengubah status 54 test case browser menjadi PASS.

## 9. Browser test result

**Tidak ada pengujian browser yang benar-benar dilakukan oleh agent ini.**
- Pemeriksaaan environment: tidak ditemukan `playwright`, `puppeteer`, `cypress`, `jsdom`, atau binary `chrome`/`msedge`/`firefox` di PATH. Tidak ada dependency baru dipasang.
- Tidak ada klik UI, pengisian form, perubahan porsi, checkout nyata, uji refresh, uji mobile, atau uji keyboard yang dieksekusi.
- Karena itu seluruh test case berstatus `NOT TESTED` kecuali 6 test case yang dicatat PASS berdasarkan laporan manual dari project owner.

### 9.1 Jenis Bukti Pengujian (Evidence Classification)

| Kategori | Sumber | Status | Keterangan |
|---|---|---|---|
| User-reported manual browser tests | Project owner | 6 PASS | CAT-05, REC-06, CART-01, CART-02, CART-03, CART-07. Metadata tidak tersedia → **Not recorded**. |
| Agent-executed browser tests | Kilo CLI / OpenCode | 0 PASS | Tidak ada agent yang mengeksekusi klik browser atau interaksi UI pada fase ini. |
| Automated source/integration tests | Phase 5C, 5C.1, 5C.2, 5C.2.1 | 84 assertions lulus | Code-level automated tests (cart, validasi, ongkir, promo, order, riwayat, integritas data, stok/harga, guard, idempotency). Tidak mengubah status 54 test case browser. |
| HTTP checks | Phase 5D.1 environment verification | 200 OK | Halaman `/pages/products.html`, `/pages/recipes.html`, `/pages/cart.html`, `/pages/wishlist.html`, `/pages/checkout.html`, `/pages/order-confirmation.html`, `/pages/order-history.html` → HTTP 200. Tidak termasuk interaksi UI. |
| Account navigation (Phase 5D.3.1) | OpenCode + Edge headless CDP | 11/11 PASS | Terverifikasi terpisah: desktop 1440×900, mobile 390×844, semua 11 halaman. Tidak digabung ke dalam 54 test case storefront. |

### 9.2 Missing Evidence Metadata

Berikut metadata yang **belum tersedia** untuk 6 test case PASS (user-reported):
- Browser & versi: **Not recorded**
- Tanggal pengujian: **Not recorded**
- Viewport: **Not recorded**
- Screenshot: **Not recorded**
- Actual result detail: **Not recorded** (hanya status PASS dilaporkan)

Metadata ini wajib diisi saat eksekusi ulang atau verifikasi ulang sesuai template di `docs/phase-5d-browser-acceptance-checklist.md` (Bagian Evidence Collection).

Environment yang disiapkan (untuk eksekusi manual):
- Vite: `cd frontend && npm run dev`
- Lokal: `http://127.0.0.1:5173/`
- LAN saat ini: `http://192.168.0.168:5173/` (verifikasi ulang dengan `Get-NetIPAddress` sebelum dipakai; alamat dapat berubah)
- Profil browser terpisah wajib; jangan menghapus localStorage pengguna.

## 10. Fitur yang sudah siap dari sisi implementasi
- Product Catalog: pencarian, filter kategori, sorting, pagination, add to cart.
- Recipe Library: 60 resep, detail, penyesuaian porsi, checklist bahan, integrasi cart.
- Cart & Wishlist: quantity, subtotal, hapus, wishlist, pindah ke keranjang, validasi stok, persistensi.
- Checkout: form & validasi, tiga metode kirim, lima metode bayar demo, threshold ongkir Rp50.000, promo FRESH10, ringkasan, double-submit guard.
- Order: penyimpanan lokal `freshcart-orders-v1`, konfirmasi, riwayat, snapshot produk, idempotency.

## 11. Fitur yang masih memerlukan pengujian browser
**Semua fitur di atas** masih memerlukan verifikasi melalui checklist 5D. 6 test case telah dicatat PASS berdasarkan laporan manual (CAT-05, REC-06, CART-01, CART-02, CART-03, CART-07), sisanya 48 test case masih NOT TESTED dari Catalog hingga Responsive & Accessibility. Khususnya alur kritis: checkout dengan produk invalid, ongkir threshold, promo, double-submit, konfirmasi & riwayat setelah refresh, serta tampilan 375/390/768/1280 px.

## Rekomendasi
**Jangan masuk Phase 6 sebelum Phase 5D selesai.** Phase 5D dinyatakan selesai hanya jika test case kritis (CAT-05, REC-06, CART-01/07, CHK-01/06/10, ORD-01/02/03/06, CFH-01/03, RES-01/05) benar-benar dijalankan di browser dengan profil terpisah dan hasilnya dicatat. Setelah itu, Customer Storefront dapat dianggap siap untuk Phase 6 (Dashboard) dengan tetap mengingat backend/payment baru masuk Phase 7.

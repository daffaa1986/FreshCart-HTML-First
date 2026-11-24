# FreshCart — Checkout & Order Acceptance Checklist (Phase 5C / 5C.1 / 5C.2)

> Status: automated QA & build selesai. **Browser acceptance testing belum dilakukan.** Jangan tandai item di bawah PASS tanpa mencobanya di browser/perangkat nyata.

## Catatan Phase 5C.2.1 — Completion Cleanup
- Bug cleanup yang dilaporkan (dua pemanggilan penghapusan: `forEach` + helper) **tidak ditemukan** di source aktual; hanya ada satu pemanggilan `finalizeCheckoutAfterOrder(outcome.order, removeFromCart)`.
- QA produksi ditambahkan: spy pada `removeItem` membuktikan setiap product ID dihapus **tepat satu kali**,product ID duplikat di order tetap dihapus sekali, unknown tetap tersimpan, gagal simpan tidak mengubah cart, wishlist utuh, double submit dicegah.
- Verifikasi source: tidak ada `clearCart`, tidak ada `outcome.order.items.forEach`, tepat satu completion call (lokal & source yang disajikan Vite).

## Catatan Phase 5C.2 — Final Cart Integrity Fix
- Bug yang dilaporkan (`clearCart()` sebelum `removeFromCart()`) **tidak ditemukan** di source aktual `mount-checkout.jsx` saat audit; hanya ada penghapusan selektif.
- Ditemukan pula **import ganda** `removeFromCart` (module import + hook destructure). Import module yang tidak dipakai dihapus.
- Penghapusan selektif diekstrak ke `src/js/shared/checkout-completion.js` (`finalizeCheckoutAfterOrder`) dan **dipakai langsung oleh komponen React**, sehingga integration test menguji kode produksi yang sama.
- Integration test 16/16 lulus: cart 2 valid + 1 unknown → setelah checkout hanya 2 yang dihapus, unknown tetap ada; gagal simpan → cart utuh; wishlist tidak berubah; double submit → satu order.
- Verifikasi source & HTTP: tidak ada `clearCart` di source checkout terbaru; modul completion terlayani 200.

Gunakan profil browser terpisah / storage terisolasi. Semua pembayaran dan pesanan adalah **simulasi localStorage**; jangan memasukkan data kartu, PIN, atau OTP.

Server: `cd frontend && npm run dev` → `http://127.0.0.1:5173/pages/cart.html`

## Ringkasan Phase 5C.1
- Bug diperbaiki: `clearCart()` menggantikan penghapusan selektif → kini hanya produk yang benar-benar dipesan yang dikeluarkan dari cart.
- Bug diperbaiki: `buildOrder()` menerima data UI apa adanya → kini memvalidasi dan mengambil identitas/harga/stok dari katalog aktif.
- Bug diperbaiki: lock submit dilepas di `finally` → kini lock tetap aktif setelah sukses hingga navigasi, dilepas hanya saat gagal; ditambah idempotency key.
- Bug diperbaiki: klaim header "Gratis Ongkir min. Rp50.000 | Pengiriman 2 Jam" tidak konsisten → kini threshold demo Rp50.000 diterapkan pada Reguler (subtotal sebelum diskon), copy header diselaraskan dengan estimasi 2–3 hari.
- Bug diperbaiki: link "Pesanan Saya" hanya ada di desktop → kini juga tersedia di nav mobile yang dapat di-scroll.

## Cart Review (`/pages/cart.html`)
- [ ] Keranjang kosong → empty state + tombol katalog; checkout tidak tersedia.
- [ ] Satu produk: gambar, nama, harga, stok, qty, subtotal sesuai katalog.
- [ ] Beberapa produk: subtotal = Σ(harga × qty) produk yang tersedia.
- [ ] + / − mengubah qty; tombol − pada qty 1 menghapus produk.
- [ ] Produk invalid / stok 0 / qty > stok ditandai dan tidak dihitung; checkout dinonaktifkan jika tidak ada produk valid.
- [ ] Setelah checkout sukses, **produk invalid/unknown tetap ada di cart** (uji browser khusus).

## Customer Form
- [ ] Field wajib: nama, telepon, provinsi, kota, kecamatan, alamat, kode pos.
- [ ] Telepon `081234567890` valid; `12345` ditolak.
- [ ] Kode pos `12190` valid; `12` ditolak.
- [ ] Email opsional; format salah ditolak.
- [ ] Checkout ditolak sampai semua field valid.

## Shipping & Promotion
- [ ] Reguler Rp15.000 (gratis jika subtotal ≥ Rp50.000), Ekspres Rp30.000, Terjadwal Rp20.000 — semua berlabel demo.
- [ ] Uji batas: subtotal Rp49.999 → Rp15.000; tepat Rp50.000 → Rp0.
- [ ] Ekspres tetap berbayar walaupun subtotal ≥ Rp50.000.
- [ ] Copy header tidak lagi menjanjikan "2 Jam Sampai".
- [ ] Kode promo `FRESH10`: diskon 10%, maks Rp20.000; kode salah ditolak.
- [ ] `Grand Total = Subtotal + Ongkir − Diskon`, tidak negatif.

## Payment & Place Order
- [ ] QRIS / VA / E-Wallet / Kartu → `Pending Payment`; COD → `Pending Confirmation`.
- [ ] Tidak ada input kartu/CVV/PIN/OTP.
- [ ] Tombol menampilkan loading; klik dua kali tidak membuat dua pesanan.
- [ ] Pesanan tersimpan sebelum cart berubah; gagal simpan → cart utuh + pesan error, pengguna bisa retry.
- [ ] Wishlist tidak berubah.

## Confirmation & History
- [ ] Order ID, tanggal, status, snapshot produk, alamat, pembayaran, total tampil benar.
- [ ] Riwayat tersedia via header (desktop & mobile), Persisten setelah refresh, empty state benar.

## Responsive & Keyboard
- [ ] 375 / 390 / 768 / 1280 px: tidak ada horizontal overflow; nav mobile "Pesanan Saya" terlihat.
- [ ] Tab mencapai input, radio, tombol; focus ring terlihat.

## Hasil Automated QA (isolated storage)
27 asersi lulus: cart valid+invalid, penghapusan selektif, kegagalan simpan, ID unknown, stok 0, qty > stok, harga & subtotal otoritatif, threshold ongkir (49.999 / 50.000 / express), diskon & total non-negatif, metode bayar/kirim invalid, double-submit guard + idempotency, retry setelah gagal, wishlist utuh, riwayat setelah refresh, link mobile di header.

## Build
`npm run build` → berhasil (Vite, ~5,2 detik).

## Browser test yang benar-benar dilakukan
Hanya HTTP serving check (checkout/cart/confirmation/history 200, header & modul terbaru terlayani). **Tidak ada klik/interaksi browser, tidak ada uji mobile nyata.**

## Masih belum selesai
- Browser acceptance untuk Phase 5A.7.1, 5B, dan 5C.
- Payment gateway, backend, stok permanen, tarif logistik nyata (Phase 7).
- Pemilihan jendela waktu Scheduled Delivery masih demo.

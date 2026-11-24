# FreshCart — Phase 5D Customer Storefront Browser Acceptance Checklist

> Status: **belum dieksekusi di browser**. Semua test case di bawah berstatus `NOT TESTED` sampai dijalankan dengan interaksi browser sungguhan. Jangan mengubah status menjadi PASS hanya karena build, HTTP 200, atau automated test lulus.

## Audit 5D.1 (data diverifikasi dari source aktual)
- 48 test case awal: ID unik, status awal `NOT TESTED`, Actual result kosong. Tidak ada duplikat ID.
- Produk: Brokoli Hijau Organik Lembang id 107, stok 8, Rp22.500; Daging Sapi Sirloin id 212, stok 20, Rp68.000; Telur Ayam Negeri id 223, stok 100, Rp28.000 (10 butir); Bayam Hijau id 101 Rp12.000; Jeruk Medan id 202 Rp38.000; Kacang Hijau id 238 Rp26.000.
- Resep: Rendang Daging Sapi id 103 (6 porsi, 180 menit); Soto Padang id 106 (bahan "Daging sapi sandung lamur" tanpa productId); Avocado Toast id 201 (bahan "Roti gandum" tanpa productId). Contoh takaran 0,5 sdt tersedia.
- Shipping config: Reguler Rp15.000, Ekspres Rp30.000, Terjadwal Rp20.000; gratis ongkir Reguler mulai subtotal Rp50.000 (sebelum diskon). Promo `FRESH10` = 10%, maks Rp20.000.
- Subtotal tepat Rp50.000 dapat dibuat dari Bayam Hijau (Rp12.000) + Jeruk Medan (Rp38.000). Di bawah threshold: Brokoli (Rp22.500) + Kacang Hijau (Rp26.000) = Rp48.500. Angka Rp49.999 tidak mungkin dari harga katalog yang semuanya kelipatan Rp500; gunakan Rp48.500 sebagai "di bawah threshold".
- Pembayaran: QRIS / VA / E-Wallet / Kartu = `Pending Payment`; COD = `Pending Confirmation`. Semua berlabel demo; tidak ada input kartu/CVV/PIN/OTP.

## Environment
- Server: `cd frontend && npm run dev`
- Lokal: `http://127.0.0.1:5173/`
- LAN (verifikasi IP terbaru): `http://192.168.0.168:5173/`
- Gunakan **browser profile terpisah**. Jangan menghapus/reset localStorage pengguna, jangan `clearCart()` global.
- Payment/order adalah simulasi localStorage; jangan memasukkan data kartu, PIN, OTP.

## Sumber checklist yang digabungkan
- `docs/recipe-browser-acceptance-checklist.md`
- `docs/cart-wishlist-acceptance-checklist.md`
- `docs/checkout-order-acceptance-checklist.md`
- Product Catalog: tidak ada checklist pengujian terpisah; disusun dari fitur yang tersedia di `pages/products.html` / `ProductCatalog.jsx`.

## Legend
Actual Result diisi saat eksekusi. Status: PASS / FAIL / BLOCKED / NOT TESTED.

---

## A. Product Catalog

| ID | Feature | Test scenario | Preconditions | Test steps | Expected result | Actual result | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| CAT-01 | Search | Cari produk berdasarkan nama | Halaman `/pages/products.html` terbuka | Ketik "brokoli" di kolom pencarian | Hanya produk relevan (Brokoli) tampil | Belum dijalankan | NOT TESTED | |
| CAT-02 | Category filter | Filter kategori Daging | Katalog terbuka | Pilih kategori Daging & Unggas | Hanya produk kategori tersebut tampil; URL/state konsisten | Belum dijalankan | NOT TESTED | |
| CAT-03 | Sorting | Urutkan berdasarkan harga | Katalog terbuka | Pilih sortir harga terendah/tertinggi | Urutan harga benar | Belum dijalankan | NOT TESTED | |
| CAT-04 | Pagination | Pindah halaman hasil | Lebih dari satu halaman produk | Klik halaman berikutnya | Produk berubah sesuai halaman; filter tetap | Belum dijalankan | NOT TESTED | |
| CAT-05 | Add to cart | Tambah produk dari kartu | Cart awal diketahui (profil test) | Klik "+ Keranjang" pada produk | Badge header bertambah; toast muncul; jumlah benar | User-reported: PASS (metadata not recorded) | PASS | Manual test reported by project owner; browser/version/date/viewport/screenshot: Not recorded |
| CAT-06 | Empty search | Pencarian tanpa hasil | Katalog terbuka | Cari kata acak "zzzzzz" | Empty state tampil, tidak ada pesan error | Belum dijalankan | NOT TESTED | |

## B. Recipe Library

| ID | Feature | Test scenario | Preconditions | Test steps | Expected result | Actual result | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| REC-01 | Detail | Buka detail Rendang | Halaman resep terbuka | Cari "Rendang", klik Lihat Detail | Foto, 6 porsi, 180 menit, bahan, langkah, nutrisi, alergen tampil | Belum dijalankan | NOT TESTED | |
| REC-02 | Detail | Bahan tidak tersedia | Buka Soto Padang & Avocado Toast | Periksa "sandung lamur" & "roti gandum" | Keduanya bertanda "Belum tersedia di katalog" | Belum dijalankan | NOT TESTED | |
| REC-03 | Serving | Ubah porsi 6 → 7 | Detail Rendang terbuka | Klik + sekali | Takaran 1000 g → 1166,7 g (1000 × 7 / 6, dibulatkan 1 desimal); data resep tidak berubah | Belum dijalankan | NOT TESTED | |
| REC-04 | Serving | Batas min/max porsi | Detail resep terbuka | Klik − sampai 1, + sampai 20 | Tombol disabled di batas; angka benar | Belum dijalankan | NOT TESTED | |
| REC-05 | Checklist | Pilih/batalkan bahan | Detail resep terbuka | Centang beberapa bahan, lalu batalkan | Hitungan "Bahan dipilih" & estimasi subtotal berubah | Belum dijalankan | NOT TESTED | |
| REC-06 | Cart integration | Tambah pilihan & semua bahan | Detail dengan produk tersedia | Klik "Tambah pilihan", lalu "Tambah semua yang tersedia" | Cart berisi produk yang benar; stok dipatuhi; unknown tidak masuk | User-reported: PASS (metadata not recorded) | PASS | Manual test reported by project owner; browser/version/date/viewport/screenshot: Not recorded |

## C. Cart & Wishlist

| ID | Feature | Test scenario | Preconditions | Test steps | Expected result | Actual result | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| CART-01 | Quantity | Tambah/kurangi quantity | Cart berisi produk | Klik + dan − | Qty & subtotal update; badge header sinkron | User-reported: PASS (metadata not recorded) | PASS | Manual test reported by project owner; browser/version/date/viewport/screenshot: Not recorded |
| CART-02 | Subtotal | Hitung beberapa produk | Cart berisi ≥2 produk | Bandingkan subtotal halaman dengan Σ harga×qty | Sama | User-reported: PASS (metadata not recorded) | PASS | Manual test reported by project owner; browser/version/date/viewport/screenshot: Not recorded |
| CART-03 | Remove | Hapus produk | Cart berisi produk | Klik Hapus | Item hilang; subtotal & badge update | User-reported: PASS (metadata not recorded) | PASS | Manual test reported by project owner; browser/version/date/viewport/screenshot: Not recorded |
| CART-04 | Wishlist | Tambah/hapus favorit | Profil test | Toggle favorite dua kali | Masuk lalu keluar wishlist; badge benar; tanpa duplikat | Belum dijalankan | NOT TESTED | Wishlist reported working by owner but exact test scenario not documented — requires detailed confirmation before PASS. |
| CART-05 | Move to cart | Pindahkan wishlist ke cart | Wishlist berisi produk tersedia | Klik "Pindahkan ke keranjang" | Produk masuk cart & keluar wishlist | Belum dijalankan | NOT TESTED | Wishlist reported working by owner but exact test scenario not documented — requires detailed confirmation before PASS. |
| CART-06 | Stock | Batasi quantity ke stok | Produk stok 8 (Brokoli) | Coba tambah > 8 | Qty clamp ke 8 + toast | Belum dijalankan | NOT TESTED | |
| CART-07 | Persistence | Refresh halaman | Cart & wishlist terisi | Refresh browser | Isi cart/wishlist tetap | User-reported: PASS (metadata not recorded) | PASS | Manual test reported by project owner; browser/version/date/viewport/screenshot: Not recorded |

## D. Checkout

| ID | Feature | Test scenario | Preconditions | Test steps | Expected result | Actual result | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| CHK-01 | Validation | Field wajib kosong | Cart valid, halaman checkout | Submit tanpa mengisi | Pesan validasi per field; tidak navigate | Belum dijalankan | NOT TESTED | Automated validation ada |
| CHK-02 | Phone | Nomor telepon invalid | Form terisi selain phone | Isi "12345", submit | Ditolak dengan pesan jelas | Belum dijalankan | NOT TESTED | Automated validation ada |
| CHK-03 | Postal | Kode pos invalid | Form terisi selain postal | Isi "12", submit | Ditolak (harus 5 digit) | Belum dijalankan | NOT TESTED | Automated validation ada |
| CHK-04 | Shipping | Reguler | Subtotal < Rp50.000 | Pilih Reguler | Ongkir Rp15.000 | Belum dijalankan | NOT TESTED | |
| CHK-05 | Shipping | Ekspres | Cart valid | Pilih Ekspres | Ongkir Rp30.000; total berubah | Belum dijalankan | NOT TESTED | |
| CHK-06 | Free shipping | Threshold Rp50.000 | Subtotal tepat Rp50.000 | Pilih Reguler | Ongkir Rp0; di bawah threshold Rp15.000 | Belum dijalankan | NOT TESTED | Automated threshold ada |
| CHK-07 | Promo | Kode FRESH10 | Cart valid | Masukkan FRESH10 | Diskon 10%, maks Rp20.000; kode salah ditolak | Belum dijalankan | NOT TESTED | Promo code reported working by owner but exact test scenario not documented — requires detailed confirmation before PASS. Automated discount ada |
| CHK-08 | Payment | Metode demo | Form Valid | Pilih QRIS/VA/EW/Card/COD | Status awal sesuai grup; tidak ada input kartu | Belum dijalankan | NOT TESTED | |
| CHK-09 | Total | Hitung grand total | Ongkir & promo aktif | Periksa ringkasan | Grand Total = Subtotal + Ongkir − Diskon, non-negatif | Belum dijalankan | NOT TESTED | Automated math ada |
| CHK-10 | Double submit | Klik berulang | Form valid | Klik "Buat Pesanan" 2× cepat | Satu order dibuat; loading state muncul | Belum dijalankan | NOT TESTED | Guard & idempotency ada |
| CHK-11 | Shipping | Metode Terjadwal | Cart valid | Pilih Terjadwal pada checkout | Ongkir Rp20.000; estimasi "Sesuai jadwal"; label demo. Tidak ada input tanggal/jendela nyata — jangan klaim penjadwalan tersedia | Belum dijalankan | NOT TESTED | Fitur jadwal belum diimplementasikan |
| CHK-12 | Payment | QRIS | Form valid | Pilih QRIS, buat pesanan | QRIS tampil di ringkasan; status awal `Pending Payment`; tanpa input kartu/PIN | Belum dijalankan | NOT TESTED | Payment reported working by owner but exact test scenario not documented — requires detailed confirmation before PASS. Simulasi demo |
| CHK-13 | Payment | Virtual Account | Form valid | Pilih Virtual Account, buat pesanan | VA tampil di ringkasan; status `Pending Payment`; tanpa kredensial | Belum dijalankan | NOT TESTED | Payment reported working by owner but exact test scenario not documented — requires detailed confirmation before PASS. Simulasi demo |
| CHK-14 | Payment | E-Wallet | Form valid | Pilih E-Wallet, buat pesanan | E-Wallet tampil di ringkasan; status `Pending Payment` | Belum dijalankan | NOT TESTED | Payment reported working by owner but exact test scenario not documented — requires detailed confirmation before PASS. Simulasi demo |
| CHK-15 | Payment | Kartu Kredit / Debit | Form valid | Pilih Kartu, buat pesanan | Kartu tampil di ringkasan; status `Pending Payment`; **tidak ada** field nomor kartu/CVV | Belum dijalankan | NOT TESTED | Payment reported working by owner but exact test scenario not documented — requires detailed confirmation before PASS. Simulasi demo |
| CHK-16 | Payment | COD | Form valid | Pilih COD, buat pesanan | COD tampil di ringkasan; status awal `Pending Confirmation` | Belum dijalankan | NOT TESTED | Payment reported working by owner but exact test scenario not documented — requires detailed confirmation before PASS. Simulasi demo |

## E. Order Integrity

| ID | Feature | Test scenario | Preconditions | Test steps | Expected result | Actual result | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| ORD-01 | Order | Pesanan produk valid | Cart valid | Buat pesanan | Order tersimpan; cart produk dipesan berkurang | Belum dijalankan | NOT TESTED | |
| ORD-02 | Integrity | Unknown product tetap ada | Cart 2 valid + 1 unknown | Checkout 2 valid | Unknown masih di cart | Belum dijalankan | NOT TESTED | Integration test 16/16 |
| ORD-03 | Integrity | Hanya produk dipesan dihapus | Cart beberapa produk | Checkout sebagian | Hanya yang dipesan dihapus | Belum dijalankan | NOT TESTED | Cleanup test 18/18 |
| ORD-04 | Wishlist | Wishlist tidak berubah | Wishlist terisi | Selesaikan checkout | Isi wishlist sama | Belum dijalankan | NOT TESTED | |
| ORD-05 | Failure | Gagal simpan order | Fault injection storage di profil uji (cara harus terverifikasi) | Buat pesanan | Cart utuh; error tampil; retry memungkinkan | Belum dijalankan | NOT TESTED | Jika tidak ada cara aman/terverifikasi → tandai BLOCKED; jangan ubah kode produksi |
| ORD-06 | Duplicate | Cegah order ganda | Form valid | Double click / ulang submit | Satu order per idempotency key | Belum dijalankan | NOT TESTED | |

## F. Confirmation & History

| ID | Feature | Test scenario | Preconditions | Test steps | Expected result | Actual result | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| CFH-01 | Confirmation | Halaman konfirmasi | Order baru dibuat | Periksa halaman | Order ID, tanggal, status, produk, alamat, bayar, total benar | Belum dijalankan | NOT TESTED | |
| CFH-02 | History | Daftar pesanan | Pernah checkout | Buka "Pesanan Saya" | Pesanan tampil dengan total & status | Belum dijalankan | NOT TESTED | |
| CFH-03 | Persistence | Refresh riwayat | Riwayat terisi | Refresh | Riwayat tetap ada | Belum dijalankan | NOT TESTED | |
| CFH-04 | Invalid ID | Order ID tidak ada | Buka URL dengan order salah | Muat halaman | Empty state "Pesanan tidak ditemukan" | Belum dijalankan | NOT TESTED | |
| CFH-05 | Detail | Lihat detail pesanan | Riwayat terisi | Buka detail | Snapshot produk (nama/harga/qty) sesuai saat beli | Belum dijalankan | NOT TESTED | |

## G. Responsive & Accessibility

| ID | Feature | Test scenario | Preconditions | Test steps | Expected result | Actual result | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| RES-01 | Responsive | 375 px | Chrome DevTools | Set width 375 | Tidak ada horizontal overflow | Belum dijalankan | NOT TESTED | |
| RES-02 | Responsive | 390 px | Chrome DevTools | Set width 390 | Layout & tombol tetap terpakai | Belum dijalankan | NOT TESTED | |
| RES-03 | Responsive | 768 px | Chrome DevTools | Set width 768 | Tablet layout tidak rusak | Belum dijalankan | NOT TESTED | |
| RES-04 | Responsive | 1280 px | Chrome DevTools | Set width 1280 | Desktop layout normal | Belum dijalankan | NOT TESTED | |
| RES-05 | Navigation | Mobile "Pesanan Saya" | Width < md | Buka nav kategori | Link Pesanan Saya terlihat & dapat diklik | Belum dijalankan | NOT TESTED | |
| RES-06 | Accessibility | Keyboard navigation | Halaman mana pun | Tab melalui kontrol | Semua kontrol dapat dicapai | Belum dijalankan | NOT TESTED | |
| RES-07 | Accessibility | Focus indicator | Halaman mana pun | Tab + perhatikan outline | Focus ring terlihat | Belum dijalankan | NOT TESTED | |
| RES-08 | Accessibility | Labels & pesan error | Form checkout | Submit invalid | Label & pesan error terbaca | Belum dijalankan | NOT TESTED | |

## Evidence Collection (wajib per test case yang dijalankan)
Setiap hasil harus mencatat:

| Field | Keterangan |
|---|---|
| Browser & versi | Mis. Chrome 131.0.xxxx / Edge 131.xxx / Safari HP |
| Tanggal pengujian | YYYY-MM-DD |
| Viewport | 375 / 390 / 768 / 1280 px atau "default desktop" |
| Actual result | Apa yang benar-benar terjadi (bukan harapan) |
| Status | PASS / FAIL / BLOCKED / NOT TESTED |
| Screenshot | Path file, mis. `evidence/5d/CHK-06-375.png` atau "tidak ada" |
| Bug notes | ID bug / deskripsi singkat, atau "tidak ada" |

Bedakan jelas:
- **Chrome/Edge DevTools responsive emulation** → catat sebagai emulasi, bukan uji HP.
- **HP fisik** → catat merek/model, versi browser, dan alamat LAN yang dipakai (`http://192.168.0.168:5173/` saat ini, verifikasi ulang).

Template salinan per case:

```
Test ID: ... | Browser/version: ... | Date: ... | Viewport: ...
Actual: ...
Status: PASS/FAIL/BLOCKED/NOT TESTED
Screenshot: ...
Bug notes: ...
```

## Ringkasan
- Total test case: **54** (48 awal + 6 ditambahkan: CHK-11–CHK-16)
- PASS: **6** (CAT-05, REC-06, CART-01, CART-02, CART-03, CART-07), FAIL: **0**, BLOCKED: **0**, NOT TESTED: **48**
- Automated test yang sudah ada (code-level) tidak mengubah status browser di atas.
- 6 test case PASS berdasarkan laporan manual dari project owner. Metadata browser/versi/tanggal/viewport/screenshot: **Not recorded**.
- 8 test case (CART-04, CART-05, CHK-07, CHK-12–CHK-16) ditandai NOT TESTED dengan catatan butuh konfirmasi detail karena fitur dilaporkan bekerja oleh owner namun skenario pengujian tidak terdokumentasi.
- Fase 5D.3.1 Account Navigation (11/11 halaman, desktop & mobile) terverifikasi terpisah dan tidak digabung ke dalam 54 test case di atas.

# FreshCart — Phase 5D.1 Test Data Preparation

Semua langkah di bawah **hanya boleh dilakukan di browser profile pengujian yang terpisah**. Jangan menyentuh profil utama, jangan menghapus localStorage pengguna, jangan memanggil `clearCart()` secara global, dan jangan mengubah data produk/resep.

## 1. Profil browser terpisah
- Chrome: `chrome.exe --user-data-dir="C:\Users\ASUS\AppData\Local\Temp\freshcart-test-profile"` (jalankan setelah menutup Chrome yang memakai profil itu).
- Edge: `msedge.exe --user-data-dir="C:\Users\ASUS\AppData\Local\Temp\freshcart-test-edge"` .
- Alternatif: Chrome Incognito, tetapi data hilang saat jendela ditutup — cocok untuk pengujian sekali pakai.
- Verifikasi di DevTools → Application → Local Storage bahwa key yang terlihat adalah milik profil uji.

## 2. Menyiapkan cart dengan satu produk valid
1. Buka `http://127.0.0.1:5173/pages/products.html` di profil uji.
2. Cari "Brokoli", klik **+ Keranjang** pada **Brokoli Hijau Organik Lembang**.
3. Buka `/pages/cart.html`: harus ada 1 baris, qty 1, harga Rp22.500, stok 8.

## 3. Cart dengan beberapa produk
Ulangi langkah di atas untuk:
- Daging Sapi Sirloin (id 212, Rp68.000, stok 20)
- Telur Ayam Negeri 10 Butir (id 223, Rp28.000, stok 100)
- Brokoli Hijau Organik Lembang (id 107, Rp22.500, stok 8)

Subtotal contoh: 68.000 + 28.000 + 22.500 = Rp118.500.

## 4. Cart dengan produk tidak dikenal (injeksi localStorage aman)
Diperlukan untuk ORD-02/ORD-03. Gunakan **hanya profil uji**:

1. DevTools → Application → Local Storage → `http://127.0.0.1:5173`.
2. Tambah/update key `freshcart-cart-v1` dengan JSON (contoh):

```json
[
  {"id":212,"name":"Daging Sapi Sirloin","image":"/images/products/daging-unggas/sirloin.jpg","price":68000,"quantity":2,"stock":20,"weight":"500 gram"},
  {"id":223,"name":"Telur Ayam Negeri 10 Butir","image":"/images/products/susu-telur/telur-ayam-negeri.jpg","price":28000,"quantity":1,"stock":100,"weight":"10 butir"},
  {"id":9999,"name":" Produk unknown (data uji)","image":null,"price":5000,"quantity":1,"stock":5,"weight":"1 pack"}
]
```

3. Refresh halaman cart. Produk id `9999` tetap tampil sebagai produk tidak dikenal; `cart-store` menyegarkan harga/nama produk yang dikenal dari katalog, tetapi tidak menghapus id unknown.
4. Setelah checkout dua produk valid, id `9999` harus masih ada.

## 5. Produk stok terbatas
Gunakan Brokoli id 107 (stok 8). Di cart, klik **+** sampai 8; klik sekali lagi → quantity harus tetap 8 dengan toast batas stok. Jangan mengubah stok di katalog.

## 6. Wishlist berisi produk
1. Di katalog, klik ikon hati pada untuk product card.
2. Buka `/pages/wishlist.html`: produk tampil dan tombol **Pindahkan ke keranjang** tersedia.
3. Injeksi alternatif (profil uji): key `freshcart-wishlist-v1` = `["212","223"]`.

## 7. Subtotal Rp50.000 dan di bawah threshold
- **Tepat Rp50.000**: Bayam Hijau Hidroponik Segar (Rp12.000) + Jeruk Medan Manis (Rp38.000) = Rp50.000. Di checkout dengan Reguler → ongkir Rp0.
- **Di bawah threshold**: Brokoli Hijau Organik Lembang (Rp22.500) + Kacang Hijau 1kg (Rp26.000) = Rp48.500. Reguler → ongkir Rp15.000.
- Catatan: nilai persis Rp49.999 **tidak dapat dibentuk** dari harga katalog karena semua harga kelipatan Rp500. Gunakan Rp48.500 sebagai "di bawah Rp50.000". Jangan mengarang harga produk.

## 8. Order untuk confirmation/history
Buat pesanan nyata di profil uji melalui checkout (form valid + COD atau QRIS). Setelah sukses, catat `orderId` dari URL konfirmasi. Data tersimpan di key `freshcart-orders-v1` sebagai array. Untuk menguji invalid order ID, buka `/pages/order-confirmation.html?order=FC-TIDAKADA`.

## 9. Skenario gagal simpan order (fault injection aman)
Tidak ada mekanisme fault injection di produksi dan **jangan menambahkannya**. Cara aman tanpa mengubah kode:
1. Di profil uji, buka DevTools → Application → Local Storage.
2. **Jangan bergantung pada menu browser yang belum diverifikasi** (misalnya opsi "Block site data" di DevTools). Keberadaan dan perilakunya harus dicek dulu di browser yang dipakai; jika tidak dipastikan, **jangan jalankan** prosedur ini.
3. Cara aman yang disetujui: gunakan storage yang sudah diisolasi di profil uji, lalu simpan order dengan sengaja gagal hanya jika Anda memiliki cara yang terverifikasi untuk membuat penulisan `localStorage` gagal di profil tersebut.
4. Isi form valid lalu klik Buat Pesanan → harus muncul pesan error dan cart tetap utuh.
5. Pulihkan kondisi storage sebelum melanjutkan test lain.

Jika tidak ada cara aman dan terverifikasi untuk memicu kegagalan penyimpanan melalui browser, tandai **ORD-05 = BLOCKED**. Jangan mengubah kode produksi untuk merusak storage. Integration test level service (16/16) tetap menjadi bukti automated, tetapi bukan pengganti pengujian UI.

## 10. Membersihkan profil uji
- Hanya profil uji yang boleh dihapus setelah sesi selesai.
- Jangan pernah menjalankan `clearCart()` dari console pada profil utama.
- Simpan screenshot bukti di `docs/evidence/5d/` (atau folder lokal lain) sebelum menghapus profil.

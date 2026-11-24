# FreshCart — Phase 5D.3: Account Navigation & Authentication Audit

**Project:** `D:\projectweb\FreshCart-HTML-First`  
**Frontend:** `D:\projectweb\FreshCart-HTML-First\frontend`  
**Tanggal audit:** 20 November 2026  
**Status:** Audit statis selesai — **tidak ada kode produksi yang diubah**  
**Cakupan:** Navigasi tombol Account, ketersediaan halaman Account/Auth, alur Guest Checkout, rancangan Account Center, dan ketergantungan FastAPI/PostgreSQL.

---

## Ringkasan Eksekutif

- **Tombol/entri Account di header saat ini sudah berupa tautan nyata**: `frontend/public/partials/header.html` berisi `<a ... data-account-entry href="/pages/account.html" aria-label="Akun Saya — Masuk atau Daftar">` dengan teks tamu yang jujur (“Akun Saya / Masuk atau Daftar”). Tidak ada teks “Member Gold / Halo, Sarah” pada entri Account header, dan tidak ditemukan handler JavaScript yang mencegah navigasi account.
- **Namun, karena keluhan pengguna adalah “saat tombol Account diklik, halaman Account tidak terbuka”, audit ini tidak bisa menganggap masalah selesai hanya dari markup.** Penyebab paling mungkin bersifat runtime/konteks (mis. header gagal dimuat, halaman dibuka sebagai `file://` sehingga path root-relatif `/pages/...` tidak menuju lokasi yang diharapkan, cache/build lama, atau gangguan klik pada viewport tertentu). Penyebab pasti perlu diverifikasi di browser; daftar verifikasi ada di bagian 1.4.
- **Halaman Account/Auth sudah tersedia sebagai placeholder**: `pages/account.html`, `pages/login.html`, `pages/register.html` ada di source dan termasuk input build Vite (`vite.config.js` memindai seluruh `pages/**/*.html`). `account.html` menjelaskan Account Center belum aktif dan Guest checkout tersedia; `login.html`/`register.html` masih kerangka tanpa form backend.
- **Tidak ada autentikasi/sesi nyata.** Tidak ada modul auth/session/user di frontend, backend FastAPI hanya memiliki `GET /health`, dan `database/init.sql` hanya membuat schema `freshcart`.
- **Guest-first flow sudah berfungsi sebagai simulasi frontend**: cart/wishlist/order disimpan di `localStorage`, checkout memvalidasi form tamu, membuat pesanan lokal, dan menghapus hanya item yang dipesan. Belum ada login saat checkout, merge cart guest→akun, klaim pesanan, atau relasi `user_id`.
- **Perbaikan minimal aman** (bila masalah navigasi masih terjadi): pastikan `initLayout()` selalu memuat header, pastikan entri Account selalu terlihat/dapat diklik di semua breakpoint, dan uji path di dev server (`vite`/`preview`) bukan `file://`. Jangan menambah autentikasi palsu atau tombol social login aktif.

---

## 1. Penyebab Tombol Account Tidak Membuka Halaman

### 1.1 Temuan kode saat ini (source of truth: `frontend/public/partials/header.html`)

Blok Account pada header bersama adalah tautan interaktif:

```html
<a aria-label="Akun Saya — Masuk atau Daftar"
   class="fc-header-action flex items-center gap-space-sm pl-space-xs pr-space-xs rounded-full hover:bg-surface-container-low transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
   data-account-entry
   href="/pages/account.html">
  <span aria-hidden="true" class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
    <span class="material-symbols-outlined text-body-md">person</span>
  </span>
  <span class="hidden xl:flex flex-col text-left leading-tight">
    <span class="text-label-caption font-label-caption text-on-surface-variant">Akun Saya</span>
    <span class="font-title-sm text-title-sm text-on-surface">Masuk atau Daftar</span>
  </span>
</a>
```

Fakta yang terkonfirmasi:
- **Elemen interaktif**: `<a>` dengan `href="/pages/account.html"` (bukan `<div>` dekoratif).
- **Aksesibilitas dasar ada**: `aria-label` deskriptif, fokus terlihat (`focus-visible:ring-*`).
- **State tamu jujur**: teks “Masuk atau Daftar”, tidak menampilkan nama/status member palsu.
- **Identifier**: `data-account-entry` tersedia untuk pengujian/wiring masa depan.
- **Tidak ada event handler khusus Account** di `frontend/src/js/shared/layout.js` (layout hanya mengurus injeksi partial, active nav, search, newsletter, cart badge, wishlist badge). Ini sesuai karena navigasi `<a>` native tidak memerlukan handler.
- **Tidak ditemukan `preventDefault`/override klik Account** pada source frontend non-`node_modules`/non-`dist` (hasil pencarian source).

### 1.2 Ketersediaan halaman tujuan

| Halaman | Source | Build config | Isi saat ini |
|---|---|---|---|
| Account | `frontend/pages/account.html` | Termasuk (`pages/**/*.html`) | Placeholder Account Center: Guest checkout tersedia, login/registrasi/sesi/social login belum tersedia; tautan ke login/register dan kembali belanja |
| Login | `frontend/pages/login.html` | Termasuk | Placeholder: “Form login belum terhubung ke backend.” |
| Register | `frontend/pages/register.html` | Termasuk | Placeholder: “Form pendaftaran belum terhubung ke backend.” |

`account.html` memuat header/footer via `#site-header`/`#site-footer` dan `src/entries/static.js` yang memanggil `initLayout()`.

### 1.3 Hipotesis penyebab “klik tidak membuka halaman” (berdasarkan bukti statis)

Karena markup tautan sudah benar, kemungkinan penyebab yang perlu diverifikasi di browser:

| Hipotesis | Bukti pendukung / indikator | Cara verifikasi |
|---|---|---|
| **Header gagal dimuat** | Semua halaman mengandalkan `injectPartial()` fetch ke `/partials/header.html` di `layout.js`; jika fetch gagal, header (termasuk Account) tidak muncul dan toast “Header/footer tidak dapat dimuat…” muncul. | Buka DevTools Console/Network; cek request `/partials/header.html` (200). Pastikan dijalankan via dev server/preview, bukan membuka file HTML langsung tanpa server. |
| **Konteks path `file://`** | `href` dan fetch partial memakai path root-relatif (`/pages/...`, `/partials/...`). Pada `file://`, root bisa berbeda dari folder project. | Jalankan `npm run dev` / `npm run preview` dari `frontend/` atau server statis yang men-serve root project frontend. |
| **Build/dist/cache lama** | `frontend/dist/` berisi artefak build; jika pengguna membuka dist lama, perilaku bisa berbeda dari source. | Pastikan membuka source via dev server atau rebuild; bandingkan header di source vs file yang benar-benar disajikan. |
| **Gangguan klik/overlay (viewport tertentu)** | Header fixed/sticky + panel pencarian mobile; CSS tidak menunjukkan `pointer-events:none` pada `.fc-header-action`, tetapi overlap elemen lain bisa menghalangi klik pada kondisi tertentu. | Uji klik kanan “Open link in new tab”, inspect element di titik klik, uji desktop/mobile. |
| **JavaScript error sebelum interaksi** | `layout.js` menangkap error injeksi, tetapi error module lain di halaman bisa memengaruhi pengalaman. | Cek Console saat load halaman terkait. |

**Catatan:** audit statis ini **tidak dapat membuktikan** bug runtime tanpa reproduksi browser. Namun audit statis **mengonfirmasi** bahwa entri Account di source saat ini bukan elemen non-interaktif dan memiliki tujuan yang valid.

### 1.4 Bukan penyebab (berdasarkan source)

| Dugaan | Fakta |
|---|---|
| Tidak ada halaman Account | **Tidak.** `account.html`, `login.html`, `register.html` ada. |
| Tidak ada route/link Account di header | **Tidak di source saat ini.** Header memiliki `<a href="/pages/account.html">`. |
| Tidak ada handler karena memang tidak perlu | **Benar.** Navigasi anchor native cukup; `layout.js` tidak perlu listener khusus. |
| Vite tidak membangun halaman account | **Tidak.** `findHtmlFiles(resolve(root,'pages'))` memasukkan semua HTML di `pages/`. |
| Cart/localStorage mencegah navigasi Account | **Tidak ada hubungan kode.** Store cart/wishlist/order independen dari navigasi. |

### 1.5 Kesimpulan root cause

- **Primary (code-level, kondisi saat ini):** entri Account pada header source **sudah memiliki target navigasi yang valid** (`/pages/account.html`). Jika masih tidak membuka halaman pada sesi pengguna, penyebabnya kemungkinan besar **konteks penyajian/runtime** (header tidak ter-render karena gagal fetch partial/path salah, cache/build lama, atau lingkungan `file://`) atau hambatan UI spesifik viewport — **perlu konfirmasi browser**.
- **Secondary (UX/arsitektur):** login/register/account masih placeholder tanpa auth backend; satu-satunya “pintu masuk” eksplisit selain header adalah link dari `account.html` ke login/register dan link “Pesanan Saya” (order history) di header, bukan Account Center penuh.
- **Tertiary:** belum ada state akun/sesi; header selalu menampilkan status tamu statis (benar secara kejujuran, tetapi belum dinamis).

---

## 2. File dan Komponen yang Berhubungan

| File | Peran | Temuan audit |
|---|---|---|
| `frontend/public/partials/header.html` | Header bersama, memuat entri Account | `<a data-account-entry href="/pages/account.html">`, aria-label, teks “Akun Saya / Masuk atau Daftar”; juga ada link “Pesanan Saya” ke `/pages/order-history.html` (bukan Account). |
| `frontend/src/js/shared/layout.js` | Injeksi header/footer dan wiring global | Fetch `/partials/header.html` & `/partials/footer.html`; active nav; search; cart/wishlist badge subscription. **Tidak ada wiring auth/account.** |
| `frontend/pages/account.html` | Halaman Account | Placeholder “Account Center sedang dipersiapkan”; Guest checkout dinyatakan tersedia; status fitur akun; link ke login/register/produk/order history. |
| `frontend/pages/login.html` | Halaman Login | Placeholder; tidak ada form aktif; `data-active-page=""`. |
| `frontend/pages/register.html` | Halaman Register | Placeholder; tidak ada form aktif; `data-active-page=""`. |
| `frontend/src/entries/static.js` | Entry halaman statis | Memuat CSS + `initLayout()`. |
| `frontend/vite.config.js` | MPA build | Input: `index.html` + semua `pages/**/*.html`. |
| `frontend/public/partials/footer.html` | Footer bersama | Tidak ada link Account/Login/Register. |
| `frontend/index.html` + `frontend/pages/*.html` (customer) | Halaman yang diaudit | Semua memakai `<div id="site-header" ...>` (header diinjeksi); tidak ditemukan kontrol Account tambahan di body halaman. |
| `frontend/pages/checkout.html` + `frontend/src/react/mounts/mount-checkout.jsx` | Checkout | Form tamu, tanpa login gate/pilihan akun; submit memanggil `placeOrder()` dan redirect ke konfirmasi. |
| `frontend/src/js/shared/cart-store.js` | Cart guest | `localStorage` key `freshcart-cart-v1`; refresh item dari katalog; batas stok; tidak ada user. |
| `frontend/src/js/shared/wishlist-store.js` | Wishlist guest | `localStorage` key `freshcart-wishlist-v1`; tidak ada user. |
| `frontend/src/js/shared/order-store.js` | Penyimpanan order lokal | `localStorage` key `freshcart-orders-v1`; `saveOrder()` + idempotency key; **tidak ada `user_id`**. |
| `frontend/src/js/shared/order-processing.js` | Pembuatan order | Validasi terhadap katalog, snapshot harga/stok/nama dari katalog, hitung total/promo/ongkir, simpan via `saveOrder()`. |
| `frontend/src/js/shared/checkout-validation.js` | Validasi checkout | Nama/telepon/alamat/kode pos wajib; email **opsional** tapi divalidasi jika diisi; format telepon Indonesia. |
| `frontend/src/js/shared/checkout-completion.js` | Setelah order tersimpan | Hapus **hanya** item yang ada di order dari cart. |
| `frontend/src/js/data/checkout-config.js` | Konfigurasi demo checkout | Metode kirim/bayar, promo demo, threshold gratis ongkir, label demo. |
| `frontend/pages/admin/*.html` | Admin placeholder | Menyatakan butuh autentikasi admin/API; belum ada implementasi. |
| `backend/app/main.py` | API starter | Hanya `GET /health` (`database is not connected yet`). |
| `backend/requirements.txt`, `backend/Dockerfile` | Backend scaffold | FastAPI/SQLAlchemy/psycopg deps ada, auth belum diimplementasikan. |
| `database/init.sql` | DB init | `CREATE SCHEMA IF NOT EXISTS freshcart;` saja. |
| `database/migrations/README.md`, `database/seeds/README.md` | Migrasi/seed | Placeholder. |

**Tidak ditemukan (source non-dist/non-node_modules):** komponen React Account/Login/Auth, store sesi/user, CSS khusus account/auth, endpoint auth, tabel users/sessions/orders/identities.

---

## 3. Audit Navigasi per Halaman (Task 1)

Halaman yang diperiksa: Homepage, Product Catalog, Recipe Library, Cart, Wishlist, Checkout, Order Confirmation, Order History.

| Halaman | File | Tombol/link/icon Account | href / tujuan | Event handler / route JS | Catatan |
|---|---|---|---|---|---|
| Homepage | `frontend/index.html` | Header (injected) | `/pages/account.html` | Native `<a>`; tidak ada handler khusus | “Member Gold” di section ulasan adalah teks konten (bukan kontrol akun). |
| Product Catalog | `frontend/pages/products.html` | Header (injected) | `/pages/account.html` | Native `<a>` | Tidak ada link account di sidebar/kartu produk. |
| Recipe Library | `frontend/pages/recipes.html` | Header (injected) | `/pages/account.html` | Native `<a>` | Tidak ada link account di konten resep. |
| Cart | `frontend/pages/cart.html` | Header (injected) | `/pages/account.html` | Native `<a>` | React cart root `#cart-root`; tidak ada CTA login. |
| Wishlist | `frontend/pages/wishlist.html` | Header (injected) | `/pages/account.html` | Native `<a>` | React wishlist root `#wishlist-root`. |
| Checkout | `frontend/pages/checkout.html` | Header (injected) | `/pages/account.html` | Native `<a>` | React checkout root `#checkout-root`; tidak ada opsi login/guest account. |
| Order Confirmation | `frontend/pages/order-confirmation.html` | Header (injected) | `/pages/account.html` | Native `<a>` | Data order dari localStorage. |
| Order History | `frontend/pages/order-history.html` | Header (injected) | `/pages/account.html` | Native `<a>` | Juga ada link “Pesanan Saya” di header ke halaman ini (bukan Account). |

**Elemen terkait lain di header (bukan Account):** top bar “Pesanan Saya” → `/pages/order-history.html`; nav kategori “Pesanan Saya” → `/pages/order-history.html`; wishlist/cart icons → halaman masing-masing.

---

## 4. Halaman Account yang Sudah Tersedia (Task 2)

| Halaman/komponen | Status | Lokasi/bukti |
|---|---|---|
| Account page | **Ada (placeholder)** | `frontend/pages/account.html` — Account Center belum aktif, Guest checkout tersedia, status fitur, link ke login/register/order history/products. |
| Login page | **Ada (placeholder)** | `frontend/pages/login.html` — “Form login belum terhubung ke backend.” |
| Register / Sign Up page | **Ada (placeholder)** | `frontend/pages/register.html` — “Form pendaftaran belum terhubung ke backend.” |
| Customer Profile page | **Belum ada** | Tidak ditemukan file/route profil pelanggan. |
| Authentication component (React/module) | **Belum ada** | Tidak ditemukan komponen/hook/store auth. |
| Account-related CSS | **Belum ada khusus** | Tidak ditemukan stylesheet khusus account/auth; styling memakai utilitas/komponen umum. |
| Account-related JavaScript | **Belum ada khusus** | Hanya wiring layout umum; tidak ada logika sesi/profil. |

**Keterjangkauan dari UI:** header memiliki link ke Account; `account.html` memiliki link ke login/register. Login/register tidak memiliki link silang eksplisit antar satu sama lain (hanya breadcrumb ke beranda) — dapat dipertimbangkan sebagai perbaikan UX minimal nanti, bukan bug navigasi header.

---

## 5. Fitur Autentikasi yang Sudah Tersedia (Task 2 & 3)

| Fitur | Status | Bukti |
|---|---|---|
| Login email/password | **Tidak tersedia** | `login.html` placeholder, tanpa backend/auth. |
| Registrasi | **Tidak tersedia** | `register.html` placeholder. |
| Session/cookie/token | **Tidak tersedia** | Tidak ada kode sesi di frontend/backend. |
| User/customer profile | **Tidak tersedia** | Tidak ada halaman/model/profil. |
| Social login (Google/Facebook/X/Discord/Apple/Microsoft) | **Tidak tersedia** | Tidak ada integrasi/provider config/callback. |
| Two-Factor Authentication / MFA | **Tidak tersedia** | Tidak ada TOTP/WebAuthn/recovery/OTP. |
| Linked accounts / account security | **Tidak tersedia** | Tidak ada modul terkait. |
| Logout / manajemen sesi | **Tidak tersedia** | Tidak ada sesi. |

**Kesimpulan:** belum ada autentikasi fungsional. Placeholder yang ada sudah menyatakan status “belum tersedia/belum terhubung ke backend” (sesuai aturan tidak membuat klaim palsu).

---

## 6. Alur Guest Checkout Saat Ini (Task 3)

### 6.1 Sudah tersedia (demo frontend, guest-first)

| Aspek | Status | Bukti implementasi |
|---|---|---|
| Guest shopping (tanpa login) | **Tersedia** | Seluruh halaman customer dapat diakses tanpa gate auth. |
| Guest cart | **Tersedia** | `cart-store.js`: key `freshcart-cart-v1`, add/update/remove/clear, sinkron badge header, batas stok katalog. |
| Guest wishlist | **Tersedia** | `wishlist-store.js`: key `freshcart-wishlist-v1`. |
| Guest checkout | **Tersedia (simulasi)** | `mount-checkout.jsx`: form pelanggan + alamat + pengiriman + pembayaran demo; validasi `checkout-validation.js`; submit ke `placeOrder()`. |
| Penyimpanan pesanan lokal | **Tersedia (demo)** | `order-store.js`: key `freshcart-orders-v1`, `saveOrder`, idempotency; `order-processing.js` membuat snapshot dari katalog dan menyimpan order. |
| Konfirmasi & riwayat pesanan lokal | **Tersedia (demo)** | `order-confirmation.html`/`order-history.html` + mount terkait membaca data lokal (sesuai arsitektur). |
| Perlakuan cart setelah order | **Tersedia** | `checkout-completion.js`: hapus hanya item yang benar-benar dipesan (`removedIds` unik). |

**Detail alur checkout aktual:**
1. User mengisi data tamu: nama, telepon, **email opsional**, provinsi/kota/kecamatan/alamat/kode pos/catatan.
2. Pilih metode pengiriman & pembayaran (konfigurasi demo dari `checkout-config.js`), opsional promo demo.
3. `getPurchasableItems()`/`validateItems()` memfilter & memvalidasi item terhadap katalog aktif (harga/nama/stok/identity diambil dari katalog, bukan payload UI).
4. `buildOrder()` menghitung subtotal, ongkir efektif, diskon aman, grand total; status pembayaran/order bersifat simulasi.
5. `saveOrder()` menyimpan ke localStorage (dengan idempotency key). Jika gagal, cart **tidak** dihapus.
6. Jika sukses, `finalizeCheckoutAfterOrder()` menghapus hanya item terorder lalu redirect ke `/pages/order-confirmation.html?order=...`.

### 6.2 Belum tersedia / direncanakan

| Aspek | Status | Catatan |
|---|---|---|
| Login saat checkout | **Belum** | Tidak ada pilihan “Masuk / Daftar / Lanjut sebagai Tamu” di checkout. |
| Pemindahan/merge cart Guest ke akun | **Belum** | Tidak ada akun/server cart; cart hanya lokal. |
| Hubungan pesanan dengan user account | **Belum** | Order lokal tidak memiliki `user_id`/kepemilikan akun. |
| Klaim pesanan guest ke akun | **Belum** | Tidak ada mekanisme verifikasi/klaim. |
| Order server-side / lintas perangkat | **Belum** | Backend/DB belum terhubung untuk order. |
| Prefill alamat/profil dari akun | **Belum** | Tidak ada profil/alamat akun. |

**Pemisahan tegas:** guest shopping/cart/checkout/order history lokal = **sudah ada (demo)**. Integrasi identitas akun = **belum ada**.

---

## 7. Rancangan Arsitektur Account Center (Task 4)

> **Rancangan saja (belum implementasi).** Semua tombol/provider hanya boleh aktif jika benar-benar terintegrasi dan diverifikasi backend.

### 7.1 Prinsip
- **Guest-first, account-optional:** belanja, cart, dan checkout tetap bisa tanpa akun.
- **HTML First + Selective React:** shell halaman tetap HTML; form interaktif kompleks dapat menjadi React island pada root eksplisit (mis. `#account-root`, `#auth-root`, `#profile-root`, `#security-root`) tanpa vanilla JS memutasi DOM di dalam root React.
- **Satu Account Center:** entry tunggal untuk login/register, profil, pesanan akun, keamanan, dan linked accounts.
- **Server-side trust:** identitas, sesi, token OAuth, harga/stok/order final harus divalidasi backend.
- **Kejujuran UI:** jangan tampilkan identitas/sesi/provider/MFA aktif palsu.

### 7.2 Struktur fitur target

| Area | Komponen/halaman target | Catatan |
|---|---|---|
| Account Center | `/pages/account.html` (dashboard tamu/terautentikasi) | Guest: CTA login/register/continue as guest; Auth: ringkasan profil, pesanan, keamanan. |
| Login | `/pages/login.html` | Email/password + opsi provider aktif saja + link “Lanjut sebagai tamu”. |
| Sign Up | `/pages/register.html` | Registrasi email/password + verifikasi email; opsi provider aktif saja. |
| Continue as Guest | CTA di Account/Login/Checkout | Tidak membuat sesi; mempertahankan cart lokal; jelas bahwa riwayat hanya lokal sampai login/klaim (jika didukung). |
| Social Login | Google, Facebook, X, Discord, Apple, Microsoft | Tiap provider: OAuth/OIDC flow via backend, state/PKCE, callback server, verifikasi token, linking ke user. Tampilkan tombol **hanya** jika konfigurasi aktif. |
| Two-Factor Authentication | TOTP app, passkey/WebAuthn (disarankan), recovery codes | Enrollment/challenge/backup codes; step-up auth untuk aksi sensitif. |
| Customer Profile | `/pages/account/profile.html` (atau section) | Nama, telepon, email, preferensi; sumber kebenaran server. |
| Linked Accounts | `/pages/account/linked-accounts.html` (atau section) | Hubungkan/lepas provider; cegah orphan account. |
| Account Security | `/pages/account/security.html` | Password, MFA, sesi aktif/perangkat, riwayat login, revoke session. |

### 7.3 Alur target: Guest → Checkout → Auth

1. **Default:** user belanja sebagai Guest (cart local).
2. **Checkout:** tampilkan pilihan `Masuk`, `Daftar`, atau `Lanjut sebagai Tamu`.
3. **Jika login/signup saat checkout:** simpan intent checkout, autentikasi, **merge cart guest ke cart akun** (dedupe by product, aturan stok/qty jelas, konflik ditangani eksplisit), lalu kembali ke checkout dengan data terisi yang valid.
4. **Jika lanjut guest:** order dibuat dengan kontak tamu; `user_id` null di server.
5. **Post-purchase claim (opsional, fase lanjut):** jika email guest cocok/terverifikasi, tawarkan kaitkan pesanan ke akun tanpa menghapus data lokal secara diam-diam.

### 7.4 Batasan keamanan & kepatuhan implementasi (wajib saat fase auth)

- Tidak menyimpan token sensitif di localStorage; gunakan cookie HttpOnly/Secure/SameSite sesuai desain.
- CSRF protection untuk flow berbasis cookie, rate limiting, audit log auth, verifikasi email/password reset token.
- Provider OAuth: validasi `state`/`nonce`/PKCE, verifikasi issuer/audience/signature, simpan hanya data identitas minimum.
- MFA: recovery codes sekali pakai, kebijakan re-auth untuk disable MFA/ubah email/password.
- Tidak mengaktifkan UI social login tanpa kredensial, callback, dan pengujian end-to-end.

---

## 8. Rekomendasi Perbaikan Minimal (Task 5)

> **Tahap implementasi berikutnya (belum dilakukan pada audit ini).** Prioritas: pulihkan/validasi navigasi dan kejujuran state tanpa auth palsu.

1. **Verifikasi reproduksi browser (wajib sebelum ubah kode):** buka via dev server, cek Network untuk `/partials/header.html`, klik kiri/kanan “open in new tab” pada `[data-account-entry]`, uji semua halaman yang diaudit dan breakpoint mobile/desktop.
2. **Jika header tidak ter-render pada konteks tertentu:** pastikan penyajian melalui server yang benar; pertahankan fallback yang aman (mis. pesan error layout sudah ada) dan dokumentasikan cara run. Jangan ubah arsitektur.
3. **Jika ada hambatan klik spesifik:** investigasi CSS/layout overlap pada elemen yang menghalangi area klik account (tanpa redesign). Pastikan target sentuh memadai.
4. **Hardening UX minimal (opsional, kecil):** pada `login.html`/`register.html` tambahkan link silang dan link kembali ke `account.html`; set `data-active-page` yang sesuai bila diperlukan untuk konsistensi. Tetap placeholder tanpa form/provider aktif.
5. **Tolak anti-pattern:** jangan tambah fake login, fake session, fake “Sarah/Member”, atau tombol Google/Facebook/X/Discord/Apple/Microsoft yang terlihat aktif tanpa integrasi.
6. **Siapkan fase 6A+:** Account Center shell guest/auth state (dinamis setelah `/auth/session` tersedia), lalu backend auth (fase 7) sebelum provider/MFA.

---

## 9. Ketergantungan pada FastAPI dan PostgreSQL (Task 5)

| Kebutuhan | Ketergantungan backend/DB | Status saat ini |
|---|---|---|
| Navigasi ke `account.html` | **Tidak ada** (HTML/link/static serving) | Dapat berfungsi dengan frontend saja jika disajikan benar. |
| Login/register/session nyata | **FastAPI + PostgreSQL wajib** | Belum ada: endpoint auth, user table, session/token, password hashing. |
| Customer profile & addresses | **DB + API** | Belum ada skema/model/endpoint. |
| Social login (6 provider) | **FastAPI + DB + provider app config/HTTPS callback** | Belum ada OAuth client config, callback routes, identity linking table. |
| 2FA/MFA & account security | **FastAPI + DB (+ crypto/WebAuthn libs)** | Belum ada MFA secrets/devices/recovery/session management. |
| Cart/order server-side, merge guest→akun, relasi order-user | **FastAPI + DB** | Cart/order saat ini hanya localStorage demo; `orders` butuh `user_id` nullable, item snapshot, status. |
| Klaim pesanan guest | **FastAPI + DB + verifikasi kontak** | Belum ada. |

**Kondisi terkonfirmasi:**
- `backend/app/main.py`: hanya health check, tanpa DB connection.
- `database/init.sql`: hanya `CREATE SCHEMA IF NOT EXISTS freshcart;` (belum ada tabel aplikasi).
- Migrasi/seeds: README placeholder.
- Dibutuhkan perancangan skema (`users`, `customer_profiles`, `auth_identities`, `sessions`, `mfa_methods`, `recovery_codes`, `orders`, `order_items`, `addresses`, dll.), migrasi, dan kontrak API sebelum implementasi auth/akun fungsional.

---

## 10. Output Audit — File Terkait, Root Cause, dan Rekomendasi Tahap Implementasi

### 10.1 Daftar file terkait (utama)

- Navigasi/header: `frontend/public/partials/header.html`, `frontend/public/partials/footer.html`, `frontend/src/js/shared/layout.js`
- Halaman account/auth: `frontend/pages/account.html`, `frontend/pages/login.html`, `frontend/pages/register.html`, `frontend/src/entries/static.js`
- Halaman customer diaudit: `frontend/index.html`, `frontend/pages/products.html`, `frontend/pages/recipes.html`, `frontend/pages/cart.html`, `frontend/pages/wishlist.html`, `frontend/pages/checkout.html`, `frontend/pages/order-confirmation.html`, `frontend/pages/order-history.html`
- Guest cart/wishlist/order/checkout: `frontend/src/js/shared/cart-store.js`, `frontend/src/js/shared/wishlist-store.js`, `frontend/src/js/shared/order-store.js`, `frontend/src/js/shared/order-processing.js`, `frontend/src/js/shared/checkout-validation.js`, `frontend/src/js/shared/checkout-completion.js`, `frontend/src/js/data/checkout-config.js`, `frontend/src/react/mounts/mount-checkout.jsx` (dan entry terkait)
- Build: `frontend/vite.config.js`
- Backend/DB scaffold: `backend/app/main.py`, `backend/requirements.txt`, `backend/Dockerfile`, `database/init.sql`, `database/migrations/README.md`, `database/seeds/README.md`
- Arsitektur/docs: `docs/architecture.md`, `docs/account-authentication-audit.md` (dokumen ini)

### 10.2 Root cause (ringkas)

- **Source saat ini:** entri Account di header **sudah tertaut benar** ke `/pages/account.html` dengan label aksesibel dan state tamu jujur.
- **Jika masalah “tidak membuka halaman” masih terjadi:** paling mungkin **runtime/konteks penyajian** (header partial tidak termuat, path root-relatif saat `file://`/server salah, cache/dist lama, atau hambatan UI/JS spesifik) — **belum terkonfirmasi tanpa reproduksi browser**. Tidak ada bukti statis preventDefault/elemen non-interaktif pada entri Account.
- **Gap sistemik:** auth/account nyata belum ada (placeholder saja), sehingga Account Center fungsional, login/register, social login, MFA, dan keterkaitan order-akun masih belum tersedia.

### 10.3 Rekomendasi tahap implementasi

| Tahap | Fokus | Prasyarat / catatan |
|---|---|---|
| **5D.3 (stabilisasi navigasi)** | Reproduksi browser, pastikan header selalu ter-load, verifikasi klik Account di semua halaman/breakpoint, perbaiki isu path/serving/overlay bila terbukti. | Tanpa redesign, tanpa auth palsu, tanpa ubah cart/order/produk/harga/stok/localStorage. |
| **6A (Account Center UI guest-first)** | Perkuat `account.html`/`login.html`/`register.html` sebagai kerangka jujur (CTA guest, tanpa provider aktif), struktur React island bila perlu. | Belum klaim integrasi auth. |
| **7 (Auth core + DB)** | FastAPI auth, PostgreSQL schema/migrasi, sesi aman, profil dasar, order model server-side. | Fondasi wajib sebelum login nyata & relasi user-order. |
| **8A/8B (Social login & security)** | Provider OAuth/OIDC bertahap (aktif hanya saat siap), linking, MFA, recovery, audit. | Verifikasi token server-side, HTTPS callback, pengujian keamanan. |
| **9 (Hardening & deploy)** | Observability, rate limiting, kebijakan produksi, backup/migrasi data lokal bila relevan. | Setelah fitur stabil dan diverifikasi. |

---

*Audit ini bersifat dokumentasi dan analisis statis. Tidak ada perubahan pada kode produksi, data produk/harga/stok/pesanan, cart, wishlist, localStorage, dan tidak ada klaim fitur autentikasi yang belum diimplementasikan.*
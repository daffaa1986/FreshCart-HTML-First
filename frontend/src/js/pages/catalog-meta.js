/* Phase 5A.1 — Category-aware metadata for the products page.
   Reads ?category=, ?promo= and ?organic= and updates breadcrumb,
   banner title/description, badge and document.title. */

const CATEGORY_META = {
  sayur: {
    title: 'Sayur Segar & Organik Pilihan',
    breadcrumb: 'Sayur Segar Organik',
    badge: 'Panen Pagi Ini (05:00 WIB)',
    description: 'Sayuran hijau dan umbi-umbian dipanen langsung setiap subuh dari mitra petani lokal Lembang & Ciwidey untuk jaminan kesegaran maksimal.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDus9HIkUkbImwsX-Z_MgvsPoMgSGpxxNc1aucfIAurNtZXfrGoOZRUAa0i8dvGNc26271E9I5j3TGjv_Bwq9fAye1njX00tp9ux6IkatKu4gDrTraElgtcUih05P9XQOdmqMCFuEJ3Q3bzNWh1SZfBcEw_Edlh0R-yDO8RavzjDktHZkvOwMRyaIsUWhV61YcoJZcloS-B98c3TP-G0cVOhz6ZGaY6-8sssMWnA6_1pi3Hp2WZq2-_Ww',
    imageAlt: 'Komposisi hasil bumi segar pilihan FreshCart',
  },
  buah: {
    title: 'Buah Segar Pilihan',
    breadcrumb: 'Buah Segar',
    badge: 'Panen Pagi Ini (05:00 WIB)',
    description: 'Buah-buahan segar pilihan dari mitra tani lokal yang terverifikasi mutu dan kesegarannya.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ570ux6O7QZxYIpPjooFICrH3_uFOu-LyTEy1aIBKhFyjWYEjYaLrgB-ceQZkm4EQIXQWhKg3KkNFiyiHycEIks2RAkM-UfrRRknxFmUoLBXXjvX7Cgy6w-kqsEC1gT5bMPb7G0a4JpsqoQAP7-u-6brXOPmWKUk0FI2miLo0xOCypHymGNFJ0SOm2sECOR7JTDhOBOYxlSD81ZKhh1aBNQk6RrGaAPIsgtR7rsBNAWNKxK-6NQHtVg',
    imageAlt: 'Buah-buahan segar pilihan seperti alpukat, pepaya dan apel',
  },
  daging: {
    title: 'Daging & Unggas',
    breadcrumb: 'Daging & Unggas',
    badge: 'Rantai Dingin Terjaga',
    description: 'Daging sapi, ayam dan unggas segar, diproses higienis dan diantar dalam rantai dingin terjaga.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlr1a2oPosaXE0b0kTKsoEA7IJDEj0bBHQkJJrO_t4XxTZHj5N_eLr3PeLx0zsAB_OTl2wMAcQiMrOq0TUXal5kkrbNL9z-QvghzvLFKiAvoxLaCq42qlHFElFtChJQM5Ncqx41osEhN9pPHDVgUkL49C6eZezOhsfodCpgyrq5ihuQ0e6fbZVhGIxKPwmUM3bvaib3h-SHElHjl3SDmiTT-tenWUwOhERMOq8ARgSBaIFyMMGW-9sLg',
    imageAlt: 'Potongan daging sapi dan ayam segar pilihan',
  },
  susu: {
    title: 'Susu & Telur',
    breadcrumb: 'Susu & Telur',
    badge: 'Selalu Segar',
    description: 'Susu murni dan telur omega dari peternakan rekanan terpercaya, tersedia setiap hari.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX1kTP3ImekyaQBVhoF58w9XVzoMM-yXtJtPoA3VmzN7KoFAbXq-yj2coaO_nRpQPDQnbsOs1ThlmaD_wVQ1DwQ_BW7Wiw_YE7wPdB2uwtPCsplBUMk4tGoISgdeQgAsdaKQTGbZaTl5O5rV4JCyq82NQESfx9hyp714iZv9YqsvNrv1HPu9KzQHpxGqONXmDUr2ogoSeF2iAh-hL7ue_nhnQptcQOjAE9s4iHDMyFx59DGvE29SyRqQ',
    imageAlt: 'Telur omega-3 dan botol susu segar di atas meja',
  },
  sembako: {
    title: 'Kebutuhan Sembako',
    breadcrumb: 'Sembako',
    badge: 'Ready Setiap Hari',
    description: 'Beras, minyak goreng, gula dan kebutuhan pokok harian lainnya dengan harga terbaik.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBen3gR_NWaFwvnfFmEDyodJorJitsoAusAx0qiIccinZZyEh84ctrcyY00krkChY4j0JrBTA4BOa6HFYnncxIAk5okWM8Tn19Mkel7VboqJgpfdmPctenxSDB15sDesFuzWEqHtRjzS72ifhr0zYqgCMQZIeVdYMnGEQb_VePDSDBxAuahdw6Nrch3zLRr2FYCUHuNo-52qT817W3mbYeZq-C5XHWd96iyZuZ5LYTk85cplD7BqxsmPg',
    imageAlt: 'Beras aromatik dan botol minyak goreng dalam mangkuk kayu',
  },
  minuman: {
    title: 'Minuman',
    breadcrumb: 'Minuman',
    badge: 'Sehat & Segar',
    description: 'Minuman sehat, jus dan kebutuhan hidrasi harian keluarga Anda.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_jnRy4_k8Zx-UP1_UvRck2qMQTTtCO6kdDmGbVfS_-KvSZsbuLRMMDTFhrgg-yhV5-7ji9ZilVbhNfmD519SPhRxqIaWakKA6k9Fs6Pbalm-3HrTgKKKAXh_fACyJrUneifY4W7iHx8PWlvweq4grD1VTpD74hqwnIiEDW08YH13D9pYcnwEYx5g7yFUmjm0Dyx6ZrfMtF2pe2v9MLFLGY1C2mUw1kSSBaf4viX4sD7cb_J1XWP6b2w',
    imageAlt: 'Botol jus perasan dingin alami berbagai rasa',
  },
  bumbu: {
    title: 'Bumbu Dapur',
    breadcrumb: 'Bumbu Dapur',
    badge: 'Racik Dapur Sehat',
    description: 'Bawang, cabai, rempah dan bumbu dapur segar pilihan untuk masakan keluarga.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBri1UC5zLoWAbsMIAPKGelO7CFNaFeIITf-shUOVcVFqUDlNJVBppbpSUhJ8bjHzAK8o3BdueBorF1Nfpgi_HVrGwmfLtS2t4LTVXZAmCWoS-99u9uyQyhzB74MhS0v8ayFV51Wne1N-v2mofMl_Tc4d3OgkYfSDEi_AOwPJtuJ9Nj0xaCijkpyNBP2KzaNW36Zx8E5nkrynAWKbJ-LI_y8-F68K3crmspn9c2XKbTVHmBHVXd_NDI2w',
    imageAlt: 'Bawang merah, bawang putih, cabai dan rempah dapur Indonesia',
  },
  beku: {
    title: 'Produk Beku',
    breadcrumb: 'Produk Beku',
    badge: 'Frozen Terjaga',
    description: 'Makanan beku dan produk frozen berkualitas dengan penyimpanan suhu terjaga.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1AC197FVOBQpBYZrXsC1OUTrVUkED_jHLLGZQbEMCpVLTcFidE8UwFlKfq67e6WQSkXJlzq9eMwFrtzYKSsMfj6VjhizoUuiAlXlf7kxYW8NHH-7UYJVHHmJVY4FWRXpo-XabL_jgAbK55QGCaN5ezrz-40ObnTj7Mk1NYAr_0h5F9ifGjONuU1fMfuERLagNASEbFRrLoVZAB5tSPmHdBS0flJ9IRM_laWgVfiziPXBMY_4Ddgf6BQ',
    imageAlt: 'Edamame beku dan dim sum rapi di atas nampan',
  },
  'hasil-laut': {
    title: 'Hasil Laut Segar',
    breadcrumb: 'Hasil Laut',
    badge: 'Tangkap Hari Ini',
    description: 'Salmon, tuna, kakap, nila, bandeng, udang, cumi dan kerang segar pilihan.',
    image: '/images/products/hasil-laut/hero-hasil-laut.svg',
    imageAlt: 'Ilustrasi ikan segar FreshCart',
  },
};

export function initCatalogMeta() {
  const params = new URLSearchParams(window.location.search);
  const promo = params.get('promo') === 'true';
  const category = (params.get('category') || 'sayur').toLowerCase();
  const organic = params.get('organic') === 'true';

  let meta = CATEGORY_META[category];
  if (promo) {
    meta = {
      title: 'Promo Spesial FreshCart',
      breadcrumb: 'Promo Spesial',
      badge: 'Promo Hari Ini',
      description: 'Produk yang sedang diskon dan penawaran spesial hari ini.',
    };
  } else if (!meta) {
    meta = {
      title: 'Katalog Produk FreshCart',
      breadcrumb: 'Semua Produk',
      badge: 'Pilihan FreshCart',
      description: 'Jelajahi produk segar pilihan FreshCart.',
    };
  } else if (organic && category === 'sayur') {
    meta = { ...meta, description: 'Sayuran organik pilihan dipanen tanpa residu pestisida berbahaya, langsung dari mitra tani lokal.' };
  }

  const set = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  set('catalog-title', meta.title);
  set('catalog-description', meta.description);
  set('catalog-breadcrumb', meta.breadcrumb);
  set('catalog-badge', meta.badge);
  const heroImg = document.getElementById('catalog-hero-image');
  if (heroImg && meta.image) {
    heroImg.src = meta.image;
    heroImg.alt = meta.imageAlt;
    heroImg.style.display = '';
  }
  document.title = `${meta.title} | FreshCart`;
}

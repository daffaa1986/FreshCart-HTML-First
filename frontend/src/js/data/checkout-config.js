// FreshCart — Checkout configuration (Phase 5C).
// Semua tarif, estimasi dan promo di bawah adalah DATA DEMONSTRASI.
// Belum ada tarif operator logistik, payment gateway, atau backend yang terhubung.

export const DEMO_NOTICE = 'Data tarif, estimasi, promo dan pembayaran pada halaman ini adalah simulasi frontend. Tidak ada transaksi nyata yang diproses.';

// Aturan promo demo terpisah dari tarif dan estimasi pengiriman.
// Threshold dihitung dari subtotal SEBELUM diskon, hanya untuk pengiriman Reguler.
export const FREE_SHIPPING = {
  threshold: 50000,
  shippingMethodId: 'regular',
  basis: 'subtotal_before_discount',
  demo: true
};

export const SHIPPING_METHODS = [
  { id: 'regular', label: 'Reguler', description: 'Pengiriman standar 2–3 hari kerja', fee: 15000, eta: '2–3 hari kerja', demo: true },
  { id: 'express', label: 'Ekspres', description: 'Prioritas tiba dalam 1 hari kerja', fee: 30000, eta: '1 hari kerja', demo: true },
  { id: 'scheduled', label: 'Terjadwal', description: 'Pilih jendela pengiriman saat kurir menghubungi', fee: 20000, eta: 'Sesuai jadwal', demo: true }
];

export const PAYMENT_METHODS = [
  { id: 'qris', label: 'QRIS', group: 'online', description: 'Simulasi pembayaran QRIS', paymentStatus: 'Pending Payment', demo: true },
  { id: 'va', label: 'Virtual Account', group: 'online', description: 'Simulasi transfer bank / virtual account', paymentStatus: 'Pending Payment', demo: true },
  { id: 'ewallet', label: 'E-Wallet', group: 'online', description: 'Simulasi dompet digital', paymentStatus: 'Pending Payment', demo: true },
  { id: 'card', label: 'Kartu Kredit / Debit', group: 'online', description: 'Simulasi kartu — nomor kartu tidak dikumpulkan', paymentStatus: 'Pending Payment', demo: true },
  { id: 'cod', label: 'Bayar di Tempat (COD)', group: 'cod', description: 'Bayar saat pesanan diterima', paymentStatus: 'Pending Confirmation', demo: true }
];

// Promo demo: diketik pengguna pada halaman checkout. Tidak ada promo otomatis.
export const DEMO_PROMO = {
  code: 'FRESH10',
  label: 'Diskon 10% (maks. Rp20.000) — kode demo',
  type: 'percent',
  value: 10,
  maxDiscount: 20000,
  demo: true
};

export const DEFAULT_SHIPPING_ID = 'regular';
export const DEFAULT_PAYMENT_ID = 'qris';

export function getShippingMethod(id) {
  return SHIPPING_METHODS.find((m) => m.id === id) || null;
}

export function getPaymentMethod(id) {
  return PAYMENT_METHODS.find((m) => m.id === id) || null;
}

/** Integer Rupiah discount from an optional demo promo code. */
export function calculateDiscount(subtotal, promoCode) {
  const code = String(promoCode || '').trim().toUpperCase();
  if (!code || code !== DEMO_PROMO.code) return 0;
  const raw = Math.floor((Number(subtotal) || 0) * DEMO_PROMO.value / 100);
  return Math.min(raw, DEMO_PROMO.maxDiscount);
}

/** Effective shipping fee after the demo free-shipping threshold. */
export function getEffectiveShippingFee(subtotal, shippingId) {
  const shipping = getShippingMethod(shippingId);
  if (!shipping) return 0;
  if (shipping.id === FREE_SHIPPING.shippingMethodId && (Number(subtotal) || 0) >= FREE_SHIPPING.threshold) return 0;
  return Number(shipping.fee) || 0;
}

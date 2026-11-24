// FreshCart — Order calculation & placement (Phase 5C / hardening 5C.1).
// All product identity, price and stock are resolved from the active catalog;
// values coming from the UI (price, name, image, quantity) are never trusted.
// This module does not touch the cart — the caller removes only purchased items
// after saveOrder reports success.

import {
  calculateDiscount, getEffectiveShippingFee, getPaymentMethod, getShippingMethod
} from '../data/checkout-config.js';
import { products, flashSaleProducts } from '../data/products.js';
import { saveOrder } from './order-store.js';

const catalogById = new Map([...products, ...flashSaleProducts].map((p) => [String(p.id), p]));

/** Items that can actually be purchased: known product, in stock, quantity within stock. */
export function getPurchasableItems(items = []) {
  return items.filter((item) => {
    const current = catalogById.get(String(item.id));
    return current && current.available !== false && Number(current.stock) > 0 && Number(item.quantity) <= Number(current.stock);
  });
}

/** Validate raw cart items against the active catalog; throws on the first defect. */
function validateItems(items) {
  if (!Array.isArray(items) || items.length === 0) throw new Error('Keranjang masih kosong');
  const seen = new Set();
  return items.map((item) => {
    const current = catalogById.get(String(item?.id));
    if (!current) throw new Error(`Produk dengan ID ${item?.id} tidak dikenal`);
    if (current.available === false) throw new Error(`${current.name} tidak tersedia`);
    const stock = Number(current.stock);
    if (!Number.isFinite(stock) || stock <= 0) throw new Error(`${current.name} sedang habis`);
    const qty = Number(item?.quantity);
    if (!Number.isInteger(qty) || qty < 1) throw new Error(`Jumlah ${current.name} tidak valid`);
    if (qty > stock) throw new Error(`Jumlah ${current.name} melebihi stok (${stock})`);
    if (seen.has(String(item.id))) throw new Error(`${current.name} duplikat dalam pesanan`);
    seen.add(String(item.id));
    return { current, qty };
  });
}

export function buildOrder({
  items = [], customer = {}, shippingAddress = {}, shippingMethod, paymentMethod,
  discount = 0, promoCode = '', idempotencyKey = null
}) {
  const shipping = getShippingMethod(shippingMethod);
  const payment = getPaymentMethod(paymentMethod);
  if (!shipping) throw new Error('Metode pengiriman tidak valid');
  if (!payment) throw new Error('Metode pembayaran tidak valid');

  const validated = validateItems(items);

  // Snapshot from the authoritative catalog, not from the UI payload.
  const orderItems = validated.map(({ current, qty }) => ({
    productId: current.id,
    name: current.name,
    image: current.image || null,
    price: Number(current.price) || 0,
    quantity: qty,
    weight: current.weight || null,
    stockAtPurchase: Number(current.stock)
  }));

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = getEffectiveShippingFee(subtotal, shipping.id);
  const computedDiscount = promoCode
    ? calculateDiscount(subtotal, promoCode)
    : Math.max(0, Math.min(Math.floor(Number(discount) || 0), subtotal));
  const safeDiscount = Math.max(0, Math.min(computedDiscount, subtotal));
  const grandTotal = Math.max(0, subtotal + shippingFee - safeDiscount);

  return {
    createdAt: new Date().toISOString(),
    customer: {
      fullName: String(customer.fullName || '').trim(),
      phone: String(customer.phone || '').trim(),
      email: String(customer.email || '').trim()
    },
    shippingAddress: {
      province: String(shippingAddress.province || '').trim(),
      city: String(shippingAddress.city || '').trim(),
      district: String(shippingAddress.district || '').trim(),
      address: String(shippingAddress.address || '').trim(),
      postalCode: String(shippingAddress.postalCode || '').trim(),
      notes: String(shippingAddress.notes || '').trim()
    },
    shippingMethod: { id: shipping.id, label: shipping.label, eta: shipping.eta, fee: shippingFee, demo: true },
    paymentMethod: { id: payment.id, label: payment.label, group: payment.group, demo: true },
    items: orderItems,
    subtotal,
    shippingFee,
    discount: safeDiscount,
    grandTotal,
    paymentStatus: payment.paymentStatus,
    orderStatus: 'Pending Fulfillment',
    idempotencyKey: idempotencyKey || null,
    note: 'Pesanan simulasi frontend. Tidak ada pembayaran atau pemenuhan pesanan nyata.'
  };
}

export function placeOrder(input) {
  const order = buildOrder(input);
  const result = saveOrder(order);
  return result.ok
    ? { ok: true, order: result.order, duplicate: Boolean(result.duplicate) }
    : { ok: false, error: result.error, order };
}

import { formatRupiah } from '../utils/currency.js';
import { products, flashSaleProducts } from '../data/products.js';

const STORAGE_KEY = 'freshcart-cart-v1';
const listeners = new Set();

const catalogById = new Map();
const stockById = new Map();
for (const p of [...products, ...flashSaleProducts]) {
  catalogById.set(String(p.id), p);
  stockById.set(String(p.id), Number(p.stock) || 0);
}
let items = readStorage();

function readStorage() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const parsed = JSON.parse(raw || '[]');
    if (!Array.isArray(parsed)) return [];
    // Keep existing cart data, but refresh known products from the current
    // catalog so a stale saved cart cannot show old prices/images/names.
    return parsed.filter(item => item && item.id !== undefined).map(item => {
      const fresh = catalogById.get(String(item.id));
      const base = fresh || item;
      const requested = Number(item.quantity);
      const quantity = Number.isFinite(requested) && requested > 0 ? Math.floor(requested) : 1;
      const max = getStockLimit(item.id);
      return { ...base, quantity: Math.max(1, Math.min(quantity, max)) };
    });
  } catch { return []; }
}
function persist() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (error) { console.warn('Tidak dapat menyimpan keranjang:', error); } }
function notify() { persist(); for (const listener of listeners) listener(); updateHeaderCart(); }
function dispatchToast(message) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('freshcart:toast', { detail: message }));
}
export function getStockLimit(id) {
  const key = String(id);
  const limit = stockById.get(key);
  return typeof limit === 'number' ? limit : Number.POSITIVE_INFINITY;
}
export function getCartSnapshot() { return items; }
export function subscribeCart(listener) { listeners.add(listener); return () => listeners.delete(listener); }
export function addToCart(product, quantity = 1) {
  const requested = Number(quantity);
  if (!Number.isFinite(requested) || requested <= 0) return;
  const key = String(product.id);
  const maxStock = getStockLimit(key);
  const found = items.find((item) => String(item.id) === key);
  const clamped = Math.max(1, Math.min((found?.quantity || 0) + requested, maxStock));
  items = found
    ? items.map((item) => String(item.id) === key ? { ...item, quantity: clamped } : item)
    : [...items, { ...product, quantity: Math.max(1, Math.min(requested, maxStock)) }];
  notify();
  dispatchToast(clamped < requested + (found?.quantity || 0) ? `${product.name} mencapai batas stok (${clamped})` : `${product.name} ditambahkan ke keranjang`);
}
export function updateCartQuantity(id, quantity) {
  const key = String(id);
  const next = Number(quantity);
  if (!Number.isFinite(next)) return;
  const maxStock = getStockLimit(key);
  if (next <= 0) {
    items = items.filter((item) => String(item.id) !== key);
    notify();
    return;
  }
  if (next > maxStock) {
    dispatchToast(`Stok maksimum tercapai (${maxStock})`);
    items = items.map((item) => String(item.id) === key ? { ...item, quantity: maxStock } : item);
    notify();
    return;
  }
  items = items.map((item) => String(item.id) === key ? { ...item, quantity: next } : item);
  notify();
}
export function removeFromCart(id) { items = items.filter((item) => String(item.id) !== String(id)); notify(); }
export function clearCart() { items = []; notify(); }
export function getCartTotals() {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { itemCount, subtotal, formattedSubtotal: formatRupiah(subtotal) };
}
export function updateHeaderCart() {
  const totals = getCartTotals();
  if (typeof document === 'undefined') return;
  document.querySelectorAll('[data-cart-count]').forEach((node) => { node.textContent = String(totals.itemCount); });
  document.querySelectorAll('[data-cart-total]').forEach((node) => { node.textContent = totals.formattedSubtotal; });
}

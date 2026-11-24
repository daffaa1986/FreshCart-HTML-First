import { products, flashSaleProducts } from '../data/products.js';

const STORAGE_KEY = 'freshcart-wishlist-v1';
const listeners = new Set();
const catalogIds = new Set([...products, ...flashSaleProducts].map(p => String(p.id)));
let ids = readStorage();

function readStorage() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const parsed = JSON.parse(raw || '[]');
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.map(String))];
  } catch { return []; }
}
function persist() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch (error) { console.warn('Tidak dapat menyimpan wishlist:', error); } }
function notify() { persist(); for (const listener of listeners) listener(); updateHeaderWishlist(); }
function dispatchToast(message) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('freshcart:toast', { detail: message }));
}
export function getWishlistSnapshot() { return ids; }
export function subscribeWishlist(listener) { listeners.add(listener); return () => listeners.delete(listener); }
export function isInWishlist(id) { return ids.includes(String(id)); }
export function toggleWishlist(id, productName) {
  const key = String(id);
  const exists = ids.includes(key);
  ids = exists ? ids.filter((item) => item !== key) : [...ids, key];
  notify();
  dispatchToast(exists && productName
    ? `${productName} dihapus dari wishlist`
    : productName ? `${productName} ditambahkan ke wishlist` : exists ? 'Produk dihapus dari wishlist' : 'Produk ditambahkan ke wishlist');
  return !exists;
}
export function removeFromWishlist(id) {
  const key = String(id);
  if (!ids.includes(key)) return;
  ids = ids.filter((item) => item !== key);
  notify();
}
export function clearWishlist() { ids = []; notify(); }
export function updateHeaderWishlist() {
  // Only count IDs that still map to a real catalog product; stored IDs are
  // preserved so no user wishlist data is deleted.
  const visibleCount = ids.filter(id => catalogIds.has(String(id))).length;
  if (typeof document === 'undefined') return;
  document.querySelectorAll('[data-wishlist-count]').forEach((node) => { node.textContent = String(visibleCount); });
}

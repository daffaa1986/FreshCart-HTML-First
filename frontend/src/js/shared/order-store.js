// FreshCart — Local order history (Phase 5C).
// Orders are demo-only localStorage records. Existing data is never cleared.

const STORAGE_KEY = 'freshcart-orders-v1';
const listeners = new Set();

function readOrders() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const parsed = JSON.parse(raw || '[]');
    return Array.isArray(parsed) ? parsed.filter((order) => order && order.orderId) : [];
  } catch { return []; }
}

export function getOrders() { return readOrders(); }

export function getOrderById(orderId) {
  return readOrders().find((order) => order.orderId === orderId) || null;
}

export function subscribeOrders(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function makeOrderId(existing) {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('');
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  const id = `FC-${stamp}-${random}`;
  return existing.some((order) => order.orderId === id) ? makeOrderId(existing) : id;
}

/**
 * Persist an order. Returns { ok, order?, error? }.
 * Caller decides when to clear the cart — never done here.
 */
export function saveOrder(draft = {}) {
  const existing = readOrders();
  // One checkout attempt (idempotency key) must never produce two orders.
  if (draft.idempotencyKey) {
    const previous = existing.find((order) => order.idempotencyKey === draft.idempotencyKey);
    if (previous) return { ok: true, order: previous, duplicate: true };
  }
  const order = { ...draft, orderId: draft.orderId || makeOrderId(existing) };
  try {
    if (typeof localStorage === 'undefined') throw new Error('localStorage tidak tersedia');
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, order]));
  } catch (error) {
    return { ok: false, error: error?.message || 'Gagal menyimpan pesanan' };
  }
  for (const listener of listeners) listener();
  return { ok: true, order };
}

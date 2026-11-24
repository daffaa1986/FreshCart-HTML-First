// FreshCart — Checkout completion (Phase 5C.2).
// Shared by the React checkout handler and the integration test so the tested
// code path is the one that actually runs in the application.
// Only products present in the saved order are removed from the cart.

export function finalizeCheckoutAfterOrder(order, removeItem) {
  if (!order || !Array.isArray(order.items) || order.items.length === 0) {
    return { removedIds: [], skipped: true };
  }
  if (typeof removeItem !== 'function') throw new Error('removeItem harus berupa fungsi');

  const removedIds = [...new Set(order.items.map((item) => String(item.productId)))];
  for (const id of removedIds) removeItem(id);
  return { removedIds, skipped: false };
}

import { useMemo, useSyncExternalStore } from 'react';
import { subscribeCart, getCartSnapshot, addToCart, updateCartQuantity, removeFromCart, clearCart, getCartTotals } from '../../js/shared/cart-store.js';
export function useCart() {
  const items = useSyncExternalStore(subscribeCart, getCartSnapshot, getCartSnapshot);
  const totals = getCartTotals();
  return useMemo(() => ({ items, ...totals, addToCart, updateCartQuantity, removeFromCart, clearCart }), [items, totals.itemCount, totals.subtotal]);
}

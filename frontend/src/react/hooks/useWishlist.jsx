import { useMemo, useSyncExternalStore } from 'react';
import { subscribeWishlist, getWishlistSnapshot, toggleWishlist, removeFromWishlist, clearWishlist, isInWishlist } from '../../js/shared/wishlist-store.js';
export function useWishlist() {
  const ids = useSyncExternalStore(subscribeWishlist, getWishlistSnapshot, getWishlistSnapshot);
  return useMemo(() => ({
    ids,
    isInWishlist: (id) => isInWishlist(id),
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
  }), [ids]);
}

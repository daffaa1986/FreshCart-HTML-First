import { useCart } from '../hooks/useCart.jsx';
import { useWishlist } from '../hooks/useWishlist.jsx';
import { formatRupiah } from '../../js/utils/currency.js';
import { withBase } from '../../js/shared/paths.js';

export default function ProductCard({ product, variant = 'catalog' }) {
  const { items, addToCart, updateCartQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const quantity = items.find((item) => String(item.id) === String(product.id))?.quantity || 0;
  const wishlisted = isInWishlist(product.id);
  const isFlash = variant === 'flash';
  return (
    <article className="group relative flex min-w-0 flex-col justify-between rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div>
        <div className="relative mb-space-sm flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-surface-container-low">
          <img src={product.image ? withBase(product.image) : ''} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          {(product.discount || product.badge) && <span className="absolute left-2 top-2 rounded bg-error px-2 py-1 text-label-badge text-white shadow-sm">{product.discount || product.badge}</span>}
          <button type="button" aria-label={wishlisted ? `Hapus ${product.name} dari wishlist` : `Tambah ${product.name} ke wishlist`} aria-pressed={wishlisted} className={`absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition-colors ${wishlisted ? 'bg-error text-on-error hover:bg-error/90' : 'bg-white/90 text-on-surface-variant hover:text-error'}`} onClick={() => toggleWishlist(product.id, product.name)}>
            <span aria-hidden="true" className="material-symbols-outlined text-body-md" style={wishlisted ? { fontVariationSettings: "'FILL' 1" } : undefined}>favorite</span>
          </button>
          {product.organic && <span className="absolute bottom-2 left-2 rounded bg-primary-fixed px-2 py-0.5 text-label-caption text-on-primary-fixed">eco Organik</span>}
        </div>
        <p className="mb-1 text-label-caption uppercase tracking-wider text-on-surface-variant">{product.categoryLabel || product.category} • {product.weight}</p>
        <h3 className="fc-line-clamp-2 min-h-10 text-title-sm font-semibold text-on-surface transition-colors group-hover:text-primary">{product.name}</h3>
        <div className="my-1.5 flex items-center gap-1 text-body-sm">
          <span aria-hidden="true" className="material-symbols-outlined text-body-sm text-amber-500">star</span>
          <strong>{product.rating.toFixed(1)}</strong>
          <span className="text-label-caption text-on-surface-variant">({product.reviews} ulasan)</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-2">
          <strong className="text-currency-md text-primary">{formatRupiah(product.price)}</strong>
          {product.originalPrice && <span className="text-body-sm text-outline line-through">{formatRupiah(product.originalPrice)}</span>}
        </div>
        {isFlash && product.sold !== undefined && <div className="mt-2 space-y-1 text-label-caption text-on-surface-variant"><div className="flex justify-between"><span>Terjual {product.sold}/{product.total}</span><span>Sisa {product.stock}</span></div><div className="h-2 overflow-hidden rounded-full bg-surface-container-high"><div className="h-full rounded-full bg-gradient-to-r from-secondary to-primary" style={{width:`${Math.round(product.sold/product.total*100)}%`}} /></div></div>}
        {!isFlash && <p className={`mt-1 text-label-caption ${product.stock <= 10 ? 'text-amber-600' : 'text-secondary'}`}>● {product.stock <= 10 ? `Sisa ${product.stock} pack` : 'Stok tersedia'}</p>}
      </div>
      <div className="pt-space-md">
        {quantity > 0 ? (
          <div className="flex w-full items-center justify-between rounded-lg bg-surface-container-low p-1">
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded bg-white text-primary shadow-sm" onClick={() => updateCartQuantity(product.id, quantity - 1)} aria-label="Kurangi jumlah"><span aria-hidden="true" className="material-symbols-outlined">remove</span></button>
            <strong className="text-title-sm">{quantity}</strong>
            <button type="button" className="flex h-11 w-11 items-center justify-center rounded bg-primary text-white shadow-sm" onClick={() => updateCartQuantity(product.id, quantity + 1)} aria-label="Tambah jumlah"><span aria-hidden="true" className="material-symbols-outlined">add</span></button>
          </div>
        ) : (
          <button type="button" onClick={() => addToCart(product)} className="flex w-full items-center justify-center gap-1 rounded-lg bg-primary px-space-sm py-2.5 text-title-sm font-semibold text-white shadow-sm transition-colors hover:bg-secondary"><span aria-hidden="true" className="material-symbols-outlined text-body-md">add_shopping_cart</span> + Keranjang</button>
        )}
      </div>
    </article>
  );
}

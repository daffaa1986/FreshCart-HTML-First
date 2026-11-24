import { createRoot } from 'react-dom/client';
import ProductCard from '../components/ProductCard.jsx';
import { useWishlist } from '../hooks/useWishlist.jsx';
import { products, flashSaleProducts } from '../../js/data/products.js';
import { addToCart } from '../../js/shared/cart-store.js';
import { withBase } from '../../js/shared/paths.js';

const catalog = [...products, ...flashSaleProducts];

function WishlistApp() {
  const { ids, removeFromWishlist } = useWishlist();

  const moveToCart = (product) => {
    if (product.available === false || Number(product.stock) <= 0) return;
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };
  const saved = ids.map((id) => catalog.find((p) => String(p.id) === id)).filter(Boolean);
  if (!saved.length) {
    return (
      <section className="fc-commerce-panel text-center">
        <span aria-hidden="true" className="material-symbols-outlined text-5xl text-primary">favorite</span>
        <h1 className="mt-3 text-headline-md font-bold">Wishlist masih kosong</h1>
        <p className="mt-2 text-body-md text-on-surface-variant">Simpan produk favorit Anda untuk dibeli nanti.</p>
        <a className="mt-5 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-white" href={withBase('/pages/products.html')}>Jelajahi Produk</a>
      </section>
    );
  }
  return (
    <div className="space-y-space-lg">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <p className="text-body-md text-on-surface-variant"><strong>{saved.length}</strong> produk tersimpan di wishlist Anda</p>
        <button type="button" className="text-body-sm text-on-surface-variant hover:text-error" onClick={() => saved.forEach((p) => removeFromWishlist(p.id))}>Hapus semua</button>
      </div>
      <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-3 lg:grid-cols-4">
        {saved.map((product) => {
          const canMove = product.available !== false && Number(product.stock) > 0;
          return (
            <div key={product.id} className="space-y-2">
              <ProductCard product={product} />
              <button
                type="button"
                onClick={() => moveToCart(product)}
                disabled={!canMove}
                aria-label={`Pindahkan ${product.name} ke keranjang dan hapus dari wishlist`}
                className="w-full rounded-lg border border-primary/30 px-space-sm py-2 text-title-sm font-semibold text-primary hover:bg-primary hover:text-on-primary disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-primary"
              >
                {canMove ? 'Pindahkan ke keranjang' : 'Stok habis'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const node = document.getElementById('wishlist-root');
if (node) createRoot(node).render(<WishlistApp />);

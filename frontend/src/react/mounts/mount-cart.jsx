import { createRoot } from 'react-dom/client';
import { useMemo } from 'react';
import { useCart } from '../hooks/useCart.jsx';
import { formatRupiah } from '../../js/utils/currency.js';
import { products, flashSaleProducts } from '../../js/data/products.js';
import { getPurchasableItems } from '../../js/shared/order-processing.js';

const catalogById = new Map([...products, ...flashSaleProducts].map((p) => [String(p.id), p]));

function CartApp() {
  const { items, subtotal, updateCartQuantity, removeFromCart } = useCart();
  const validItems = useMemo(() => getPurchasableItems(items), [items]);
  const invalidItems = items.filter((item) => !validItems.includes(item));
  const payableSubtotal = validItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

  if (!items.length) {
    return (
      <section className="fc-commerce-panel text-center">
        <span aria-hidden="true" className="material-symbols-outlined text-5xl text-primary">shopping_basket</span>
        <h1 className="mt-3 text-headline-md font-bold">Keranjang masih kosong</h1>
        <p className="mt-2 text-body-md text-on-surface-variant">Yuk, pilih produk segar favoritmu.</p>
        <a className="mt-5 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-on-primary" href="/pages/products.html">Mulai Belanja</a>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="space-y-3 lg:col-span-2">
        {invalidItems.length > 0 && (
          <div className="rounded-xl border border-error/30 bg-error-container/40 p-4 text-body-sm text-on-error-container">
            <strong>{invalidItems.length} produk tidak dapat dibeli.</strong> Produk tersebut mungkin sudah tidak tersedia atau jumlahnya melebihi stok. Harga dan total di bawah hanya menghitung produk yang tersedia. Data tersimpan tidak dihapus otomatis.
          </div>
        )}
        {items.map((item) => {
          const current = catalogById.get(String(item.id));
          const invalid = !validItems.includes(item);
          const stock = current ? Number(current.stock) : 0;
          return (
            <article key={item.id} className={`fc-commerce-panel flex flex-col gap-4 sm:flex-row ${invalid ? 'border-error/40' : ''}`}>
              <img src={item.image} alt={item.name} className="h-24 w-24 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-on-surface">{item.name}</h2>
                <p className="mt-1 text-sm text-on-surface-variant">{formatRupiah(item.price)} · stok {current ? stock : 'tidak diketahui'}</p>
                {!current && <p className="mt-1 text-label-caption text-on-error-container">Produk tidak ditemukan di katalog saat ini.</p>}
                {current && (current.available === false || stock <= 0) && <p className="mt-1 text-label-caption text-on-error-container">Produk tidak tersedia.</p>}
                {current && Number(item.quantity) > stock && <p className="mt-1 text-label-caption text-on-error-container">Jumlah melebihi stok yang tersedia.</p>}
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="flex h-11 w-11 items-center justify-center rounded bg-surface-container px-3 py-1" aria-label="Kurangi jumlah">&minus;</button>
                  <strong aria-live="polite" className="min-w-6 text-center">{item.quantity}</strong>
                  <button type="button" onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="flex h-11 w-11 items-center justify-center rounded bg-surface-container px-3 py-1" aria-label="Tambah jumlah">+</button>
                  <button type="button" onClick={() => removeFromCart(item.id)} className="ml-auto text-sm text-error hover:underline">Hapus</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <aside className="fc-commerce-panel h-fit">
        <h2 className="text-title-md font-bold">Ringkasan Belanja</h2>
        <div className="mt-4 flex justify-between text-sm"><span>Subtotal</span><strong>{formatRupiah(payableSubtotal)}</strong></div>
        <div className="mt-2 flex justify-between text-sm"><span>Ongkir</span><span>Dihitung saat checkout</span></div>
        <hr className="my-4 border-outline-variant" />
        <div className="flex justify-between font-bold text-primary"><span>Total sementara</span><span>{formatRupiah(payableSubtotal)}</span></div>
        {validItems.length ? (
          <a href="/pages/checkout.html" className="mt-5 block rounded-lg bg-primary px-4 py-3 text-center font-semibold text-on-primary hover:bg-secondary">Lanjut ke Checkout</a>
        ) : (
          <button type="button" disabled className="mt-5 w-full cursor-not-allowed rounded-lg bg-surface-container px-4 py-3 text-center font-semibold text-on-surface-variant">Tidak ada produk yang dapat di-checkout</button>
        )}
      </aside>
    </section>
  );
}

const node = document.getElementById('cart-root');
if (node) createRoot(node).render(<CartApp />);

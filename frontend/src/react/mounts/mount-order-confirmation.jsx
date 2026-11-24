import { createRoot } from 'react-dom/client';
import { getOrderById } from '../../js/shared/order-store.js';
import { formatRupiah } from '../../js/utils/currency.js';
import { withBase } from '../../js/shared/paths.js';

function Status({ children }) {
  return <span className="rounded-full bg-secondary-container px-space-sm py-1 text-label-caption font-semibold text-on-secondary-fixed-variant">{children}</span>;
}

function ConfirmationApp() {
  const orderId = new URLSearchParams(window.location.search).get('order');
  const order = orderId ? getOrderById(orderId) : null;

  if (!order) {
    return (
      <section className="fc-commerce-panel text-center">
        <span aria-hidden="true" className="material-symbols-outlined text-5xl text-primary">receipt_long</span>
        <h2 className="mt-3 text-headline-sm font-bold">Pesanan tidak ditemukan</h2>
        <p className="mt-2 text-body-md text-on-surface-variant">Periksa riwayat pesanan untuk melihat pesanan yang sudah dibuat.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href={withBase('/pages/order-history.html')} className="rounded-lg bg-primary px-5 py-3 font-semibold text-on-primary">Lihat Riwayat Pesanan</a>
          <a href={withBase('/index.html')} className="rounded-lg border border-primary px-5 py-3 font-semibold text-primary">Kembali ke Home</a>
        </div>
      </section>
    );
  }

  const date = new Date(order.createdAt);
  const address = order.shippingAddress || {};

  return (
    <div className="mx-auto max-w-3xl space-y-space-lg">
      <section className="fc-commerce-panel text-center">
        <span aria-hidden="true" className="material-symbols-outlined text-5xl text-primary">check_circle</span>
        <h2 className="mt-3 text-headline-sm font-bold text-on-surface">Pesanan berhasil dibuat</h2>
        <p className="mt-1 text-body-md text-on-surface-variant">Ini adalah konfirmasi simulasi frontend. Tidak ada pembayaran nyata yang diproses.</p>
        <p className="mt-4 text-title-md font-bold text-primary">{order.orderId}</p>
        <p className="text-label-caption text-on-surface-variant">{Number.isNaN(date.getTime()) ? order.createdAt : date.toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Status>{order.orderStatus}</Status>
          <Status>{order.paymentStatus}</Status>
        </div>
      </section>

      <section className="fc-commerce-panel">
        <h3 className="font-title-md font-bold">Produk dipesan</h3>
        <ul className="mt-3 divide-y divide-surface-container-high">
          {order.items.map((item, index) => (
            <li key={`${item.productId}-${index}`} className="flex items-center gap-3 py-3">
              <img src={item.image ? withBase(item.image) : withBase('/images/recipes/recipe-fallback.svg')} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-body-sm font-semibold">{item.name}</p>
                <p className="text-label-caption text-on-surface-variant">{item.quantity} × {formatRupiah(item.price)}</p>
              </div>
              <strong className="text-body-sm">{formatRupiah(item.price * item.quantity)}</strong>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-outline-variant pt-4 text-body-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatRupiah(order.subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Ongkos kirim ({order.shippingMethod?.label})</dt><dd>{formatRupiah(order.shippingFee)}</dd></div>
          {order.discount > 0 && <div className="flex justify-between text-secondary"><dt>Diskon</dt><dd>-{formatRupiah(order.discount)}</dd></div>}
          <div className="flex justify-between text-title-md font-bold text-primary"><dt>Total dibayar (demo)</dt><dd>{formatRupiah(order.grandTotal)}</dd></div>
        </dl>
      </section>

      <section className="grid grid-cols-1 gap-space-lg sm:grid-cols-2">
        <div className="fc-commerce-panel">
          <h3 className="font-title-md font-bold">Alamat pengiriman</h3>
          <p className="mt-2 text-body-sm text-on-surface-variant">{order.customer?.fullName} · {order.customer?.phone}</p>
          <p className="mt-1 text-body-sm text-on-surface-variant">{[address.address, address.district, address.city, address.province, address.postalCode].filter(Boolean).join(', ')}</p>
          {address.notes && <p className="mt-1 text-label-caption text-on-surface-variant">Catatan: {address.notes}</p>}
        </div>
        <div className="fc-commerce-panel">
          <h3 className="font-title-md font-bold">Pengiriman & pembayaran</h3>
          <p className="mt-2 text-body-sm text-on-surface-variant">Pengiriman: {order.shippingMethod?.label} · estimasi {order.shippingMethod?.eta} (demo)</p>
          <p className="mt-1 text-body-sm text-on-surface-variant">Pembayaran: {order.paymentMethod?.label}</p>
          <p className="mt-1 text-label-caption text-on-surface-variant">{order.note}</p>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <a href={withBase('/pages/order-history.html')} className="rounded-lg bg-primary px-5 py-3 font-semibold text-on-primary hover:bg-secondary">Lihat Riwayat Pesanan</a>
        <a href={withBase('/index.html')} className="rounded-lg border border-primary px-5 py-3 font-semibold text-primary hover:bg-primary-fixed">Kembali ke Home</a>
      </div>
    </div>
  );
}

const node = document.getElementById('order-confirmation-root');
if (node) createRoot(node).render(<ConfirmationApp />);

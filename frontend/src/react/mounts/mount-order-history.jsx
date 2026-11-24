import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { getOrders, subscribeOrders } from '../../js/shared/order-store.js';
import { formatRupiah } from '../../js/utils/currency.js';
import { withBase } from '../../js/shared/paths.js';

function OrderHistoryApp() {
  const [orders, setOrders] = useState(() => getOrders());

  useEffect(() => subscribeOrders(() => setOrders(getOrders())), []);

  if (!orders.length) {
    return (
      <section className="fc-commerce-panel text-center">
        <span aria-hidden="true" className="material-symbols-outlined text-5xl text-primary">receipt_long</span>
        <h2 className="mt-3 text-headline-sm font-bold">Belum ada pesanan</h2>
        <p className="mt-2 text-body-md text-on-surface-variant">Pesanan yang dibuat di FreshCart akan muncul di sini.</p>
        <a href={withBase('/pages/products.html')} className="mt-5 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-on-primary">Mulai Belanja</a>
      </section>
    );
  }

  return (
    <div className="space-y-space-md">
      <p className="text-body-md text-on-surface-variant">{orders.length} pesanan tersimpan di perangkat ini (data demo).</p>
      {orders.map((order) => {
        const date = new Date(order.createdAt);
        const address = order.shippingAddress || {};
        return (
          <details key={order.orderId} className="fc-commerce-panel group">
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-3 list-none">
              <div>
                <p className="font-title-md font-bold text-on-surface">{order.orderId}</p>
                <p className="text-label-caption text-on-surface-variant">{Number.isNaN(date.getTime()) ? order.createdAt : date.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
              </div>
              <div className="text-right">
                <p className="font-title-md font-bold text-primary">{formatRupiah(order.grandTotal)}</p>
                <p className="text-label-caption text-on-surface-variant">{order.orderStatus} · {order.paymentStatus}</p>
              </div>
            </summary>
            <div className="mt-4 border-t border-outline-variant pt-4">
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={`${item.productId}-${index}`} className="flex justify-between gap-3 text-body-sm text-on-surface-variant">
                    <span className="min-w-0 flex-1 truncate">{item.name} × {item.quantity}</span>
                    <span className="whitespace-nowrap">{formatRupiah(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-body-sm text-on-surface-variant">Kirim ke: {[address.address, address.district, address.city, address.province, address.postalCode].filter(Boolean).join(', ')}</p>
              <p className="mt-1 text-body-sm text-on-surface-variant">Pembayaran: {order.paymentMethod?.label} · Pengiriman: {order.shippingMethod?.label}</p>
              <a href={withBase(`/pages/order-confirmation.html?order=${encodeURIComponent(order.orderId)}`)} className="mt-4 inline-flex rounded-lg border border-primary px-4 py-2 text-title-sm font-semibold text-primary hover:bg-primary-fixed">Lihat Detail Pesanan</a>
            </div>
          </details>
        );
      })}
    </div>
  );
}

const node = document.getElementById('order-history-root');
if (node) createRoot(node).render(<OrderHistoryApp />);

import { createRoot } from 'react-dom/client';
import { useMemo, useRef, useState } from 'react';
import { useCart } from '../hooks/useCart.jsx';
import { formatRupiah } from '../../js/utils/currency.js';
import {
  SHIPPING_METHODS, PAYMENT_METHODS, DEMO_NOTICE, DEMO_PROMO, FREE_SHIPPING,
  DEFAULT_SHIPPING_ID, DEFAULT_PAYMENT_ID, getShippingMethod, calculateDiscount,
  getEffectiveShippingFee
} from '../../js/data/checkout-config.js';
import { validateCustomer } from '../../js/shared/checkout-validation.js';
import { createSubmitGuard } from '../../js/shared/submit-guard.js';
import { finalizeCheckoutAfterOrder } from '../../js/shared/checkout-completion.js';
import { withBase } from '../../js/shared/paths.js';
import { placeOrder, getPurchasableItems } from '../../js/shared/order-processing.js';

const EMPTY_FORM = {
  fullName: '', phone: '', email: '', province: '', city: '',
  district: '', address: '', postalCode: '', notes: ''
};

function notify(message) {
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('freshcart:toast', { detail: message }));
  }
}

function Field({ id, label, value, onChange, error, required = false, type = 'text', placeholder = '', wide = false }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={id} className="block text-title-sm font-semibold text-on-surface">
        {label} {required && <span className="text-error" aria-hidden="true">*</span>}
      </label>
      <input
        id={id} name={id} type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(id, e.target.value)}
        aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1 w-full rounded-lg border bg-surface-container-lowest px-3 py-2.5 text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary ${error ? 'border-error' : 'border-outline-variant'}`}
      />
      {error && <p id={`${id}-error`} className="mt-1 text-label-caption text-error">{error}</p>}
    </div>
  );
}

function CheckoutApp() {
  const { items, removeFromCart } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [shippingId, setShippingId] = useState(DEFAULT_SHIPPING_ID);
  const [paymentId, setPaymentId] = useState(DEFAULT_PAYMENT_ID);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');
  const guardRef = useRef(null);
  if (!guardRef.current) guardRef.current = createSubmitGuard();
  const idempotencyRef = useRef(null);
  if (!idempotencyRef.current) {
    idempotencyRef.current = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `fc-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  const validItems = useMemo(() => getPurchasableItems(items), [items]);
  const invalidItems = items.filter((item) => !validItems.includes(item));
  const subtotal = validItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  const shipping = getShippingMethod(shippingId);
  const shippingFee = getEffectiveShippingFee(subtotal, shippingId);
  const freeShipping = shippingFee === 0 && subtotal >= FREE_SHIPPING.threshold;
  const discount = appliedPromo ? calculateDiscount(subtotal, appliedPromo) : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee - discount);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const applyPromo = () => {
    const value = calculateDiscount(subtotal, promoInput);
    if (!value) {
      setAppliedPromo('');
      setPromoMessage('Kode promo tidak valid.');
      return;
    }
    setAppliedPromo(promoInput.trim().toUpperCase());
    setPromoMessage(`Promo diterima: hemat ${formatRupiah(value)}.`);
  };

  const submit = (event) => {
    event.preventDefault();
    if (guardRef.current.isLocked() || submitting) return;
    if (!validItems.length) {
      setOrderError('Tidak ada produk yang dapat dipesan. Periksa keranjang Anda.');
      notify('Tidak ada produk yang dapat dipesan');
      return;
    }
    const result = validateCustomer(form);
    setErrors(result.errors);
    if (!result.valid) {
      setOrderError('Lengkapi data pelanggan dan alamat dengan benar.');
      notify('Periksa kembali data pengiriman');
      return;
    }
    setSubmitting(true);
    setOrderError('');
    try {
      const guarded = guardRef.current.run(() => placeOrder({
        items: validItems,
        customer: { fullName: form.fullName, phone: form.phone, email: form.email },
        shippingAddress: {
          province: form.province, city: form.city, district: form.district,
          address: form.address, postalCode: form.postalCode, notes: form.notes
        },
        shippingMethod: shippingId,
        paymentMethod: paymentId,
        promoCode: appliedPromo,
        discount,
        idempotencyKey: idempotencyRef.current
      }));
      if (guarded.skipped) return;
      const outcome = guarded.result;
      if (!outcome.ok) {
        guardRef.current.release(); // allow retry after a failure
        setSubmitting(false);
        setOrderError(`Pesanan gagal disimpan: ${outcome.error}. Keranjang Anda tetap tersimpan.`);
        notify('Pesanan gagal disimpan — keranjang tidak dihapus');
        return;
      }
      // Remove ONLY the products that were actually ordered. Unknown/invalid
      // items remain in the customer's cart. Guard stays locked until navigation.
      finalizeCheckoutAfterOrder(outcome.order, removeFromCart);
      window.location.assign(withBase(`/pages/order-confirmation.html?order=${encodeURIComponent(outcome.order.orderId)}`));
    } catch (error) {
      guardRef.current.release();
      setSubmitting(false);
      setOrderError(`Terjadi kesalahan: ${error?.message || 'tidak diketahui'}. Keranjang Anda tetap tersimpan.`);
      notify('Terjadi kesalahan saat membuat pesanan');
    }
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-space-lg lg:grid-cols-3" noValidate>
      <div className="space-y-space-lg lg:col-span-2">
        <section className="fc-commerce-panel">
          <h2 className="text-headline-sm font-bold text-on-surface">1. Data Pelanggan</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="fullName" label="Nama lengkap" value={form.fullName} onChange={updateField} error={errors.fullName} required wide placeholder="Nama penerima" />
            <Field id="phone" label="Nomor telepon" type="tel" value={form.phone} onChange={updateField} error={errors.phone} required placeholder="081234567890" />
            <Field id="email" label="Email (opsional)" type="email" value={form.email} onChange={updateField} error={errors.email} placeholder="nama@email.com" />
          </div>
        </section>

        <section className="fc-commerce-panel">
          <h2 className="text-headline-sm font-bold text-on-surface">2. Alamat Pengiriman</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="province" label="Provinsi" value={form.province} onChange={updateField} error={errors.province} required />
            <Field id="city" label="Kota / Kabupaten" value={form.city} onChange={updateField} error={errors.city} required />
            <Field id="district" label="Kecamatan" value={form.district} onChange={updateField} error={errors.district} required />
            <Field id="postalCode" label="Kode pos" value={form.postalCode} onChange={updateField} error={errors.postalCode} required placeholder="5 digit angka" />
            <Field id="address" label="Alamat lengkap" value={form.address} onChange={updateField} error={errors.address} required wide placeholder="Jalan, nomor rumah, RT/RW, patokan" />
            <Field id="notes" label="Catatan pengiriman (opsional)" value={form.notes} onChange={updateField} wide placeholder="Misalnya: titip ke satpam" />
          </div>
        </section>

        <section className="fc-commerce-panel">
          <h2 className="text-headline-sm font-bold text-on-surface">3. Metode Pengiriman</h2>
          <div className="mt-4 space-y-2">
            {SHIPPING_METHODS.map((method) => (
              <label key={method.id} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${shippingId === method.id ? 'border-primary bg-primary-fixed/20' : 'border-outline-variant'}`}>
                <input type="radio" name="shipping" className="mt-1 accent-primary" checked={shippingId === method.id} onChange={() => setShippingId(method.id)} />
                <span className="flex-1">
                  <span className="block font-title-sm font-semibold text-on-surface">
                    {method.label} · {getEffectiveShippingFee(subtotal, method.id) === 0
                      ? <span className="text-secondary">Gratis (demo)</span>
                      : formatRupiah(method.fee)}
                  </span>
                  <span className="block text-label-caption text-on-surface-variant">{method.description} · Estimasi {method.eta} (demo)</span>
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="fc-commerce-panel">
          <h2 className="text-headline-sm font-bold text-on-surface">4. Metode Pembayaran</h2>
          <p className="mt-1 text-label-caption text-on-surface-variant">Simulasi frontend. FreshCart tidak meminta nomor kartu, CVV, PIN, atau OTP.</p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PAYMENT_METHODS.map((method) => (
              <label key={method.id} className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${paymentId === method.id ? 'border-primary bg-primary-fixed/20' : 'border-outline-variant'}`}>
                <input type="radio" name="payment" className="mt-1 accent-primary" checked={paymentId === method.id} onChange={() => setPaymentId(method.id)} />
                <span>
                  <span className="block font-title-sm font-semibold text-on-surface">{method.label}</span>
                  <span className="block text-label-caption text-on-surface-variant">{method.description}</span>
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <aside className="fc-commerce-panel h-fit lg:sticky lg:top-40">
        <h2 className="text-headline-sm font-bold text-on-surface">Ringkasan Pesanan</h2>
        {invalidItems.length > 0 && (
          <div className="mt-3 rounded-lg bg-error-container/40 p-3 text-label-caption text-on-error-container">
            {invalidItems.length} produk tidak dapat dipesan (stok habis/tidak tersedia) dan tidak dihitung dalam total.
            <button type="button" onClick={() => invalidItems.forEach((item) => removeFromCart(item.id))} className="mt-1 block underline">Hapus produk tersebut dari keranjang</button>
          </div>
        )}
        <div className="mt-3 max-h-64 space-y-2 overflow-y-auto">
          {validItems.map((item) => (
            <div key={item.id} className="flex justify-between gap-3 text-body-sm text-on-surface-variant">
              <span className="min-w-0 flex-1 truncate">{item.name} × {item.quantity}</span>
              <span className="whitespace-nowrap">{formatRupiah(Number(item.price) * Number(item.quantity))}</span>
            </div>
          ))}
          {!validItems.length && <p className="text-body-sm text-on-surface-variant">Belum ada produk yang dapat dipesan.</p>}
        </div>
        <div className="mt-3 flex gap-2">
          <label htmlFor="promo" className="sr-only">Kode promo demo</label>
          <input id="promo" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} placeholder={DEMO_PROMO.code} className="min-w-0 flex-1 rounded-lg border border-outline-variant px-3 py-2 text-body-sm" />
          <button type="button" onClick={applyPromo} className="rounded-lg border border-primary px-3 py-2 text-title-sm font-semibold text-primary hover:bg-primary hover:text-on-primary">Pakai</button>
        </div>
        {promoMessage && <p className="mt-1 text-label-caption text-on-surface-variant">{promoMessage}</p>}
        <hr className="my-4 border-outline-variant" />
        <dl className="space-y-2 text-body-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatRupiah(subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Ongkos kirim ({shipping?.label}){freeShipping && <span className="ml-1 text-secondary">(gratis, min. {formatRupiah(FREE_SHIPPING.threshold)})</span>}</dt><dd>{formatRupiah(shippingFee)}</dd></div>
          {discount > 0 && <div className="flex justify-between text-secondary"><dt>Diskon promo</dt><dd>-{formatRupiah(discount)}</dd></div>}
          <div className="flex justify-between border-t border-outline-variant pt-3 text-title-md font-bold text-primary"><dt>Total Pembayaran</dt><dd>{formatRupiah(grandTotal)}</dd></div>
        </dl>
        {orderError && <p role="alert" className="mt-3 rounded-lg bg-error-container/40 p-3 text-label-caption text-on-error-container">{orderError}</p>}
        <button
          type="submit"
          disabled={submitting || !validItems.length}
          className="mt-5 w-full rounded-lg bg-primary px-4 py-3 font-semibold text-on-primary hover:bg-secondary disabled:opacity-50"
        >
          {submitting ? 'Memproses pesanan…' : 'Buat Pesanan'}
        </button>
        <p className="mt-3 text-label-caption text-on-surface-variant">{DEMO_NOTICE}</p>
        <a href={withBase('/pages/cart.html')} className="mt-3 block text-center text-title-sm text-primary hover:underline">Kembali ke keranjang</a>
      </aside>
    </form>
  );
}

const node = document.getElementById('checkout-root');
if (node) createRoot(node).render(<CheckoutApp />);

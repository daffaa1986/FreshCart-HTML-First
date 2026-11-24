import { useEffect, useMemo, useRef, useState } from 'react';
import {
  recipes, featuredRecipes, MEAL_LABELS, DIFFICULTIES, TIME_FILTERS,
  REGION_OPTIONS, searchRecipes, FALLBACK_RECIPE_IMAGE,
  NUTRITION_METHOD, getRecipeBySlug
} from '../../js/data/recipes.js';
import { products } from '../../js/data/products.js';
import { useCart } from '../hooks/useCart.jsx';
import { addToCart } from '../../js/shared/cart-store.js';
import { formatRupiah } from '../../js/utils/currency.js';

function notifyToast(message) { if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') window.dispatchEvent(new CustomEvent('freshcart:toast', { detail: message })); }

const productById = new Map(products.map((p) => [p.id, p]));
const HASH_PREFIX = '#resep/';

/** Readable scaled quantity: 1 -> "1", 1.5 -> "1,5", 0.25 -> "0,25". */
export function adjustQuantity(qty, factor) {
  const value = qty * factor;
  if (Number.isInteger(value)) return String(value);
  const rounded = Math.round(value * 100) / 100;
  return String(rounded).replace('.', ',');
}

/** Parse a catalog weight string into a pack size, e.g. "500 gram" -> { amount: 500, unit: 'g' }. */
export function parsePackSize(weight) {
  if (!weight) return null;
  const text = String(weight).toLowerCase();
  const patterns = [
    /\((\d+(?:[.,]\d+)?)\s*(kg|liter|l|gram|g|ml|butir|biji)\)/,
    /(\d+(?:[.,]\d+)?)\s*(kg|liter|l|gram|g|ml|butir|biji)/
  ];
  for (const re of patterns) {
    const match = text.match(re);
    if (!match) continue;
    const amount = Number(match[1].replace(',', '.'));
    const rawUnit = match[2];
    const unit = rawUnit === 'kg' ? 'g' : (rawUnit === 'liter' || rawUnit === 'l') ? 'ml' : rawUnit === 'gram' ? 'g' : rawUnit;
    const multiplier = rawUnit === 'kg' || rawUnit === 'liter' || rawUnit === 'l' ? 1000 : 1;
    return { amount: amount * multiplier, unit };
  }
  return null;
}

/**
 * Number of catalog packs needed for a scaled ingredient amount.
 * `exact: false` means the ingredient unit and package unit cannot be
 * converted reliably; 1 pack is only a rough estimate and must be labelled
 * as such in the UI (no silent, misleading subtotal).
 */
export function packsNeeded(ingredient, product, factor) {
  if (!product) return { packs: 1, exact: false };
  const pack = parsePackSize(product.weight);
  if (!pack) return { packs: 1, exact: false };
  const ingredientUnit = ingredient.unit === 'g' ? 'g' : ingredient.unit === 'ml' ? 'ml' : ingredient.unit;
  if (pack.unit !== ingredientUnit) return { packs: 1, exact: false };
  const required = ingredient.grams * factor;
  if (!Number.isFinite(required) || required <= 0) return { packs: 1, exact: false };
  return { packs: Math.max(1, Math.ceil(required / pack.amount)), exact: true };
}

function currentSlug() {
  const h = window.location.hash || '';
  return h.startsWith(HASH_PREFIX) ? decodeURIComponent(h.slice(HASH_PREFIX.length)) : null;
}

/** Image with a graceful, locally-owned fallback (never an invented path). */
function RecipeImage({ recipe, className = '', alt }) {
  const [src, setSrc] = useState(recipe.image || FALLBACK_RECIPE_IMAGE);
  useEffect(() => setSrc(recipe.image || FALLBACK_RECIPE_IMAGE), [recipe.image]);
  return (
    <img
      src={src}
      alt={alt || `Foto resep ${recipe.name}`}
      loading="lazy"
      onError={() => setSrc(FALLBACK_RECIPE_IMAGE)}
      className={className}
    />
  );
}

function MetaChip({ icon, children, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-surface-container-low text-on-surface-variant',
    primary: 'bg-primary-fixed text-on-primary-fixed-variant',
    accent: 'bg-secondary-container text-on-secondary-fixed-variant'
  };
  return (
    <span className={`inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full text-label-caption font-label-caption ${tones[tone]}`}>
      {icon && <span aria-hidden="true" className="material-symbols-outlined text-body-sm">{icon}</span>}
      {children}
    </span>
  );
}

function RecipeCard({ recipe, onOpen }) {
  return (
    <article className="group rounded-xl bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col border border-surface-container-high">
      <button type="button" onClick={() => onOpen(recipe.slug)} className="relative block w-full h-44 overflow-hidden text-left" aria-label={`Lihat resep ${recipe.name}`}>
        <RecipeImage recipe={recipe} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <span className="absolute top-2 left-2">
          <MetaChip icon={recipe.cuisine === 'indonesian' ? 'restaurant' : 'public'} tone={recipe.cuisine === 'indonesian' ? 'primary' : 'accent'}>
            {recipe.cuisine === 'indonesian' ? 'Indonesia' : 'Internasional'}
          </MetaChip>
        </span>
      </button>
      <div className="p-space-md flex-1 flex flex-col gap-space-sm">
        <p className="text-label-caption font-label-caption uppercase tracking-wider text-on-surface-variant">{recipe.country} · {recipe.region}</p>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-snug">
          <button type="button" onClick={() => onOpen(recipe.slug)} className="hover:text-primary transition-colors text-left">{recipe.name}</button>
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{recipe.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          <MetaChip icon="timer">{recipe.totalTime} mnt</MetaChip>
          <MetaChip icon="groups">{recipe.servings} porsi</MetaChip>
          <MetaChip icon="signal_cellular_alt">{recipe.difficulty}</MetaChip>
        </div>
        <button type="button" onClick={() => onOpen(recipe.slug)} className="mt-1 inline-flex items-center justify-center gap-1 px-space-md py-2 rounded-lg bg-primary text-on-primary font-title-sm text-title-sm hover:bg-secondary transition-colors">
          Lihat Detail <span aria-hidden="true" className="material-symbols-outlined text-body-sm">arrow_forward</span>
        </button>
      </div>
    </article>
  );
}

function NutritionTable({ recipe }) {
  const n = recipe.nutrition;
  const rows = [
    ['Energi', n.calories, 'kcal'],
    ['Protein', n.protein, 'g'],
    ['Karbohidrat', n.carbs, 'g'],
    ['Lemak total', n.fat, 'g'],
    ['Serat pangan', n.fiber, 'g'],
    ['Natrium', n.sodium, 'mg']
  ];
  return (
    <div className="rounded-xl bg-surface-container-low p-space-md">
      <h4 className="font-title-md text-title-md text-on-surface font-bold mb-2">Estimasi nutrisi per porsi</h4>
      <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">{recipe.servingSize} · {NUTRITION_METHOD.formula}</p>
      <table className="w-full text-body-sm text-on-surface">
        <caption className="sr-only">Estimasi kandungan gizi per porsi {recipe.name}</caption>
        <thead><tr className="text-left border-b border-outline-variant"><th scope="col" className="py-1.5">Nutrisi</th><th scope="col" className="py-1.5 text-right">Jumlah</th></tr></thead>
        <tbody>
          {rows.map(([label, value, unit]) => (
            <tr key={label} className="border-b border-surface-container-high last:border-0">
              <th scope="row" className="py-1.5 font-normal text-left">{label}</th>
              <td className="py-1.5 text-right font-semibold">{value} <span className="font-normal text-on-surface-variant">{unit}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-label-caption text-on-surface-variant">
        {NUTRITION_METHOD.disclaimer} Referensi: {NUTRITION_METHOD.references.join(', ')}.
      </p>
      {recipe.nutritionUnavailable?.length > 0 && (
        <p className="mt-2 text-label-caption text-on-error-container">
          Data komposisi belum tersedia untuk: {recipe.nutritionUnavailable.join(', ')}. Bahan tersebut tidak ikut dihitung dalam estimasi ini.
        </p>
      )}
    </div>
  );
}

function DetailModal({ recipe, onClose, onOpen }) {
  const closeRef = useRef(null);
  const addLock = useRef(false);
  const { items: cartItems } = useCart();
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [selected, setSelected] = useState(() => new Set());
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setServings(recipe?.servings || 1);
    setSelected(new Set());
  }, [recipe?.slug]);

  useEffect(() => {
    if (!recipe) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
    };
  }, [recipe, onClose]);

  if (!recipe) return null;

  const related = recipes
    .filter((r) => r.id !== recipe.id && (r.cuisine === recipe.cuisine || r.meal.some((m) => recipe.meal.includes(m))))
    .slice(0, 3);

  const factor = servings / recipe.servings;
  const ingredientRows = recipe.ingredients.map((ingredient, index) => {
    const product = ingredient.productId ? productById.get(ingredient.productId) : null;
    const available = Boolean(product && product.available !== false && Number(product.stock) > 0);
    const packInfo = available ? packsNeeded(ingredient, product, factor) : { packs: 0, exact: false };
    const cartQty = product ? (cartItems.find((item) => String(item.id) === String(product.id))?.quantity || 0) : 0;
    return {
      ingredient, index, product, available,
      packs: packInfo.packs, exact: packInfo.exact, cartQty,
      subtotal: available ? product.price * packInfo.packs : 0
    };
  });
  const selectedRows = ingredientRows.filter((row) => selected.has(row.index));
  const availableSelected = selectedRows.filter((row) => row.available);
  const unavailableRows = ingredientRows.filter((row) => !row.available);
  const approximateRows = availableSelected.filter((row) => !row.exact);
  const estimatedSubtotal = availableSelected.reduce((sum, row) => sum + row.subtotal, 0);

  const toggleIngredient = (index) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index); else next.add(index);
      return next;
    });
  };

  const addIngredients = (addAll = false) => {
    if (addLock.current) return;
    const targets = addAll ? ingredientRows.filter((row) => row.available) : availableSelected;
    if (!targets.length) {
      notifyToast('Pilih bahan yang tersedia terlebih dahulu');
      return;
    }
    addLock.current = true;
    setIsAdding(true);
    try {
      targets.forEach((row) => addToCart(row.product, row.packs));
      notifyToast(`${targets.length} bahan ditambahkan ke keranjang`);
    } finally {
      window.setTimeout(() => { addLock.current = false; setIsAdding(false); }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-3 sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="recipe-detail-title" className="w-full max-w-5xl rounded-2xl bg-surface-container-lowest shadow-2xl overflow-hidden my-2">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-space-sm px-space-md sm:px-space-lg py-space-sm bg-surface-container-lowest border-b border-surface-container-high">
          <p className="font-label-badge text-label-badge uppercase tracking-wider text-primary">Detail Resep · {recipe.cuisine === 'indonesian' ? 'Indonesia' : 'Internasional'}</p>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Tutup detail resep dan kembali ke daftar" className="inline-flex items-center gap-1 px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors text-title-sm">
            <span aria-hidden="true" className="material-symbols-outlined text-body-sm">close</span> Tutup
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 sm:h-80 lg:h-full min-h-[18rem] bg-surface-container-low">
            <RecipeImage recipe={recipe} className="absolute inset-0 w-full h-full object-cover" />
            {recipe.imageCredit && (
              <p className="absolute bottom-0 left-0 right-0 bg-black/55 text-white px-space-sm py-1 text-label-caption">
                Foto: {recipe.imageCredit.creator || 'Wikimedia Commons'} · {recipe.imageCredit.license}
                {recipe.imageCredit.source && <> · <a href={recipe.imageCredit.source} target="_blank" rel="noreferrer" className="underline">sumber</a></>}
              </p>
            )}
          </div>
          <div className="p-space-md sm:p-space-lg space-y-space-md">
            <div className="flex flex-wrap gap-1.5">
              {recipe.meal.map((m) => <MetaChip key={m} tone="primary">{MEAL_LABELS[m] || m}</MetaChip>)}
              <MetaChip>{recipe.difficulty}</MetaChip>
            </div>
            <div>
              <h2 id="recipe-detail-title" className="font-headline-lg text-headline-lg text-on-surface font-bold leading-tight">{recipe.name}</h2>
              <p className="mt-1 text-body-md text-on-surface-variant">{recipe.country} · {recipe.region} · {recipe.category || (recipe.cuisine === 'indonesian' ? 'Kuliner Nusantara' : 'Masakan Internasional')}</p>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">{recipe.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                ['groups', `${servings} porsi`],
                ['timer', `${recipe.prepTime} mnt persiapan`],
                ['soup_kitchen', `${recipe.cookTime} mnt masak`],
                ['schedule', `${recipe.totalTime} mnt total`]
              ].map(([icon, label]) => (
                <div key={label} className="rounded-lg bg-surface-container-low p-space-sm text-center">
                  <span aria-hidden="true" className="material-symbols-outlined text-primary text-body-md block">{icon}</span>
                  <span className="text-label-caption text-on-surface-variant">{label}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary-fixed/20 p-space-md">
              <div className="flex flex-wrap items-center justify-between gap-space-sm">
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">Atur jumlah porsi</h3>
                  <p className="text-label-caption text-on-surface-variant">Takaran bahan dihitung ulang otomatis dari {recipe.servings} porsi resep asli.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setServings((s) => Math.max(1, s - 1))} disabled={servings <= 1} aria-label="Kurangi jumlah porsi" className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-primary shadow-sm disabled:opacity-40"><span aria-hidden="true" className="material-symbols-outlined">remove</span></button>
                  <output aria-live="polite" className="min-w-20 text-center text-title-md font-bold text-on-surface">{servings} porsi</output>
                  <button type="button" onClick={() => setServings((s) => Math.min(20, s + 1))} disabled={servings >= 20} aria-label="Tambah jumlah porsi" className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white shadow-sm disabled:opacity-40"><span aria-hidden="true" className="material-symbols-outlined">add</span></button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold mb-2">Alat &amp; peralatan</h3>
                <ul className="space-y-1">
                  {recipe.equipment.map((e) => <li key={e} className="flex items-start gap-2 text-body-sm text-on-surface-variant"><span aria-hidden="true" className="material-symbols-outlined text-body-sm text-primary">check_small</span>{e}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold mb-2">Bahan-bahan</h3>
                <ul className="space-y-1.5">
                  {ingredientRows.map((row) => (
                    <li key={`${row.ingredient.name}-${row.index}`}>
                      <label className={`flex items-start gap-2 rounded-lg p-1.5 ${row.available ? 'hover:bg-surface-container-low' : 'opacity-80'}`}>
                        <input type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" checked={selected.has(row.index)} disabled={!row.available} onChange={() => toggleIngredient(row.index)} aria-label={`Pilih ${row.ingredient.name}`} />
                        <span className="text-body-sm text-on-surface-variant">
                          <span className="font-semibold text-on-surface">{adjustQuantity(row.ingredient.qty, factor)} {row.ingredient.unit}</span> {row.ingredient.name}
                          {row.available ? (
                            <span className="block text-label-caption text-primary">
                              {row.product.name} · {formatRupiah(row.product.price)}{row.packs > 1 ? ` × ${row.packs} pack` : ''} · stok {row.product.stock}{row.cartQty > 0 ? ` · ${row.cartQty} di keranjang` : ''}
                              {!row.exact && (
                                <span className="block text-on-error-container">Perkiraan 1 pack — satuan {row.ingredient.unit} tidak dapat dikonversi ke kemasan {row.product.weight}.</span>
                              )}
                            </span>
                          ) : (
                            <span className="block text-label-caption text-error">Belum tersedia di katalog</span>
                          )}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-surface-container-lowest p-space-md">
              <h3 className="font-title-md text-title-md text-on-surface font-bold mb-2">Belanja bahan resep</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-center">
                <div><span className="block text-title-md font-bold text-on-surface">{selectedRows.length}</span><span className="text-label-caption text-on-surface-variant">Bahan dipilih</span></div>
                <div><span className="block text-title-md font-bold text-on-surface">{availableSelected.length}</span><span className="text-label-caption text-on-surface-variant">Tersedia</span></div>
                <div><span className="block text-title-md font-bold text-on-surface">{unavailableRows.length}</span><span className="text-label-caption text-on-surface-variant">Belum tersedia</span></div>
                <div><span className="block text-title-md font-bold text-primary">{formatRupiah(estimatedSubtotal)}</span><span className="text-label-caption text-on-surface-variant">Estimasi subtotal</span></div>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                <button type="button" onClick={() => addIngredients(false)} disabled={!availableSelected.length || isAdding} className="inline-flex items-center justify-center gap-1 rounded-lg bg-primary px-space-md py-2.5 text-title-sm font-semibold text-on-primary hover:bg-secondary disabled:opacity-40">
                  <span aria-hidden="true" className="material-symbols-outlined text-body-sm">add_shopping_cart</span> Tambah pilihan ke keranjang
                </button>
                <button type="button" onClick={() => addIngredients(true)} disabled={isAdding || !ingredientRows.some((row) => row.available)} className="inline-flex items-center justify-center gap-1 rounded-lg bg-secondary-container px-space-md py-2.5 text-title-sm font-semibold text-on-secondary-fixed-variant hover:bg-secondary-fixed disabled:opacity-40">
                  Tambah semua yang tersedia
                </button>
                <a href="/pages/cart.html" className="inline-flex items-center justify-center gap-1 rounded-lg border border-outline-variant px-space-md py-2.5 text-title-sm font-semibold text-on-surface hover:border-primary hover:text-primary">
                  Lihat keranjang
                </a>
              </div>
              <p className="mt-2 text-label-caption text-on-surface-variant">Harga berasal dari katalog FreshCart. Jumlah pack dibulatkan ke atas sesuai ukuran kemasan. Bahan tanpa produk katalog tidak dimasukkan ke keranjang.</p>
              {approximateRows.length > 0 && (
                <p className="mt-1 text-label-caption text-on-error-container">
                  {approximateRows.length} bahan dipilih memiliki satuan yang tidak dapat dikonversi ke ukuran kemasan (misalnya sendok makan/teh). Jumlah pack dan subtotal untuk bahan tersebut hanya perkiraan.
                </p>
              )}
            </div>

            <div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold mb-2">Cara memasak</h3>
              <ol className="space-y-2">
                {recipe.steps.map((s, idx) => (
                  <li key={idx} className="flex gap-2 text-body-sm text-on-surface-variant">
                    <span className="flex-none w-6 h-6 rounded-full bg-primary text-on-primary text-label-caption font-bold flex items-center justify-center">{idx + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <NutritionTable recipe={recipe} />
              <div className="space-y-space-sm">
                <div className="rounded-xl bg-surface-container-low p-space-md">
                  <h4 className="font-title-md text-title-md text-on-surface font-bold mb-2">Penyajian</h4>
                  <p className="text-body-sm text-on-surface-variant">{recipe.plating}</p>
                </div>
                <div className="rounded-xl bg-surface-container-low p-space-md">
                  <h4 className="font-title-md text-title-md text-on-surface font-bold mb-2">Substitusi opsional</h4>
                  <ul className="list-disc list-inside text-body-sm text-on-surface-variant">
                    {recipe.substitutions.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
                <div className="rounded-xl bg-error-container/30 p-space-md">
                  <h4 className="font-title-md text-title-md text-on-surface font-bold mb-2">Alergen</h4>
                  <ul className="list-disc list-inside text-body-sm text-on-surface-variant">
                    {recipe.allergens.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                </div>
                <div className="rounded-xl bg-surface-container-low p-space-md">
                  <h4 className="font-title-md text-title-md text-on-surface font-bold mb-2">Penyimpanan &amp; keamanan pangan</h4>
                  <p className="text-body-sm text-on-surface-variant">{recipe.storage}</p>
                </div>
              </div>
            </div>

            {related.length > 0 && (
              <div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold mb-2">Resep terkait</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {related.map((r) => (
                    <button key={r.id} type="button" onClick={() => onOpen(r.slug)} className="text-left rounded-lg border border-surface-container-high p-space-sm hover:border-primary hover:shadow-sm transition-all">
                      <span className="block text-body-sm font-semibold text-on-surface line-clamp-2">{r.name}</span>
                      <span className="text-label-caption text-on-surface-variant">{r.totalTime} mnt · {r.difficulty}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecipeLibrary() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('all');
  const [meal, setMeal] = useState('all');
  const [region, setRegion] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [time, setTime] = useState('all');
  const [activeSlug, setActiveSlug] = useState(() => currentSlug());

  useEffect(() => {
    const sync = () => setActiveSlug(currentSlug());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => { window.removeEventListener('hashchange', sync); window.removeEventListener('popstate', sync); };
  }, []);

  const openRecipe = (slug) => { window.location.hash = `${HASH_PREFIX}${encodeURIComponent(slug)}`; setActiveSlug(slug); };
  const closeRecipe = () => {
    if (window.location.hash) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
    setActiveSlug(null);
  };

  const filtersActive = query || cuisine !== 'all' || meal !== 'all' || region !== 'all' || difficulty !== 'all' || time !== 'all';

  const filtered = useMemo(() => {
    let list = searchRecipes(query, recipes);
    if (cuisine !== 'all') list = list.filter((r) => r.cuisine === cuisine);
    if (meal !== 'all') list = list.filter((r) => r.meal.includes(meal));
    if (region !== 'all') {
      const [c, name] = region.split('|');
      list = list.filter((r) => r.cuisine === c && r.region === name);
    }
    if (difficulty !== 'all') list = list.filter((r) => r.difficulty === difficulty);
    if (time !== 'all') list = list.filter((t) => TIME_FILTERS.find((f) => f.id === time)?.test(t));
    return list;
  }, [query, cuisine, meal, region, difficulty, time]);

  const reset = () => { setQuery(''); setCuisine('all'); setMeal('all'); setRegion('all'); setDifficulty('all'); setTime('all'); };
  const active = activeSlug ? getRecipeBySlug(activeSlug) : null;

  const chip = (value, current, setter, label) => (
    <button
      key={value}
      type="button"
      onClick={() => setter(value)}
      aria-pressed={current === value}
      className={`px-space-md py-2 rounded-full whitespace-nowrap text-title-sm font-title-sm transition-colors ${current === value ? 'bg-primary text-on-primary' : 'bg-surface-container-low text-on-surface hover:bg-primary-container hover:text-on-primary-container'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full pb-space-xl">
      <section id="jelajahi" className="w-full py-space-lg bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-gutter space-y-space-md">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-space-sm">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Jelajahi 60 Resep</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">30 resep Indonesia dan 30 resep internasional, lengkap dengan bahan, langkah dan estimasi gizi.</p>
            </div>
            <div className="relative w-full md:max-w-sm">
              <label htmlFor="recipe-search" className="sr-only">Cari resep berdasarkan nama atau bahan</label>
              <span aria-hidden="true" className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-body-md">search</span>
              <input
                id="recipe-search" type="search" value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama resep atau bahan…"
                className="w-full pl-10 pr-space-md py-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex gap-space-sm overflow-x-auto pb-1" aria-label="Filter jenis masakan">
            {chip('all', cuisine, setCuisine, 'Semua Masakan')}
            {chip('indonesian', cuisine, setCuisine, '🇮🇩 Indonesia')}
            {chip('international', cuisine, setCuisine, '🌍 Internasional')}
          </div>

          <div className="flex gap-space-sm overflow-x-auto pb-1" aria-label="Filter kategori makan">
            {chip('all', meal, setMeal, 'Semua Menu')}
            {Object.entries(MEAL_LABELS).map(([id, label]) => chip(id, meal, setMeal, label))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
            <div>
              <label htmlFor="recipe-region" className="block text-label-caption font-label-caption uppercase text-on-surface-variant mb-1">Negara / Daerah</label>
              <select id="recipe-region" value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-space-sm py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-body-sm text-on-surface">
                <option value="all">Semua daerah</option>
                {REGION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label} ({o.cuisine === 'ID' ? 'Indonesia' : 'Internasional'})</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="recipe-difficulty" className="block text-label-caption font-label-caption uppercase text-on-surface-variant mb-1">Tingkat kesulitan</label>
              <select id="recipe-difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full px-space-sm py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-body-sm text-on-surface">
                <option value="all">Semua tingkat</option>
                {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="recipe-time" className="block text-label-caption font-label-caption uppercase text-on-surface-variant mb-1">Total waktu</label>
              <select id="recipe-time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-space-sm py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-body-sm text-on-surface">
                <option value="all">Semua durasi</option>
                {TIME_FILTERS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between gap-space-sm pt-1">
            <p aria-live="polite" className="text-body-sm text-on-surface-variant">Menampilkan <strong className="text-on-surface">{filtered.length}</strong> dari {recipes.length} resep</p>
            {filtersActive && <button type="button" onClick={reset} className="text-title-sm font-title-sm text-primary hover:underline">Reset filter</button>}
          </div>
        </div>
      </section>

      {!filtersActive && (
        <>
          <section className="w-full py-space-lg bg-surface">
            <div className="max-w-7xl mx-auto px-gutter space-y-space-md">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="material-symbols-outlined text-primary">stars</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Resep Pilihan</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                {featuredRecipes.slice(0, 4).map((r) => <RecipeCard key={r.id} recipe={r} onOpen={openRecipe} />)}
              </div>
            </div>
          </section>
          {[
            { title: 'Sorakan Kuliner Indonesia', list: recipes.filter((r) => r.cuisine === 'indonesian').slice(0, 4), bg: 'bg-surface-container-low' },
            { title: 'Sorakan Masakan Internasional', list: recipes.filter((r) => r.cuisine === 'international').slice(0, 4), bg: 'bg-surface' }
          ].map((group) => (
            <section key={group.title} className={`w-full py-space-lg ${group.bg}`}>
              <div className="max-w-7xl mx-auto px-gutter space-y-space-md">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{group.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                  {group.list.map((r) => <RecipeCard key={r.id} recipe={r} onOpen={openRecipe} />)}
                </div>
              </div>
            </section>
          ))}
        </>
      )}

      <section className={`w-full py-space-lg ${filtersActive ? 'bg-surface' : 'bg-surface-container-low'}`}>
        <div className="max-w-7xl mx-auto px-gutter">
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold mb-space-md">{filtersActive ? 'Hasil Pencarian' : 'Semua Resep'}</h2>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md">
              {filtered.map((r) => <RecipeCard key={r.id} recipe={r} onOpen={openRecipe} />)}
            </div>
          ) : (
            <div className="rounded-xl bg-surface-container-lowest border border-surface-container-high p-space-xl text-center">
              <span aria-hidden="true" className="material-symbols-outlined text-primary text-display-hero">search_off</span>
              <p className="font-title-md text-title-md text-on-surface mt-2">Tidak ada resep yang cocok.</p>
              <p className="text-body-sm text-on-surface-variant">Coba ubah kata kunci atau filter Anda.</p>
              <button type="button" onClick={reset} className="mt-3 px-space-md py-2 rounded-lg bg-primary text-on-primary text-title-sm hover:bg-secondary">Reset filter</button>
            </div>
          )}
        </div>
      </section>

      <section className="w-full py-space-lg bg-surface border-t border-surface-container-high">
        <div className="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-md">
          <p className="text-body-md text-on-surface-variant">Nilai gizi adalah estimasi berdasarkan komposisi bahan (TKPI / USDA), bukan hasil uji laboratorium.</p>
          <a className="inline-flex items-center gap-space-xs px-space-lg py-3 rounded-lg bg-primary text-on-primary font-title-md text-title-md hover:bg-secondary transition-colors" href="/pages/products.html"><span>Belanja Bahan Resep</span><span aria-hidden="true" className="material-symbols-outlined text-body-lg">shopping_cart</span></a>
        </div>
      </section>

      {active && <DetailModal recipe={active} onClose={closeRecipe} onOpen={openRecipe} />}
    </div>
  );
}

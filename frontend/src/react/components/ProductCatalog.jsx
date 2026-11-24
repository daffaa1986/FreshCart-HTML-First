import { useEffect, useMemo, useState } from 'react';
import { products } from '../../js/data/products.js';
import ProductCard from './ProductCard.jsx';

const MAX_PRICE_DEFAULT = 150000;
const LIMIT_MIN = 5000;
const LIMIT_MAX = 150000;
const VALID_SORT = ['popular', 'price-low', 'price-high', 'rating', 'name-a-z'];

const CATALOG_CATEGORIES = [
  { key: 'sayur', label: 'Sayur Segar', supported: true },
  { key: 'buah', label: 'Buah Segar', supported: true },
  { key: 'daging', label: 'Daging & Unggas', supported: true },
  { key: 'hasil-laut', label: 'Hasil Laut', supported: true },
  { key: 'susu', label: 'Susu & Telur', supported: true },
  { key: 'sembako', label: 'Sembako', supported: true },
  { key: 'minuman', label: 'Minuman', supported: true },
  { key: 'bumbu', label: 'Bumbu Dapur', supported: false },
  { key: 'beku', label: 'Makanan Beku', supported: false },
];

function readState() {
  const params = new URLSearchParams(window.location.search);
  const sortParam = params.get('sort');
  const maxPriceRaw = Number(params.get('maxPrice'));
  const pageRaw = Number(params.get('page'));
  const availableParam = params.get('available');
  return {
    query: (params.get('q') || '').trim(),
    categoryList: (params.get('category') || '').split(',').map((s) => s.trim()).filter(Boolean),
    organic: params.get('organic') === 'true',
    promo: params.get('promo') === 'true',
    hydroponic: params.get('hydroponic') === 'true',
    pesticideFree: params.get('pesticideFree') === 'true',
    rating: params.get('rating') === 'true',
    available: availableParam === 'available' ? 'available' : 'all',
    sort: VALID_SORT.includes(sortParam) ? sortParam : 'popular',
    maxPrice: Number.isFinite(maxPriceRaw) && maxPriceRaw > 0
      ? Math.min(LIMIT_MAX, Math.max(LIMIT_MIN, maxPriceRaw))
      : MAX_PRICE_DEFAULT,
    page: Number.isInteger(pageRaw) && pageRaw >= 1 ? pageRaw : 1,
  };
}

function buildParams(state) {
  const params = new URLSearchParams();
  if (state.query) params.set('q', state.query);
  if (state.categoryList.length) params.set('category', state.categoryList.join(','));
  if (state.organic) params.set('organic', 'true');
  if (state.promo) params.set('promo', 'true');
  if (state.hydroponic) params.set('hydroponic', 'true');
  if (state.pesticideFree) params.set('pesticideFree', 'true');
  if (state.rating) params.set('rating', 'true');
  if (state.available !== 'all') params.set('available', state.available);
  if (state.sort !== 'popular') params.set('sort', state.sort);
  if (state.maxPrice !== MAX_PRICE_DEFAULT) params.set('maxPrice', String(state.maxPrice));
  if (state.page > 1) params.set('page', String(state.page));
  return params;
}

function productMatchesCategory(product, key) {
  const category = CATALOG_CATEGORIES.find((c) => c.key === key);
  if (!category || !category.supported) return false;
  return product.catalogCategory === key;
}

export default function ProductCatalog() {
  const initial = readState();
  const [selectedCategories, setSelectedCategories] = useState(initial.categoryList);
  const [maxPrice, setMaxPrice] = useState(initial.maxPrice);
  const [organic, setOrganic] = useState(initial.organic);
  const [promo, setPromo] = useState(initial.promo);
  const [hydroponic, setHydroponic] = useState(initial.hydroponic);
  const [pesticideFree, setPesticideFree] = useState(initial.pesticideFree);
  const [available, setAvailable] = useState(initial.available);
  const [rating, setRating] = useState(initial.rating);
  const [sort, setSort] = useState(initial.sort);
  const [page, setPage] = useState(initial.page);
  const [query, setQuery] = useState(initial.query);
  const pageSize = 8;

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    const result = products.filter((p) =>
      p.price <= maxPrice &&
      (!selectedCategories.length || selectedCategories.some((key) => productMatchesCategory(p, key))) &&
      (!organic || p.organic) &&
      (!promo || (p.originalPrice !== null && p.originalPrice > p.price)) &&
      (!hydroponic || p.hydroponic) &&
      (!pesticideFree || p.pesticideFree) &&
      (!rating || p.rating >= 4) &&
      (available === 'all' || (available === 'available' ? p.available : !p.available)) &&
      (!normalized || `${p.name} ${p.category} ${p.categoryLabel} ${p.weight}`.toLowerCase().includes(normalized))
    );
    if (sort === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sort === 'name-a-z') result.sort((a, b) => a.name.localeCompare(b.name, 'id'));
    else result.sort((a, b) => b.reviews - a.reviews);
    return result;
  }, [selectedCategories, maxPrice, organic, promo, hydroponic, pesticideFree, available, rating, sort, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => {
    const countEl = document.getElementById('catalog-product-count');
    if (countEl) countEl.textContent = `${filtered.length} Produk`;
  }, [filtered.length]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  useEffect(() => {
    const params = buildParams({
      query,
      categoryList: selectedCategories,
      organic,
      promo,
      hydroponic,
      pesticideFree,
      available,
      rating,
      sort,
      maxPrice,
      page,
    });
    const url = params.toString() ? `/pages/products.html?${params}` : '/pages/products.html';
    window.history.replaceState({}, '', url);
  }, [query, selectedCategories, organic, promo, hydroponic, pesticideFree, available, rating, sort, maxPrice, page]);

  useEffect(() => {
    const onPopState = () => {
      const next = readState();
      setQuery(next.query);
      setSelectedCategories(next.categoryList);
      setOrganic(next.organic);
      setPromo(next.promo);
      setHydroponic(next.hydroponic);
      setPesticideFree(next.pesticideFree);
      setRating(next.rating);
      setAvailable(next.available);
      setSort(next.sort);
      setMaxPrice(next.maxPrice);
      setPage(next.page);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  function toggleCategory(categoryKey) {
    setSelectedCategories((old) =>
      old.includes(categoryKey) ? old.filter((x) => x !== categoryKey) : [...old, categoryKey]
    );
    setPage(1);
  }

  function reset() {
    setSelectedCategories([]);
    setMaxPrice(MAX_PRICE_DEFAULT);
    setOrganic(false);
    setPromo(false);
    setHydroponic(false);
    setPesticideFree(false);
    setAvailable('all');
    setRating(false);
    setSort('popular');
    setQuery('');
    setPage(1);
  }

  const activeCount =
    Number(Boolean(query)) +
    selectedCategories.length +
    Number(Boolean(promo)) + Number(organic) + Number(hydroponic) + Number(pesticideFree) + Number(rating) +
    (available !== 'all' ? 1 : 0) +
    (maxPrice < MAX_PRICE_DEFAULT ? 1 : 0);

  const unsupportedSelected = selectedCategories.filter((key) => !CATALOG_CATEGORIES.find((c) => c.key === key)?.supported);

  return (
    <div className="space-y-space-lg">
      <div className="flex flex-wrap items-center justify-between gap-space-sm rounded-xl bg-white p-space-md shadow-sm">
        <div className="flex flex-wrap items-center gap-2 text-body-sm"><span className="font-semibold">Filter Aktif:</span>{activeCount===0?<span className="text-on-surface-variant">Belum ada filter</span>:<>
          {query&&<span className="fc-filter-chip">Pencarian: “{query}”<button type="button" aria-label="Hapus pencarian" onClick={()=>{setQuery('');setPage(1);}}>×</button></span>}
          {selectedCategories.map((key)=><span className="fc-filter-chip" key={key}>{CATALOG_CATEGORIES.find((c)=>c.key===key)?.label || key}<button type="button" aria-label={`Hapus filter ${key}`} onClick={()=>toggleCategory(key)}>×</button></span>)}
          {promo&&<span className="fc-filter-chip">Promo <button type="button" aria-label="Hapus filter Promo" onClick={()=>{setPromo(false);setPage(1);}}>×</button></span>}
          {hydroponic&&<span className="fc-filter-chip">Hidroponik <button type="button" aria-label="Hapus filter Hidroponik" onClick={()=>{setHydroponic(false);setPage(1);}}>×</button></span>}
          {organic&&<span className="fc-filter-chip">100% Organik <button type="button" aria-label="Hapus filter 100% Organik" onClick={()=>{setOrganic(false);setPage(1);}}>×</button></span>}
          {rating&&<span className="fc-filter-chip">Rating ≥ 4.0 <button type="button" aria-label="Hapus filter Rating 4 ke atas" onClick={()=>{setRating(false);setPage(1);}}>×</button></span>}
          {pesticideFree&&<span className="fc-filter-chip">Bebas Pestisida <button type="button" aria-label="Hapus filter Bebas Pestisida" onClick={()=>{setPesticideFree(false);setPage(1);}}>×</button></span>}
        </>}</div>
        <div className="flex items-center gap-2"><label htmlFor="catalog-sort" className="text-body-sm text-on-surface-variant">Urutkan:</label><select id="catalog-sort" value={sort} onChange={e=>{setSort(e.target.value);setPage(1);}} className="rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm"><option value="popular">Paling Populer</option><option value="price-low">Harga Terendah</option><option value="price-high">Harga Tertinggi</option><option value="rating">Rating Tertinggi</option><option value="name-a-z">Nama A–Z</option></select></div>
      </div>
      {query&&<p className="text-body-sm text-on-surface-variant">Hasil pencarian “{query}”: <strong>{filtered.length}</strong> produk ditemukan</p>}
      <div className="fc-catalog-layout">
        <aside className="space-y-space-md rounded-xl bg-white p-space-md shadow-sm">
          <div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-title-md font-semibold"><span aria-hidden="true" className="material-symbols-outlined text-primary">filter_list</span>Filter Pencarian</h2><button type="button" onClick={reset} className="text-label-badge font-bold uppercase text-primary">Hapus</button></div>
          <div className="space-y-2"><h3 className="text-title-sm font-semibold">Kategori Produk</h3><p className="text-label-caption text-on-surface-variant">Data DEMO: harga, stok &amp; rating bukan data resmi pemasok.</p>{CATALOG_CATEGORIES.map((category)=> <label key={category.key} className={`flex items-center gap-2 ${category.supported ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}><input type="checkbox" className="accent-primary" checked={selectedCategories.includes(category.key)} disabled={!category.supported} onChange={()=>toggleCategory(category.key)}/>{category.label}{!category.supported&&<span className="text-label-caption text-outline">(data contoh belum tersedia)</span>}</label>)}</div>
          <div className="space-y-2"><h3 className="text-title-sm font-semibold">Rentang Harga (Rp)</h3><input className="w-full accent-primary" type="range" min="5000" max="150000" step="5000" value={maxPrice} aria-label="Harga maksimum" onChange={e=>{setMaxPrice(Number(e.target.value));setPage(1)}}/><div className="flex justify-between text-body-sm"><span>Rp 5.000</span><strong>Rp {maxPrice.toLocaleString('id-ID')}</strong></div><div className="flex flex-wrap gap-1"><button type="button" className="fc-filter-chip" onClick={()=>{setMaxPrice(20000);setPage(1);}}>&lt; Rp 20.000</button><button type="button" className="fc-filter-chip" onClick={()=>{setMaxPrice(50000);setPage(1);}}>Rp 20k–50k</button><button type="button" className="fc-filter-chip" onClick={()=>{setMaxPrice(150000);setPage(1);}}>&gt; Rp 50.000</button></div></div>
          <div className="space-y-2"><h3 className="text-title-sm font-semibold">Penawaran</h3><label className="flex items-center gap-2 text-body-md"><input type="checkbox" className="accent-primary" checked={promo} onChange={e=>{setPromo(e.target.checked);setPage(1);}}/>Promo (produk berdiskon)</label></div>
          <div className="space-y-2"><h3 className="text-title-sm font-semibold">Sertifikasi & Tani</h3><label className="flex items-center gap-2 text-body-md"><input type="checkbox" className="accent-primary" checked={organic} onChange={e=>{setOrganic(e.target.checked);setPage(1);}}/>100% Organik</label><label className="flex items-center gap-2 text-body-md"><input type="checkbox" className="accent-primary" checked={hydroponic} onChange={e=>{setHydroponic(e.target.checked);setPage(1);}}/>Hidroponik Segar</label><label className="flex items-center gap-2 text-body-md"><input type="checkbox" className="accent-primary" checked={pesticideFree} onChange={e=>{setPesticideFree(e.target.checked);setPage(1);}}/>Bebas Pestisida</label></div>
          <div className="space-y-2"><h3 className="text-title-sm font-semibold">Ketersediaan</h3><label className="flex items-center gap-2 text-body-md"><input type="radio" name="availability" checked={available==='all'} onChange={()=>{setAvailable('all');setPage(1);}} className="accent-primary"/>Semua</label><label className="flex items-center gap-2 text-body-md"><input type="radio" name="availability" checked={available==='available'} onChange={()=>{setAvailable('available');setPage(1);}} className="accent-primary"/>Stok Tersedia</label></div>
          <div className="space-y-2"><h3 className="text-title-sm font-semibold">Rating Kepuasan</h3><label className="flex items-center gap-2 text-body-md"><input type="checkbox" checked={rating} onChange={e=>{setRating(e.target.checked);setPage(1);}} className="accent-primary"/>⭐ 4.0 ke atas</label></div>
          <div className="rounded-lg bg-surface-container-high p-space-md text-body-sm"><strong className="text-primary">🚚 Subsidi Ongkir</strong><p className="mt-1 text-on-surface-variant">Belanja sayuran minimal Rp 75.000, hemat ongkir instan Rp 15.000!</p></div>
        </aside>
        <section className="space-y-space-md">
          <div className="fc-catalog-grid">{visible.map(p=><ProductCard key={p.id} product={p}/>)}</div>
          {visible.length===0&&<div className="rounded-xl bg-white p-10 text-center"><h3 className="text-title-md font-semibold">Produk tidak ditemukan</h3><p className="mt-2 text-body-sm text-on-surface-variant">{query ? `Tidak ada hasil untuk “${query}”. Coba kata kunci lain.` : unsupportedSelected.length ? 'Kategori yang dipilih belum tersedia pada data contoh.' : 'Coba ubah filter pencarian.'}</p><button type="button" className="mt-4 rounded-lg bg-primary px-4 py-2 text-white" onClick={reset}>Reset Filter</button></div>}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-space-md shadow-sm"><p className="text-body-sm text-on-surface-variant">Menampilkan <strong>{filtered.length?((page-1)*pageSize+1):0}–{Math.min(page*pageSize,filtered.length)}</strong> dari <strong>{filtered.length}</strong> produk contoh</p><div className="flex items-center gap-1"><button type="button" disabled={page<=1} onClick={()=>setPage(p=>p-1)} aria-label="Halaman sebelumnya" className="rounded-lg bg-surface-container px-3 py-2 disabled:opacity-40">‹</button><span className="px-3 py-2 text-title-sm" aria-live="polite">{page} / {totalPages}</span><button type="button" disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)} aria-label="Halaman berikutnya" className="rounded-lg bg-primary px-3 py-2 text-white disabled:opacity-40">›</button></div></div>
        </section>
      </div>
      <div className="grid grid-cols-1 gap-space-md sm:grid-cols-3"><div className="rounded-lg bg-surface-container-low p-space-md"><strong>Panen Tiap Pagi</strong><p className="text-body-sm text-on-surface-variant">Dipanen jam 05:00 WIB, dikirim hari yang sama.</p></div><div className="rounded-lg bg-surface-container-low p-space-md"><strong>Garansi 100% Segar</strong><p className="text-body-sm text-on-surface-variant">Sayur layu saat sampai? Langsung kami ganti baru.</p></div><div className="rounded-lg bg-surface-container-low p-space-md"><strong>Mitra Tani Terverifikasi</strong><p className="text-body-sm text-on-surface-variant">Pilihan produk segar dari mitra tani.</p></div></div>
    </div>
  );
}

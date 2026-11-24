import { updateHeaderCart, subscribeCart } from './cart-store.js';
import { updateHeaderWishlist, subscribeWishlist } from './wishlist-store.js';
import { showToast } from './toast.js';

async function injectPartial(targetId, url) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Gagal memuat ${url}: ${response.status}`);
  target.innerHTML = await response.text();
}

export async function initLayout() {
  try {
    await Promise.all([
      injectPartial('site-header', '/partials/header.html'),
      injectPartial('site-footer', '/partials/footer.html')
    ]);
    const page = document.getElementById('site-header')?.dataset.activePage || '';
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const categoryMap = { sayur: 'sayur-segar', buah: 'buah-buahan', daging: 'daging-dan-unggas', 'hasil-laut': 'hasil-laut', susu: 'susu-dan-telur', sembako: 'sembako', minuman: 'minuman' };
    let activeKey = '';
    const onProductsPage = page === 'products' || path.endsWith('/pages/products.html');
    const onRecipesPage = page === 'recipes' || path.endsWith('/pages/recipes.html') || path.endsWith('/recipes.html');
    if (onRecipesPage) {
      activeKey = 'resep-dapur';
    } else if (onProductsPage) {
      if (params.get('promo') === 'true') activeKey = 'promo-spesial';
      else if (params.get('organic') === 'true') activeKey = 'organik';
      else activeKey = categoryMap[(params.get('category') || 'sayur').toLowerCase()] || '';
    }
    document.querySelectorAll('nav[data-active-classes] a').forEach((link) => {
      link.classList.remove('bg-primary-container', 'text-on-primary-container', 'font-bold', 'rounded-lg');
      link.classList.add('text-on-surface-variant', 'hover:text-on-surface');
      link.removeAttribute('aria-current');
    });
    if (activeKey) {
      const active = document.querySelector(`[data-path="${activeKey}"]`);
      if (active) {
        active.classList.remove('text-on-surface-variant', 'hover:text-on-surface');
        active.classList.add('bg-primary-container', 'text-on-primary-container', 'font-bold', 'rounded-lg');
        active.setAttribute('aria-current', 'page');
      }
    }
    const search = document.getElementById('global-search');
    const newsletter = document.querySelector('[data-newsletter-form]');
    newsletter?.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = newsletter.querySelector('input[type="email"]');
      if (input) input.value = '';
      showToast('Terima kasih, Anda sudah berlangganan! (demo)');
    });
    const goSearch = () => {
      const query = search?.value?.trim();
      if (query) window.location.href = `/pages/products.html?q=${encodeURIComponent(query)}`;
    };
    const searchForm = document.querySelector('[role="search"]');
    if (searchForm) {
      searchForm.addEventListener('submit', (event) => { event.preventDefault(); goSearch(); });
    } else {
      search?.addEventListener('keydown', (event) => { if (event.key === 'Enter') goSearch(); });
      document.getElementById('global-search-button')?.addEventListener('click', goSearch);
    }
    const searchToggle = document.getElementById('mobile-search-toggle');
    const searchPanel = document.getElementById('global-search-panel');
    if (searchToggle && searchPanel) {
      const setSearchOpen = (open) => {
        searchPanel.classList.toggle('is-open', open);
        searchToggle.setAttribute('aria-expanded', String(open));
        searchToggle.setAttribute('aria-label', open ? 'Sembunyikan pencarian' : 'Tampilkan pencarian');
        if (open) search?.focus();
      };
      searchToggle.addEventListener('click', () => {
        setSearchOpen(!searchPanel.classList.contains('is-open'));
      });
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && searchPanel.classList.contains('is-open')) {
          setSearchOpen(false);
          searchToggle.focus();
        }
      });
    }
    updateHeaderCart();
    subscribeCart(updateHeaderCart);
    updateHeaderWishlist();
    subscribeWishlist(updateHeaderWishlist);
  } catch (error) {
    console.error('Shared layout gagal dimuat:', error);
    showToast('Header/footer tidak dapat dimuat. Periksa server lokal.');
  }
}

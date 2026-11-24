import { addToCart } from '../shared/cart-store.js';

export function initHomeCountdown() {
  const h = document.getElementById('fs-hours');
  const m = document.getElementById('fs-minutes');
  const s = document.getElementById('fs-seconds');
  if (!h || !m || !s) return;
  let remaining = 4 * 3600 + 12 * 60 + 35;
  const render = () => {
    h.textContent = String(Math.floor(remaining / 3600)).padStart(2,'0');
    m.textContent = String(Math.floor((remaining % 3600) / 60)).padStart(2,'0');
    s.textContent = String(remaining % 60).padStart(2,'0');
    if (remaining > 0) remaining -= 1;
  };
  render();
  window.setInterval(render, 1000);
}

export function initRecipeQuickAdd() {
  document.querySelectorAll('[data-recipe-add]').forEach((button) => {
    button.addEventListener('click', () => {
      const price = Number((button.dataset.recipePrice || '0').replace(/\D/g, ''));
      addToCart({
        id: button.dataset.recipeId,
        name: button.dataset.recipeName || 'Paket Resep FreshCart',
        price,
        image: button.dataset.recipeImage || '',
        category: 'Paket Resep',
        weight: 'Paket'
      });
    });
  });
}

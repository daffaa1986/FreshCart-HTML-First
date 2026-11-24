let timer;
export function showToast(message) {
  let toast = document.getElementById('fc-toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'fc-toast'; toast.className = 'fc-toast'; toast.setAttribute('role','status'); toast.setAttribute('aria-live','polite'); document.body.appendChild(toast); }
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(timer);
  timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2500);
}
window.addEventListener('freshcart:toast', (event) => showToast(event.detail || 'Berhasil'));

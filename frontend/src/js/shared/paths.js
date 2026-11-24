// Shared path helpers for GitHub Pages project-site deployment.
// Vite injects import.meta.env.BASE_URL from the configured `base`.
// In local dev it is "/", in production it is "/FreshCart-HTML-First/".
const BASE = (import.meta.env && import.meta.env.BASE_URL) || '/';

export const BASE_URL = BASE.endsWith('/') ? BASE : `${BASE}/`;

export function withBase(path) {
  if (!path) return BASE_URL;
  // Preserve query string and hash.
  const match = String(path).match(/^([^?#]*)(.*)$/);
  const pathname = match ? match[1] : String(path);
  const rest = match ? match[2] : '';
  const clean = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  return `${BASE_URL}${clean}${rest}`;
}

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';

const root = resolve(import.meta.dirname);
function findHtmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(full);
    return entry.isFile() && entry.name.endsWith('.html') ? [full] : [];
  });
}

const BASE = '/FreshCart-HTML-First/';

// Rewrite root-absolute navigation links (href="/pages/..." and href="/index.html")
// to respect the configured base path. Only navigation paths are touched; Vite's
// own asset URLs (already base-prefixed or hashed) are left untouched.
function rewriteBaseLinksPlugin() {
  return {
    name: 'freshcart-rewrite-base-links',
    transformIndexHtml(html) {
      return html.replace(/href="\/(pages\/|index\.html)/g, `href="${BASE}$1`);
    },
  };
}

export default defineConfig({
  base: BASE,
  root,
  plugins: [react(), rewriteBaseLinksPlugin()],
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  build: {
    rollupOptions: {
      input: [resolve(root, 'index.html'), ...findHtmlFiles(resolve(root, 'pages'))],
    },
  },
});

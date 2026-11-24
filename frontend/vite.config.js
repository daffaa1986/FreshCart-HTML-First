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

export default defineConfig({
  root,
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  build: {
    rollupOptions: {
      input: [resolve(root, 'index.html'), ...findHtmlFiles(resolve(root, 'pages'))],
    },
  },
});

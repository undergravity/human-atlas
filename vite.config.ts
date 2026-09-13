import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/postcss';

const path=(relative:string)=>fileURLToPath(new URL(relative,import.meta.url));

export default defineConfig({
  root: path('./web'),
  publicDir: path('./public'),
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate', 
      includeAssets: ['favicon.svg'], 
      manifest: false,
      workbox: {
        runtimeCaching: [{
          urlPattern: /^\/models\/.*\.(draco|json)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'models-cache',
            expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            cacheableResponse: { statuses: [0, 200] }
          }
        }]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': path('./')
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  server: {
    watch: {
      usePolling: true
    }
  },
  build: {
    outDir: path('./dist'),
    emptyOutDir: true
  }
});

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
      manifest: { 
        name: 'Human Atlas 3D', 
        short_name: 'Atlas', 
        description: 'Interactive 3D Anatomy Atlas', 
        theme_color: '#0a0f14', 
        background_color: '#0a0f14', 
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' }, 
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }, 
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ] 
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

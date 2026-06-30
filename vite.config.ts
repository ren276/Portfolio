import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';
import { robots } from 'vite-plugin-robots';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    // Sourcemaps off in production — reduces bundle size and avoids exposing source
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        // Manual chunks: split heavy dependencies so they can be lazy-loaded
        manualChunks: {
          'gsap': ['gsap'],
          'lottie': ['vue3-lottie'],
          'vue-vendor': ['vue', '@vueuse/core'],
        },
      },
    },
  },
  plugins: [
    tailwindcss(),
    vue(),
    robots(),
    sitemap({
      hostname: 'https://www.sandeshverma.dev/',
      changefreq: 'monthly',
      priority: 1,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api/counter': {
        target: 'https://api.counterapi.dev/v2/sandesh-vermas-team-4624/sandyport_visits',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/counter/, ''),
      },
    },
    watch: {
      usePolling: true,
    },
  },
  optimizeDeps: {
    exclude: ['@tailwindcss/vite'],
    force: true,
  },
});

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import sitemap from 'vite-plugin-sitemap';
import { robots } from 'vite-plugin-robots';
import tailwindcss from '@tailwindcss/vite';

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
      '@': '/src',
    },
  },
  server: {
    proxy: {
      '/api/visit-count': {
        target: 'https://api.counterapi.dev/v1/sandeshverma-portfolio/visits',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/visit-count/, '')
      },
      '/api/visit': {
        target: 'https://api.counterapi.dev/v1/sandeshverma-portfolio/visits/up',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/visit/, '')
      }
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

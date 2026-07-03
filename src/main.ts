import './style.css';
import App from './App.vue';
import { createApp } from 'vue';
import Lenis from 'lenis';
import router from './router';

// smooth scroll
const lenis = new Lenis({
  duration: 0.8,
});
function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

const app = createApp(App);
import { inject } from '@vercel/analytics';

inject();
app.use(router);
app.mount('#app');

export { raf, lenis };

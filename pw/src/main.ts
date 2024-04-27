import './assets/main.css';
import './global.css';

import { createApp } from 'vue';
import App from './App.vue';

try {
  const app = createApp(App);
  app.mount('#app');
} catch (error) {
  console.error('Error mounting Vue app:', error);
}

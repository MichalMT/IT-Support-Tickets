import '@fortawesome/fontawesome-free/css/all.css';
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './axios';

const app = createApp(App)

app.use(router)

app.mount('#app')

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast, { TYPE } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import App from './App.vue';
import router from './router';

import '@/assets/main.scss';

const options = {
  toastClassName: 'alert',
  hideProgressBar: true,
  closeButtonClassName: 'text-neutral',
  toastDefaults: {
    [TYPE.INFO]: { toastClassName: 'alert-info' },
    [TYPE.SUCCESS]: { toastClassName: 'alert-success' },
    [TYPE.INFO]: { toastClassName: 'alert-info' },
    [TYPE.ERROR]: { toastClassName: 'alert-error' },
    [TYPE.WARNING]: { toastClassName: 'alert-warning' },
  },
};

const app = createApp(App);

app.use(createPinia()).use(Toast, options).use(router).mount('#app');

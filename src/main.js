import './assets/main.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'



const app = createApp(App)
app.use(ElementPlus);
Object.keys(ElementPlusIconsVue).forEach((icon) => {
    app.component(icon, ElementPlusIconsVue[icon]);
});
app.use(createPinia())
app.use(router)
app.mount('#app')

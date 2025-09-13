import './assets/scss/base.css'
import 'element-plus/dist/index.css'
import i18n from './locals'
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { install } from "vue3-recaptcha-v2"


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(install, {
  sitekey: "6LcMZR0UAAAAALgPMcgHwga7gY5p8QMg1Hj-bmUv",
  cnDomains: true,
});
app.mount('#app')

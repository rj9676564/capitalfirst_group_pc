// index.js
import { createI18n } from 'vue-i18n'
import en from './en'
import hk from './hk'

const messages = {
  en,
  hk,
}
if(!localStorage.getItem('lang')) localStorage.setItem('lang','en')
const language = (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言
const i18n = createI18n({
  locale: localStorage.getItem('lang') || language.split('-')[0] || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'en', // 设置备用语言
  messages,
  globalInjection:true,
  legacy:false,
  silentFallbackWarn:true,
  silentTranslationWarn:true
})

export default i18n


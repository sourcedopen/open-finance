// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n'],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./app/tailwind.css"],
  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'mr', name: 'मराठी' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      fallbackLocale: 'en',
    },
  },
})


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [    '@/assets/css/tailwind.css' // Путь к вашему файлу Tailwind
  ],

  modules: ['nuxt-telegram-auth'  ],


  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  nitro: {
    routeRules: {
      '/data/:shortId': { cors: true },
    },
  },

  
  runtimeConfig: {
    // Доступно только на сервере
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
    // Доступно на клиенте через useRuntimeConfig()
    
  },

  

})
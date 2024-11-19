// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: [
    '@/assets/css/tailwind.css', // Путь к вашему файлу Tailwind
  ],

  


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

  modules: ['nuxt-telegram-auth',
    '@nuxtjs/dotenv',


  ],
  

})
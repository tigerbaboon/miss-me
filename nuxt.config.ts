// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-07-03",
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],

    routeRules: {
    '/api/proxy/**': {
      proxy: 'http://loyalty-privilege-coupon-api.uat-gcp-trueyou-bn.slp.trueyou.co.th/**'
    }
  }
});

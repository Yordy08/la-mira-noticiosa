// nuxt.config.ts
export default defineNuxtConfig({
  devtools: true,
  nitro: {
    plugins: [],
  },
  typescript: {
    strict: true
  },
  runtimeConfig: {
    // Lo puedes usar si necesitas tu conexión Mongo por variables de entorno
    mongodbUrl: process.env.DATABASE_URL,
    public: {},
  },
})

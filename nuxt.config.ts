export default defineNuxtConfig({
  // 🔴 Quita el logo/badge de Nuxt en desarrollo
  devtools: { enabled: false },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
    'animate.css'
  ],

  plugins: ['~/plugins/bootstrap.client.ts'],

  runtimeConfig: {
    // 🔐 SOLO backend (no se expone al frontend)
    MONGO_URI: process.env.DATABASE_URL,
    MONGO_DB: process.env.DATABASE_NAME,

    // 🌍 Público (frontend)
    public: {
      emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
      emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
      emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY
    }
  }
})

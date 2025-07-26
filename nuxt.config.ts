export default defineNuxtConfig({
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
    'animate.css'
  ],
  plugins: ['~/plugins/bootstrap.client.ts'],
  
  // 👇 Esta parte es lo que debes CORREGIR
  runtimeConfig: {
    // ✅ Variables privadas (solo accesibles en el backend)
    MONGO_URI: process.env.DATABASE_URL,
    MONGO_DB: process.env.DABASE_NAME,

    // ✅ Variables públicas (para el frontend)
    public: {
      emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
      emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
      emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY
    }
  }
})

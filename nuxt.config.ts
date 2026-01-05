// nuxt.config.ts
export default defineNuxtConfig({
  // 🔴 Quita el badge de Nuxt
  devtools: { enabled: false },

  // CSS
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
    'animate.css'
  ],

  // Plugins
  plugins: ['~/plugins/bootstrap.client.ts'],

  // Favicon
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: 'https://res.cloudinary.com/dxgbnimmk/image/upload/v1767576011/592362856_1608730623429973_850172643014552373_n_pe6erk.jpg'
        }
      ]
    }
  },

  // Variables de entorno
  runtimeConfig: {
    // Privadas (solo server)
    MONGO_URI: process.env.DATABASE_URL,
    MONGO_DB: process.env.DATABASE_NAME,

    // Públicas (cliente + server)
    public: {
      emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
      emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
      emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY,

      // URL base para fetch (opcional si tu API es externa)
      apiBase: process.env.VITE_API_URL || 'http://localhost:3000'
    }
  },

  // ✅ Quitamos proxy innecesario
  vite: {
    server: {
      // proxy solo si realmente necesitas apuntar a un backend externo
      // proxy: {
      //   '/api': process.env.VITE_API_URL || 'http://localhost:3000'
      // }
    }
  }
})

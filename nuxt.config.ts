export default defineNuxtConfig({
  // 🔴 Quita el badge de Nuxt
  devtools: { enabled: false },

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.min.css',
    'animate.css'
  ],

  plugins: ['~/plugins/bootstrap.client.ts'],

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

  runtimeConfig: {
    MONGO_URI: process.env.DATABASE_URL,
    MONGO_DB: process.env.DATABASE_NAME,

    public: {
      emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
      emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
      emailjsPublicKey: process.env.EMAILJS_PUBLIC_KEY
    }
  }
})

// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-08-24',
  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],

  app: {
    head: {
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css' 
        }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          tagPosition: 'bodyClose'
        }
      ]
    }
  },
  runtimeConfig: {
    // Todo lo que pongas dentro de 'public' estará disponible en el frontend
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:9093'
    }
  }
})
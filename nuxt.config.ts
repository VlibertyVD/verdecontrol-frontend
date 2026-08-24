// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  // Opcional: Si necesitas el Javascript de Bootstrap (para modales, navbars colapsables, etc.)
  app: {
    head: {
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
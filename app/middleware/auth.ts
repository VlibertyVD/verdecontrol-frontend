// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Buscamos si existe la cookie de autenticación
  const authCookie = useCookie('auth_token')

  // Si no hay cookie y está intentando ir a cualquier lado que no sea login/register, lo pateamos al login
  if (!authCookie.value) {
    return navigateTo('/login')
  }
})
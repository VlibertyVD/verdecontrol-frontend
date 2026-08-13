<!-- app/layouts/dashboard.vue -->
<template>
  <div class="container-fluid min-vh-100 bg-light p-0 font-sans text-dark">
    <div class="row g-0 min-vh-100">
      
      <!-- SIDEBAR LATERAL FIJO -->
      <div class="col-md-2 bg-white border-end d-flex flex-column pt-4 px-3 min-vh-100 position-sticky top-0" style="height: 100vh; overflow-y: auto;">
        
        <!-- Logo -->
        <div class="d-flex align-items-center gap-2 fw-bold mb-4 px-2" style="color: #0B4F36;">
          <div class="d-flex align-items-center justify-content-center text-white rounded" style="width: 24px; height: 24px; background-color: #0B4F36; font-size: 12px;">V</div>
          <span class="fs-5">VerdeControl</span>
        </div>
        
        <button class="btn text-white fw-medium w-100 mb-4" style="background-color: #0B4F36;">+ New Report</button>

        <ul class="nav flex-column gap-2 mb-auto text-secondary small fw-medium">
          <li class="nav-item">
            <NuxtLink to="/home" class="nav-link px-2 text-dark" exact-active-class="bg-success text-white rounded" style="exact-active-class: background-color: #0B4F36;">🎛️ Home (Timers)</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/map" class="nav-link px-2 text-dark" exact-active-class="bg-success text-white rounded" style="exact-active-class: background-color: #0B4F36;">🗺️ Map</NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink to="/companies" class="nav-link px-2 text-dark" exact-active-class="bg-success text-white rounded" style="exact-active-class: background-color: #0B4F36;">🏢 Companies</NuxtLink>
          </li>
          <li class="nav-item"><a href="#" class="nav-link text-secondary px-2">⚙️ Settings</a></li>
        </ul>

        <!-- Botón de Logout -->
        <div class="border-top pt-3 pb-4">
          <a href="#" class="nav-link text-secondary px-2 small mb-2">❓ Help</a>
          <button @click="handleLogout" class="nav-link text-secondary px-2 small border-0 bg-transparent text-start w-100">🚪 Log Out</button>
        </div>
      </div>

      <div class="col-md-10">
        
        <slot /> 
      </div>

    </div>
  </div>

</template>

<script setup>
const router = useRouter()

// Lógica del Logout
const handleLogout = () => {
  // 1. Borramos la "galleta" (cookie) de sesión
  const authCookie = useCookie('auth_token')
  authCookie.value = null
  
  // 2. Redirigimos al usuario al login
  router.push('/login')
}
</script>
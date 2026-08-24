<!-- app/pages/home.vue -->
<template>
  <div class="p-5">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-end mb-5">
      <div>
        <h1 class="fw-bold mb-2" style="color: #0B4F36;">Home / Timer Management</h1>
        <p class="text-secondary mb-0">Monitor the maintenance cycles of green areas. Set reminders and mark tasks as completed.</p>
      </div>
      <div class="d-flex gap-2">
        <div class="input-group" style="width: 250px;">
          <span class="input-group-text bg-light border-end-0">🔍</span>
          <input type="text" class="form-control border-start-0 bg-light" placeholder="Search area...">
        </div>
        <button class="btn btn-outline-secondary bg-white px-4">≡ Filters</button>
      </div>
    </div>

    <h4 class="fw-bold border-bottom pb-2 mb-4">🏢 EcoTech Facilities</h4>

    <div class="row g-4">
      <div v-if="isLoading" class="text-secondary">Cargando timers...</div>
      
      <div v-for="timer in timers" :key="timer.id" class="col-md-6 col-lg-5">
        <div class="card border-0 shadow-sm rounded-4 h-100" style="border-top: 4px solid !important;" :style="timer.days_left <= 0 ? 'border-color: #dc3545 !important;' : 'border-color: #F98E2B !important;'">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h6 class="fw-bold mb-1">{{ timer.name }}</h6>
                <p class="text-secondary small mb-0">📍 {{ timer.location_details || 'Sin ubicación' }}</p>
              </div>
              <span class="badge" :class="timer.days_left <= 0 ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning-dark'">
                {{ timer.timer_status }}
              </span>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-4">
              <div class="rounded-circle d-flex flex-column align-items-center justify-content-center border" 
                   :class="timer.days_left <= 0 ? 'border-danger border-4' : 'border-warning border-4'"
                   style="width: 100px; height: 100px;">
                <span class="fs-2 fw-bold" :class="timer.days_left <= 0 ? 'text-danger' : 'text-dark'">{{ timer.days_left }}</span>
                <span class="small text-secondary">Days</span>
              </div>
              
              <div class="text-end">
                <p class="small text-secondary mb-1">Next maintenance:</p>
                <p class="fw-bold mb-2">{{ timer.days_left <= 0 ? 'Today' : timer.next_maintenance }}</p>
                <button class="btn btn-sm px-4 rounded-pill fw-medium" :class="timer.days_left <= 0 ? 'btn-success' : 'btn-outline-secondary'">
                  ✓ Completed
                </button>
              </div>
            </div>

            <div class="border-top pt-3 d-flex justify-content-between align-items-center">
              <span class="small text-secondary">Automatic Reminder</span>
              <select v-model="timer.reminder_frequency" class="form-select form-select-sm border-0 bg-light w-auto fw-medium text-secondary">
                <option value="Weekly">Weekly</option>
                <option value="Fortnightly">Fortnightly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// MAGIA: Aquí le decimos a la página qué Layout usar y qué guardia de seguridad usar
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const timers = ref([])
const isLoading = ref(true)

const fetchTimers = async () => {
  try {
    const authCookie = useCookie('auth_token')
    
    const data = await $fetch('${config.public.apiBase}/api/timers', {
      // Le inyectamos el token en las cabeceras HTTP
      headers: {
        Authorization: `Bearer ${authCookie.value}`
      }
    })
    timers.value = data
  } catch (error) {
    console.error("Error cargando:", error)
    // Opcional: Si el backend rechaza el token (expiró), lo mandamos al login
    if (error.response?.status === 401) {
      useRouter().push('/login')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.bg-danger-subtle { background-color: #f8d7da !important; }
.bg-warning-subtle { background-color: #fff3cd !important; }
.text-warning-dark { color: #856404 !important; }
</style>
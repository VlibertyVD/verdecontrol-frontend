<template>
  <div class="container-fluid min-vh-100 p-0 bg-white">
    <div class="row g-0 min-vh-100">
      
      <!-- Columna Izquierda: Formulario -->
      <div class="col-lg-6 d-flex flex-column justify-content-center align-items-center p-5">
        <div style="max-width: 450px; width: 100%;">
          
          <h1 class="fw-bold mb-2" style="color: #0B4F36;">Join VerdeControl</h1>
          <p class="text-secondary mb-4 small">Precision management for your living assets. Create your corporate account to get started.</p>

          <!-- Formulario: el @submit.prevent evita que la página recargue -->
          <form @submit.prevent="registerAccount">
            
            <div class="mb-3">
              <label class="form-label small fw-semibold">Full Name</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0 text-muted">👤</span>
                <input v-model="form.full_name" type="text" class="form-control border-start-0 ps-0" placeholder="Jane Doe" required>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label small fw-semibold">Company Email</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0 text-muted">✉️</span>
                <input v-model="form.company_email" type="email" class="form-control border-start-0 ps-0" placeholder="jane.doe@company.com" required>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label small fw-semibold">Company Name</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0 text-muted">🏢</span>
                <input v-model="form.company_name" type="text" class="form-control border-start-0 ps-0" placeholder="Acme Landscaping" required>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label small fw-semibold">Role</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0 text-muted">💼</span>
                <select v-model="form.role" class="form-select border-start-0 ps-0" required>
                  <option value="" disabled>Select your primary role</option>
                  <option value="manager">Facility Manager</option>
                  <option value="operator">Operator</option>
                </select>
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-semibold">Create Password</label>
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0 text-muted">🔒</span>
                <input v-model="form.password" type="password" class="form-control border-start-0 ps-0" placeholder="••••••••" required>
              </div>
              <div class="form-text" style="font-size: 0.7rem;">Password must be at least 8 characters.</div>
            </div>

            <div class="form-check mb-4">
              <input class="form-check-input" type="checkbox" required>
              <label class="form-check-label text-muted" style="font-size: 0.75rem;">
                I agree to the Terms of Service and Privacy Policy.
              </label>
            </div>

            <button type="submit" class="btn text-white w-100 py-2 mb-3 fw-semibold rounded-1" style="background-color: #0B4F36;">
              {{ isLoading ? 'Creating...' : 'Create Account →' }}
            </button>
            
            <!-- Mensajes de estado -->
            <div v-if="successMsg" class="alert alert-success py-2 text-center small">{{ successMsg }}</div>
            <div v-if="errorMsg" class="alert alert-danger py-2 text-center small">{{ errorMsg }}</div>

            <p class="text-center text-secondary small mt-3">
              Already have an account? <NuxtLink to="/login">Sign In</NuxtLink>
            </p>
          </form>
        </div>
      </div>

      <!-- Columna Derecha: Imagen decorativa -->
      <div class="col-lg-6 d-none d-lg-block position-relative bg-dark" style="background-image: url('https://images.unsplash.com/photo-1595180631627-9db07831f24d?q=80&w=1000'); background-size: cover; background-position: center;">
        <!-- Banner flotante sobre la imagen -->
        <div class="position-absolute bottom-0 start-50 translate-middle-x mb-5 w-75 bg-white p-4 rounded-3 shadow-lg d-flex align-items-start gap-3">
          <div class="bg-success rounded p-2 text-white mt-1" style="background-color: #0B4F36 !important;">
            🍃
          </div>
          <div>
            <h5 class="fw-bold mb-1 text-dark">Optimize Your Green Assets</h5>
            <p class="text-secondary small mb-0">Join thousands of facility managers using VerdeControl to track maintenance schedules, monitor soil health, and reduce environmental impact.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// 1. Estado reactivo del formulario
const form = reactive({
  full_name: '',
  company_email: '',
  company_name: '',
  role: '',
  password: ''
})

const isLoading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const registerAccount = async () => {
  isLoading.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {

    const response = await $fetch('http://localhost:9093/api/register', {
      method: 'POST',
      body: form
    })

    if (response.success) {
      successMsg.value = response.message
    }
  } catch (error) {
    errorMsg.value = error.response?._data?.error || 'Error al conectar con el servidor.'
  } finally {
    isLoading.value = false
  }
}
</script>
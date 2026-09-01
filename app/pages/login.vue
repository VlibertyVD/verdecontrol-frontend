<template>
  <div class="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3 font-sans">
    
    <!-- Tarjeta de Login -->
    <div class="card border-0 shadow-sm rounded-4" style="max-width: 420px; width: 100%;">
      <div class="card-body p-5">
        
        <!-- Header -->
        <div class="text-center mb-4">
          <div class="d-inline-flex align-items-center justify-content-center text-white rounded mb-3" style="width: 36px; height: 36px; background-color: #0B4F36; font-size: 18px;">
            <i class="fa-solid fa-leaf"></i>
          </div>
          <h1 class="fw-bold fs-4 mb-1" style="color: #0B4F36;">VerdeControl</h1>
          <p class="text-secondary small">Precision management for living assets.</p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleLogin">
          
          <div class="mb-3">
            <label class="form-label small fw-semibold">Email</label>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0 text-muted">
                <i class="fa-solid fa-envelope fa-fw"></i>
              </span>
              <input v-model="form.email" type="email" class="form-control border-start-0 ps-0" placeholder="name@company.com" required>
            </div>
          </div>

          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <label class="form-label small fw-semibold mb-0">Password</label>
              <a href="#" class="text-decoration-none small text-secondary" style="font-size: 0.75rem;">Forgot password?</a>
            </div>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0 text-muted">
                <i class="fa-solid fa-lock fa-fw"></i>
              </span>
              <input v-model="form.password" type="password" class="form-control border-start-0 ps-0" placeholder="••••••••" required>
            </div>
          </div>

          <!-- Botón Principal -->
          <button type="submit" class="btn text-white w-100 py-2 mb-3 fw-semibold rounded-2" style="background-color: #0B4F36;" :disabled="isLoading">
            <span v-if="isLoading">
              <i class="fa-solid fa-circle-notch fa-spin me-2"></i> Signing In...
            </span>
            <span v-else>
              Sign In <i class="fa-solid fa-arrow-right ms-2"></i>
            </span>
          </button>

          <!-- Mensaje de Error -->
          <div v-if="errorMsg" class="alert alert-danger py-2 text-center small mb-3 border-0">
            <i class="fa-solid fa-circle-exclamation me-2"></i> {{ errorMsg }}
          </div>

          <!-- Divisor -->
          <div class="d-flex align-items-center mb-4 mt-2">
            <hr class="flex-grow-1 text-muted opacity-25">
            <span class="mx-3 text-secondary" style="font-size: 0.75rem;">Or continue with</span>
            <hr class="flex-grow-1 text-muted opacity-25">
          </div>

          <!-- Botones Sociales -->
          <div class="d-flex gap-2 mb-4">
            <button type="button" class="btn btn-outline-secondary w-50 d-flex align-items-center justify-content-center gap-2 py-2 hover-bg-light">
              <i class="fa-brands fa-google fs-6"></i> <span class="small fw-semibold">Google</span>
            </button>
            <button type="button" class="btn btn-outline-secondary w-50 d-flex align-items-center justify-content-center gap-2 py-2 hover-bg-light">
              <i class="fa-brands fa-microsoft fs-6"></i> <span class="small fw-semibold">Microsoft</span>
            </button>
          </div>

          <!-- Footer -->
          <div class="text-center mt-2">
            <p class="text-secondary small mb-0">
              Don't have an account? 
              <NuxtLink to="/register" class="text-dark fw-bold text-decoration-none">Get Started</NuxtLink>
            </p>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const router = useRouter()
const config = useRuntimeConfig()
const form = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  isLoading.value = true
  errorMsg.value = ''

  try {
    const payload = {
      username: form.email,
      password: form.password
    }

    const response = await $fetch(`${config.public.apiBase}/api/token/pair`, {
      method: 'POST',
      body: payload
    })

    if (response.access) {
      const authCookie = useCookie('auth_token')
      authCookie.value = response.access 
      router.push('/home')
    }
  } catch (error) {
    errorMsg.value = error.response?._data?.detail || 'Correo o contraseña incorrectos.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.hover-bg-light:hover {
  background-color: #f8f9fa;
  color: #212529;
}
</style>
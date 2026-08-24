<template>
  <div class="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3 font-sans">
    
    <!-- Tarjeta de Login -->
    <div class="card border-0 shadow-sm rounded-4" style="max-width: 420px; width: 100%;">
      <div class="card-body p-5">
        
        <!-- Header -->
        <div class="text-center mb-4">
          <div class="d-inline-flex align-items-center justify-content-center text-white rounded mb-3" style="width: 36px; height: 36px; background-color: #0B4F36; font-size: 18px; font-weight: bold;">
            V
          </div>
          <h1 class="fw-bold fs-4 mb-1" style="color: #0B4F36;">VerdeControl</h1>
          <p class="text-secondary small">Precision management for living assets.</p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleLogin">
          
          <div class="mb-3">
            <label class="form-label small fw-semibold">Email</label>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0 text-muted">✉️</span>
              <input v-model="form.email" type="email" class="form-control border-start-0 ps-0" placeholder="name@company.com" required>
            </div>
          </div>

          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <label class="form-label small fw-semibold mb-0">Password</label>
              <a href="#" class="text-decoration-none small text-secondary" style="font-size: 0.75rem;">Forgot password?</a>
            </div>
            <div class="input-group">
              <span class="input-group-text bg-white border-end-0 text-muted">🔒</span>
              <input v-model="form.password" type="password" class="form-control border-start-0 ps-0" placeholder="••••••••" required>
            </div>
          </div>

          <!-- Botón Principal -->
          <button type="submit" class="btn text-white w-100 py-2 mb-3 fw-semibold rounded-2" style="background-color: #0B4F36;" :disabled="isLoading">
            {{ isLoading ? 'Signing In...' : 'Sign In →' }}
          </button>

          <!-- Mensaje de Error -->
          <div v-if="errorMsg" class="alert alert-danger py-2 text-center small mb-3 border-0">{{ errorMsg }}</div>

          <!-- Divisor -->
          <div class="d-flex align-items-center mb-4 mt-2">
            <hr class="flex-grow-1 text-muted opacity-25">
            <span class="mx-3 text-secondary" style="font-size: 0.75rem;">Or continue with</span>
            <hr class="flex-grow-1 text-muted opacity-25">
          </div>

          <!-- Botones Sociales -->
          <div class="d-flex gap-2 mb-4">
            <button type="button" class="btn btn-outline-secondary w-50 d-flex align-items-center justify-content-center gap-2 py-2">
              <span class="fs-6">G</span> <span class="small fw-semibold">Google</span>
            </button>
            <button type="button" class="btn btn-outline-secondary w-50 d-flex align-items-center justify-content-center gap-2 py-2">
              <span class="fs-6">M</span> <span class="small fw-semibold">Microsoft</span>
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
    // 1. JWT espera 'username', así que empaquetamos el email con ese nombre
    const payload = {
      username: form.email,
      password: form.password
    }

    // 2. Apuntamos al nuevo endpoint automático de Ninja JWT
    const response = await $fetch('${config.public.apiBase}/api/token/pair', {
      method: 'POST',
      body: payload
    })

    // 3. Si devuelve un token de acceso, el login fue exitoso
    if (response.access) {
      const authCookie = useCookie('auth_token')
      
      // Guardamos el token de acceso (access) en lugar del viejo 'token'
      authCookie.value = response.access 
      
      router.push('/home')
    }
  } catch (error) {
    // 4. JWT manda los mensajes de error dentro de la propiedad 'detail'
    errorMsg.value = error.response?._data?.detail || 'Correo o contraseña incorrectos.'
  } finally {
    isLoading.value = false
  }
}
</script>
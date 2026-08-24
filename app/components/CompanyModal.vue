<!-- app/components/CompanyModal.vue -->
<template>
  <!-- Fondo oscuro semitransparente -->
  <div class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="background: rgba(0,0,0,0.5); z-index: 1050;">
    
    <!-- Tarjeta del Formulario -->
    <div class="card border-0 shadow-lg rounded-4" style="width: 100%; max-width: 500px;">
      
      <!-- Cabecera -->
      <div class="card-header bg-white border-bottom-0 pt-4 pb-0 px-4 d-flex justify-content-between align-items-center">
        <h5 class="fw-bold mb-0" style="color: #0B4F36;">Register New Company</h5>
        <button @click="$emit('close')" type="button" class="btn-close shadow-none"></button>
      </div>

      <!-- Cuerpo del Formulario -->
      <div class="card-body p-4">
        <form @submit.prevent="submitNewCompany">
          
          <div class="mb-3">
            <label class="form-label small fw-semibold text-secondary">Company Name</label>
            <input v-model="form.name" type="text" class="form-control bg-light border-0 py-2" required placeholder="e.g. EcoMantenimiento Urbano">
          </div>
          
          <div class="mb-4">
            <label class="form-label small fw-semibold text-secondary">Email Contact</label>
            <input v-model="form.email" type="email" class="form-control bg-light border-0 py-2" required placeholder="contact@company.com">
          </div>
          
          <div class="row mb-4">
            <div class="col-6">
              <label class="form-label small fw-semibold text-secondary">Company Code</label>
              <input v-model="form.company_code" type="text" class="form-control bg-light border-0 py-2" required placeholder="COMP-0001">
            </div>
            <div class="col-6">
              <label class="form-label small fw-semibold text-secondary">Zone</label>
              <input v-model="form.zone" type="text" class="form-control bg-light border-0 py-2" required placeholder="Zone North">
            </div>
          </div>
          
          <!-- Botones de Acción -->
          <div class="d-flex justify-content-end gap-2 pt-2 border-top mt-2">
            <button type="button" @click="$emit('close')" class="btn btn-light fw-medium px-4">Cancel</button>
            <button type="submit" class="btn text-white fw-medium px-4" style="background-color: #0B4F36;" :disabled="isLoading">
              {{ isLoading ? 'Saving...' : 'Create Company' }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Definimos los eventos que este componente puede enviarle a su padre
const emit = defineEmits(['close', 'created'])
const isLoading = ref(false)

const form = reactive({
  name: '',
  email: '',
  company_code: 'COMP-',
  zone: ''
})

const submitNewCompany = async () => {
  isLoading.value = true
  try {
    const authCookie = useCookie('auth_token')
    
    await $fetch('${config.public.apiBase}/api/companies', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authCookie.value}` },
      body: form
    })
    
    // Si la petición es exitosa, le avisamos a la vista principal que ya terminamos
    emit('created')
  } catch (error) {
    console.error("Error al crear la empresa:", error)
    alert("Hubo un error al crear la empresa. Revisa la consola.")
  } finally {
    isLoading.value = false
  }
}
</script>
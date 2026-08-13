<template>
  <div class="position-absolute top-50 start-50 translate-middle bg-white p-4 rounded-4 shadow-lg border" style="z-index: 2000; width: 400px;">
    <h5 class="fw-bold mb-3" style="color: #0B4F36;">Register New Area</h5>
    
    <div class="alert alert-success py-2 small mb-3">
      📐 Calculated size: <strong>{{ calculatedArea }}</strong>
    </div>

    <div class="mb-3">
      <label class="form-label small fw-semibold text-secondary">Area Name</label>
      <input v-model="form.name" type="text" class="form-control bg-light border-0 py-2" placeholder="e.g. Sector A - North">
    </div>

    <div class="mb-4">
      <label class="form-label small fw-semibold text-secondary">Assign to Company</label>
      <select v-model="form.company_id" class="form-select bg-light border-0 py-2">
        <option value="" disabled>Select a company...</option>
        <option v-for="company in companies" :key="company.id" :value="company.id">
          {{ company.name }}
        </option>
      </select>
    </div>

    <div class="d-flex justify-content-end gap-2">
      <button @click="$emit('cancel')" class="btn btn-light fw-medium px-4">Cancel</button>
      <button @click="saveArea" class="btn text-white fw-medium px-4" style="background-color: #0B4F36;" :disabled="isSaving || !form.name || !form.company_id">
        {{ isSaving ? 'Saving...' : 'Save Area' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  companies: Array,
  polygonCoordinates: Array,
  calculatedArea: String
})

const emit = defineEmits(['cancel', 'saved'])
const isSaving = ref(false)

const form = reactive({
  name: '',
  company_id: '',
  polygon_coordinates: props.polygonCoordinates,
  area_size: props.calculatedArea
})

const saveArea = async () => {
  isSaving.value = true
  try {
    const authCookie = useCookie('auth_token')
    
    // 1. ATRAPAMOS LA RESPUESTA DEL BACKEND EN UNA VARIABLE (const response = ...)
    // (Nota: ajusté el puerto al 9093 según tus logs, cámbialo si usas otro)
    const response = await $fetch('http://localhost:9093/api/green-zones', {
      method: 'POST',
      headers: { Authorization: `Bearer ${authCookie.value}` },
      body: form
    })
    
    // 2. LE INYECTAMOS EL ID AL EVENTO QUE SE ENVÍA AL MAPA
    emit('saved', { 
      id: response.id,  // <--- ¡ESTA ES LA LÍNEA MÁGICA QUE FALTABA!
      name: form.name, 
      area_size: form.area_size, 
      reminder_frequency: 'Weekly' 
    })
  } catch (error) {
    console.error("Error saving area:", error)
  } finally {
    isSaving.value = false
  }
}
</script>
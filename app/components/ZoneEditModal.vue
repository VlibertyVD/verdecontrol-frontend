<template>
  <div class="position-absolute top-50 start-50 translate-middle bg-white p-4 rounded-4 shadow-lg border" style="z-index: 2000; width: 400px;">
    <div class="d-flex justify-content-between align-items-start mb-3">
      <div>
        <h5 class="fw-bold mb-0" style="color: #0B4F36;">{{ zoneData.name }}</h5>
        <small class="text-secondary">Size: {{ zoneData.area_size }}</small>
      </div>
      <button @click="$emit('close')" type="button" class="btn-close shadow-none"></button>
    </div>
    
    <div class="mb-4 mt-3">
      <label class="form-label small fw-semibold text-secondary">Maintenance Frequency</label>
      <select v-model="localFrequency" class="form-select bg-light border-0 py-2">
        <option value="Weekly">Weekly (Every 7 days)</option>
        <option value="Fortnightly">Fortnightly (Every 15 days)</option>
        <option value="Monthly">Monthly (Every 30 days)</option>
      </select>
    </div>

    <div class="d-flex justify-content-end">
      <button @click="updateFrequency" class="btn text-white fw-medium px-4 w-100" style="background-color: #0B4F36;" :disabled="isSaving">
        {{ isSaving ? 'Updating...' : 'Update Maintenance Plan' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  zoneData: Object
})

const emit = defineEmits(['close', 'updated'])
const isSaving = ref(false)

// Clonamos la frecuencia para no mutar el prop directamente antes de guardar
const localFrequency = ref(props.zoneData.reminder_frequency)

const updateFrequency = async () => {
  isSaving.value = true
  try {
    const authCookie = useCookie('auth_token')
    await $fetch(`${config.public.apiBase}/api/green-zones/${props.zoneData.id}/frequency`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authCookie.value}` },
      body: { reminder_frequency: localFrequency.value }
    })
    
    emit('updated', localFrequency.value)
  } catch (error) {
    console.error("Error updating frequency:", error)
  } finally {
    isSaving.value = false
  }
}
</script>
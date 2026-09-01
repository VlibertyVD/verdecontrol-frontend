<template>
  <div class="modal fade show d-block bg-dark bg-opacity-50" tabindex="-1" style="z-index: 1050;">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
        
        <div class="modal-header border-0 bg-light pb-2 pt-4 px-4">
          <h5 class="fw-bold text-dark mb-0">Add New Personnel</h5>
          <button type="button" class="btn-close shadow-none" @click="$emit('close')"></button>
        </div>

        <div class="modal-body px-4 py-4">
          <form @submit.prevent="submitPersonnel">
            
            <div class="mb-3">
              <label class="form-label small fw-semibold text-secondary">Full Name</label>
              <div class="input-group">
                <span class="input-group-text bg-white text-muted border-end-0"><i class="fa-solid fa-user fa-fw"></i></span>
                <input v-model="form.full_name" type="text" class="form-control border-start-0 ps-0 shadow-none" placeholder="e.g. Jonathan Pérez" required>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label small fw-semibold text-secondary">Email Address</label>
              <div class="input-group">
                <span class="input-group-text bg-white text-muted border-end-0"><i class="fa-solid fa-envelope fa-fw"></i></span>
                <input v-model="form.email" type="email" class="form-control border-start-0 ps-0 shadow-none" placeholder="jonathan@company.com" required>
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label small fw-semibold text-secondary">Assigned Role</label>
              <div class="input-group">
                <span class="input-group-text bg-white text-muted border-end-0"><i class="fa-solid fa-briefcase fa-fw"></i></span>
                <select v-model="form.role" class="form-select border-start-0 ps-0 shadow-none" required>
                  <option value="" disabled>Select a role...</option>
                  <option value="Manager">Facility Manager</option>
                  <option value="Operator">Field Operator</option>
                  <option value="Botanist">Botanist</option>
                </select>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-2">
              <button type="button" class="btn btn-light fw-medium px-4" @click="$emit('close')">Cancel</button>
              <button type="submit" class="btn text-white fw-medium px-4" style="background-color: #0B4F36;" :disabled="isLoading">
                <i v-if="isLoading" class="fa-solid fa-spinner fa-spin me-2"></i>
                <span v-else><i class="fa-solid fa-plus me-2"></i>Add Member</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  companyId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['close', 'created'])
const config = useRuntimeConfig()
const isLoading = ref(false)

const form = reactive({
  full_name: '',
  email: '',
  role: ''
})

const submitPersonnel = async () => {
  isLoading.value = true
  try {
    const authCookie = useCookie('auth_token')
    
    // Aquí iría tu endpoint de Django para crear personal
    await $fetch(`${config.public.apiBase}/api/companies/${props.companyId}/personnel`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${authCookie.value}` },
      body: form
    })
    
    emit('created') // Avisa al padre que recargue la lista
  } catch (error) {
    console.error('Error creating personnel:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
<!-- components/CompanyListPanel.vue -->
<template>
  <div class="d-flex flex-column h-100">
    <h1 class="fw-bold mb-4" style="color: #0B4F36;">Companies</h1>
    
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button @click="$emit('create-new')" class="btn btn-sm text-white fw-medium px-3 py-2 rounded-3 shadow-sm" style="background-color: #0B4F36;">
        <i class="fa-solid fa-plus me-1"></i> New Company
      </button>
    </div>

    <!-- Buscador -->
    <div class="input-group mb-4 shadow-sm rounded-3 overflow-hidden">
      <span class="input-group-text bg-white border-0 text-secondary">
        <i class="fa-solid fa-magnifying-glass"></i>
      </span>
      <input type="text" class="form-control border-0 py-2 shadow-none" placeholder="Search company...">
    </div>

    <!-- Lista -->
    <div v-if="isLoading" class="text-secondary small d-flex align-items-center">
      <i class="fa-solid fa-spinner fa-spin me-2"></i> Cargando empresas...
    </div>
    
    <div class="d-flex flex-column gap-3">
      <div 
        v-for="company in companies" 
        :key="company.id"
        @click="$emit('view-detail', company.id)" 
        class="card border p-3 rounded-4 cursor-pointer transition-all"
        :class="selectedId === company.id ? 'border-success bg-light shadow-sm' : 'border-light-subtle bg-white hover-shadow'"
        style="cursor: pointer;"
      >
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-3">
            <div class="rounded p-2 bg-white border d-flex align-items-center justify-content-center" style="width: 45px; height: 45px;">
              <span style="color: #0B4F36;" class="fw-bold fs-6">VC</span>
            </div>
            <div>
              <h6 class="mb-0 fw-bold text-dark">{{ company.name }}</h6>
              <small class="text-secondary">
                <i class="fa-solid fa-location-dot me-1"></i> {{ company.zone || 'Sede Principal' }}
              </small>
            </div>
          </div>
          
          <div>
            <span v-if="activeId === company.id" class="badge bg-success rounded-pill px-3 py-2">
              <i class="fa-solid fa-circle-check me-1"></i> Activa
            </span>
            <button 
              v-else 
              @click.stop="$emit('activate', company)" 
              class="btn btn-outline-success btn-sm rounded-pill px-3 fw-bold"
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  companies: Array,
  isLoading: Boolean,
  selectedId: Number,
  activeId: Number
})

defineEmits(['create-new', 'view-detail', 'activate'])
</script>

<style scoped>
.hover-shadow:hover { box-shadow: 0 .125rem .25rem rgba(0,0,0,.075); }
.transition-all { transition: all 0.2s ease-in-out; }
</style>
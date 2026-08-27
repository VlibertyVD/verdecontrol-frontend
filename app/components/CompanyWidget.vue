<!-- components/CompanyWidget.vue -->
<template>
  <div class="mb-4 bg-light rounded-3 p-3 border border-light-subtle shadow-sm mx-2">
    <div class="text-secondary fw-bold mb-2" style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.5px;">
      Active Workspace
    </div>
    
    <!-- Si hay una empresa seleccionada -->
    <div v-if="currentCompany" class="d-flex align-items-center gap-2">
      <div class="bg-success text-white rounded d-flex align-items-center justify-content-center shadow-sm" style="width: 28px; height: 28px; font-size: 12px; background-color: #0B4F36 !important;">
        <i class="fa-solid fa-building"></i>
      </div>
      <div class="text-truncate">
        <div class="fw-bold text-dark text-truncate" style="font-size: 0.85rem;">
          {{ currentCompany.name }}
        </div>
        <div class="text-secondary" style="font-size: 0.7rem;">
          {{ currentCompany.company_code || 'Manage Plan' }}
        </div>
      </div>
    </div>

    <!-- Si NO hay ninguna empresa seleccionada -->
    <div v-else class="d-flex align-items-center gap-2 text-muted">
      <div class="bg-secondary bg-opacity-10 text-secondary rounded d-flex align-items-center justify-content-center" style="width: 28px; height: 28px; font-size: 12px;">
        <i class="fa-solid fa-circle-exclamation"></i>
      </div>
      <span class="fst-italic fw-medium" style="font-size: 0.8rem;">Select a company</span>
    </div>
  </div>
</template>

<script setup>
// Llamamos a la variable global. Si no existe, arranca en null.
const currentCompany = useState('globalSelectedCompany', () => null)
</script>
<template>
  <div class="p-5 font-sans h-100 bg-white" style="overflow-y: auto;">
    
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-start mb-5">
      <div style="max-width: 600px;">
        <h1 class="fw-bold mb-2" style="color: #0B4F36;">Timer Management</h1>
        <p class="text-secondary mb-0">Monitor the maintenance cycles of green areas. Set reminders and mark tasks as completed to reset timers.</p>
      </div>
      <div class="d-flex gap-3">
        <div class="input-group bg-light rounded-3 overflow-hidden border-0" style="width: 250px;">
          <span class="input-group-text bg-light border-0 text-secondary"><i class="fa-solid fa-magnifying-glass"></i></span>
          <input type="text" class="form-control bg-light border-0 shadow-none" placeholder="Search area...">
        </div>
        <button class="btn btn-outline-secondary rounded-3 fw-medium bg-white">
          <i class="fa-solid fa-bars-staggered me-2"></i> Filters
        </button>
      </div>
    </div>

    <!-- Título de la Empresa Activa -->
    <div v-if="globalCompany" class="mb-4 border-bottom pb-3">
      <h4 class="fw-bold text-dark d-flex align-items-center gap-2 mb-0">
        <i class="fa-regular fa-building fs-5"></i> {{ globalCompany?.name }}
    </h4>
    </div>
    
    <div v-else class="alert alert-warning shadow-sm rounded-4 border-0">
      <i class="fa-solid fa-circle-exclamation me-2"></i> Selecciona una empresa en la barra lateral para ver sus temporizadores.
    </div>

    <!-- Grid de Tarjetas (Ejemplo estático basado en tu backend) -->
    <div v-if="globalCompany" class="row g-4">
      
      <!-- Tarjeta 1: Needs Cutting (Roja) -->
      <div class="col-md-6 col-lg-5">
        <div class="card border-light-subtle rounded-4 shadow-sm h-100" style="border-top: 4px solid #dc3545 !important;">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h6 class="fw-bold mb-1">Main North Garden</h6>
                <small class="text-secondary d-flex align-items-center gap-1">
                  <i class="fa-solid fa-location-dot"></i> Headquarters, Block A
                </small>
              </div>
              <span class="badge bg-danger-subtle text-danger rounded-2 px-2 py-1 fw-medium border border-danger-subtle">
                <i class="fa-solid fa-triangle-exclamation me-1"></i> Needs cutting
              </span>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-4">
              <!-- Anillo SVG -->
              <div class="position-relative d-flex justify-content-center align-items-center" style="width: 100px; height: 100px;">
                <svg viewBox="0 0 36 36" class="position-absolute w-100 h-100">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e9ecef" stroke-width="3"/>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#dc3545" stroke-width="3" stroke-dasharray="100, 100" />
                </svg>
                <div class="text-center">
                  <h3 class="fw-bold mb-0 text-danger">0</h3>
                  <small class="text-secondary" style="font-size: 0.7rem;">Days</small>
                </div>
              </div>

              <div class="text-end">
                <small class="text-secondary d-block mb-1">Next maintenance:</small>
                <div class="fw-bold mb-3">Today</div>
                <button class="btn text-white rounded-3 fw-medium px-4" style="background-color: #0B4F36;">
                  <i class="fa-regular fa-circle-check me-1"></i> Completed
                </button>
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center border-top pt-3 mt-auto">
              <small class="text-secondary fw-medium">Automatic Reminder</small>
              <select class="form-select form-select-sm bg-light border-0 w-auto fw-medium shadow-none">
                <option>Weekly</option>
                <option>Fortnightly</option>
                <option>Monthly</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'dashboard', middleware: 'auth' })

// Conectamos con la empresa seleccionada globalmente
const globalCompany = useState('globalSelectedCompany')
</script>
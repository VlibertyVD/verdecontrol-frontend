<!-- components/CompanyDashboardPanels.vue -->
<template>
  <div class="d-flex flex-column gap-4">
    <!-- Assigned Areas -->
    <div class="card border-0 shadow-sm rounded-4 p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h6 class="fw-bold text-secondary mb-0">ASSIGNED AREAS ({{ company.green_zones?.length || 0 }})</h6>
        <span class="text-secondary" style="cursor: pointer;"><i class="fa-solid fa-expand fs-5 hover-dark"></i></span>
      </div>
      
      <div class="row g-3">
        <div v-for="zone in company.green_zones" :key="zone.id" class="col-md-6">
          <div class="card border-light-subtle rounded-4 overflow-hidden h-100 shadow-sm">
            <div class="bg-secondary w-100" style="height: 100px; background-image: url('/images/card-green-zone.jpeg'); background-size: cover; background-position: center;"></div>
            <div class="p-3">
              <h6 class="fw-bold mb-3">{{ zone.name }}</h6>
              <div class="d-flex justify-content-between align-items-center">
                <span class="small text-secondary">{{ zone.area_size }}</span>
                <span v-if="!zone.needs_attention" class="badge bg-success-subtle text-success rounded-pill px-2 py-1">
                  <i class="fa-solid fa-droplet me-1"></i> {{ zone.current_metric || '100%' }}
                </span>
                <span v-else class="badge bg-danger-subtle text-danger rounded-pill px-2 py-1">
                  <i class="fa-solid fa-triangle-exclamation me-1"></i> Review
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Personnel & Stats -->
    <div class="row g-4">
      <!-- Personnel -->
      <div class="col-md-6">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h6 class="fw-bold text-secondary mb-4">PERSONNEL IN CHARGE</h6>
          <div class="d-flex flex-column gap-3 mb-4">
            <div v-for="person in company.personnel" :key="person.id" class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-3">
                <img :src="person.avatar_url || 'https://ui-avatars.com/api/?name='+person.full_name+'&background=random'" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">
                <div>
                  <h6 class="mb-0 fw-bold fs-6">{{ person.full_name }}</h6>
                  <small class="text-secondary">{{ person.role }}</small>
                </div>
              </div>
              <span class="text-secondary" style="cursor: pointer;"><i class="fa-regular fa-envelope fs-5 hover-dark"></i></span>
            </div>
            <div v-if="!company.personnel || !company.personnel.length" class="text-muted small">No personnel registered.</div>
          </div>
          <button class="btn btn-link text-success text-decoration-none fw-bold mt-auto p-0 text-start" style="color: #0B4F36 !important;">See all personnel</button>
        </div>
      </div>

      <!-- Stats -->
      <div class="col-md-6">
        <div class="card border-0 shadow-sm rounded-4 p-4 h-100">
          <h6 class="fw-bold text-secondary mb-4">MONTHLY STATISTICS</h6>
          <div class="mb-4">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <small class="fw-medium">Task Completion</small>
              <small class="fw-bold">92%</small>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar" role="progressbar" style="width: 92%; background-color: #0B4F36;"></div>
            </div>
          </div>
          <div class="mb-4 border-bottom pb-4">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <small class="fw-medium">Flora Health Average</small>
              <small class="fw-bold text-success">88%</small>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar bg-success" role="progressbar" style="width: 88%;"></div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <span class="small fw-medium text-secondary">
              <i class="fa-solid fa-stopwatch me-1"></i> Next general cut:
            </span>
            <span class="fw-bold">In 3 days</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  company: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.hover-dark:hover { color: #212529 !important; }
</style>
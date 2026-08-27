<!-- components/CompanyHeaderCard.vue -->
<template>
  <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-4">
        <div class="rounded bg-white border d-flex align-items-center justify-content-center shadow-sm" style="width: 80px; height: 80px;">
          <span style="color: #0B4F36;" class="fw-bold fs-3">VC</span>
        </div>
        <div>
          <h3 class="fw-bold mb-1">{{ company.name }}</h3>
          <div class="d-flex align-items-center gap-3">
            <span class="text-secondary small">ID: {{ company.company_code }}</span>
            <span class="badge bg-success-subtle text-success rounded-pill px-3 py-1 fw-medium border border-success-subtle">
              <i class="fa-solid fa-check me-1"></i> {{ company.status || 'Active' }}
            </span>
          </div>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary rounded-3 px-4 fw-medium">Contact</button>
        <button class="btn text-white rounded-3 px-4 fw-medium" style="background-color: #0B4F36;">
          <i class="fa-solid fa-pen-to-square me-1"></i> Edit
        </button>
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
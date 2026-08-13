<template>
  <div class="p-5 font-sans h-100">
    <div class="row g-5 h-100">
      
      <!-- COLUMNA IZQUIERDA: Lista de Empresas -->
      <div class="col-md-4 d-flex flex-column border-end pe-4" style="height: calc(100vh - 100px); overflow-y: auto;">
        <h1 class="fw-bold mb-4" style="color: #0B4F36;">Companies</h1>
        
        <div class="d-flex justify-content-between align-items-center mb-4">
          <button @click="showModal = true" class="btn btn-sm text-white fw-medium px-3 py-2 rounded-3 shadow-sm" style="background-color: #0B4F36;">
          + New Company
          </button>
        </div>

        <!-- Buscador -->
        <div class="input-group mb-4 shadow-sm rounded-3 overflow-hidden">
          <span class="input-group-text bg-white border-0 text-secondary">🔍</span>
          <input type="text" class="form-control border-0 py-2 shadow-none" placeholder="Search company...">
        </div>

        <!-- Lista de Tarjetas -->
        <div v-if="isLoadingList" class="text-secondary small">Cargando empresas...</div>
        
        <div class="d-flex flex-column gap-3">
          <div 
            v-for="company in companies" 
            :key="company.id"
            @click="selectCompany(company.id)"
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
                  <small class="text-secondary">📍 {{ company.zone }}</small>
                </div>
              </div>
              <span class="text-secondary fw-bold">›</span>
            </div>
          </div>
        </div>
      </div>

      <!-- COLUMNA DERECHA: Detalle de Empresa -->
      <div class="col-md-8 ps-4" style="height: calc(100vh - 100px); overflow-y: auto;">
        
        <!-- Estado de carga o sin selección -->
        <div v-if="!selectedId" class="h-100 d-flex align-items-center justify-content-center text-secondary">
          Selecciona una empresa para ver sus detalles.
        </div>
        <div v-else-if="isLoadingDetail" class="h-100 d-flex align-items-center justify-content-center text-secondary">
          Cargando detalles...
        </div>

        <div v-else class="d-flex flex-column gap-4">
          
          <!-- Header Card -->
          <div class="card border-0 shadow-sm rounded-4 p-4">
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-4">
                <div class="rounded bg-white border d-flex align-items-center justify-content-center shadow-sm" style="width: 80px; height: 80px;">
                  <span style="color: #0B4F36;" class="fw-bold fs-3">VC</span>
                </div>
                <div>
                  <h3 class="fw-bold mb-1">{{ companyDetail.name }}</h3>
                  <div class="d-flex align-items-center gap-3">
                    <span class="text-secondary small">ID: {{ companyDetail.company_code }}</span>
                    <span class="badge bg-success-subtle text-success rounded-pill px-3 py-1 fw-medium border border-success-subtle">
                      ✓ {{ companyDetail.status }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary rounded-3 px-4 fw-medium">Contact</button>
                <button class="btn text-white rounded-3 px-4 fw-medium" style="background-color: #0B4F36;">Edit</button>
              </div>
            </div>
          </div>

          <!-- Assigned Areas -->
          <div class="card border-0 shadow-sm rounded-4 p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h6 class="fw-bold text-secondary mb-0">ASSIGNED AREAS ({{ companyDetail.green_zones?.length || 0 }})</h6>
              <span class="text-secondary fs-5" style="cursor: pointer;">⤢</span>
            </div>
            
            <div class="row g-3">
              <div v-for="zone in companyDetail.green_zones" :key="zone.id" class="col-md-6">
                <div class="card border-light-subtle rounded-4 overflow-hidden h-100 shadow-sm">
                  <!-- AQUÍ CAMBIAMOS LA IMAGEN -->
                  <div class="bg-secondary w-100" style="height: 100px; background-image: url('/images/card-green-zone.jpeg'); background-size: cover; background-position: center;"></div>
                  
                  <div class="p-3">
                    <h6 class="fw-bold mb-3">{{ zone.name }}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="small text-secondary">{{ zone.area_size }}</span>
                      <span v-if="!zone.needs_attention" class="badge bg-success-subtle text-success rounded-pill px-2 py-1">💧 {{ zone.current_metric }}</span>
                      <span v-else class="badge bg-danger-subtle text-danger rounded-pill px-2 py-1">⚠️ Review</span>
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
                  
                  <div v-for="person in companyDetail.personnel" :key="person.id" class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-3">
                      <img :src="person.avatar_url || 'https://ui-avatars.com/api/?name='+person.full_name+'&background=random'" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">
                      <div>
                        <h6 class="mb-0 fw-bold fs-6">{{ person.full_name }}</h6>
                        <small class="text-secondary">{{ person.role }}</small>
                      </div>
                    </div>
                    <span class="text-secondary fs-5" style="cursor: pointer;">✉</span>
                  </div>

                  <div v-if="!companyDetail.personnel?.length" class="text-muted small">No personnel registered.</div>
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
                  <span class="small fw-medium text-secondary">⏱ Next general cut:</span>
                  <span class="fw-bold">In 3 days</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
    <CompanyModal 
    v-if="showModal" 
    @close="showModal = false" 
    @created="handleCompanyCreated" 
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

const companies = ref([])
const isLoadingList = ref(true)
const showModal = ref(false)

const handleCompanyCreated = () => {
  showModal.value = false 
  fetchCompanies() 
}
const selectedId = ref(null)
const companyDetail = ref({})
const isLoadingDetail = ref(false)

const getAuthHeaders = () => {
  const authCookie = useCookie('auth_token')
  return { Authorization: `Bearer ${authCookie.value}` }
}

const fetchCompanies = async () => {
  try {
    const data = await $fetch('http://localhost:9093/api/companies', { headers: getAuthHeaders() })
    companies.value = data
    // Seleccionar automáticamente la primera empresa de la lista si existe
    if (data.length > 0) {
      selectCompany(data[0].id)
    }
  } catch (error) {
    console.error("Error cargando lista de empresas:", error)
  } finally {
    isLoadingList.value = false
  }
}

const selectCompany = async (id) => {
  selectedId.value = id
  isLoadingDetail.value = true
  try {
    const data = await $fetch(`http://localhost:9093/api/companies/${id}`, { headers: getAuthHeaders() })
    companyDetail.value = data
  } catch (error) {
    console.error("Error cargando detalles:", error)
  } finally {
    isLoadingDetail.value = false
  }
}

onMounted(() => {
  fetchCompanies()
})
</script>

<style scoped>
.hover-shadow:hover {
  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
}
.transition-all {
  transition: all 0.2s ease-in-out;
}
</style>
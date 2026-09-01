<template>
  <div class="p-5 font-sans h-100">
    <div class="row g-5 h-100">
      
      <!-- COLUMNA IZQUIERDA -->
      <div class="col-md-4 border-end pe-4" style="height: calc(100vh - 100px); overflow-y: auto;">
        <CompanyListPanel 
          :companies="companies"
          :isLoading="isLoadingList"
          :selectedId="selectedId"
          :activeId="activeCompanyId"
          @create-new="showModal = true"
          @view-detail="fetchCompanyDetail"
          @activate="handleActivateCompany"
        />
      </div>

      <!-- COLUMNA DERECHA -->
      <div class="col-md-8 ps-4" style="height: calc(100vh - 100px); overflow-y: auto;">
        
        <!-- Estados de carga o vacío -->
        <div v-if="!selectedId" class="h-100 d-flex flex-column align-items-center justify-content-center text-secondary">
          <i class="fa-solid fa-building fs-1 mb-3 text-muted opacity-50"></i>
          Selecciona una empresa para ver sus detalles.
        </div>
        <div v-else-if="isLoadingDetail" class="h-100 d-flex flex-column align-items-center justify-content-center text-secondary">
          <i class="fa-solid fa-circle-notch fa-spin fs-2 mb-3" style="color: #0B4F36;"></i>
          Cargando detalles...
        </div>

        <!-- El Dashboard de la Empresa -->
        <div v-else>
          <CompanyHeaderCard :company="companyDetail" />
          
          <!-- 🔥 AQUÍ ATRAPAMOS EL EVENTO DEL BOTÓN ADD 🔥 -->
          <CompanyDashboardPanels 
            :company="companyDetail" 
            @add-personnel="showPersonnelModal = true" 
          />
        </div>

      </div>

    </div>
    
    <!-- MODAL EMPRESA -->
    <CompanyModal 
      v-if="showModal" 
      @close="showModal = false" 
      @created="handleCompanyCreated" 
    />

    <!-- 🔥 NUEVO MODAL DE PERSONAL 🔥 -->
    <PersonnelCreateModal 
      v-if="showPersonnelModal"
      :companyId="selectedId"
      @close="showPersonnelModal = false"
      @created="handlePersonnelCreated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

const { 
  companies, 
  isLoadingList, 
  activeCompanyId, 
  fetchCompanies, 
  setActiveCompany 
} = useCompanies()

const { 
  selectedId, 
  companyDetail, 
  isLoadingDetail, 
  fetchCompanyDetail 
} = useCompanyDetail()

const showModal = ref(false)

// 1. Estado para mostrar/ocultar el modal de personal
const showPersonnelModal = ref(false)

const globalCompany = useState('globalSelectedCompany')

// El puente para actualizar la barra lateral y el estado
const handleActivateCompany = async (company) => {
  await setActiveCompany(company.id) 
  globalCompany.value = company 
}

const handleCompanyCreated = () => {
  showModal.value = false 
  fetchCompanies() 
}

// 2. Función que se dispara al crear un empleado con éxito
const handlePersonnelCreated = () => {
  showPersonnelModal.value = false 
  fetchCompanyDetail(selectedId.value) // Refresca los datos en pantalla
}

onMounted(async () => {
  await fetchCompanies()
  if (companies.value.length > 0) {
    fetchCompanyDetail(companies.value[0].id)
  }
})
</script>
export const useCompanies = () => {
  // 1. Variables de estado
  const companies = ref([])
  const isLoadingList = ref(false)
  const activeCompanyId = useCookie('active_company_id', { default: () => null })
  // Helper para los headers (puedes sacarlo a otro composable después si quieres)
  const getAuthHeaders = () => {
    const authCookie = useCookie('auth_token')
    return { Authorization: `Bearer ${authCookie.value}` }
  }

  // 2. Funciones
  const fetchCompanies = async () => {
    isLoadingList.value = true
    try {
      const data = await $fetch('http://localhost:9093/api/companies', { headers: getAuthHeaders() })
      companies.value = data
    } catch (error) {
      console.error("Error cargando lista de empresas:", error)
    } finally {
      isLoadingList.value = false
    }
  }

  const setActiveCompany = async (companyId) => {
    try {
      const response = await $fetch('http://localhost:9093/api/users/active-company', {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: { company_id: companyId }
      })
      if (response.success) {
        activeCompanyId.value = response.active_company_id
      }
    } catch (error) {
      console.error("Error al cambiar de compañía activa:", error)
    }
  }

  // 3. Exportar lo que la vista necesita usar
  return {
    companies,
    isLoadingList,
    activeCompanyId,
    fetchCompanies,
    setActiveCompany
  }
}
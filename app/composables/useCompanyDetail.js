export const useCompanyDetail = () => {
  const selectedId = ref(null)
  const companyDetail = ref({})
  const isLoadingDetail = ref(false)

  // Volvemos a pedirle los datos COMPLETOS al backend
  const fetchCompanyDetail = async (companyId) => {
    selectedId.value = companyId
    isLoadingDetail.value = true
    
    try {
      const authCookie = useCookie('auth_token')
      const data = await $fetch(`http://localhost:9093/api/companies/${companyId}`, { 
        headers: { Authorization: `Bearer ${authCookie.value}` } 
      })
      companyDetail.value = data
    } catch (error) {
      console.error("Error cargando detalles de la empresa:", error)
    } finally {
      isLoadingDetail.value = false
    }
  }

  return {
    selectedId,
    companyDetail,
    isLoadingDetail,
    fetchCompanyDetail
  }
}
export const useMapZones = () => {
  const fetchMapZones = async () => {
    try {
      const authCookie = useCookie('auth_token')
      const zones = await $fetch('http://localhost:9093/api/map-zones', { 
        headers: { Authorization: `Bearer ${authCookie.value}` } 
      })
      return zones
    } catch (error) {
      console.error("Error loading map zones:", error)
      return []
    }
  }

  return { fetchMapZones }
}
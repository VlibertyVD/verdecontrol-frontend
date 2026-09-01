<template>
  <div class="position-relative w-100" style="height: 100vh;">
    <div id="map" class="w-100 h-100 position-absolute top-0 start-0" style="z-index: 1;"></div>

    <div class="position-absolute top-0 start-50 translate-middle-x mt-4" style="z-index: 1000; width: 350px;">
      <div class="input-group shadow bg-white rounded-4 overflow-hidden border border-light-subtle">
        <span class="input-group-text bg-white border-0 text-secondary ps-3">
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input type="text" class="form-control border-0 py-3 shadow-none fw-medium" placeholder="Search green areas...">
      </div>
    </div>

    <ZoneSaveModal 
      v-if="showSaveModal"
      :companies="companies"
      :polygonCoordinates="tempCoordinates"
      :calculatedArea="tempAreaSize"
      @cancel="handleCancelDrawing"
      @saved="handleAreaSaved"
    />

    <ZoneEditModal 
      v-if="showEditModal"
      :zoneData="selectedZone"
      @close="showEditModal = false"
      @updated="handleAreaUpdated"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as turf from '@turf/turf'

definePageMeta({ layout: 'dashboard', middleware: 'auth' })

// 1. IMPORTAMOS NUESTROS COMPOSABLES
const { companies, fetchCompanies } = useCompanies() // Reutilizamos la lógica de empresas
const { fetchMapZones } = useMapZones() // La nueva lógica de zonas

let map = null
let currentDrawnLayer = null

// Variables de UI y Modales
const showSaveModal = ref(false)
const showEditModal = ref(false)
const selectedZone = ref({})
const tempCoordinates = ref([])
const tempAreaSize = ref('')

// 2. FUNCIÓN DE GEOLOCALIZACIÓN
const setMapToUserLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Si acepta, viajamos a sus coordenadas reales con un zoom más cercano (16)
        map.setView([position.coords.latitude, position.coords.longitude], 16)
      },
      (error) => {
        console.warn("Ubicación denegada. Nos quedamos en Mérida por defecto.", error.message)
      },
      { enableHighAccuracy: true, timeout: 5000 }
    )
  }
}

// 3. CARGA DE ZONAS
const loadExistingZones = async (L) => {
  const zones = await fetchMapZones()
  
  zones.forEach(zone => {
    if (!zone.polygon_coordinates || zone.polygon_coordinates.length === 0) return;

    const feature = {
      type: "Feature",
      properties: { ...zone },
      geometry: { type: "Polygon", coordinates: zone.polygon_coordinates }
    }
    
    const layer = L.geoJSON(feature, {
      style: { color: '#0B4F36', fillColor: '#0B4F36', weight: 2, fillOpacity: 0.4 }
    }).addTo(map)
    
    layer.on('click', () => {
      selectedZone.value = { ...zone, reminder_frequency: zone.reminder_frequency || 'Weekly' }
      showEditModal.value = true
      showSaveModal.value = false
    })

    layer.on('contextmenu', (e) => {
      if (e.originalEvent) e.originalEvent.preventDefault() // Bloquea el menú del navegador
      deleteZone(zone.id, layer)
    })    
  })
}

// 4. MANEJADORES DE EVENTOS
const handleCancelDrawing = () => {
  if (currentDrawnLayer) map.removeLayer(currentDrawnLayer)
  showSaveModal.value = false
}

const handleAreaSaved = (savedData) => {
  const savedLayer = currentDrawnLayer // Congelamos la referencia de la capa  
  currentDrawnLayer.setStyle({ color: '#0B4F36', fillColor: '#0B4F36' })
  
  currentDrawnLayer.on('click', () => {
    selectedZone.value = savedData
    showEditModal.value = true
  })

  savedLayer.on('contextmenu', (e) => {
    if (e.originalEvent) e.originalEvent.preventDefault()
    deleteZone(savedData.id, savedLayer)
  })

  showSaveModal.value = false
  currentDrawnLayer = null
}

const handleAreaUpdated = (newFrequency) => {
  selectedZone.value.reminder_frequency = newFrequency
  showEditModal.value = false
}

// 5. INICIALIZACIÓN
onMounted(async () => {
  await fetchCompanies()

  const L = await import('leaflet')
  await import('leaflet/dist/leaflet.css')
  await import('@geoman-io/leaflet-geoman-free')
  await import('@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css')

  // Inicializamos el mapa en Mérida por defecto
  map = L.map('map', { zoomControl: false }).setView([8.5952, -71.1433], 13)
  L.control.zoom({ position: 'bottomright' }).addTo(map)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)

  // Activamos la geolocalización (pedirá permiso al usuario)
  setMapToUserLocation()

  await loadExistingZones(L)

  map.pm.addControls({ drawMarker: false, drawCircleMarker: false, drawPolyline: false, drawRectangle: true, drawPolygon: true, drawCircle: false, editMode: false, dragMode: false, cutPolygon: false, removalMode: true })

  map.on('pm:create', (e) => {
    currentDrawnLayer = e.layer
    const geoJson = currentDrawnLayer.toGeoJSON()
    
    tempCoordinates.value = geoJson.geometry.coordinates
    const areaSqMeters = turf.area(geoJson)
    
    if (areaSqMeters > 10000) {
      tempAreaSize.value = `${(areaSqMeters / 10000).toFixed(2)} Hectares`
    } else {
      tempAreaSize.value = `${areaSqMeters.toFixed(2)} m²`
    }

    showEditModal.value = false
    showSaveModal.value = true
  })
})

// NUEVA FUNCIÓN: Eliminar zona
const deleteZone = async (zoneId, layerToRemove) => {
  const isConfirmed = window.confirm("⚠️ ¿Estás seguro de que deseas eliminar esta zona? Esta acción no se puede deshacer.")
  const config = useRuntimeConfig()
  if (!isConfirmed) return

  try {
    const authCookie = useCookie('auth_token')
    const response = await $fetch(`${config.public.apiBase}/api/green-zones/${zoneId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authCookie.value}` }
    })

    if (response.success) {
      // 1. Quitamos el polígono del mapa al instante
      if (layerToRemove) {
        map.removeLayer(layerToRemove)
      }
      
      // 2. Si tenía el modal de edición abierto de casualidad, lo cerramos
      if (selectedZone.value.id === zoneId) {
        showEditModal.value = false
      }
    }
  } catch (error) {
    console.error("Error al eliminar la zona:", error)
    alert("Hubo un problema intentando eliminar la zona.")
  }
}
</script>
<template>
  <div class="position-relative w-100" style="height: 100vh;">
    <div id="map" class="w-100 h-100 position-absolute top-0 start-0" style="z-index: 1;"></div>

    <div class="position-absolute top-0 start-0 m-4" style="z-index: 1000; width: 350px;">
      <div class="input-group shadow-sm bg-white rounded-3 overflow-hidden">
        <span class="input-group-text bg-white border-0 text-secondary">🔍</span>
        <input type="text" class="form-control border-0 py-3 shadow-none" placeholder="Search green areas...">
      </div>
    </div>

    <!-- Componente 1: Guardar -->
    <ZoneSaveModal 
      v-if="showSaveModal"
      :companies="userCompanies"
      :polygonCoordinates="tempCoordinates"
      :calculatedArea="tempAreaSize"
      @cancel="handleCancelDrawing"
      @saved="handleAreaSaved"
    />

    <!-- Componente 2: Editar -->
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

let map = null
let currentDrawnLayer = null

const userCompanies = ref([])
const showSaveModal = ref(false)
const showEditModal = ref(false)
const selectedZone = ref({})

// Variables temporales para pasar al componente
const tempCoordinates = ref([])
const tempAreaSize = ref('')

const getAuthHeaders = () => {
  const authCookie = useCookie('auth_token')
  return { Authorization: `Bearer ${authCookie.value}` }
}

const fetchCompanies = async () => {
  try {
    userCompanies.value = await $fetch('http://localhost:9093/api/companies', { headers: getAuthHeaders() })
  } catch (error) { console.error(error) }
}

const loadExistingZones = async (L) => {
  try {
    const zones = await $fetch('http://localhost:9093/api/map-zones', { headers: getAuthHeaders() })
console.log("Zonas que llegaron al mapa:", zones) // ¡Mira la consola del navegador!
    zones.forEach(zone => {
      if (!zone.polygon_coordinates || zone.polygon_coordinates.length === 0) {
        return; 
      }

      const feature = {
        type: "Feature",
        properties: { ...zone },
        geometry: { type: "Polygon", coordinates: zone.polygon_coordinates }
      }
      
      const layer = L.geoJSON(feature, {
        style: { color: '#0B4F36', fillColor: '#0B4F36', weight: 2, fillOpacity: 0.4 }
      }).addTo(map)
      
      layer.on('click', () => {
        // Aseguramos que la frecuencia por defecto sea Weekly si viene vacía
        selectedZone.value = { 
            ...zone,
            reminder_frequency: zone.reminder_frequency || 'Weekly'
        }
        showEditModal.value = true
        showSaveModal.value = false
      })
    })
  } catch (error) {
    console.error("Error loading map zones:", error)
  }
}

// ----- MANEJADORES DE EVENTOS DE LOS COMPONENTES -----

const handleCancelDrawing = () => {
  if (currentDrawnLayer) map.removeLayer(currentDrawnLayer)
  showSaveModal.value = false
}

const handleAreaSaved = (savedData) => {
  currentDrawnLayer.setStyle({ color: '#0B4F36', fillColor: '#0B4F36' })
  
  currentDrawnLayer.on('click', () => {
    selectedZone.value = savedData
    showEditModal.value = true
  })

  showSaveModal.value = false
  currentDrawnLayer = null
}

const handleAreaUpdated = (newFrequency) => {
  selectedZone.value.reminder_frequency = newFrequency
  showEditModal.value = false
}

// ----------------------------------------------------

onMounted(async () => {
  await fetchCompanies()

  const L = await import('leaflet')
  await import('leaflet/dist/leaflet.css')
  await import('@geoman-io/leaflet-geoman-free')
  await import('@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css')

  map = L.map('map', { zoomControl: false }).setView([4.7110, -74.0721], 12)
  L.control.zoom({ position: 'bottomright' }).addTo(map)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)

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
</script>
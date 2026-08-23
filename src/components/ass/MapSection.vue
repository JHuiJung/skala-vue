<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import WeatherCard from './WeatherCard.vue'

// Vite 번들링 환경에서 Leaflet 기본 마커 아이콘 경로가 깨지는 문제 우회
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const router = useRouter()
const mapCenter = ref([20, 0])
const mapZoom = ref(2)
const markerLatLng = ref(null)
const selectedCityInfo = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

// 위도, 경도로 도시 날씨 조회 (EarthSection.vue와 동일한 로직)
const fetchWeatherByCoord = async (lat, lon) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  const response = await axios.get(URL)
  const data = response.data

  return {
    id: data.id,
    nameKo: data.name || '바다',
    nameEn: data.name || '',
    countryCode: data.sys?.country?.toLowerCase() ?? '',
    temp: Math.round(data.main.temp),
    status: data.weather[0].description,
    humid: data.main.humidity,
  }
}

const handleMapClick = async (event) => {
  const { lat, lng } = event.latlng
  markerLatLng.value = [lat, lng]

  isLoading.value = true
  errorMessage.value = ''
  selectedCityInfo.value = null

  try {
    selectedCityInfo.value = await fetchWeatherByCoord(lat, lng)
  } catch (error) {
    console.error('선택한 위치의 날씨 정보를 가져오지 못했습니다:', error)
    errorMessage.value = '날씨 정보를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

const handleMoveDetailView = (cityId) => {
  router.push('/weather/' + cityId)
}
</script>

<template>

<br/>
<br/>
  <p class="bread-font-h3-light">🗺️ 지도에서 위치 선택하기</p>
    <p class="bread-font-light">지도를 클릭해서 그 위치의 날씨를 확인해보세요</p>

    <div class="map-wrap">
      <LMap :zoom="mapZoom" :center="mapCenter" @click="handleMapClick">
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <LMarker v-if="markerLatLng" :lat-lng="markerLatLng" />
      </LMap>
    </div>

    <p v-if="isLoading" class="bread-font">도시 조회중</p>
    <p v-else-if="errorMessage" class="bread-font">{{ errorMessage }}</p>
    <div v-else-if="selectedCityInfo" class="selected-card">
      <WeatherCard :city-info="selectedCityInfo" @move-detail-view="handleMoveDetailView" />
    </div>
    <br/>
    <br/>
</template>

<style scoped>
.map-wrap {
  position: relative;
  max-width: 900px;
  height: 420px;
  margin: 12px auto;
  border: 5px solid var(--bread-border-color);
  border-radius: 16px;
  overflow: hidden;
}

.selected-card {
  width: 220px;
  margin: 16px auto 0;
}
</style>

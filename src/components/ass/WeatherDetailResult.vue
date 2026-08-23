<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useSandwichStore } from '../../stores/sandwich'
import { BreadState, getBreadState } from '../../constants/breadState'
import WeatherDetailResultCard from './WeatherDetailResultCard.vue'
import BaseContentFit from './Slots/BaseContentFit.vue'

const route = useRoute()
const sandwichStore = useSandwichStore()

const isLoading = ref(true)
const errorMessage = ref('')
const selectedCity = ref(null)
const oppositeCity = ref(null)

// cityId로 도시 날씨 조회
const fetchWeatherByCityId = async (cityId) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  const URL = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric&lang=kr`
  const response = await axios.get(URL)
  return response.data
}

// 위도, 경도로 도시 날씨 조회
const fetchWeatherByCoord = async (lat, lon) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  const response = await axios.get(URL)
  return response.data
}

// 지구 반대편 좌표 계산
const getAntipode = (lat, lon) => {
  const antiLat = -lat
  const antiLon = lon > 0 ? lon - 180 : lon + 180
  return { lat: antiLat, lon: antiLon }
}

const toCardInfo = (data) => ({
  nameEn: data.name,
  countryCode: data.sys?.country?.toLowerCase() ?? '',
  temp: Math.round(data.main.temp),
  status: data.weather[0].description,
  humid: data.main.humidity,
  lat: data.coord.lat,
  lon: data.coord.lon,
})

onMounted(async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const selectedData = await fetchWeatherByCityId(route.params.cityId)
    selectedCity.value = toCardInfo(selectedData)

    const antipode = getAntipode(selectedData.coord.lat, selectedData.coord.lon)
    const oppositeData = await fetchWeatherByCoord(antipode.lat, antipode.lon)
    oppositeCity.value = toCardInfo(oppositeData)

    sandwichStore.selectedCity = selectedCity.value
    sandwichStore.oppositeCity = oppositeCity.value
    sandwichStore.log.push({
      selectedCity: selectedCity.value,
      oppositeCity: oppositeCity.value,
    })
    sandwichStore.count++

    // 승리 조건: 두 도시 모두 식빵 상태가 완벽일 때
    if (
      getBreadState(selectedCity.value) === BreadState.PERFECT &&
      getBreadState(oppositeCity.value) === BreadState.PERFECT
    ) {
      sandwichStore.gameClear = true
    }
  } catch (error) {
    console.error('도시 정보를 가져오는 중 에러가 발생했습니다:', error)
    errorMessage.value = '도시 정보를 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <p v-if="isLoading">불러오는 중...</p>
  <p v-else-if="errorMessage">{{ errorMessage }}</p>
  <BaseContentFit v-else>
    <br/>
    <div class="sandwich">
      <WeatherDetailResultCard title="선택한 도시" :city-info="selectedCity" />
      <div class="earth">🌎</div>
      <WeatherDetailResultCard title="지구 반대편 도시" :city-info="oppositeCity" />
    </div>
    <br/>
  </BaseContentFit>
</template>

<style scoped>
.sandwich {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.earth {
  font-size: 2rem;
}
</style>

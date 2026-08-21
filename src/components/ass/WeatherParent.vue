<script setup>
import { ref, watchEffect, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import BaseDashBoardCard from './BaseDashBoardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

// 변수
const router = useRouter()
const searchQuery = ref('')
const selectedCard = ref('')
const isLoading = ref(false)

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humid: 10 },
  { id: 'city_02', name: '수원', temp: 24, status: '비', humid: 70 },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', humid: 30 },
])

const filteredWeatherList = computed(() => {
  if (searchQuery.value === '') return weatherList.value

  const dummyLs = []

  for (const ls of weatherList.value) {
    if (ls.name == searchQuery.value) {
      dummyLs.push(ls)
    }
  }

  return dummyLs
})

//라이프 사이클
onMounted(async () => {
  isLoading.value = true
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  console.log(`${API_KEY}`)
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=35.158582&lon=126.804975&appid=${API_KEY}&units=metric&lang=kr`
  try {
    // 비동기 통신: 서버에서 데이터를 다 가져올 때까지 await로 기다린다.
    const response = await axios.get(URL)
    // fetch()는 응답 String을 Json으로 변환해야 하지만(.json()) Axios에서는 응답 String(response.data)가 자동으로 JSON 파싱 됨.
    console.log('Axios 통신 응답 전체 객체:', response)
    console.log('백엔드가 준 핵심 날씨 데이터(JSON):', response.data)
    weatherList.value.push({
      id: response.data.name,
      name: response.data.name,
      temp: response.data.temp,
      status: response.data.weather[0].description,
      humid: response.data.main.humidity,
    })
  } catch (error) {
    // 4xx, 5xx 에러나 네트워크 오프라인 시 자동으로 reject되어 catch 영역에서 처리 한다.
    console.error('통신 중 에러가 발생했습니다:', error)
    alert('데이터를 가져오지 못했습니다. API 키 활성화 여부나 주소를 확인하세요.')
  } finally {
    isLoading.value = false
  }
})

//핸들러
const handleUpdateSearchQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const handleUpdateSelectedCard = (card) => {
  selectedCard.value = card
}

const handleMoveDetailView = (cityId) => {
  router.push('/weather/' + cityId)
}

// watch, watchFX
watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재검색어 [${searchQuery.value}]에 매칭되는 API 데이터를 필터링`,
  )
})

watch(selectedCard, (newVal, oldVal) => {
  console.log(`🤖 [watch자동 호출] 선택된 도시가[${oldVal}]에서 [${newVal}]로 변경되었습니다`)
})
</script>
<template>
  <BaseDashBoardCard>
    <h3>🔎 도시 검색</h3>
    <SearchBar :search-query="searchQuery" @update-search-query="handleUpdateSearchQuery" />
  </BaseDashBoardCard>

  <BaseDashBoardCard>
    <h3>🏙️ 지역별 날씨 현황</h3>
    <WeatherCard
      v-for="cityInfo in filteredWeatherList"
      :key="cityInfo.id"
      :city-info="cityInfo"
      @update-selected-card="handleUpdateSelectedCard"
      @move-detail-view="handleMoveDetailView"
    />
  </BaseDashBoardCard>

  <p v-if="selectedCard != ''">{{ selectedCard }}가 선택됨</p>
  <p v-else>카드를 클릭하거나 검색해 보세요</p>
</template>
<style scoped></style>

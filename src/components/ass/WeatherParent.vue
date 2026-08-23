<script setup>
import { ref, watchEffect, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import cities from '../../assets/data/cities.json'
import BaseDashBoardCard from './Slots/BaseDashBoardCard.vue'
import BaseContent from './Slots/BaseContent.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

// 변수
const router = useRouter()
const searchQuery = ref('')
const selectedCard = ref('')
const isLoading = ref(false)
const weatherList = ref([])
const searchResultList = ref([])
const isSearchNoMatch = ref(false)
const isSearchLoading = ref(false)

const cityDatabase = cities

const displayWeatherList = computed(() => {
  if (searchQuery.value === '') return weatherList.value
  return searchResultList.value
})

// 배열을 무작위로 섞는 함수 (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// 도시 이름으로 날씨 하나 가져오는 함수
const fetchWeatherByName = async (capital) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${capital.nameEn},${capital.countryCode}&appid=${API_KEY}&units=metric&lang=kr`

  const response = await axios.get(URL)
  const data = response.data

  return {
    id: data.id,
    nameKo: capital.nameKo, // 한글 이름
    nameEn: capital.nameEn,
    countryCode: capital.countryCode, // 국기 아이콘
    temp: Math.round(data.main.temp), // 온도
    status: data.weather[0].description, // 상태
    humid: data.main.humidity, // 습도
  }
}

// 추천 도시 10개를 랜덤으로 뽑아서 날씨 조회
const loadRecommendedWeather = async () => {
  isLoading.value = true

  const recommendedCapitals = shuffleArray(cities).slice(0, 10)

  try {
    // 10개를 동시에 병렬 요청
    const results = await Promise.all(
      recommendedCapitals.map((capital) => fetchWeatherByName(capital)),
    )

    weatherList.value = results
  } catch (error) {
    console.error('통신 중 에러가 발생했습니다:', error)
    alert('데이터를 가져오지 못했습니다. API 키 활성화 여부나 주소를 확인하세요.')
  } finally {
    isLoading.value = false
  }
}

// 라이프사이클
onMounted(() => {
  loadRecommendedWeather()
})

//핸들러
const handleUpdateSearchQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const handleRefreshRecommend = () => {
  loadRecommendedWeather()
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

// 검색어로 도시 매칭 후 날씨 조회
let searchTimer = null
let searchToken = 0

watch(searchQuery, (newQuery) => {
  clearTimeout(searchTimer)

  if (newQuery === '') {
    searchResultList.value = []
    isSearchNoMatch.value = false
    isSearchLoading.value = false
    return
  }

  isSearchNoMatch.value = false
  isSearchLoading.value = true

  searchTimer = setTimeout(async () => {
    const currentToken = ++searchToken
    const matchedCities = cityDatabase.filter((city) => city.nameKo.includes(newQuery))

    if (matchedCities.length === 0) {
      searchResultList.value = []
      isSearchNoMatch.value = true
      isSearchLoading.value = false
      return
    }

    try {
      const results = await Promise.all(
        matchedCities.slice(0, 10).map((city) => fetchWeatherByName(city)),
      )
      if (currentToken === searchToken) {
        searchResultList.value = results
      }
    } catch (error) {
      console.error('검색 중 에러가 발생했습니다:', error)
    } finally {
      if (currentToken === searchToken) {
        isSearchLoading.value = false
      }
    }
  }, 400)
})
</script>
<template>
  <BaseContent>
    <BaseDashBoardCard>
      <SearchBar
        :search-query="searchQuery"
        @update-search-query="handleUpdateSearchQuery"
        @refresh-recommend="handleRefreshRecommend"
      />
    </BaseDashBoardCard>

    <BaseDashBoardCard>
      <template v-if="selectedCard != ''">
        <p class="bread-font-h3">{{ selectedCard }}</p>
        <p class="bread-font">선택됨</p>
      </template>
      <p v-else class="bread-font">카드를 클릭하거나 검색해 보세요</p>
      <p v-if="isSearchNoMatch">매칭되는 도시가 없습니다</p>
      <p v-else-if="isSearchLoading">도시 검색중</p>
      <div v-else class="weather-grid">
        <WeatherCard
          v-for="cityInfo in displayWeatherList"
          :key="cityInfo.id"
          :city-info="cityInfo"
          @update-selected-card="handleUpdateSelectedCard"
          @move-detail-view="handleMoveDetailView"
        />
      </div>
    </BaseDashBoardCard>

    <br/>
    <br/>
  </BaseContent>

  
  
</template>
<style scoped>
.game-clear {
  font-weight: bold;
  font-size: 1.2rem;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  gap: 12px;
}

@media (max-width: 760px) {
  .weather-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

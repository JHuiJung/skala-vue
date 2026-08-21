<script setup>
import { ref, watchEffect, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashBoardCard from './BaseDashBoardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

// 변수
const router = useRouter()
const searchQuery = ref('')
const selectedCard = ref('')

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

<script setup>
import { ref, watchEffect, computed, watch } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humid: 10 },
  { id: 'city_02', name: '수원', temp: 24, status: '비', humid: 70 },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', humid: 30 },
])

const searchQuery = ref('')
const hoveredCityId = ref(null)
const displaySelectedCity = ref('')

const showSelectedCity = (cityName) => {
  alert(cityName + '이 선택 되었습니다.')
}

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

watch(searchQuery, (newVal) => {
  const isMatched = weatherList.value.some((ls) => ls.name === newVal)
  displaySelectedCity.value = isMatched ? newVal : displaySelectedCity.value
})

watch(displaySelectedCity, (newVal, oldVal) => {
  console.log(`🤖 [watch자동 호출] 선택된 도시가[${oldVal}]에서 [${newVal}]로 변경되었습니다`)
})

watchEffect(() => {
  console.log(
    `🤖 [watchEffect 자동 호출] 현재검색어 [${searchQuery.value}]에 매칭되는 API 데이터를 필터링`,
  )
})
</script>
<template>
  <h2>🌞 과제 1: 날씨 (Mockup)</h2>
  <hr />

  <br />

  <!-- 도시 찾기 -->
  <div class="search-countries">
    <h3>🔎 도시 검색</h3>
    <input
      type="text"
      :value="searchQuery"
      @input="searchQuery = $event.target.value"
      placeholder="검색할 도시 입력"
    />
    <p>검색 중인 도시: {{ searchQuery }}</p>
  </div>

  <br />

  <!-- 도시 확인 -->
  <div class="contries-list">
    <h3>🏙️ 지역별 날씨 현황</h3>
    <div v-if="filteredWeatherList.length == 0" class="weatherCard">
      <p>일치하는 도시가 없습니다.</p>
    </div>
    <div
      v-else
      v-for="cityInfo in filteredWeatherList"
      :key="cityInfo.id"
      class="weatherCard"
      :class="{ isHovered: hoveredCityId === cityInfo.id }"
      @mouseenter="hoveredCityId = cityInfo.id"
      @mouseleave="hoveredCityId = null"
    >
      <button class="detailBTN" @click="showSelectedCity(cityInfo.name)">상세보기</button>
      <p>{{ cityInfo.name }} ({{ cityInfo.status }})</p>
      <p>현재 기온: {{ cityInfo.temp }}C</p>
      <p>현재 습도: {{ cityInfo.humid }}%</p>
      <p v-if="cityInfo.temp >= 25" class="hot">🔥 더움 (25도 이상)</p>
      <p v-else class="cold">🍃 선선함 (25도 이하)</p>
    </div>
  </div>

  <!-- 선택 확인 창 -->
  <div class="display-selected-city" v-show="filteredWeatherList.length > 0 && searchQuery != ''">
    <p>{{ displaySelectedCity }}이 선택됨</p>
  </div>
</template>

<style>
.detailBTN {
  border-radius: 15px;
  border: 1px;
  position: absolute;
  width: 80px;
  height: 30px;
  top: 12px;
  right: 12px;
}

.contries-list {
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 15px;
}

.search-countries {
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 15px;
}

.weatherCard {
  position: relative;
  border: 1px solid #ddd;
  margin: 5px;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.weatherCard.isHovered {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  background-color: gray;
  color: white;
  transition: all 0.15s ease;
}

.display-selected-city {
  background-color: olive;
  color: white;
  text-align: center;
  border-radius: 15px;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 5px;
}

.hot {
  display: inline-block;
  background-color: red;
  padding: 5px;
  border-radius: 5px;
  color: white;
}

.cold {
  display: inline-block;
  background-color: blue;
  padding: 5px;
  border-radius: 5px;
  color: white;
}
</style>

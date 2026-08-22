<script setup>
import { useConfigStore } from '../../stores/config'
import { computed } from 'vue'
const configStore = useConfigStore()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  cityInfo: {
    type: Object,
    required: true,
  },
})

// 섭씨 화씨
const displayTemp = computed(() => {
  const rawTemp = props.cityInfo.temp // 기본 원본 데이터는 섭씨 숫자
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환 연산
  }
  return rawTemp
})
</script>

<template>
  <div class="city-card">
    <h2>{{ title }}</h2>
    <img
      v-if="cityInfo.countryCode"
      :src="`https://flagcdn.com/w40/${cityInfo.countryCode}.png`"
      :alt="cityInfo.nameEn"
    />
    <p>{{ cityInfo.nameEn || '이름 없는 지점 (바다일 가능성이 높음)' }}</p>
    <p>{{ displayTemp }}{{ configStore.unitSymbol }} / {{ cityInfo.status }}</p>
    <p>습도: {{ cityInfo.humid }}%</p>
    <p>위도 {{ cityInfo.lat }}, 경도 {{ cityInfo.lon }}</p>
  </div>
</template>

<style scoped>
.city-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  min-width: 200px;
  text-align: center;
}
</style>

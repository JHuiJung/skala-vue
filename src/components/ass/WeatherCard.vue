<script setup>
import { useConfigStore } from '../../stores/config'
import { computed } from 'vue'
const configStore = useConfigStore()

//props
const props = defineProps({
  cityInfo: {
    type: Object,
    required: true,
  },
})

//emit
const emit = defineEmits(['update-selected-card', 'move-detail-view'])

//emit 전달 함수
const sendUpdateSelectCard = (cityName) => {
  emit('update-selected-card', cityName)
}

const sendMoveDetailView = (cityId) => {
  emit('move-detail-view', cityId)
}

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
  <div @click="sendUpdateSelectCard(cityInfo.nameKo)">
    <button @click.stop="sendMoveDetailView(cityInfo.id)">상세보기</button>
    <img :src="`https://flagcdn.com/w40/${cityInfo.countryCode}.png`" :alt="cityInfo.nameKo" />
    <p>{{ cityInfo.nameKo }} ({{ cityInfo.status }})</p>
    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
    <p>현재 습도: {{ cityInfo.humid }}%</p>
    <p v-if="cityInfo.temp >= 25" class="hot">🔥 더움 (25도 이상)</p>
    <p v-else class="cold">🍃 선선함 (25도 이하)</p>
  </div>
</template>
<style scoped></style>

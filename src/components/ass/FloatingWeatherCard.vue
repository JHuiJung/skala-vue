<script setup>
import { computed } from 'vue'
import WeatherCard from './WeatherCard.vue'

// 가장 가까운 position:relative 조상 기준으로 뜨는 카드 (position: absolute).
// 조상과 함께 스크롤되고, 레이아웃에 자리를 차지하지 않아 나타나거나 사라져도 주변 요소가 밀리지 않음.
const CARD_WIDTH = 200
const CARD_HEIGHT = 260
const EDGE_MARGIN = 8

const props = defineProps({
  cityInfo: {
    type: Object,
    default: null,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  // 카드를 가둘 기준 컨테이너(조상)의 크기 - 이 범위를 벗어나지 않게 clamp
  boundsWidth: {
    type: Number,
    default: Infinity,
  },
  boundsHeight: {
    type: Number,
    default: Infinity,
  },
})

defineEmits(['move-detail-view'])

const style = computed(() => {
  const maxX = Math.max(props.boundsWidth - CARD_WIDTH - EDGE_MARGIN, EDGE_MARGIN)
  const maxY = Math.max(props.boundsHeight - CARD_HEIGHT - EDGE_MARGIN, EDGE_MARGIN)
  const clampedX = Math.min(Math.max(props.x, EDGE_MARGIN), maxX)
  const clampedY = Math.min(Math.max(props.y, EDGE_MARGIN), maxY)
  return { left: `${clampedX}px`, top: `${clampedY}px` }
})
</script>

<template>
  <div v-if="cityInfo" class="floating-city-card" :style="style">
    <WeatherCard :city-info="cityInfo" @move-detail-view="$emit('move-detail-view', $event)" />
  </div>
</template>

<style scoped>
.floating-city-card {
  position: absolute;
  /* Leaflet 내부 pane/컨트롤이 z-index 1000까지도 쓰므로 확실히 그 위로 */
  z-index: 2000;
  width: 200px;
}
</style>

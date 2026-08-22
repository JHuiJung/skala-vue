<script setup>
import { useConfigStore } from '../../stores/config'
import { computed } from 'vue'
import { getBreadState } from '../../constants/breadState'
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

const breadState = computed(() => getBreadState(props.cityInfo))
const isHot = computed(() => props.cityInfo.temp >= 25)
</script>
<template>
  <el-card class="weather-card" shadow="hover" @click.stop="sendUpdateSelectCard(cityInfo.nameKo)">
    <div class="card-header">
      <img
        v-if="cityInfo.countryCode"
        class="flag-icon"
        :src="`https://flagcdn.com/w40/${cityInfo.countryCode}.png`"
        :alt="cityInfo.nameKo"
      />
      <span class="city-name">{{ cityInfo.nameKo }}</span>
    </div>

    <p class="status">{{ cityInfo.status }}</p>

    <div class="tags">
      <el-tag type="warning" effect="light">🍞 {{ breadState }}</el-tag>
      <el-tag :type="isHot ? 'danger' : 'success'" effect="light">
        {{ isHot ? '🔥 더움' : '🍃 선선함' }}
      </el-tag>
    </div>

    <p class="metrics">
      🌡️ {{ displayTemp }}{{ configStore.unitSymbol }} · 💧 {{ cityInfo.humid }}%
    </p>

    <el-button type="primary" size="small" @click.stop="sendMoveDetailView(cityInfo.id)">
      상세보기
    </el-button>
  </el-card>
</template>
<style scoped>
.weather-card {
  width: 100%;
  cursor: pointer;
  text-align: center;
  border: 3px solid var(--bread-border-color);
  color: var(--bread-border-color);
  background-color: var(--bread-fill-color);
  border-radius: 30px;
  box-shadow: inset 0 0 0 5px var(--bread-crust-mid-color);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 6px;
}

.flag-icon {
  width: 32px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid var(--bread-border-color);
}

.city-name {
  font-weight: bold;
}

.status {
  margin-bottom: 8px;
}

.tags {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 8px;
}

.metrics {
  margin-bottom: 12px;
}
</style>

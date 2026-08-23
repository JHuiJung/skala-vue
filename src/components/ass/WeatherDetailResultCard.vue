<script setup>
import { useConfigStore } from '../../stores/config'
import { computed } from 'vue'
import { BreadState, getBreadState } from '../../constants/breadState'
const configStore = useConfigStore()

const stateClassMap = {
  [BreadState.CRISPY]: 'state-crispy',
  [BreadState.DRY]: 'state-dry',
  [BreadState.SOGGY]: 'state-soggy',
  [BreadState.FROZEN]: 'state-frozen',
  [BreadState.PERFECT]: 'state-perfect',
}

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

const breadState = computed(() => getBreadState(props.cityInfo))
const stateClass = computed(() => stateClassMap[breadState.value])
</script>

<template>
  <div class="result-card-wrap">
    <p class="bread-font-h3 result-title">{{ title }}</p>
    <div class="weather-card">
      <div class="weather-card-content" :class="stateClass">
        <p v-if="cityInfo.countryCode" class="country-code">{{ cityInfo.countryCode }}</p>
        <h3 class="city-row">
          <img
            v-if="cityInfo.countryCode"
            class="flag-icon"
            :src="`https://flagcdn.com/w40/${cityInfo.countryCode}.png`"
            :alt="cityInfo.nameEn"
          />
          {{ cityInfo.nameEn || '바다' }}
        </h3>
        <h1 class="temp">{{ displayTemp }}{{ configStore.unitSymbol }}</h1>
        <p class="humid">습도 {{ cityInfo.humid }}%</p>
        <p class="bread-state bread-tag">🍞 {{ breadState }}</p>
        <p class="coord">위도 {{ cityInfo.lat }}, 경도 {{ cityInfo.lon }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-card-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-title {
  margin: 0 0 8px;
}

.weather-card {
  position: relative;
  width: 220px;
  aspect-ratio: 4 / 5;
  padding: 0px 0px 10px 0px;
  background-color: var(--bread-border-color);
  border-radius: 30px;
}

.weather-card-content {
  --card-tint: var(--bread-state-perfect-color);

  position: absolute;
  top: -5px;
  left: -5px;
  width: 100%;
  height: 100%;
  background-color: var(--card-tint);
  background-image: radial-gradient(
      circle,
      var(--card-tint) 0%,
      color-mix(in srgb, var(--card-tint) 70%, transparent) 100%
    ),
    url('../../assets/img/img_Bread_Texture.png');
  background-size: cover;
  background-position: center;
  border: 5px solid var(--bread-border-color);
  border-radius: 30px;
  text-align: center;
  color: var(--bread-border-color);
  box-sizing: border-box;
  padding: 14px 10px;
}

.state-crispy {
  --card-tint: var(--bread-state-crispy-color);
}

.state-dry {
  --card-tint: var(--bread-state-dry-color);
}

.state-soggy {
  --card-tint: var(--bread-state-soggy-color);
}

.state-frozen {
  --card-tint: var(--bread-state-frozen-color);
}

.state-perfect {
  --card-tint: var(--bread-state-perfect-color);
}

.country-code {
  position: absolute;
  top: 8px;
  right: 12px;
  margin: 0;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.city-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 10px 0 4px;
}

.flag-icon {
  height: 1em;
  width: auto;
  border-radius: 2px;
}

.temp {
  margin: 4px 0;
}

.humid,
.bread-state {
  margin: 2px 0;
  font-size: 0.9rem;
}

.bread-tag {
  color: var(--bread-fill-color);
  background-color: var(--bread-border-color);
  border-radius: 15px;
  display: inline-block;
  padding: 5px 10px;
}

.coord {
  margin-top: 10px;
  font-size: 0.75rem;
  opacity: 0.8;
}
</style>

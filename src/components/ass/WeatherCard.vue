<script setup>
import { useConfigStore } from '../../stores/config'
import { computed } from 'vue'
import { getBreadState } from '../../constants/breadState'
import { getWeatherIcon } from '../../constants/weatherIcon'
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
const weatherIcon = computed(() => getWeatherIcon(props.cityInfo.status))
</script>
<template>
  <div class="weather-card" @click.stop="sendUpdateSelectCard(cityInfo.nameKo)">
    <div class="weather-card-content">
      <img v-if="cityInfo.status" class="weather-icon" :src="weatherIcon" :alt="cityInfo.status" />
      <p v-if="cityInfo.countryCode" class="country-code">{{ cityInfo.countryCode }}</p>
      <br/>
      <h3 class="city-row">
        <img
          v-if="cityInfo.countryCode"
          class="flag-icon"
          :src="`https://flagcdn.com/w40/${cityInfo.countryCode}.png`"
          :alt="cityInfo.nameKo"
        />
        {{ cityInfo.nameKo }}
      </h3>
      <h1 class="temp">{{ displayTemp }}{{ configStore.unitSymbol }}</h1>
      <p class="humid">습도 {{ cityInfo.humid }}%</p>
      <p class="bread-state">🍞 {{ breadState }} 빵</p>
      <button class="bread-btn" @click.stop="sendMoveDetailView(cityInfo.id)">빵 선택</button>
    </div>
  </div>
</template>
<style scoped>
.weather-card {
  position: relative; /* 자식 요소의 위치 기준점 설정 */
  width: 200px;
  aspect-ratio: 4 / 4.5;
  padding: 0px 0px 10px 0px;
  background-color: var(--bread-border-color);
  border-radius: 30px;
}

.weather-card-content {
  position: absolute; /* 부모 기준 절대 위치 설정 */
  top: -5px;
  left: -5px;
  width: 100%;
  height: 100%;
  background-color: var(--bread-fill-color);
  background-image: radial-gradient(
      circle,
      rgba(253, 241, 214, 1) 0%,
      rgba(253, 241, 214, 0.7) 100%
    ),
    url('../../assets/img/img_Bread_Texture.png');
  background-size: cover;
  background-position: center;
  border: 5px solid var(--bread-border-color);
  border-radius: 30px;
  text-align: center;
  color: var(--bread-border-color);

  /* 박스 크기 계산 방식 변경 (테두리와 패딩 포함) */
  box-sizing: border-box;
  padding: 14px 10px 44px;

  transition: top 0.2s ease, left 0.2s ease;
  cursor: pointer;
}

.weather-card-content:hover {
  top: -10px;
  left: -10px;
}

.weather-card-content:active {
  top: 0px;
  left: 0px;
}

.weather-icon {
  position: absolute;
  top: 8px;
  left: 12px;
  width: 25px;
  height: 25px;
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

.bread-btn {
  font-family: 'Jua', sans-serif;
  font-size: 0.85rem;
  white-space: nowrap;
  color: var(--bread-fill-color);
  background-color: var(--bread-border-color);
  border-radius: 25px;
  display: block;
  padding: 10px 15px;

  /* 위치 설정 */
  position: absolute;
  bottom: 10px; /* 바닥에서 5px 위로 띄움 */
  left: 50%;
  transform: translateX(-50%); /* 가로 중앙 정렬 */

  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.bread-btn:hover {
  background-color: var(--bread-crust-mid-color);
}
</style>

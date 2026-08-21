<script setup>
//props
defineProps({
  cityName: {
    type: String,
    required: true,
  },

  cityStatus: {
    type: String,
    required: true,
  },

  temp: {
    type: Number,
    required: true,
  },

  humid: {
    type: Number,
    required: true,
  },
})

//emit
const emit = defineEmits(['update-selected-card', 'alert-click-detail'])

//emit 전달 함수
const sendUpdateSelectCard = (cityName) => {
  emit('update-selected-card', cityName)
}

const sendAlertSelectCard = (cityName) => {
  const msg = `${cityName}이 선택됨`
  emit('alert-click-detail', msg)
}
</script>
<template>
  <div @click="sendUpdateSelectCard(cityName)">
    <button @click.stop="sendAlertSelectCard(cityName)">상세보기</button>
    <p>{{ cityName }} ({{ cityStatus }})</p>
    <p>현재 기온: {{ temp }}C</p>
    <p>현재 습도: {{ humid }}%</p>
    <p v-if="temp >= 25" class="hot">🔥 더움 (25도 이상)</p>
    <p v-else class="cold">🍃 선선함 (25도 이하)</p>
  </div>
</template>
<style scoped></style>

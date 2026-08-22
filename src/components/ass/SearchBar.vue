<script setup>
//props
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

//emit 등록
const emit = defineEmits(['update-search-query'])

//emit 넘기는 함수
const sendNotification = (newQuery) => {
  emit('update-search-query', newQuery)
}
</script>

<template>
  <div class="search-bar">
    <h3>🔎 도시 검색</h3>
    <input
      type="text"
      :value="searchQuery"
      @input="sendNotification($event.target.value)"
      placeholder="검색할 도시 입력"
    />
    <p>검색 중인 도시:{{ searchQuery }}</p>
  </div>
</template>
<style scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

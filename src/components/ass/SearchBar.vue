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
    <div class="search-input-wrap">
      <span class="search-icon">🔍</span>
      <input
        type="text"
        class="search-input"
        placeholder="검색할 도시 입력"
        :value="searchQuery"
        @input="sendNotification($event.target.value)"
      />
      <button v-if="searchQuery" type="button" class="clear-btn" @click="sendNotification('')">
        ✕
      </button>
    </div>
    <p>검색 중인 도시: {{ searchQuery }}</p>
  </div>
</template>
<style scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-input-wrap {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.search-input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 30px 8px 30px;
  border: 1px solid var(--bread-border-color);
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}

.search-input:focus {
  box-shadow: 0 0 0 2px var(--bread-crust-mid-color);
}

.clear-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  color: var(--bread-border-color);
  font-size: 0.9rem;
  padding: 0;
}
</style>

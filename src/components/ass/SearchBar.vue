<script setup>
import iconRefresh from '../../assets/img/icon_re.png'

//props
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

//emit 등록
const emit = defineEmits(['update-search-query', 'refresh-recommend'])

//emit 넘기는 함수
const sendNotification = (newQuery) => {
  emit('update-search-query', newQuery)
}

const sendRefreshRecommend = () => {
  emit('refresh-recommend')
}
</script>

<template>
  <div class="search-bar">
    <br/>
    <p class="bread-font-h1">🔎 도시 검색</p>
    <div class="search-row">
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
      <button
        type="button"
        class="refresh-btn"
        title="추천 도시 랜덤으로 다시 뽑기"
        @click="sendRefreshRecommend"
      >
        <img :src="iconRefresh" alt="추천 도시 새로고침" class="refresh-icon" />
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

.search-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 340px;
}

.search-input-wrap {
  position: relative;
  flex: 1;
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
  color: var(--bread-border-color);
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

.refresh-btn {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.3s ease;
}

.refresh-btn:hover {
  transform: rotate(90deg);
}

.refresh-icon {
  width: 20px;
  height: 20px;
}
</style>

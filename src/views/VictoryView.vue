<script setup>
import UnitGoToHome from '@/components/ass/units/UnitGoToHome.vue';
import { useSandwichStore } from '../stores/sandwich'

const sandwichStore = useSandwichStore()
</script>

<template>
  <div class="victory-view">
    <p class="bread-font-h1-light">🎉 성공</p>
    <p class="bread-font-light">시도횟수</p>
    <p class="victory-count">{{ sandwichStore.victoryCount }}</p>
  </div>
  <UnitGoToHome/>
</template>

<style scoped>
.victory-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
}

.victory-count {
  font-size: 10em;
  color: var(--bread-fill-color);
  text-shadow: 3px 3px var(--bread-border-color);
  margin: 0;
}
</style>

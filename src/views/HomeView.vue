<script setup>
import UnitSandwichTryCount from '@/components/ass/units/UnitSandwichTryCount.vue';
import EarthSection from '../components/ass/EarthSection.vue'
import WeatherParent from '../components/ass/WeatherParent.vue'

</script>

<template>
  <main>
    <UnitSandwichTryCount/>
    <EarthSection />
    <WeatherParent />
  </main>
</template>
<style scoped>
.background-Bread {
  width: 120%;
  margin-left: -10%; /* 왼쪽으로 10% 이동 */
}
</style>

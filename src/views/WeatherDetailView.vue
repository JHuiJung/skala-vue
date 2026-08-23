<script setup>
import UnitGoToHome from '@/components/ass/units/UnitGoToHome.vue'
import WeatherDetailResult from '../components/ass/WeatherDetailResult.vue'
import UnitSandwichTryCount from '@/components/ass/units/UnitSandwichTryCount.vue'
import EarthSectionForDetail from '../components/ass/EarthSectionForDetail.vue'
import { useSandwichStore } from '../stores/sandwich'

const sandwichStore = useSandwichStore()
</script>

<template>
  <main>
    <UnitSandwichTryCount v-show="!sandwichStore.isCutscenePlaying"/>
    <EarthSectionForDetail />
    <div v-show="!sandwichStore.isCutscenePlaying">
      
      <WeatherDetailResult />
      <UnitGoToHome />
    </div>
  </main>
</template>

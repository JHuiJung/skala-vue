import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSandwichStore = defineStore('sandwich', () => {
  const selectedCity = ref(null)
  const oppositeCity = ref(null)
  const log = ref([])
  const count = ref(0)
  const gameClear = ref(false)
  const isCutscenePlaying = ref(false)

  return { selectedCity, oppositeCity, log, count, gameClear, isCutscenePlaying }
})

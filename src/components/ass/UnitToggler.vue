<script setup>
import { useConfigStore } from '../../stores/config'

const configStore = useConfigStore()
</script>
<template>
  <p>날씨단위:{{ configStore.unitSymbol }}</p>
  <button @click="configStore.toggleUnit">단위 변경</button>
</template>

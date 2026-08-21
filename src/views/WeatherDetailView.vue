<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <main>
    <h1>{{ route.params.cityId }} 웨더 리포터!!!</h1>
  </main>
</template>

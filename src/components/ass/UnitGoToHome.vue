<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const backToMain = () => router.push('/')
</script>
<template>
  <button @click="backToMain">메인 대시보드로 돌아가기</button>
</template>

<style></style>

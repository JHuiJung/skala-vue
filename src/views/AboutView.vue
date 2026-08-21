<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const backToMain = () => router.push('/')
</script>
<template>
  <div class="about">
    <h1>상세 정보 페이지</h1>
    <button @click="backToMain">메인 대시보드로 돌아가기</button>
  </div>
</template>

<style></style>

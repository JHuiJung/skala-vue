<script setup>
import { useRouter } from 'vue-router'
import logoUrl from '../../../assets/img/Icon_EarthSandwich.png'

const router = useRouter()

const goHome = () => router.push('/')
</script>
<template>
  <img class="unit-logo" :src="logoUrl" alt="지구 샌드위치 로고" @click="goHome" />
</template>

<style scoped>
.unit-logo {
  position: fixed;
  top: 0;
  left: 16px;
  z-index: 10;
  height: 100px;
  width: auto;
  cursor: pointer;
}
</style>

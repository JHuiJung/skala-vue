<script setup>
import { RouterView, useRoute } from 'vue-router'
import UnitToggler from './components/ass/UnitToggler.vue'

const route = useRoute()
</script>
<template>
  <header class="app-header">
    <el-menu :default-active="route.path" mode="horizontal" router :ellipsis="false" class="nav-menu">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/about">About</el-menu-item>
    </el-menu>
    <UnitToggler />
  </header>

  <RouterView />
</template>
<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 16px;
}

.nav-menu {
  flex: 1;
  border-bottom: none;
}
</style>

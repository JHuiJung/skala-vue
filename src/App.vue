<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/ass/UnitToggler.vue'
import { ElButton } from 'element-plus'
</script>
<template>
  <el-button>버튼</el-button>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <unit-toggler />
    </nav>
  </header>

  <RouterView />
</template>

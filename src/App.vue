<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/ass/UnitToggler.vue'
</script>
<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <unit-toggler />
    </nav>
  </header>

  <RouterView />
</template>

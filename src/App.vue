<script setup>
import { RouterView, RouterLink } from 'vue-router'
import UnitToggler from './components/ass/units/UnitToggler.vue'
import UnitLogo from './components/ass/units/UnitLogo.vue'
import UnitBottomInfo from './components/ass/units/UnitBottomInfo.vue';
</script>
<template>
  <UnitLogo />
  <header class="app-header">
    <nav class="nav-menu">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
      <RouterLink to="/practice" class="nav-link">Practice</RouterLink>
      <RouterLink to="/troubleshooting" class="nav-link">Troubleshooting</RouterLink>
    </nav>
    <UnitToggler />
  </header>

  <RouterView />

  <UnitBottomInfo/>
</template>
<style scoped>

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 16px;
  box-sizing: border-box;
  max-width: 1000px;
  margin: 0 auto;
  background-color: var(--bread-fill-color);
  border-radius: 0px 0px 25px 25px;
  border-left: 10px solid var(--bread-border-color);
  border-right: 10px solid var(--bread-border-color);
  border-bottom: 10px solid var(--bread-border-color);
  border-top: none;
  box-shadow: 10px -10px var(--bread-border-color);
}

.nav-menu {
  flex: 1;
  display: flex;
  gap: 12px;
}

.nav-link {
  text-decoration: none;
  color: var(--bread-border-color);
  font-weight: bold;
  padding: 6px 14px;
  border-radius: 15px;
}

.nav-link.router-link-exact-active {
  background-color: var(--bread-border-color);
  color: var(--bread-fill-color);
}


</style>

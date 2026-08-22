<script setup></script>
<template>
  <div class="dashboard-card">
    <slot>
      <p>아직 슬롯이 비어있다아아아아앗</p>
    </slot>
  </div>
</template>
<style scoped>
.dashboard-card {
  margin: 16px auto;
  max-width: 1200px;
  padding: 20px;
  border: 1px solid var(--bread-border-color);
  border-radius: 12px;
  background-color: var(--bread-fill-color);
  color: var(--bread-border-color);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
</style>

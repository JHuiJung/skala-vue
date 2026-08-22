<script setup></script>
<template>
  <el-card class="dashboard-card" shadow="hover">
    <slot>
      <p>아직 슬롯이 비어있다아아아아앗</p>
    </slot>
  </el-card>
</template>
<style scoped>
.dashboard-card {
  margin: 16px auto;
  max-width: 1200px;
  border-color: var(--bread-border-color);
  background-color: var(--bread-fill-color);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: var(--bread-border-color);
}
</style>

<script setup></script>
<template>
  <div class="base-content">
    <div class="base-content-inner">
      <slot />
    </div>
  </div>
</template>
<style scoped>
.base-content {
  background-color: var(--bread-border-color);
  border-radius: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 10px 10px var(--bread-border-color);
}

.base-content-inner {
  background-color: var(--bread-fill-color);
  background-image: linear-gradient(rgba(253, 241, 214, 0.95), rgba(253, 241, 214, 0.7)),
    url('../../../assets/img/img_Bread_Texture.png');
  background-size: cover;
  background-position: center;
  border: 5px solid var(--bread-border-color);
  border-radius: 25px;
}
</style>

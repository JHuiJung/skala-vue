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
  
  /* 너비를 컨텐츠 크기에 맞춤 */
  width: fit-content; 
  /* max-width는 그대로 두거나 유지해도 무방합니다 */
  max-width: 1200px; 
  
  /* 중앙 정렬 유지 */
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
  
  /* 필요 시 내부 패딩을 주어야 컨텐츠와 테두리 사이에 여백이 생깁니다 */
  padding: 20px; 
}
</style>

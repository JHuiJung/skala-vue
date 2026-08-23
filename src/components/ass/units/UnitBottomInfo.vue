<script setup>
</script>
<template>
  
  <div class="bottom-info">
    <p class="bread-font">✉️ wjdgmlwnd12@gmail.com</p>
  </div>
</template>

<style>
.bottom-info{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bread-fill-color);
  background-image: linear-gradient(rgba(253, 241, 214, 0.95), rgba(253, 241, 214, 0.9)),
    url('../../../assets/img/img_Bread_Texture.png');
  background-size: cover;
  background-position: center;
  border-radius: 25px 25px 0px 0px;
  width: 100%;
  max-width: 1200px;
  /* 위쪽 auto margin이 flex 컬럼에서 남는 공간을 다 먹어서 콘텐츠가 적을 때도 바닥에 붙음 */
  margin: auto auto 0 auto;
  border-top: 10px solid var(--bread-border-color);
  border-left: 10px solid var(--bread-border-color);
  border-right: 10px solid var(--bread-border-color);
  border-bottom: none;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 10px 10px var(--bread-border-color);
}
</style>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const backToMain = () => router.push('/')
</script>
<template>
  <div class="go-to-home-wrap">
    <button class="btn-go-to-home" @click="backToMain">메인 대시보드로 돌아가기</button>
  </div>
</template>

<style>

.go-to-home-wrap
{
  display: block;
  width: fit-content;
  margin: 100px auto 100px;
  background-color: var(--bread-border-color);
  border-radius: 25px;
}

.btn-go-to-home
{
  position: relative;
  top: -5px;
  left: -5px;

  display: flex;
  font-family: 'Jua', sans-serif;
  color:var(--bread-border-color);
  justify-content: center;
  align-items: center;
  background-color: var(--bread-fill-color);
  background-image: linear-gradient(rgba(253, 241, 214, 0.95), rgba(253, 241, 214, 0.9)),
    url('../../../assets/img/img_Bread_Texture.png');
  background-size: cover;
  background-position: center;
  border-radius: 25px;
  border: 5px solid var(--bread-border-color);
  padding: 15px;
  box-sizing: border-box;
  cursor: pointer;
  transition: top 0.2s ease, left 0.2s ease;
}

.btn-go-to-home:hover {
  top: -7px;
  left: -7px;
}

.btn-go-to-home:active {
  top: 0px;
  left: 0px;
}
</style>

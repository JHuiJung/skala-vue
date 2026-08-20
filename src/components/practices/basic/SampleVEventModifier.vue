<script setup>
import { ref } from 'vue'
const handleLink = () => {
  alert('노로이 노로이! 네이버 박스는 이미 "처리"했다 ')
}
const handleBox = () => {
  alert('부모 박스가 클릭됨')
}
const handleChild1 = () => {
  alert('1번 자식 클릭')
}
const handleChild2 = () => {
  alert('2번 자식 클릭')
}

const userName = ref('')
const userAge = ref(0)
</script>

<template>
  <div class="practice-section">
    <h2>이벤트 수식어(Modifiers) 학습</h2>
    <h3>1) .prevent (기본 동작 막기)</h3>
    <a href="https://www.naver.com" @click.prevent="handleLink">네이버 링크</a>
    <br />
    <h3>2) .stop (이벤트 버블링 막기)</h3>
    <div @click="handleBox" style="padding: 20px; background-color: #eee">
      <p>부모 영역(클릭시 alert 발동)</p>
      <button @click="handleChild1">버블링 발생 버튼</button>
      <button @click.stop="handleChild2">버블링 차단 버튼</button>
    </div>

    <br />
    <h3>유저의 이름은 {{ userName }} 이고 나이는 {{ userAge }} 야</h3>
    <input type="string" v-model="userName" />
    <input type="number" v-model="userAge" />
  </div>
</template>

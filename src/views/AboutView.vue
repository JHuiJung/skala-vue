<script setup>
import UnitGoToHome from '@/components/ass/UnitGoToHome.vue'
</script>
<template>
  <div class="about">
    <h1>상세 정보 페이지</h1>
    <div class="weather-card">
      <div class="weather-card-content">
        <p class="country-code">KR</p>
        <h3 class="city-row">
          <img class="flag-icon" src="https://flagcdn.com/w40/kr.png" alt="KR" />
          서울
        </h3>
        <h1 class="temp">23°C</h1>
        <p class="humid">습도 65%</p>
        <p class="bread-state bread-tag">🍞 바삭</p>
        <button class="bread-btn">상세 정보</button>
      </div>
    </div>
    <UnitGoToHome />
  </div>
</template>

<style>
.weather-card {
  position: relative; /* 자식 요소의 위치 기준점 설정 */
  width: 200px;
  height: 225px;
  padding: 0px 0px 10px 0px;
  background-color: var(--bread-border-color);
  border-radius: 30px;
}

.weather-card-content {
  position: absolute; /* 부모 기준 절대 위치 설정 */
  top: -5px;        /* 위쪽으로 10px 이동 */
  left: -5px;       /* 왼쪽으로 10px 이동 */
  width: 100%;
  height: 100%;
  background-color: var(--bread-fill-color);
  border: 5px solid var(--bread-border-color);
  border-radius: 30px;
  text-align: center;
  color: var(--bread-border-color);

  /* 박스 크기 계산 방식 변경 (테두리와 패딩 포함) */
  box-sizing: border-box;

  transition: top 0.2s ease, left 0.2s ease;
  cursor: pointer;
}

.weather-card-content:hover {
  top: -10px;
  left: -10px;
}

.weather-card-content:active {
  top: 0px;
  left: 0px;
}

.card-content-area h1 {
  text-shadow: 2px 2px var(--bread-crust-mid-color);
}

.country-code {
  position: absolute;
  top: 8px;
  right: 12px;
  margin: 0;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.city-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 10px 0 4px;
}

.flag-icon {
  height: 1em;
  width: auto;
  border-radius: 2px;
}

.temp {
  margin: 4px 0;
}

.humid,
.bread-state {
  margin: 2px 0;
  font-size: 0.9rem;
}

.bread-tag{
  color: var(--bread-fill-color);
  background-color: var(--bread-border-color);
  border-radius: 15px;
  display:inline-block;
  padding: 5px 10px 5px 10px;
}

.bread-btn{
  color: var(--bread-fill-color);
  background-color: var(--bread-border-color);
  border-radius: 15px;
  display:block;
  padding: 5px 10px 5px 10px;

  /* 위치 설정 */
  position: absolute;
  bottom: 5px; /* 바닥에서 5px 위로 띄움 */
  left: 50%;
  transform: translateX(-50%); /* 가로 중앙 정렬 */
  
  border: none;
  cursor: pointer;
}
</style>

<script setup>
import BaseContentFit from '@/components/ass/Slots/BaseContentFit.vue';
import UnitGoToHome from '@/components/ass/units/UnitGoToHome.vue'
import logoUrl from '../assets/img/Icon_EarthSandwich.png'
import earthSandwichInfoUrl from '../assets/img/earth_sandwich_info.png'
</script>
<template>
  <div class="about">
    <img class="about-logo" :src="logoUrl" alt="지구 샌드위치 로고" />

    <BaseContentFit class="about-content">
      <br/>
      <ul class="about-list">
        <li class="about-card">
          <span class="about-badge">📖 개요</span>
          <p class="about-row">
            지구 정반대편 두 사람이 동시에 빵을 놓아 지구를 샌드위치처럼 만드는 유명한 인터넷 챌린지인
            <span class="highlight">"지구 샌드위치(Earth Sandwich)"</span> 밈에서 아이디어를 얻었습니다.
          </p>
          <img
            class="about-info-image"
            :src="earthSandwichInfoUrl"
            alt="지구 샌드위치 밈 예시 - 지구 반대편에 있는 두 사람이 서로의 위치에 식빵을 놓아 지구를 샌드위치처럼 만든 실제 사례"
          />
          <p class="about-row">
            날씨 API를 다뤄야하는 과제에 맞춰 이 밈을 시뮬레이터로 만들면 재밌겠다는 생각에서 시작했습니다. 도시를 고르면 지구 반대편 지점을 자동 계산해서 두 곳의 실시간 날씨를 비교해볼 수 있게 만들었습니다
          </P>
        </li>

        <li class="about-card">
          <span class="about-badge">✨ 기능</span>
          <ul class="about-sublist">
            <li>도시 검색 / 추천 카드로 날씨 조회</li>
            <li>Three.js 3D 지구본을 드래그해서 원하는 위치 선택</li>
            <li>Leaflet 지도를 클릭해서 원하는 위치 선택</li>
            <li>선택한 도시 ↔ 지구 반대편(대척점) 도시 날씨 동시 비교</li>
            <li>온도·습도로 "식빵 상태"(바삭 / 마름 / 눅눅 / 꽁꽁얼음 / 완벽) 판정</li>
            <li>시도할수록 지구본에 빵이 하나씩 쌓이는 연출</li>
            <li>C / F 온도 단위 전환</li>
          </ul>
        </li>

        <li class="about-card">
          <span class="about-badge">🔌 추가한 API</span>
          <ul class="about-sublist">
            <li>OpenWeatherMap - 도시명 / 좌표 기반 실시간 날씨 조회</li>
            <li>Leaflet + OpenStreetMap - API 키 없이 쓸 수 있는 지도 (위치 클릭 선택용)</li>
          </ul>
        </li>

        <li class="about-card">
          <span class="about-badge">🧩 추가한 내용</span>
          <ul class="about-sublist">
            <li><strong>Pinia (sandwichStore)</strong> - 선택한 도시, 시도 횟수, 연출 진행 여부, 승리 상태 등 게임 진행 상태 관리</li>
            <li><strong>Three.js</strong> - 텍스처 입힌 3D 지구본, 드래그 회전, 표면에 붙는 빵 오브젝트, 카메라 연출 구현</li>
            <li><strong>Vue Router</strong> - 홈 / 상세 / 승리 / 연습 페이지 라우팅</li>
            <li><strong>Element Plus → 커스텀 UI</strong> - 직접 만든 "빵 크러스트" 테마 컴포넌트로 대부분 교체</li>
          </ul>
        </li>

        <li class="about-card">
          <span class="about-badge">🎮 게임 방법</span>
          <p class="about-row"><strong>방법</strong></p>
          <ol class="about-sublist about-steps">
            <li>검색 · 추천 카드 · 지구본 드래그 · 지도 클릭 중 하나로 도시(또는 좌표) 선택</li>
            <li>선택한 위치의 위도/경도로 지구 정반대편 좌표 자동 계산</li>
            <li>두 지점의 실시간 날씨를 동시에 조회</li>
            <li>온도·습도 기준으로 각 지점의 "식빵 상태" 판정</li>
          </ol>
          <p class="about-row"><span class="highlight">승리 조건</span></p>
          <p class="about-row">
            선택한 도시와 지구 반대편 도시가 둘 다 <span class="highlight">"완벽한"</span> 식빵 상태일 때 승리!
            승리하면 그때까지의 시도 횟수와 함께 승리 화면으로 이동합니다
          </p>
        </li>
      </ul>
    </BaseContentFit>
    <UnitGoToHome />
  </div>
</template>

<style>

.about-content{
  margin-top: 10px;
}

.about-logo {
  display: block;
  height: 150px;
  margin: 8px auto 20px;
}

.about-list {
  list-style: none;
  margin: 0;
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.about-card {
  position: relative;
  width: 600px;
  background-color: var(--bread-fill-color);
  border: 2px solid var(--bread-border-color);
  border-radius: 14px;
  padding: 14px 16px;
}

.about-badge {
  position: absolute;
  top: -10px;
  left: 12px;
  background-color: var(--bread-border-color);
  color: var(--bread-fill-color);
  font-size: 0.8rem;
  font-weight: bold;
  padding: 2px 10px;
  border-radius: 10px;
}

.about-row {
  margin: 6px 0 0;
  color: var(--bread-border-color);
  line-height: 1.5;
}

.highlight {
  color: var(--bread-highlight-color);
  font-weight: bold;
}

.about-info-image {
  display: block;
  width: 100%;
  max-width: 210px;
  margin: 14px auto 0;
  border: 2px solid var(--bread-border-color);
  border-radius: 10px;
}

.about-row:first-of-type {
  margin-top: 10px;
}

.about-sublist {
  margin: 10px 0 0;
  padding-left: 1.2em;
  color: var(--bread-border-color);
  line-height: 1.6;
}

.about-steps {
  padding-left: 1.4em;
}
</style>

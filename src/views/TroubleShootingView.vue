<script setup>
import UnitGoToHome from '@/components/ass/units/UnitGoToHome.vue'
import BaseContent from '@/components/ass/Slots/BaseContent.vue'

// README.md의 "트러블 슈팅" 로그를 그대로 옮겨온 데이터
const troubleList = [
  {
    date: '8/20',
    situation: '날씨 카드 컴포넌트에 카드들을 div로 선언해 v-for로 하고 있었음',
    problem: '컴포넌트의 재사용성을 이용하지 않은 구조임',
    solution:
      'v-for를 컴포넌트에 넣을 수 있었음을 깨달아 적용. 컴포넌트를 나눌 때 자주 사용될 블럭 단위로 만들어야 함',
  },
  {
    date: '8/21',
    situation: 'API_KEY가 노출돼있는 것이 불편해, .env을 생성해 관리하려 했음',
    problem: '.env에 추가했음에도 undefined 출력되는 문제 발생',
    solution:
      '이름 앞에 VITE를 붙여 해결. Vite에서 .env 환경변수를 만들 때는 이름 앞에 VITE를 붙여줘야 함을 알았음',
  },
  {
    date: '8/22',
    situation: '도시이름 API통신 실패가 자주 일어남',
    problem: '도시이름들 중 " "(공백)이 포함된 도시는 파싱 실패로 이어지는 경우가 있었음',
    solution: 'encodeURIComponent 함수를 통해 " "도 인코딩되게 설정하여 해결',
  },
  {
    date: '8/22',
    situation: '메인 페이지에서 세계 도시 날씨 정보를 받아오는데 시간적, 무료 요금제적 한계가 있었음',
    problem: '세계 모든 도시의 날씨 정보를 불러오는 데 시간 및 무료 요금제의 한계로 인해 불가능',
    solution:
      '유명한 도시 1000개에 대한 {한글명, 영어명, 도시 태그}를 객체화해 json에 보관한 뒤, 랜덤 10개의 지역을 선택해 API통신으로 날씨 데이터를 가져오게 함',
  },
  {
    date: '8/23',
    situation: '지구에 빵을 놓는 연출을 만드는 중',
    problem: '현재가 아닌 이전에 선택된 기록을 바탕으로 연출하는 상황',
    solution: 'sandwich store에 연출중 bool을 만들어, 연출이 끝나면 함수가 실행되게 함',
  },
  {
    date: '8/23',
    situation: 'MapSection.vue에 Leaflet 지도 API를 붙이는 중, Vite로 번들링하면 기본 마커 아이콘이 안 뜨는 유명한 이슈를 만남',
    problem: 'Leaflet이 CSS에서 상대경로로 마커 아이콘 이미지를 찾는데, 번들러가 그 경로를 그대로 살려주지 못함',
    solution:
      "leaflet/dist/images/*.png를 직접 import해서 L.Icon.Default.mergeOptions()로 아이콘 경로를 다시 지정해줌",
  },
  {
    date: '8/23',
    situation: '지구본이나 지도를 클릭하면 선택된 도시 카드가 옆에 나타나도록 만듦',
    problem:
      '카드가 나타나거나 사라질 때마다 지구본 캔버스가 리사이즈되거나(flex:1이 남는 공간을 다시 계산) 지도가 아래로 밀려서 화면이 덜컹거림',
    solution:
      '카드를 "position: fixed"로 문서 흐름 밖에 띄우는 방식으로 바꿔봤지만, 이번엔 스크롤해도 화면에 고정되어 지구본/지도와 따로 노는 문제가 생김. 최종적으로는 지구본 영역·지도 영역에 position: relative를 걸고, 카드는 그 안에서 position: absolute로 (offsetLeft/offsetTop, Leaflet의 containerPoint 기준) 위치를 잡아서 레이아웃을 안 밀고도 스크롤에 같이 따라오게 해결. 지도 위에서는 z-index를 Leaflet 내부 pane보다 높게 줘서 카드가 지도 뒤에 가려지는 것도 같이 고침',
  },
]
</script>

<template>
  <br/>
  <br/>
  <p class="bread-font-h3-light">트러블 슈팅 기록</p>
  <BaseContent>
    <p class="bread-font-h3">🔧 트러블 슈팅</p>
    <ul class="trouble-list">
      <li v-for="(item, index) in troubleList" :key="index" class="trouble-card">
        <span class="trouble-date">{{ item.date }}</span>
        <p class="trouble-row"><strong>상황</strong> : {{ item.situation }}</p>
        <p class="trouble-row"><strong>문제</strong> : {{ item.problem }}</p>
        <p class="trouble-row"><strong>해결</strong> : {{ item.solution }}</p>
      </li>
    </ul>
  </BaseContent>
  <UnitGoToHome />
</template>

<style scoped>
.trouble-list {
  list-style: none;
  margin: 0;
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.trouble-card {
  position: relative;
  background-color: var(--bread-fill-color);
  border: 2px solid var(--bread-border-color);
  border-radius: 14px;
  padding: 14px 16px;
}

.trouble-date {
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

.trouble-row {
  margin: 6px 0 0;
  color: var(--bread-border-color);
  line-height: 1.5;
}

.trouble-row:first-of-type {
  margin-top: 10px;
}
</style>

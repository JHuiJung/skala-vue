###8.19 / 과제1 목업 만들기

- 날씨 카드에 마우스 올리면 위로 올라가는 애니메이션 추가
- 날씨 카드에 마우스 올리면 회색으로 바뀌는 애니메이션 추가
- 습도 추가

###8.20 / 과제2 watch, watchEffect, computed 적용하기

- computed를 통해 필터링된 리스트 만듦
- watchEffect를 통해 입력값 조금만 바껴도 로그 생성

###8.20 / 과제3 4개의 vue로 분리
###8.21 / 과제4 라우터 적용

- 카드 상세보기 버튼 : alert 제거
- 카드 상세보기 버튼 : 디테일 페이지 이동 추가
- AboutView 추가
- DetailView 추가

###8.21 / 과제5 pinia 스토어 적용 완료

- config 스토어 생성 및 화씨 섭씨 기능구현
- UnitToggler : 버튼 누를씨 화씨 섭씨 변경

###8.21 / 과제6 적용

- Element Plus 적용후 el-button 생성 테스트

### 트러블 슈팅

8/20
상황 : 날씨 카드 컴포넌트에 카드들을 div로 선언해 v-for로 하고 있었음
문제 : 컴포넌트의 재사용성을 이용하지 않은 구조임
해결 : v-for를 컴포넌트에 넣을 수 있었음을 깨닭아 적용. 컴포넌트를 나눌때 자주사용될 블럭 단위로 만들어야함

8/21
상황 : API_KEY가 노출돼있는 것이 불편해, .env을 생성해 관리하려 했음
문제 : .env에 추가했음에도 undefined 출력되는 문제 발생
해결 : 이름앞에 VITE를 붙여 해결. VITE에서 .env 환경변수를 만들때는 이름 앞에 VITE를 붙여줘야함을 알았음

8/22
상황 : 도시이름 API통신 실패가 자주 일어남
문제 : 도시이름들중 " "포함된 도시는 파싱 실패로 이어지는 경우가 있었음
해결 : encodeURIComponent함수를 통해 " "도 인코딩되게 설정하여 해결

8/22
상황 : 메인 페이지에서 세계 도시 날씨 정보를 받아 오는데 시간적, 무료 요금제적 한계가 있었음
문제 : 세계 모든 도시의 날씨 정보를 불러오는데 시간 및 무료 요금제의 한계로 인해 불가능
해결 : 유명한 도시 1000개에 대한 {한글명, 영어명, 도시 태그}를 객체화 해 json에 보관한 뒤 랜덤 10개의 지역을 선택에 API통신으로 날씨데이터를 가져오게함

8/23
상황 : 지구에 빵을 놓는 연출
문제: 현재가 아닌 이전에 선택된 기록을 바탕으로 연출하는 상황
해결 : sandwich store에서 연출중 bool을 통해 연출이 끝나면 함수가 실행되게 함

### 8.23 / 지도 API로 위치 선택하는 MapSection 추가

- 처음엔 지구본 텍스처 이미지를 평면 지도처럼 클릭해서 좌표를 역산하는 방식으로 만들었었는데,
  실제 지도 API를 써보고 싶어서 Leaflet으로 교체함
- 지도 API 후보 비교
  - Leaflet + OpenStreetMap : API 키 발급 없이 바로 사용 가능, Vue 3용 공식 래퍼(`@vue-leaflet/vue-leaflet`) 존재
  - Mapbox GL / MapLibre GL : 디자인은 더 예쁘지만 API 키 발급(+ 사용량 제한)이 필요해서 제외
  - Google Maps : 현재 결제(카드 등록) 없이는 API 키 발급이 막혀있어서 제외
  - -> 지금까지 프로젝트가 무료 API + 최소 설정으로 가는 방향이라 Leaflet 선택
- 설치: `npm install leaflet @vue-leaflet/vue-leaflet`
- `MapSection.vue` 생성
  - `<LMap>` + `<LTileLayer>`(OpenStreetMap 타일) + `<LMarker>`로 지도 렌더링
  - 지도 클릭 이벤트(`@click`)에서 `event.latlng.lat`, `event.latlng.lng`로 바로 위도/경도를 받음
    (기존 이미지 클릭 버전처럼 픽셀 좌표 -> 위도/경도 직접 계산할 필요가 없어짐)
  - 받은 좌표로 EarthSection.vue와 동일한 `fetchWeatherByCoord` 로직을 재사용해 날씨 조회 후 WeatherCard로 표시
  - HomeView.vue에서 WeatherParent 바로 아래에 배치
- 트러블 슈팅
  - 상황 : Vite로 번들링하면 Leaflet 기본 마커 아이콘(마커 png)이 안 뜨는 유명한 이슈가 있음
  - 문제 : Leaflet이 CSS에서 상대경로로 아이콘 이미지를 찾는데, 번들러가 그 경로를 그대로 못 살려줌
  - 해결 : `leaflet/dist/images/*.png`를 직접 import해서 `L.Icon.Default.mergeOptions()`로 아이콘 경로를 다시 지정해줌
<div align="center">

# 🍞 Earth Sandwich Simulator

**날씨 API와 Three.js를 활용한 "지구 샌드위치" 시뮬레이터**

![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?logo=three.js&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-State-FFD859?logo=pinia&logoColor=black)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-API-orange)
![Leaflet](https://img.shields.io/badge/Leaflet-Map-199900?logo=leaflet&logoColor=white)

[🎥 영상 보기](https://www.youtube.com/watch?v=Jt6AQawsTv0)

<img width="400" alt="지구 샌드위치 데모" src="https://github.com/user-attachments/assets/05b3b627-ebc8-43fc-8be9-62cb61bc0df0" />

</div>

<br>

## 📋 목차

- [개요](#-개요)
- [기능](#-기능)
- [사용한 API](#-사용한-api)
- [기술 스택](#-기술-스택)
- [게임 방법](#-게임-방법)

<br>

## 🌍 개요

지구 정반대편에 있는 두 사람이 동시에 빵을 놓아 지구를 샌드위치처럼 만드는 유명한 인터넷 챌린지인 **"지구 샌드위치(Earth Sandwich)"** 밈에서 아이디어를 얻었습니다.

<div align="center">
  <img src="./src/assets/img/earth_sandwich_info.png" width="500" alt="지구 샌드위치 밈 예시" />
  <br>
  <sub>지구 샌드위치 밈의 실제 성공 사례</sub>
</div>

<br>

날씨 API를 다뤄야 하는 과제에 맞춰 이 밈을 시뮬레이터로 만들면 재밌겠다는 생각에서 시작했습니다. 도시를 고르면 지구 반대편 지점을 자동 계산해서 두 곳의 실시간 날씨를 비교해볼 수 있게 만들었습니다.

<br>

## ✨ 기능

<div align="center">
  <img width="400" alt="기능 스크린샷" src="https://github.com/user-attachments/assets/6272eb6b-16c2-4b68-b939-cfe651b484cb" />
</div>

<br>

| 기능 | 설명 |
|---|---|
| 🔍 도시 검색 | 검색 / 추천 카드로 날씨 조회 |
| 🗺️ 지도 선택 | Leaflet 지도를 클릭해서 원하는 위치 선택 |
| 🌏 반대편 비교 | 선택 도시 ↔ 지구 반대편 도시 날씨 동시 비교 |
| 🍞 식빵 판정 | 온도·습도로 상태(바삭 / 마름 / 눅눅 / 꽁꽁얼음 / 완벽) 판정 |
| 📈 진행 연출 | 시도할수록 지구본에 빵이 하나씩 쌓이는 연출 |
| 🌡️ 단위 전환 | C / F 온도 단위 전환 |
| 🖱️ 3D 조작 | Three.js 3D 지구본을 드래그해서 위치 선택 |

<br>

## 🔌 사용한 API

| API | 용도 |
|---|---|
| **OpenWeatherMap** | 도시명 / 좌표 기반 실시간 날씨 조회 |
| **Leaflet + OpenStreetMap** | API 키 없이 쓸 수 있는 지도 (위치 클릭 선택용) |

<br>

## 🛠️ 기술 스택

<details>
<summary><b>Pinia (sandwichStore)</b></summary>
<br>

선택한 도시, 시도 횟수, 연출 진행 여부, 승리 상태 등 게임 진행 상태 관리

</details>

<details>
<summary><b>Vue Router</b></summary>
<br>

홈 / 상세 / 승리 / 연습 페이지 라우팅

</details>

<details>
<summary><b>Element Plus → 커스텀 UI</b></summary>
<br>

직접 만든 "빵 크러스트" 테마 컴포넌트로 대부분 교체

</details>

<details>
<summary><b>Three.js</b></summary>
<br>

텍스처 입힌 3D 지구본, 드래그 회전, 표면에 붙는 빵 오브젝트, 카메라 연출 구현

</details>

<br>

## 🎮 게임 방법

### 방법

1. 검색 · 추천 카드 · 지구본 드래그 · 지도 클릭 중 하나로 도시(또는 좌표) 선택
2. 선택한 위치의 위도/경도로 지구 정반대편 좌표 자동 계산
3. 두 지점의 실시간 날씨를 동시에 조회
4. 온도·습도 기준으로 각 지점의 "식빵 상태" 판정

### 🏆 승리 조건

> 선택한 도시와 지구 반대편 도시가 **둘 다 "완벽한" 식빵 상태**일 때 승리!
>
> 승리하면 그때까지의 시도 횟수와 함께 승리 화면으로 이동합니다.

<br>
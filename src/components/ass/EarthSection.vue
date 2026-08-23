<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useSandwichStore } from '../../stores/sandwich'
import { BreadState, getBreadState } from '../../constants/breadState'
import earthTextureUrl from '../../assets/img/earth_day_4096.jpg'
import earthNormalMapUrl from '../../assets/img/earth_normal_map.png'
import WeatherCard from './WeatherCard.vue'

const router = useRouter()
const sandwichStore = useSandwichStore()
const canvasContainer = ref(null)
const selectedCityInfo = ref(null)

let renderer,
  scene,
  camera,
  animationId,
  resizeObserver,
  earth,
  earthTexture,
  earthNormalTexture,
  earthGeometry,
  earthMaterial,
  bread,
  breadGeometry,
  breadMaterial,
  targetLine,
  targetLineGeometry,
  targetLineMaterial,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  surfaceBreadMeshes

// 모서리 4곳이 둥근 사각형 프로필 (빵 슬라이스 실루엣)
const createRoundedRectShape = (width, height, radius) => {
  const shape = new THREE.Shape()
  const w = width / 2
  const h = height / 2

  shape.moveTo(-w + radius, -h)
  shape.lineTo(w - radius, -h)
  shape.quadraticCurveTo(w, -h, w, -h + radius)
  shape.lineTo(w, h - radius)
  shape.quadraticCurveTo(w, h, w - radius, h)
  shape.lineTo(-w + radius, h)
  shape.quadraticCurveTo(-w, h, -w, h - radius)
  shape.lineTo(-w, -h + radius)
  shape.quadraticCurveTo(-w, -h, -w + radius, -h)

  return shape
}

// 위도, 경도 -> 지구 로컬 좌표계 기준 단위구 표면 방향 벡터 (getLatLonUnderBread의 역변환)
const latLonToLocalDirection = (lat, lon) => {
  const theta = THREE.MathUtils.degToRad(90 - lat)
  const phi = THREE.MathUtils.degToRad(lon + 180)
  const ringRadius = Math.sin(theta)

  return new THREE.Vector3(
    -ringRadius * Math.cos(phi),
    Math.cos(theta),
    ringRadius * Math.sin(phi),
  )
}

// 빵 상태(BreadState) -> main.css에 정의된 표면 빵 전용 색 변수 이름
const breadStateColorVarMap = {
  [BreadState.CRISPY]: '--bread-surface-crispy-color',
  [BreadState.DRY]: '--bread-surface-dry-color',
  [BreadState.SOGGY]: '--bread-surface-soggy-color',
  [BreadState.FROZEN]: '--bread-surface-frozen-color',
  [BreadState.PERFECT]: '--bread-surface-perfect-color',
}

// 도시 정보(온도/습도)로 빵 상태를 판정해서 그에 맞는 표면 빵 색을 가져옴
const getBreadFillColorForCity = (cityInfo, fallbackColor) => {
  const state = getBreadState(cityInfo)
  const varName = breadStateColorVarMap[state]
  const rootStyles = getComputedStyle(document.documentElement)
  return rootStyles.getPropertyValue(varName).trim() || fallbackColor
}

// 지구 표면에 눌러붙는 작은 빵 조각 (지구의 자식으로 붙여서 자전에 같이 따라감)
const createSurfaceBread = (lat, lon, fillColor, borderColor) => {
  const shape = createRoundedRectShape(0.09, 0.09, 0.02)
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.02,
    bevelEnabled: false,
    curveSegments: 8,
  })
  geometry.translate(0, 0, -0.01)

  const material = [
    new THREE.MeshPhongMaterial({ color: fillColor }),
    new THREE.MeshPhongMaterial({ color: borderColor }),
  ]

  const mesh = new THREE.Mesh(geometry, material)
  const direction = latLonToLocalDirection(lat, lon)
  mesh.position.copy(direction).multiplyScalar(1.01)
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction)

  surfaceBreadMeshes.push({ mesh, geometry, material })
  return mesh
}

// 빵이 가리키는 지점(월드 좌표 0,1,0)이 현재 지구 회전상 어느 위도/경도인지 계산
const getLatLonUnderBread = () => {
  const worldPoint = new THREE.Vector3(0, 1, 0)
  const localPoint = worldPoint.applyQuaternion(earth.quaternion.clone().invert())

  const theta = Math.acos(THREE.MathUtils.clamp(localPoint.y, -1, 1))
  let phi = Math.atan2(localPoint.z, -localPoint.x)
  if (phi < 0) phi += Math.PI * 2

  const lat = 90 - THREE.MathUtils.radToDeg(theta)
  const lon = THREE.MathUtils.radToDeg(phi) - 180

  return { lat, lon }
}

// 위도, 경도로 도시 날씨 조회
const fetchWeatherByCoord = async (lat, lon) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
  const response = await axios.get(URL)
  const data = response.data

  return {
    id: data.id,
    nameKo: data.name || '바다',
    nameEn: data.name || '',
    countryCode: data.sys?.country?.toLowerCase() ?? '',
    temp: Math.round(data.main.temp),
    status: data.weather[0].description,
    humid: data.main.humidity,
  }
}

const handleMoveDetailView = (cityId) => {
  router.push('/weather/' + cityId)
}

onMounted(() => {
  surfaceBreadMeshes = []

  const container = canvasContainer.value
  const width = container.clientWidth
  const height = container.clientHeight

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
  camera.position.z = 3.6

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  earthTexture = new THREE.TextureLoader().load(earthTextureUrl)
  earthTexture.colorSpace = THREE.SRGBColorSpace

  earthNormalTexture = new THREE.TextureLoader().load(earthNormalMapUrl)

  earthGeometry = new THREE.SphereGeometry(1, 64, 64)
  earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    normalMap: earthNormalTexture,
    normalScale: new THREE.Vector2(3, 3),
  })
  earth = new THREE.Mesh(earthGeometry, earthMaterial)
  scene.add(earth)

  // 빵 (일단 지구 위쪽에 고정 - 지구 자전에 영향받지 않음)
  const rootStyles = getComputedStyle(document.documentElement)
  const breadBorderColor = rootStyles.getPropertyValue('--bread-border-color').trim() || '#d9a566'
  const breadFillColor = rootStyles.getPropertyValue('--bread-fill-color').trim() || '#fdf1d6'

  const breadShape = createRoundedRectShape(0.4, 0.4, 0.08)
  breadGeometry = new THREE.ExtrudeGeometry(breadShape, {
    depth: 0.08,
    bevelEnabled: false,
    curveSegments: 12,
  })
  breadGeometry.translate(0, 0, -0.04)

  // ExtrudeGeometry 그룹: 0 = 앞/뒷면(내용물), 1 = 옆면(테두리)
  breadMaterial = [
    new THREE.MeshPhongMaterial({ color: breadFillColor }),
    new THREE.MeshPhongMaterial({ color: breadBorderColor }),
  ]
  bread = new THREE.Mesh(breadGeometry, breadMaterial)
  bread.position.set(0, 1.3, 0)
  bread.rotation.x = Math.PI / 2
  scene.add(bread)

  // 지금까지의 시도 기록을 지구 표면에 재현 - 시도할수록 지구가 빵으로 뒤덮임
  sandwichStore.log.forEach((entry) => {
    earth.add(
      createSurfaceBread(
        entry.selectedCity.lat,
        entry.selectedCity.lon,
        getBreadFillColorForCity(entry.selectedCity, breadFillColor),
        breadBorderColor,
      ),
    )
    earth.add(
      createSurfaceBread(
        entry.oppositeCity.lat,
        entry.oppositeCity.lon,
        getBreadFillColorForCity(entry.oppositeCity, breadFillColor),
        breadBorderColor,
      ),
    )
  })

  // 빵 -> 지구 표면을 잇는 움직이는 점선 (지구에서도 선택할 수 있음을 보여주는 타겟팅 라인)
  const targetPoint = bread.position.clone().normalize()
  targetLineGeometry = new THREE.BufferGeometry().setFromPoints([bread.position, targetPoint])
  targetLineMaterial = new THREE.LineDashedMaterial({
    color: '#ff0000',
    dashSize: 0.05,
    gapSize: 0.03,
  })
  targetLine = new THREE.Line(targetLineGeometry, targetLineMaterial)
  targetLine.computeLineDistances()
  scene.add(targetLine)

  scene.add(new THREE.AmbientLight(0xffffff, 0.6))
  const sunLight = new THREE.DirectionalLight(0xffffff, 1)
  sunLight.position.set(5, 3, 5)
  scene.add(sunLight)

  // 드래그하면 카메라가 아니라 지구가 회전하도록 처리
  let isDragging = false
  let previousPointer = { x: 0, y: 0 }

  onPointerDown = (event) => {
    isDragging = true
    previousPointer = { x: event.clientX, y: event.clientY }
  }

  onPointerMove = (event) => {
    if (!isDragging) return
    const deltaX = event.clientX - previousPointer.x
    const deltaY = event.clientY - previousPointer.y
    earth.rotation.y += deltaX * 0.005
    earth.rotation.x += deltaY * 0.005
    previousPointer = { x: event.clientX, y: event.clientY }
  }

  onPointerUp = async () => {
    isDragging = false

    const { lat, lon } = getLatLonUnderBread()
    try {
      selectedCityInfo.value = await fetchWeatherByCoord(lat, lon)
    } catch (error) {
      console.error('선택한 위치의 날씨 정보를 가져오지 못했습니다:', error)
    }
  }

  renderer.domElement.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)

  const animate = () => {
    targetLineMaterial.dashOffset -= 0.01
    if (!isDragging) {
      earth.rotation.y += 0.0008
    }
    renderer.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }
  animate()

  resizeObserver = new ResizeObserver(() => {
    const w = container.clientWidth
    const h = container.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  })
  resizeObserver.observe(container)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  resizeObserver?.disconnect()
  renderer?.domElement?.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  earthGeometry?.dispose()
  earthMaterial?.dispose()
  earthTexture?.dispose()
  earthNormalTexture?.dispose()
  breadGeometry?.dispose()
  breadMaterial?.forEach((material) => material.dispose())
  surfaceBreadMeshes?.forEach(({ geometry, material }) => {
    geometry.dispose()
    material.forEach((m) => m.dispose())
  })
  targetLineGeometry?.dispose()
  targetLineMaterial?.dispose()
  renderer?.dispose()
  renderer?.domElement?.remove()
})
</script>

<template>
  <div class="earth-section">
    <div class="earth-layout">
      <div ref="canvasContainer" class="earth-canvas"></div>
      <div v-if="selectedCityInfo" class="selected-card">
        <WeatherCard :city-info="selectedCityInfo" @move-detail-view="handleMoveDetailView" />
      </div>
    </div>
    <p class="earth-caption bread-font-light">
      🌍 지구를 잡고 돌려서 원하는 위치에 놓아보세요 <br/> 놓은 자리의 날씨가 옆에 나타납니다
    </p>
  </div>
</template>

<style scoped>
.earth-section {
  margin: 16px auto;
  max-width: 1200px;
  text-align: center;
}

.earth-layout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.earth-canvas {
  flex: 1;
  min-width: 280px;
  height: 320px;
  cursor: grab;
}

.selected-card {
  width: 240px;
}

.earth-canvas:active {
  cursor: grabbing;
}

.earth-caption {
  margin-top: 12px;
}
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { useSandwichStore } from '../../stores/sandwich'
import earthTextureUrl from '../../assets/img/earth_day_4096.jpg'
import earthNormalMapUrl from '../../assets/img/earth_normal_map.png'

const sandwichStore = useSandwichStore()
const canvasContainer = ref(null)

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
  onPointerDown,
  onPointerMove,
  onPointerUp,
  surfaceBreadMeshes,
  stopWatchingCities

let isDragging = false
let previousPointer = { x: 0, y: 0 }

// 모서리 4곳이 둥근 사각형 프로필 (빵 슬라이스 실루엣) - EarthSection.vue와 동일한 로직
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

// 위도, 경도 -> 지구 로컬 좌표계 기준 단위구 표면 방향 벡터
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

const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

// duration(ms) 동안 0~1 진행도를 onProgress에 매 프레임 넘겨주는 프로미스 기반 트윈
const tween = (durationMs, onProgress) =>
  new Promise((resolve) => {
    const start = performance.now()
    const step = (now) => {
      const raw = Math.min((now - start) / durationMs, 1)
      onProgress(easeInOutQuad(raw))
      if (raw < 1) {
        requestAnimationFrame(step)
      } else {
        resolve()
      }
    }
    requestAnimationFrame(step)
  })

// 지정한 위도/경도 지점이 카메라를 정면으로 바라보도록 지구를 부드럽게 회전
const rotateEarthToFace = (lat, lon) => {
  const direction = latLonToLocalDirection(lat, lon)
  const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
    direction,
    new THREE.Vector3(0, 0, 1),
  )
  const startQuaternion = earth.quaternion.clone()

  return tween(1000, (progress) => {
    earth.quaternion.slerpQuaternions(startQuaternion, targetQuaternion, progress)
  })
}

// 지정한 위도/경도 위로 빵이 서서히 내려와 표면에 붙는 연출
const dropBreadOnto = (lat, lon, fillColor, borderColor) => {
  const mesh = createSurfaceBread(lat, lon, fillColor, borderColor)
  const restPosition = mesh.position.clone()
  const startPosition = restPosition.clone().multiplyScalar(2.6)
  mesh.position.copy(startPosition)
  earth.add(mesh)

  return tween(900, (progress) => {
    mesh.position.lerpVectors(startPosition, restPosition, progress)
  })
}

// 연출: 지구 자전 정지 -> 선택된 도시로 회전 -> 빵 착지 -> 반대편 도시로 회전 -> 빵 착지 -> 재개
const playCutscene = async () => {
  const rootStyles = getComputedStyle(document.documentElement)
  const breadBorderColor = rootStyles.getPropertyValue('--bread-border-color').trim() || '#d9a566'
  const breadFillColor = rootStyles.getPropertyValue('--bread-fill-color').trim() || '#fdf1d6'

  const selected = sandwichStore.selectedCity
  const opposite = sandwichStore.oppositeCity

  sandwichStore.isCutscenePlaying = true

  await rotateEarthToFace(selected.lat, selected.lon)
  await dropBreadOnto(selected.lat, selected.lon, breadFillColor, breadBorderColor)

  await rotateEarthToFace(opposite.lat, opposite.lon)
  await dropBreadOnto(opposite.lat, opposite.lon, breadFillColor, breadBorderColor)

  sandwichStore.isCutscenePlaying = false
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

  const rootStyles = getComputedStyle(document.documentElement)
  const breadBorderColor = rootStyles.getPropertyValue('--bread-border-color').trim() || '#d9a566'
  const breadFillColor = rootStyles.getPropertyValue('--bread-fill-color').trim() || '#fdf1d6'

  // WeatherDetailResult가 이번 방문 기록을 log에 push하기 전에 이 컴포넌트가 먼저 마운트되므로
  // (WeatherDetailView에서 EarthSectionForDetail을 앞에 배치) 여기 있는 log는 "이전" 기록만 담고 있음
  sandwichStore.log.forEach((entry) => {
    earth.add(
      createSurfaceBread(entry.selectedCity.lat, entry.selectedCity.lon, breadFillColor, breadBorderColor),
    )
    earth.add(
      createSurfaceBread(entry.oppositeCity.lat, entry.oppositeCity.lon, breadFillColor, breadBorderColor),
    )
  })

  scene.add(new THREE.AmbientLight(0xffffff, 0.6))
  const sunLight = new THREE.DirectionalLight(0xffffff, 1)
  sunLight.position.set(5, 3, 5)
  scene.add(sunLight)

  // 드래그하면 카메라가 아니라 지구가 회전하도록 처리 (연출 중에는 조작 불가)
  onPointerDown = (event) => {
    if (sandwichStore.isCutscenePlaying) return
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

  onPointerUp = () => {
    isDragging = false
  }

  renderer.domElement.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)

  const animate = () => {
    if (!isDragging && !sandwichStore.isCutscenePlaying) {
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

  // WeatherDetailResult의 API 통신 결과(선택된 두 지역)가 채워지면 연출 시작
  stopWatchingCities = watch(
    () => [sandwichStore.selectedCity, sandwichStore.oppositeCity],
    ([selected, opposite]) => {
      if (selected && opposite) {
        playCutscene()
      }
    },
  )
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  resizeObserver?.disconnect()
  stopWatchingCities?.()
  renderer?.domElement?.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  earthGeometry?.dispose()
  earthMaterial?.dispose()
  earthTexture?.dispose()
  earthNormalTexture?.dispose()
  surfaceBreadMeshes?.forEach(({ geometry, material }) => {
    geometry.dispose()
    material.forEach((m) => m.dispose())
  })
  renderer?.dispose()
  renderer?.domElement?.remove()
  sandwichStore.isCutscenePlaying = false
})
</script>

<template>
  <div class="earth-section-detail">
    <div ref="canvasContainer" class="earth-canvas"></div>
  </div>
</template>

<style scoped>
.earth-section-detail {
  margin: 16px auto;
  max-width: 1200px;
}

.earth-canvas {
  width: 100%;
  height: 360px;
  cursor: grab;
}

.earth-canvas:active {
  cursor: grabbing;
}
</style>

<script setup>
import { ref, defineAsyncComponent } from 'vue'
import UnitGoToHome from '@/components/ass/units/UnitGoToHome.vue'
import BaseContent from '@/components/ass/Slots/BaseContent.vue'

const practiceList = [
  { key: 'SampleOne', label: '일반 변수 vs ref 실습' },
  { key: 'SampleTwo', label: '텍스트 보간법 실습' },
  { key: 'SampleReactive', label: 'reactive() 실습' },
  { key: 'SampleComputed', label: 'computed() 실습' },
  { key: 'SampleWatch', label: 'watch() 기초 실습' },
  { key: 'SampleWatch2', label: 'reactive watch 규칙 실습' },
  { key: 'SampleWatchFX', label: 'watchEffect() 실습' },
  { key: 'SampleWatchMulti', label: '다중 watch 실습' },
  { key: 'SampleLifeCycle', label: '라이프사이클 실습' },
  { key: 'SampleVIf', label: 'v-if / v-else 실습' },
  { key: 'SampleVShow', label: 'v-show 실습' },
  { key: 'SampleVFor', label: 'v-for 실습' },
  { key: 'SampleVhtml', label: 'v-html 실습' },
  { key: 'SampleVText', label: 'v-text 실습' },
  { key: 'SampleVCloak', label: 'v-cloak 실습' },
  { key: 'SampleVPre', label: 'v-pre 실습' },
  { key: 'SampleVOnce', label: 'v-once 실습' },
  { key: 'SampleVMemo', label: 'v-memo 실습' },
  { key: 'SampleVXSS', label: 'v-html XSS 실습' },
  { key: 'SampleVbind_Basic', label: 'v-bind 기초 실습' },
  { key: 'SampleVbind_Shorthand', label: 'v-bind 단축 문법 실습' },
  { key: 'SampleVbind_ClassBinding', label: 'v-bind 클래스 바인딩 실습' },
  { key: 'SampleVbind_StyleBinding', label: 'v-bind 스타일 바인딩 실습' },
  { key: 'SampleVEventOn', label: 'v-on 이벤트 실습' },
  { key: 'SampleVEventModifier', label: '이벤트 수식어 실습' },
  { key: 'SampleVEventObject', label: '이벤트 객체($event) 실습' },
  { key: 'SlotPractice', label: 'Slot(default/named/scoped) 실습' },
].map((item) => ({
  ...item,
  component: defineAsyncComponent(
    () => import(`../components/practices/basic/${item.key}.vue`),
  ),
}))

const activeKey = ref(null)

const toggle = (key) => {
  activeKey.value = activeKey.value === key ? null : key
}
</script>

<template>
  <br/>
  <br/>
  <p class="bread-font-h3-light">수업 실습 기록</p>
  <BaseContent>
    <p class="bread-font-h3">🛠️ Practice / basic</p>
    <ul class="practice-list">
      <li v-for="item in practiceList" :key="item.key">
        <button
          class="practice-item"
          :class="{ active: activeKey === item.key }"
          @click="toggle(item.key)"
        >
          {{ item.label }}
        </button>
        <div v-if="activeKey === item.key" class="practice-content">
          <component :is="item.component" />
        </div>
      </li>
    </ul>
  </BaseContent>
  <UnitGoToHome />
</template>

<style scoped>
.practice-list {
  list-style: none;
  margin: 0;
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.practice-item {
  width: 100%;
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: var(--bread-border-color);
  background-color: var(--bread-fill-color);
  border: 2px solid var(--bread-border-color);
  border-radius: 12px;
  padding: 10px 14px;
  cursor: pointer;
}

.practice-item.active {
  color: var(--bread-fill-color);
  background-color: var(--bread-border-color);
}

.practice-content {
  margin: 8px 4px 4px;
  padding: 12px;
  border: 2px dashed var(--bread-border-color);
  border-radius: 12px;
  background-color: var(--bread-fill-color);
}
</style>

<script setup>
import { useSandwichStore } from '../../../stores/sandwich'

const sandwichStore = useSandwichStore()

</script>
<template>

    <div class="bread-cnt-area">
        <p class="bread-font-light">시도 횟수</p>
        <p class="bread-font-try-cnt">{{ sandwichStore.count }}</p>
    </div>
</template>
<style>
.bread-cnt-area {
  display: flex;
  flex-direction: column; /* 글자 두 줄을 위아래로 배치 */
  align-items: center;    /* 수평(좌우) 중앙 정렬 */
  text-align: center;     /* 텍스트 자체 중앙 정렬 */
  margin-top: 50px;
}



.bread-font-try-cnt {
  font-size: 10em;
  color: var(--bread-fill-color);
  text-shadow: 3px 3px var(--bread-border-color);
  margin:0;
}
</style>
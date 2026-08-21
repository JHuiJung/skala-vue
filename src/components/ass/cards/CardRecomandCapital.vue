<script setup>
defineProps({
  capitalInfo: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <div class="card-recomand-capital">
    <img
      :src="`https://flagcdn.com/w40/${capitalInfo.countryCode}.png`"
      :alt="capitalInfo.nameKo"
    />
    <p>{{ capitalInfo.nameEn }}</p>
    <p>{{ capitalInfo.nameKo }}</p>
  </div>
</template>

<style scoped>
.card-recomand-capital {
  display: block;
  border-radius: 15px;
  border-color: black;
  background-color: bisque;
  padding: 5px;
}
</style>

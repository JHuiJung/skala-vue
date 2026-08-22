<script setup>
import { useConfigStore } from '../../stores/config'

const configStore = useConfigStore()
</script>

<template>
  <el-radio-group v-model="configStore.unit" size="small">
    <el-radio-button value="celsius">C</el-radio-button>
    <el-radio-button value="fahrenheit">F</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 引入indexDB
import IndexedDB from '@/utils/indexedDB'

// 创建数据库
const airbnbDB = new IndexedDB('airbnbDB')
airbnbDB.openStore('elephant', 'id' ,['nose', 'ear'])

const value1 = ref(new Date())

</script>

<template>
  <div class="home">
    <h2>
      home
    </h2>
    <div>
      <el-button type="primary">Primary</el-button>
      <el-date-picker
          v-model="value1"
          type="week"
          format="[Week] ww"
          placeholder="Pick a week"
        />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

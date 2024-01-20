<script setup lang="ts">
import { ref } from 'vue';

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 引入indexDB
// import IndexedDB from '@/utils/indexedDB'

// 引入模拟请求elephant数据
// import { getElephantReq } from '@/api/elephant'


// 创建数据库
// const airbnbDB = new IndexedDB('airbnbDB')
// airbnbDB.openStore('elephant', 'id' ,['nose', 'ear'])

// indexedDB测试数据
// const data = {
//   id: 1,
//   nose: '修改大象的鼻子',
//   ear: '修改大象的耳朵'
// }

// function changeDB(storeName: string = 'elephant') {
//   airbnbDB.updateItem(storeName, data)
// }

// // 删除数据
// function deleteDBdata(storeName: string = 'elephant', key: number | string = 1) {
//   airbnbDB.deleteItem(storeName, key)
// }

// // 查询单个数据
// function getDBdata(storeName: string = 'elephant', key: number | string = 1) {
//   airbnbDB.getItem(storeName, key)
// }

// // 查询全部数据
// function getAllDBdata(storeName: string = 'elephant') {
//   airbnbDB.getAllItem(storeName)
// }

// 日历测试数据
const value1 = ref(new Date())

// getElephantReq().then(res => {
//   console.log('res', res)
// })

</script>

<template>
  <div class="home">
    <div>
      <span>{{ t('message.home') }}</span>
      <!-- <el-button type="primary" @click="changeDB('elephant')">测试数据</el-button>
      <el-button type="primary" @click="deleteDBdata('elephant', 1)">删除数据</el-button>
      <el-button type="primary" @click="getDBdata('elephant', 1)">查询单个数据</el-button>
      <el-button type="primary" @click="getAllDBdata('elephant')">查询全部数据</el-button> -->

      <el-date-picker
          v-model="value1"
          placeholder="Pick a week"
        />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

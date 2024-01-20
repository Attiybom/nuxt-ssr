<script setup lang="ts">
import { ref } from 'vue';

// api
import { saveLanguageReq } from "@/api/layout";

// 默认选中
const activeIndex = ref('orders')


const emits = defineEmits()
// 菜单点击事件
function handleSelect(key: string, keyPath: string) {
  console.log(key, keyPath);

  if (key === 'en') {
    console.log('en')
    emits('changeLang', key)
    saveLanguageReq(key)
  } else {
    console.log('zh')
    emits('changeLang', key)
    saveLanguageReq(key)
  }
}




</script>

<template>
  <div class="home-common">
    <img src="../assets/images/layout/logo.png" alt="" class="logo">
    <div>搜索框</div>
    <el-menu :default-active="activeIndex" class="el-menu-container" mode="horizontal" @select="handleSelect">
      <el-menu-item index="orders">房屋订单中心</el-menu-item>
      <el-menu-item index="records">历史足迹</el-menu-item>
      <el-sub-menu index="language">
        <template #title>语言切换</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">英文</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="me">
        <img src="../assets/images/layout/avatar.jpg" alt="个人中心" class="avatar">
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/layout/commonHeader.scss'
</style>

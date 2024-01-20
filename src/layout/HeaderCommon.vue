<script setup lang="ts">
import { ref } from 'vue';

// api
import { saveLanguageReq } from "@/api/layout";

// 引入语言包
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


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
      <el-menu-item index="orders">{{ t('header.orders') }}</el-menu-item>
      <el-menu-item index="records">{{ t('header.records') }}</el-menu-item>
      <el-sub-menu index="language">
        <template #title>{{ t('header.language') }}</template>
        <el-menu-item index="zh">{{ t('header.zh') }}</el-menu-item>
        <el-menu-item index="en">{{ t('header.en') }}</el-menu-item>
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

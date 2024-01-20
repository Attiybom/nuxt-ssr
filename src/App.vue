<script setup lang="ts">
import HeaderCommon from './layout/HeaderCommon.vue'
import FooterCommon from './layout/FooterCommon.vue'

import { ref, onBeforeMount } from 'vue';
import { RouterLink, useRouter } from 'vue-router'

// api
import { getLanguageReq } from '@/api/layout'

// 引入语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

// 定义语言包
const locale = ref(en)

// 引入i18n
import { useI18n } from 'vue-i18n'

const { locale: localeLanguage } = useI18n()

// 初始化语言
onBeforeMount(() => {
  getLanguage()
})

function getLanguage() {
  getLanguageReq().then(res => {
    if (res.code === 200) {
      console.log('获取语言成功')
      changeLang(res.data.name)
    } else {
      console.log('获取语言失败')
    }
  })
}

// 切换语言
function changeLang(lang: string) {
  if (lang === 'en') {
    locale.value = en
    localeLanguage.value = 'en'
  } else {
    locale.value = zhCn
    localeLanguage.value = 'zh'
  }
}

// // 跳转首页
// const router = useRouter()
// function toHome() {
//   router.push({
//     path: '/'
//   })
// }


</script>

<template>
  <el-config-provider :locale="locale">
    <HeaderCommon @changeLang="changeLang" />
    <div class="main-container">
      <router-view></router-view>
    </div>
    <FooterCommon />
    <!-- <div>
      <button @click="toHome">home</button>
      <RouterLink to="login">login</RouterLink>
      <RouterView></RouterView>
    </div> -->
    <!-- <div>
      <span>{{ t('message.home') }}</span>

      <el-button type="success" @click="changeLang('cn')">中文</el-button>
      <el-button type="success" @click="changeLang('en')">英文</el-button>
    </div> -->
  </el-config-provider>
</template>

<style scoped>
.main-container {
  min-height: calc(100vh - 352px);
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router'


// 引入语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'



// 定义语言包
const locale = ref(en)

// 引入i18n
import { useI18n } from 'vue-i18n'

const { t, locale:localeLanguage } = useI18n()


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

// 跳转首页
const router = useRouter()
function toHome() {
  router.push({
    path: '/'
  })
}


</script>

<template>
  <el-config-provider :locale="locale">
    <div>
      <!-- 首页和登录页跳转 -->
      <button @click="toHome">home</button>
      <RouterLink to="login">login</RouterLink>
      <RouterView></RouterView>
    </div>
    <div>
      <span>{{ t('message.home') }}</span>

      <!-- 切换语言 -->
      <el-button type="success" @click="changeLang('cn')">中文</el-button>
      <el-button type="success" @click="changeLang('en')">英文</el-button>
    </div>
  </el-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

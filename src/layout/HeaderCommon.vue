<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';


const status = ref('')

//
onBeforeMount(() => {
  console.log('onBeforeMount')
  status.value = localStorage.getItem('userStatus') || ''
  console.log( localStorage.getItem('userStatus') )
  console.log('status11', status.value)
})

// 引入路由
import { useRouter } from 'vue-router';
const router = useRouter();

// api
import { saveLanguageReq } from "@/api/layout";
import { userLogoutApi } from '@/api/login'

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
  } else if (key === 'zh') {
    console.log('zh')
    emits('changeLang', key)
    saveLanguageReq(key)
  } else if (key === 'login') {
    router.push({ path: '/login' })
  } else if (key === 'logout') {
    handleLogout()
  }
}

// 登出逻辑
function handleLogout() {
  userLogoutApi().then(res => {
    console.log('res', res)
    if (res.code === "000000") {
      ElMessage({
        message: '退出成功',
        type: 'success',
      })
      localStorage.removeItem('userStatus')
      status.value = ''
      router.push({ path: '/login' })
    }
  })
  // localStorage.removeItem('userStatus')
  // status.value = ''
  // router.push({ path: '/login' })
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
      <el-sub-menu index="avatar" v-if="status === '1'">
        <template #title>
          <img src="../assets/images/layout/avatar.jpg" alt="个人中心" class="avatar">
        </template>
        <el-menu-item index="logout">退出</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="login" v-else>
        {{ t('login.loginTab') }} / {{ t('login.signTab') }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/layout/commonHeader.scss'
</style>

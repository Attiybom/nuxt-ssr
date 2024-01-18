<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'

// 跳转首页
const router = useRouter()
function toHome() {
  router.push({
    path: '/'
  })
}

</script>

<template>
  <div>
    <!-- 首页和登录页跳转 -->
    <button @click="toHome">home</button>
    <RouterLink to="login">login</RouterLink>
    <RouterView></RouterView>
  </div>
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

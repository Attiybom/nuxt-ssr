import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

// 国际化
import i18n from './language/i18n'

// 初始化数据库
import airbnb from './db'

router.beforeEach((to, from, next) => {
  airbnb.airbnbDB.openStore({
    ...airbnb.userObjectStore,
    ...airbnb.languageObjectStore,
  }).then((res: any) => {
    console.log('数据库初始化成功', res)
    next()
  })
})

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')

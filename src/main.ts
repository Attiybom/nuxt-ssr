import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 国际化
import i18n from './language/i18n'

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')

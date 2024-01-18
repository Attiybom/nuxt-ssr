## 国际化
### 方案
组件的语言切换：element-plus
文本类的语言切换：vue-i18n

#### element-plus
* 变量locale设置语言环境
```js
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

// 定义语言包
const locale = ref(en)
```

* 用<el-config-provider>包裹组件

```js
  <el-config-provider :locale="locale">
    <app />
  </el-config-provider>
```

#### vue-i18n
1. 拆分
* 主
```ts
// language/i18n.ts
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false, // 不添加这个有可能会报模式错误
  locale: 'zh',
  messages: {
    zh, // 专门用来存放中文相关文案
    en // 专门用来存放中文相关文案
  }
})

export default i18n
```

2. 挂载
```ts
import { createApp } from 'vue'
...

// 国际化
import i18n from './language/i18n'

const app = createApp(App)

app.use(i18n) //挂载

app.mount('#app')
```

3. 使用
```js
import { useI18n } from 'vue-i18n'

// t 使用在模板字符串上， locale用于切换语言
const { t, locale:localeLanguage } = useI18n()

function changeLang(lang: string) {
  if (lang === 'en') {
    locale.value = en // 切换element-plus的组件语言
    localeLanguage.value = 'en' // 切换文本语言
  } else {
    locale.value = zhCn
    localeLanguage.value = 'zh'
  }
}

```
```html
<span>{{ t('message.home') }}</span>
```

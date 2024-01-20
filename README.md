## 国际化

### 方案

组件的语言切换：element-plus
文本类的语言切换：vue-i18n

#### element-plus

- 变量locale设置语言环境

```js
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

// 定义语言包
const locale = ref(en)
```

- 用<el-config-provider>包裹组件

```js
  <el-config-provider :locale="locale">
    <app />
  </el-config-provider>
```

#### vue-i18n
* 拆分语言包
```ts
// language文件下
// i18n.ts 主入口文件
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  messages: {
    zh,
    en
  }
})

export default i18n

// zh.ts 中文语料包
export default {
  header: { // 头部组件
    records: '历史足迹',
  }
}

// en.ts 英文语料包
export default {
  header: { // 头部组件
    records: 'The historical footprints',
  }
}
```

* 挂载
```ts
// main.ts

// 国际化
import i18n from './language/i18n'
app.use(i18n)

```
* 使用

```ts
// HeaderCommon.vue
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
```
```html
<div class="home-common">
<!-- //  中文环境下, 这里会显示“历史足迹” -->
<!-- //  英文环境下，这里会显示“The historical footprints” -->
  <el-menu-item index="records">{{ t('header.records') }}</el-menu-item>
</div>
```


1. 拆分

- 主

```ts
// language/i18n.ts
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false, // 不添加这个有可能会报模式错误
  locale: 'zh',
  messages: {
    zh, // 专门用来存放中文相关文案
    en, // 专门用来存放中文相关文案
  },
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

## indexedDB 使用

### 封装操作indexedDB方法
* 为了解决indexedDB的异步操作问题，需要对其进行一层promise封装

```js
// utils/indexedDB
export default class DB {
  // 定义一个私有属性 dbName，用于存储数据库的名称
  private dbName: string
  private db: any

  // 类的构造函数，接收一个数据库名称，并将其赋值给私有属性 dbName
  constructor(dbName: string) {
    this.dbName = dbName;
  }

  // 定义一个公共方法 openStore，用于创建或打开一个数据库存储空间（object store）
  public openStore(storeName: string, keyPath: string, indexs: Array<string>) {
    // 使用 indexedDB API 打开或创建一个数据库，版本为 1
    const request = window.indexedDB.open(this.dbName, 1);

    return new Promise((resolve, reject) => {
      // 当数据库打开成功时触发的事件处理函数
      request.onsuccess = (event) => {
        // 数据库打开成功时的操作
        this.db = event
        resolve(true)
      };

      // 当数据库打开失败时触发的事件处理函数
      request.onerror = (event) => {
        // 数据库打开失败时的操作
        reject(false)
      };

      // 在数据库版本升级时（或数据库第一次创建时）触发的事件处理函数
      request.onupgradeneeded = (event) => {
        // 获取数据库实例
        const { result } = event.target;
        // 创建一个新的存储空间（object store），并设置主键和自增属性
        const store = result.createObjectStore(storeName, {
          keyPath,
          autoIncrement: true
        });

        // 如果提供了索引列表，则为存储空间创建这些索引
        if(indexs && indexs.length > 0) {
          indexs.forEach(item => {
            store.createIndex(item, item, { unique: true });
          });
        }

        // 当存储空间创建完毕后触发的事件处理函数
        store.transaction.oncomplete = () => {
          // 存储空间创建完成后的操作
          resolve(true)
        };
      };
    })
  }


  public updateData(storeName: string, data: any) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)

    const request = store.put({
      ...data,
      timestamp: Date.now()
    })

    return new Promise((resolve, reject) => {

      request.onsuccess = (event) => {
        resolve(event.target.result)
      }

      request.onerror = (event) => {
        reject(false)
      }
    })
  }

  public deleteData(storeName: string, key: string | number) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)

    const request = store.delete(key)

    return new Promise((resolve, reject) => {

      request.onsuccess = (event) => {
        resolve(event.target.result)
      }

      request.onerror = (event) => {
        reject(false)
      }
    })
  }

  public getSingleData(storeName: string, key: string | number) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)

    const request = store.get(key)

    return new Promise((resolve, reject) => {

      request.onsuccess = (event) => {
        resolve(event.target.result)
      }

      request.onerror = (event) => {
        reject(false)
      }
    })
  }

  public getAllData(storeName: string) {
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)

    const request = store.getAll()

    return new Promise((resolve, reject) => {

      request.onsuccess = (event) => {
        resolve(event.target.result)
      }

      request.onerror = (event) => {
        reject(false)
      }
    })
  }
}


```


## CSR AND SSR
### 传统SSR
* 例子：爱彼迎
* 服务端渲染
```
传统服务端渲染有JSP、ESP、ASP等，通过模板引擎将数据和dom在服务端完成渲染，返回完整html给客户端
客户端只负责显示
```

* 原理
1.  客户端发起http请求
2.  服务端响应请求，将拼接好的html字符串发送给客户端
3.  客户端渲染html

* 缺点
1.  前后端不分离，耦合度过高，不好维护
2.  客户体验不佳，刷新数据可能需要重新加载页面
3.  服务端压力大


### CSR
* 例子：飞书
* 客户端渲染
```
服务端返回空html
客户端通过js进行页面的渲染和路由跳转等操作
页面数据通过ajax请求从服务端获取，
在客户端进行页面的拼接和渲染

```
* 原理
1.  客户端发起请求
2.  服务端响应请求，返回空html
3.  客户端初始化时加载必须的js脚本，请求接口
4.  将生成的dom插入到之前的空html中
* 缺点
1.  首屏加载慢
2.  不利于SEO （源码中压根就没有自己的内容，也就不会被爬到关键字，自然不利于SEO）


### 同构
* 例子：美团
* 服务端渲染 + 客户端渲染

* 原理
1.  客户端发起请求
2.  服务端响应请求，将vue实例转化为静态html字符串发送给客户端
3.  客户端渲染静态html，而对于一些操作则需要客户端自行处理


* 缺点
1.  服务端压力大
2.  一些第三方库可能需要特殊处理
3.  涉及构建设置和部署的更多要求（有一些生命周期只有在服务端有，客户端没有，而第三方库有些是没有考虑到这点）

* 优点
1.  首屏加载速度快
2.  前后端分离，易于维护
3.  有利于SEO

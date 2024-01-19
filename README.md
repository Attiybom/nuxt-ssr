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

export default class DB {
  private dbName: string

  // 初始化
  constructor(dbName: string) {
    this.dbName = dbName
  }

  // 打开数据库
  // storeName: 对象仓库名称
  // keyPath: 主键
  // indexs: 索引数组 (可选)
  public openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
    const request = window.indexedDB.open(this.dbName, 1)

    // 请求成功的回调
    request.onsuccess = (event: any) => {
      console.log('数据库打开成功')
      console.log(event)
    }

    // 失败的回调
    request.onerror = (event: any) => {
      console.log('数据库打开失败')
      console.log(event)
    }

    // 数据库版本变化的回调
    request.onupgradeneeded = (event: any) => {
      console.log('数据库版本变化了')

      // 获取数据库对象
      const { result } = event.target
      // 创建对象仓库
      // autoIncrement: 是否自增
      const store = result.createObjectStore(storeName, {
        autoIncrement: true,
        keyPath,
      })

      // 创建索引
      // unique: 是否唯一
      // 判断索引是否存在
      if (indexs && indexs.length > 0) {
        indexs.forEach((item: string) => {
          // 创建索引
          // 索引名称、索引字段、配置
          store.createIndex(item, item, { unique: true })
        })
      }

      // 对象仓库成功回调
      store.transaction.oncomplete = (event: any) => {
        console.log('对象仓库创建成功')
        console.log(event)
      }
      console.log(event)
    }
  }
}

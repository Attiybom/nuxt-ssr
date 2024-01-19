export default class DB {
  private dbName: string

  private db: any

  // 初始化
  constructor(dbName: string) {
    this.dbName = dbName
  }

  // 打开数据库
  // storeName: 对象仓库名称
  // keyPath: 主键
  // indexs: 索引数组 (可选)
  public openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
    // promise封装
    const request = window.indexedDB.open(this.dbName, 1)

    return new Promise((resolve, reject) => {

      // 请求成功的回调
      request.onsuccess = (event: any) => {
        console.log('数据库打开成功')
        this.db = event.target.result
        // console.log(event)
        resolve(true)
      }

      // 失败的回调
      request.onerror = (event: any) => {
        console.log('数据库打开失败')
        console.log(event)
        reject(false)
      }

      // 数据库版本变化的回调
      request.onupgradeneeded = (event: any) => {
        console.log('数据库版本变化了')

        // 获取数据库实例
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
            store.createIndex(item, item, { unique: false })
          })
        }

        // 对象仓库成功回调
        store.transaction.oncomplete = (event: any) => {
          console.log('对象仓库创建成功')
          // console.log(event)
          resolve(true)
        }
        // console.log(event)
      }
    })
  }


  // 添加/修改数据方法
  // storeName: 对象仓库名称
  // data: 数据
  public updateItem(storeName: string, data: any) {
    console.log('添加/修改数据')
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)
    // 添加数据 - 不需要传入主键，可以直接使用add方法
    // 这里是为了兼容修改数据,因此使用put方法
    // 修改数据需要外界传入主键
    const request = store.put({
      ...data,
      // 时间戳
      timestamp: Date.now(),
    })

    // promise封装
    return new Promise((resolve, reject) => {


      // 请求成功的回调
      request.onsuccess = (event: any) => {
        console.log('数据写入成功')
        // console.log(event)
        resolve(event)
      }

      // 失败的回调
      request.onerror = (event: any) => {
        console.log('数据写入失败')
        console.log(event)
        reject(event)
      }
    })

  }


  // 删除数据方法
  // storeName: 对象仓库名称
  // key: 主键
  public deleteItem(storeName: string, key: number | string) {
    console.log('删除数据')
    const store = this.db.transaction([storeName], 'readwrite').objectStore(storeName)

    const request = store.delete(key)
    // promise封装
    return new Promise((resolve, reject) => {
      // 删除数据

      // 请求成功的回调
      request.onsuccess = (event: any) => {
        console.log('数据删除成功')
        // console.log(event)
        resolve(event)
      }

      // 失败的回调
      request.onerror = (event: any) => {
        console.log('数据删除失败')
        console.log(event)
        reject(event)
      }
    })
  }


  // 查询数据方法
  // storeName: 对象仓库名称
  // key: 主键
  public getItem(storeName: string, key: number | string) {
    console.log('查询数据')
    const store = this.db.transaction(storeName).objectStore(storeName)
    // 查询数据
    const request = store.get(key)

    // promise封装
    return new Promise((resolve, reject) => {

      // 请求成功的回调
      request.onsuccess = (event: any) => {
        console.log('数据查询成功')
        // console.log(event.target.result)
        resolve(event.target.result)
      }

      // 失败的回调
      request.onerror = (event: any) => {
        console.log('数据查询失败')
        console.log(event)
        reject(false)
      }
    })
  }

  // 查询所有数据方法
  // storeName: 对象仓库名称
  public getAllItem(storeName: string) {
    console.log('查询全部数据')
    const store = this.db.transaction(storeName).objectStore(storeName)


    // 查询数据
    const request = store.getAll()

    // promise封装
    return new Promise((resolve, reject) => {
      // 请求成功的回调
      request.onsuccess = (event: any) => {
        console.log('全部数据查询成功')
        // console.log(event.target.result)
        resolve(event.target.result)
      }

      // 失败的回调
      request.onerror = (event: any) => {
        console.log('全部数据查询失败')
        console.log(event)
        reject(false)
      }
    })
  }
}

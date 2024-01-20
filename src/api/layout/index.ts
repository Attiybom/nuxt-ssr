import IndexedDB from '@/utils/indexedDB'

const airbnbDB = new IndexedDB('airbnbDB')

// 保存语言包接口
export async function saveLanguageReq(lang: any) {
  // loading 效果
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.1)',
  })

  await airbnbDB.openStore('language', 'id', ['name'])

  const resultOr = await airbnbDB.getItem('language', 1).then((res: any) => ({
    code: 200,
    msg: 'success',
    data: res,
  }))

  const { code } = resultOr

  let obj = {}
  if (code === 200) {
    // 用户设定过数据，更新数据
    obj = { name: lang, id: 1 }
  } else {
    // 用户未曾设定过数据，则新增数据
    obj = { name: lang }
  }

  const result = await airbnbDB.updateItem('language', obj).then(() => ({
    code: 200,
    msg: 'success',
    data: null,
  }))

  setTimeout(() => {
    loading.close()
  }, 200)

  return result
}

// 获取语言包接口
export async function getLanguageReq() {
  await airbnbDB.openStore('language', 'id', ['name'])

  // loading 效果
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.1)',
  })

  const result = await airbnbDB.getItem('language', 1)

  setTimeout(() => {
    loading.close()
  }, 200)

  return {
    code: 200,
    msg: 'success',
    data: result,
  }
}

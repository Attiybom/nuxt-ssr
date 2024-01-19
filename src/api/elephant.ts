// import { request } from '@/utils/request';
import IndexedDB from '@/utils/indexedDB';

const airbnbDB = new IndexedDB('airbnbDB');

const dbName = 'elephant';
const storeName = 'elephant';

export async function getElephantReq() {

  await airbnbDB.openStore('elephant', 'id', ['nose', 'ear']);

  const res =  await airbnbDB.getAllItem('elephant')

  return {
    code: 200,
    msg: 'success',
    data: res
  };
}

// import { request } from '@/utils/request';

import { airbnbDB } from '../db/index'

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

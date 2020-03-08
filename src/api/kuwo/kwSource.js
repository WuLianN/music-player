/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:54:55
 * @LastEditTime: 2019-08-30 18:14:23
 * @LastEditors: Please set LastEditors
 */
import { kuwo } from '../config/common'

const api = {
  // 酷我音乐
  search: `${kuwo}/search`,
  url: `${kuwo}/url`,
  pic: `${kuwo}/pic`,
  lrc: `${kuwo}/lrc`
}

export const search = api.search
export const url = api.url
export const pic = api.pic
export const lrc = api.lrc

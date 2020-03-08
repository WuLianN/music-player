/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:54:29
 * @LastEditTime: 2019-08-30 18:14:05
 * @LastEditors: Please set LastEditors
 */

import { tencent } from '../config/common'

const api = {
  // QQ音乐
  userSongList: `${tencent}/songList/user`, // 用户歌单信息
  songList: `${tencent}/songList`, // 音乐歌单
  url: `${tencent}/url`, // 音乐播放地址
  lrc: `${tencent}/lrc` // 音乐歌词
}

export const userSongList = api.userSongList
export const songList = api.songList
export const lrc = api.lrc
export const url = api.url

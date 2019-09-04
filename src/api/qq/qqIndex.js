/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:54:21
 * @LastEditTime: 2019-08-22 18:52:14
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios'

import {
  userSongList,
  songList,
  lrc
} from './qqSource'

export default {
  /**
     * @description: 音乐用户歌单
     * @param uid userId
     * @return:
     */

  getUserSongList (uid) {
    return axios.get(userSongList, {
      params: {
        uid: uid
      }
    })
  },

  /**
     * @description: 音乐歌单
     * @param id 音乐id
     * @param format 格式化
     * @return:
     */

  getSongList (id, format) {
    return axios.get(songList, {
      params: {
        id: id,
        format: format
      }
    })
  },

  /**
    * @description: 音乐歌词
    * @param id 音乐ID
    * @return:
    */

  getLrc (id) {
    return axios.get(lrc, {
      params: {
        id: id
      }
    })
  }

}

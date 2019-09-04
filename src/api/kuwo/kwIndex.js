/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:54:43
 * @LastEditTime: 2019-08-13 11:05:36
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios'

import {
  search,
  url,
  pic,
  lrc
} from './kwSource'

export default {
  /**
      * @description: 搜索音乐
      * @param keywords 关键词
      * @param type 类型  song singer album songList video radio user lrc
      * @param pageSize 条数
      * @return:
      */

  getKWsearch (keywords, type, pageSize) {
    return axios.get(search, {
      params: {
        keyword: keywords,
        type: type,
        pageSize: pageSize
      }
    })
  },

  /**
    * @description: 音乐播放地址
    * @param id 音乐ID
    * @param quality 码率类型：128 192 320 flac
    * @return:
    */

  getKWurl (id, quality) {
    return axios.get(url, {
      params: {
        id: id,
        quality: quality
      }
    })
  },

  /**
   * @description: 音乐图片
   * @param id 音乐ID
   * @param imgSize 图片大小  默认获取 200x200 大小的图片
   * @return:
   */

  getKWpic (id) {
    return axios.get(pic, {
      params: {
        id: id
      },
      responseType: 'arraybuffer'
    })
  },

  /**
    * @description: 音乐歌词
    * @param id 音乐ID
    * @return:
    */

  getKWlrc (id) {
    return axios.get(lrc, {
      params: {
        id: id
      }
    })
  }

}

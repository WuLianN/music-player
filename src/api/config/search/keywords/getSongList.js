/*
 * @Description: 搜索 "关键词" 的歌单
 * @Author: wuLianN
 * @Date: 2019-08-17 13:33:50
 * @LastEditTime: 2019-08-27 12:02:11
 * @LastEditors: Please set LastEditors
 */

import api from '@/api/index'
import { searchCat4 } from '@/api/config/search/search'

const search = {
  keyword1: '云音乐飙升榜',
  keyword2: '新歌榜',
  keyword3: '云音乐热歌榜',
  keyword4: '网易原创歌曲榜',
  keyword5: '人气榜',
  keyword6: '畅销榜',
  keyword7: '江小白YOLO云音乐说唱榜',
  keyword8: '说唱TOP榜',
  keyword9: '电音榜',
  keyword10: 'ACG音乐榜',
  keyword11: '云音乐欧美新歌榜',
  keyword12: '抖音排行榜',
  keyword13: '美国Billboard周榜',
  keyword14: 'UK排行榜周榜',
  keyword15: 'Beatport全球电子舞曲榜',
  keyword16: '日本Oricon周榜',
  keyword17: 'iTunes榜',
  keyword18: '美国Q杂志中文榜周榜'
}
export default {
  /**
     * @description: "飙升榜" 歌单
     * @param {type}
     * @return:
     */

  getSoaringSongs () {
    return api.getWYsearch(search.keyword1, searchCat4, 1)
  },

  /**
     * @description: "新歌榜" 歌单
     * @param {type}
     * @return:
     */

  getLastestSongs () {
    return api.getWYsearch(search.keyword2, searchCat4, 1)
  },

  /**
     * @description: "热歌榜" 歌单
     * @param {type}
     * @return:
     */

  getHotSongs () {
    return api.getWYsearch(search.keyword3, searchCat4, 1)
  },

  /**
     * @description: "网易原创歌曲榜" 歌单
     * @param {type}
     * @return:
     */

  getOriginalSongs () {
    return api.getWYsearch(search.keyword4, searchCat4, 1)
  },

  /**
    * @description: "江小白YOLO云音乐说唱榜" 歌单
    * @param {type}
    * @return:
    */

  getYOLOsongs () {
    return api.getWYsearch(search.keyword7, searchCat4, 1)
  },

  /**
   * @description: "说唱TOP榜" 歌单
   * @param {type}
   * @return:
   */

  getRap () {
    return api.getWYsearch(search.keyword8, searchCat4, 1)
  },

  /**
   * @description: "云音乐电音榜" 歌单
   * @param {type}
   * @return:
   */
  getElectronica () {
    return api.getWYsearch(search.keyword9, searchCat4, 1)
  },

  /**
    * @description: "云音乐ACG音乐榜" 歌单
    * @param {type}
    * @return:
    */

  getACGsongs () {
    return api.getWYsearch(search.keyword10, searchCat4, 1)
  },

  /**
    * @description: "云音乐欧美新歌榜" 歌单
    * @param {type}
    * @return:
    */

  getEnglishNewSongs () {
    return api.getWYsearch(search.keyword11, searchCat4, 1)
  },

  /**
    * @description: "抖音排行榜" 歌单
    * @param {type}
    * @return:
    */

  getTikToKSongs () {
    return api.getWYsearch(search.keyword12, searchCat4, 1)
  },

  /**
    * @description: "美国Billboard周榜" 歌单
    * @param {type}
    * @return:
    */

  getBillboard () {
    return api.getWYsearch(search.keyword13, searchCat4, 1)
  },

  /**
    * @description: "UK排行榜周榜" 歌单
    * @param {type}
    * @return:
    */

  getUK () {
    return api.getWYsearch(search.keyword14, searchCat4, 1)
  },

  /**
        * @description: "Beatport全球电子舞曲榜" 歌单
        * @param {type}
        * @return:
        */

  getBeatport () {
    return api.getWYsearch(search.keyword15, searchCat4, 1)
  },

  /**
        * @description: "日本Oricon周榜" 歌单
        * @param {type}
        * @return:
        */

  getOricon () {
    return api.getWYsearch(search.keyword16, searchCat4, 1)
  },

  /**
        * @description: "iTunes榜" 歌单
        * @param {type}
        * @return:
        */

  getiTunes () {
    return api.getWYsearch(search.keyword17, searchCat4, 1)
  },

  /**
        * @description: "美国Q杂志中文榜周榜" 歌单
        * @param {type}
        * @return:
        */

  getQboard () {
    return api.getWYsearch(search.keyword18, searchCat4, 1)
  }

}

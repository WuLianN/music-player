/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 13:43:40
 * @LastEditTime: 2019-10-12 17:57:48
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios'
import {
  search,
  pic,
  lrc,
  url,
  banner,
  recommentList,
  hotSongList,
  highQualityList,
  songList,
  songDetail,
  singerAlbum,
  singerSongList,
  singerMV,
  singerInfo,
  singerRankList,
  songListComment,
  album,
  userSongList,
  mvTop,
  mvUrl,
  rankList,
  rankListDetail,
  topAlbum,
  newSong,
  topSong,
  topList
} from './source'

export default {
  /**
     * @description: 搜索音乐
     * @param keywords 关键词
     * @param type 类型  song singer album songList video radio user lrc
     * @param pageSize 条数
     * @return:
     */

  getSearch(keywords, type, limit) {
    return axios.get(search, {
      params: {
        keywords,
        type,
        limit
      }
    })
  },

  /**
     * @description: 音乐播放地址
     * @param id 音乐ID
     * @param quality 码率类型：128 192 320 flac
     * @return:
     */

  getUrl(id, timestamp) {
    return axios.get(url, {
      params: {
        id, timestamp
      }
    })
  },

  /**
     * @description: 音乐图片
     * @param id 音乐ID
     * @param imgSize 图片大小  默认获取 200x200 大小的图片
     * @return:
     */

  getPic(id, imgSize) {
    return axios.get(pic, {
      params: {
        id,
        imgSiz
      }
    })
  },

  /**
     * @description: 音乐歌词
     * @param id 音乐ID
     * @return:
     */

  getLrc(id) {
    return axios.get(lrc, {
      params: {
        id
      }
    })
  },

  /**
     * @description: 首页轮播图
     * @param type
     * @return:
     */

  getBanner(type) {
    return axios.get(banner, {
      params: {
        type
      }
    })
  },

  /**
   * @description: 推荐歌单
   * @param limit 取出数量, 默认为 30
   * @param offset 偏移数量, 用于分页, 如:( 页数 -1)*30, 其中30为limit的值, 默认为0
   * @return:
   */

  getRecommentList(limit, offset = 0) {
    return axios.get(recommentList, {
      params: {
        limit,
        offset
      }
    })
  },

  /**
   * @description: 首页轮播图专辑 ()
   * @param id 专辑id
   * @return:
   */

  getAlbum(id) {
    return axios.get(album, {
      params: {
        id
      }
    })
  },

  /**
     * @description: 热门歌单
     * @param categoryType 歌单分类
     * @param orderType 分别对应最新和最热
     * @param limit 获取条数
     * @param offset 分页
     * @return:
     */

  getHotSongList(cat, limit, offset, order = 'hot') {
    return axios.get(hotSongList, {
      params: {
        cat,
        limit,
        offset,
        order
      }
    })
  },

  /**
     * @description: 精品歌单
     * @param cat 歌单分类
     * @param before 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
     * @param limit 获取条数
     * @return:
     */

  getHighQualityList(cat, limit, before) {
    return axios.get(highQualityList, {
      params: {
        cat,
        limit,
        before
      }
    })
  },

  /**
     * @description: 音乐歌单
     * @param id 网易云歌单的ID
     * @param format 格式化数据 1 格式化 0 不格式化
     * @return:
     */

  getSongList(id) {
    return axios.get(songList, {
      params: {
        id
      }
    })
  },

  /**
   * @description: 歌曲详情
   * @param ids 网易云歌单的ID 
   * @return:
   */

  getSongDetail(ids) {
    return axios.get(songDetail, {
      params: {
        ids
      }
    })
  },

  /**
     * @description: 歌手专辑
     * @param id 歌手ID
     * @return:
     */

  getSingerAlbum(id, limit, offset) {
    return axios.get(singerAlbum, {
      params: {
        id,
        limit,
        offset
      }
    })
  },

  /**
    * @description: 歌手歌曲
    * @param id 歌手ID
    * @return:
    */

  getSingerSongList(id) {
    return axios.get(singerSongList, {
      params: {
        id
      }
    })
  },

  /**
    * @description: 歌手MV
    * @param id 歌手ID
    * @return:
    */

  getSingerMV(id) {
    return axios.get(singerMV, {
      params: {
        id
      }
    })
  },

  /**
     * @description: 歌手信息
     * @param id歌手ID
     * @return:
     */

  getSingerInfo(id) {
    return axios.get(singerInfo, {
      params: {
        id
      }
    })
  },

  /**
     * @description: 歌手排行榜
     * @param pageSize
     * @param page
     * @return:
     */

  getSingerRankList(pageSize, page) {
    return axios.get(singerRankList, {
      params: {
        pageSize,
        page
      }
    })
  },

  /**
     * @description: 歌单评论
     * @param id
     * @param pageSize
     * @param page
     * @return:
     */

  getSongListComment(id, limit, offset) {
    return axios.get(songListComment, {
      params: {
        id,
        limit,
        offset
      }
    })
  },

  /**
   * @description:  用户歌单信息
   * @param uid 用户ID
   * @return:
   */

  getUsetSongList(uid) {
    return axios.get(userSongList, {
      params: {
        uid
      },

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  /**
   * @description: mv排行榜
   * @param {type}
   * @return:
   */

  getMVtop() {
    return axios.get(mvTop)
  },

  /**
   * @description: mv地址
   * @param id
   * @return:
   */

  getMVurl(id) {
    return axios.get(mvUrl, {
      params: {
        id
      }
    })
  },

  /**
   * @description: 排行榜
   * @param idx
   * @return:
   */

  getRankList(idx) {
    return axios.get(rankList, {
      params: {
        idx
      }
    })
  },

  /**
   * @description: 所有榜单内容摘要
   * @param {type}
   * @return:
   */

  getRankListDetail() {
    return axios.get(rankListDetail)
  },

  /**
   * @description: 新碟上架
   * @param limit
   * @param offset
   * @return:
   */

  getTopAlbum(limit, offset) {
    return axios.get(topAlbum, {
      params: {
        limit,
        offset
      }
    })
  },

  /**
   * @description: 推荐新音乐
   * @param {type}
   * @return:
   */

  getNewSong() {
    return axios.get(newSong)
  },

  /**
   * @description: 新歌速递
   * @param type 全部:0 华语:7 欧美:96 日本:8 韩国:16
   * @return:
   */

  getTopSong(type) {
    return axios.get(topSong, {
      params: {
        type
      }
    })
  },

  /**
   * @description: 所有榜单
   * @param {type}
   * @return:
   */

  getTopList() {
    return axios.get(topList)
  }
}

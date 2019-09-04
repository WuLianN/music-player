/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 13:59:55
 * @LastEditTime: 2019-09-04 15:39:11
 * @LastEditors: Please set LastEditors
 */

/** development环境 */
const api = {
  // 网易云音乐
  search: '/search', // 搜索
  url: '/song/url', // 音乐播放地址
  lrc: '/lyric', // 音乐歌词
  banner: '/banner', // 首页轮播图
  mvTop: '/top/mv', // MV排行榜
  mvUrl: '/mv/url', // mv 地址
  recommentList: '/personalized', // 推荐歌单
  songList: '/playlist/detail', // 音乐歌单
  
  album: '/album', // 首页轮播图专辑
  
  hotSongList: 'WYapi/songList/hot', // 热门歌单
  highQuality: 'WYapi/songList/highQuality', // 精品歌单

  singerAlbum: 'WYapi/album/artist', // 歌手专辑
  singerSongList: 'WYapi/song/artist', // 歌手歌曲
  singerMV: 'WYapi/mv/artist', // 歌手MV
  singerInfo: 'WYapi/artist/info', // 歌手信息
  singerRankList: 'WYapi/artist/top', // 歌手排行榜
  songListComment: 'WYapi/comment/songList', // 歌单评论
  songInfo: 'WYapi/song', // 音乐详情
  userSongList: 'WYapi/songList/user', // 用户歌单信息

  lastestSongs: 'WYapi/song/newest' // 最新音乐
}

export const search = api.search
export const url = api.url
export const pic = api.pic
export const lrc = api.lrc
export const banner = api.banner
export const recommentList = api.recommentList
export const mvUrl = api.mvUrl


export const album = api.album
export const hotSongList = api.hotSongList
export const highQualityList = api.highQuality
export const songList = api.songList
export const singerAlbum = api.singerAlbum
export const singerSongList = api.singerSongList
export const singerMV = api.singerMV
export const singerInfo = api.singerInfo
export const singerRankList = api.singerRankList
export const songListComment = api.songListComment
export const songInfo = api.songInfo
export const userSongList = api.userSongList
export const mvTop = api.mvTop
export const lastestSongs = api.lastestSongs
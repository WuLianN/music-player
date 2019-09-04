/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 10:51:29
 * @LastEditTime: 2019-08-14 19:00:58
 * @LastEditors: Please set LastEditors
 */
const state = {
  ID: '',
  PicUrl: '',
  SongArtist: '',
  SongName: '',
  Lrc: '',
  API: '',
  Duration: '',
  CurrentTime: '',
  CurrentIndex: '',
  IsUpdate: false,
  IsPlayOrPause: true,
  IsLoop: false,
  IsUpdateCurrentTime: false,
  IsPlay: false,
  IsPause: false
}

const getters = {
  getID: state => {
    return state.ID
  },

  getPicUrl: state => {
    return state.PicUrl
  },

  getSongArtist: state => {
    return state.SongArtist
  },

  getSongName: state => {
    return state.SongName
  },

  getLrc: state => {
    return state.Lrc
  },

  getAPI: state => {
    return state.API
  },

  getDuration: state => {
    return state.Duration
  },

  getCurrentTime: state => {
    return state.CurrentTime
  },

  getIsUpdate: state => {
    return state.IsUpdate
  },

  getIsPlayOrPause: state => {
    return state.IsPlayOrPause
  },

  getCurrentIndex: state => {
    return state.CurrentIndex
  },

  getIsLoop: state => {
    return state.IsLoop
  },

  getIsUpdateCurrentTime: state => {
    return state.IsUpdateCurrentTime
  },

  getIsPlay: state => {
    return state.IsPlay
  },

  getIsPause: state => {
    return state.IsPause
  }

}

const mutations = {
  // 设置歌曲ID
  setID (state, id) {
    state.ID = id
  },

  // 设置歌曲图片地址
  setPicUrl (state, picUrl) {
    state.PicUrl = picUrl
  },

  // 设置歌手
  setSongArtist (state, songArtist) {
    state.SongArtist = songArtist
  },

  // 设置歌名
  setSongName (state, songName) {
    state.SongName = songName
  },

  // 设置歌词 qq音乐
  setLrc (state, lrc) {
    state.Lrc = lrc
  },

  // 设置api来源
  setAPI (state, api) {
    state.API = api
  },

  // 设置歌曲长度
  setDuration (state, duration) {
    state.Duration = duration
  },

  // 设置歌曲当前的长度
  setCurrentTime (state, currentTime) {
    state.CurrentTime = currentTime
  },

  // 设置歌曲更新
  setIsUpdate (state, isUpdate) {
    state.IsUpdate = isUpdate
  },

  // 设置播放/暂停
  setIsPlayOrPause (state, isPlayOrPause) {
    state.IsPlayOrPause = isPlayOrPause
  },

  // 设置当前歌曲的索引（歌单）
  setCurrentIndex (state, currentIndex) {
    state.CurrentIndex = currentIndex
  },

  // 设置单曲循环
  setIsLoop (state, isLoop) {
    state.IsLoop = isLoop
  },

  // 设置更新currentTime
  setIsUpdateCurrentTime (state, isUpdateCurrentTime) {
    state.IsUpdateCurrentTime = isUpdateCurrentTime
  },

  // 设置歌曲播放的状态
  setIsPlayState (state, isPlay) {
    state.IsPlay = isPlay
  },

  // 设置歌曲暂停的状态
  setIsPauseState (state, isPause) {
    state.IsPause = isPause
  }
}

export default {
  state,
  getters,
  mutations
}

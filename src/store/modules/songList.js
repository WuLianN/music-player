/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 12:18:06
 * @LastEditTime: 2019-08-19 10:51:01
 * @LastEditors: Please set LastEditors
 */
const state = {
  SongList: '',
  IsLoadingMore: false,
  Active: 0
}

const getters = {
  getSongList: state => {
    return state.SongList
  },

  getIsLoadingMore: state => {
    return state.IsLoadingMore
  },

  getActive: state => {
    return state.Active
  }

}

const mutations = {
  // 设置歌单的内容
  setSongList (state, songList) {
    state.SongList = songList
  },

  // 设置展示更多
  setIsLoadingMore (state, isLoadingMore) {
    state.IsLoadingMore = isLoadingMore
  },

  // 设置索引
  setActive (state, active) {
    state.Active = active
  }

}

export default {
  state,
  getters,
  mutations
}

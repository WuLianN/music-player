/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 11:40:02
 * @LastEditTime: 2019-08-14 15:46:36
 * @LastEditors: Please set LastEditors
 */
const state = {
  UpdateCurrentTime: '',
  IsFirstTime: true,
  IsCollect: true,
  IsRecoverScrollTop: false
}

const getters = {
  getIsFirstTime: state => {
    return state.IsFirstTime
  },

  getCurrentTimeByTouch: state => {
    return state.UpdateCurrentTime
  },

  getIsCollect: state => {
    return state.IsCollect
  },

  getIsRecoverScrollTop: state => {
    return state.IsRecoverScrollTop
  }

}

const mutations = {
  // 设置首次加载歌词
  setIsFirstTime (state, isFirstTime) {
    state.IsFirstTime = isFirstTime
  },

  // 设置存取currentTime
  setCurrentTimeByTouch (state, updateCurrentTime) {
    state.UpdateCurrentTime = updateCurrentTime
  },

  // 收藏
  setIsCollect (state, isCollect) {
    state.IsCollect = isCollect
  },

  // 恢复歌词滚动的初始位置
  setIsRecoverScrollTop (state, isRecoverScrollTop) {
    state.IsRecoverScrollTop = isRecoverScrollTop
  }

}

export default {
  state,
  getters,
  mutations
}

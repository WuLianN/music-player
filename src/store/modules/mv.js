/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 12:10:00
 * @LastEditTime: 2019-08-11 12:11:00
 * @LastEditors: Please set LastEditors
 */
const state = {
  MVID: ''
}

const getters = {
  getmvID: state => {
    return state.MVID
  }
}

const mutations = {
  // 设置mvID
  setmvID (state, mvID) {
    state.MVID = mvID
  }
}

export default {
  state,
  getters,
  mutations
}

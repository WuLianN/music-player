/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 11:56:03
 * @LastEditTime: 2019-08-14 18:58:45
 * @LastEditors: Please set LastEditors
 */
const state = {
  Result: [],
  ReserveResult: ''

}

const getters = {
  getSearchResult: state => {
    return state.Result
  },

  getReserveResult: state => {
    return state.ReserveResult
  }
}

const mutations = {
  // 设置搜索结果
  setSearchResult (state, result) {
    state.Result = result
  },

  // 设置储存原数组
  setReserveResult (state, reserveResult) {
    state.ReserveResult = reserveResult
  }

}

export default {
  state,
  getters,
  mutations
}

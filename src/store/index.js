/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 12:45:39
 * @LastEditTime: 2019-08-29 15:00:56
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Vuex from 'vuex'

import audio from './modules/audio'
import player from './modules/player'
import searchList from './modules/searchList'
import mv from './modules/mv'
import songList from './modules/songList'

import * as mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    GetLastestSongs: '',
    WYartist: '',
    IsLoading: false,
    IsShow: true,
    IsChangeTitle: false,
    IsShowMusicList: false,
    IsShowMask: false,
    IsGetMusicList: false,
    IsShowUserInfo: false
  },

  getters,
  mutations,

  modules: {
    audio,
    player,
    searchList,
    mv,
    songList,
  }
})

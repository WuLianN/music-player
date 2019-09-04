/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-11 12:01:57
 * @LastEditTime: 2019-08-27 21:19:37
 * @LastEditors: Please set LastEditors
 */

// 设置展示Player组件
export const setIsShow = (state, isShow) => {
  state.IsShow = isShow
}

// 设置改变title
export const setIsChangeTitle = (state, isChangeTitle) => {
  state.IsChangeTitle = isChangeTitle
}

// 设置展示MusicList
export const setIsShowMusicList = (state, isShowMusicList) => {
  state.IsShowMusicList = isShowMusicList
}

// 设置展示Mask
export const setIsShowMask = (state, isShowMask) => {
  state.IsShowMask = isShowMask
}

// 设置login跳转user
export const setIsShowUserInfo = (state, isShowUserInfo) => {
  state.IsShowUserInfo = isShowUserInfo
}

// 设置axios拦截加载
export const setIsLoading = (state, isLoading) => {
  state.IsLoading = isLoading
}

// 获得歌单
export const setIsGetMusicList = (state, isGetMusicList) => {
  state.IsGetMusicList = isGetMusicList
}

// 设置获取最新音乐
export const setGetLastestSongs = (state, getLastestSongs) => {
  state.GetLastestSongs = getLastestSongs
}

// 网易云歌手 专为Singers.vue打造
export const setWYartist = (state, wyArtist) => {
  state.WYartist = wyArtist
}

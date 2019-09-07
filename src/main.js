/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 12:45:39
 * @LastEditTime: 2019-09-07 11:29:36
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'

import { Swipe, SwipeItem, Lazyload, Search, Icon, NoticeBar, Tab, Tabs, Loading, Cell, CellGroup, Button, SwipeCell } from 'vant'

Vue.use(Swipe).use(SwipeItem).use(Lazyload)
  .use(Search)
  .use(Icon)
  .use(NoticeBar)
  .use(Tab).use(Tabs)
  .use(Loading)
  .use(Cell).use(CellGroup)
  .use(Button)
  .use(SwipeCell)

Vue.config.devtools = true

Vue.config.productionTip = false
Vue.prototype.$axios = axios

// 自定义过滤器[截取字符串]
Vue.filter('snippet15', function (value) {
  if (!value) {
    return ''
  } else {
    if (value.length > 10) {
      return value.slice(0, 14) + '...'
    } else {
      return value.slice(0, 14)
    }
  }
})

Vue.filter('snippet10', function (value) {
  if (!value) {
    return ''
  } else {
    if (value.length > 9) {
      return value.slice(0, 9) + '...'
    } else {
      return value.slice(0, 9)
    }
  }
})

Vue.filter('snippet17', function (value) {
  if (!value) {
    return ''
  } else {
    if (value.length > 10) {
      return value.slice(0, 16) + '...'
    } else {
      return value.slice(0, 16)
    }
  }
})

Vue.filter('snippetNum', function (value) {
  if (!value) {
    return ''
  } else {
    if (value > 99999 && value <= 99999999) {
      const result = Math.floor(value / 10000)
      // console.log(result);
      return result + '万'
    } else if (value > 99999999) {
      const result = (value / 100000000)
      const Tresult = result.toString().slice(0,3)
      return Tresult + '亿'
    } else {
      return value
    }
  }
})

// axios.defaults.timeout = 1000 * 60 * 1 // 1分钟请求时间

// // 添加请求拦截器
// axios.interceptors.request.use(request => {
//   // 在发送请求之前做些什么
//   // console.log(request);
//   if (request.url === 'http://api.diodio.tk/netease/banner') {
//     return request
//   }

//   if (request.url === 'http://api.diodio.tk/netease/mv/top') {
//     let loading = store.getters.getLoading
//     loading += 1
//     store.commit('setIsLoading', loading)
//     return request
//   }

//   if (request.url === 'http://api.diodio.tk/netease/artist/top') {
//     let isLoadingMore = true
//     store.commit('setIsLoadingMore', isLoadingMore)
//     return request
//   }

//   if (request.url === 'http://api.diodio.tk/netease/song/newest') {
//     let loading = store.getters.getLoading
//     loading += 1
//     store.commit('setIsLoading', loading)
//     return request
//   }

//   if (request.params.pageSize === 18 && request.params.page > 0) {
//     let isLoadingMore = true
//     store.commit('setIsLoadingMore', isLoadingMore)
//     return request
//   } else {
//     let loading = store.getters.getLoading
//     loading += 1
//     store.commit('setIsLoading', loading)
//     return request
//   }
// }, function (error) {
//   // 对请求错误做些什么
//   console.log(error)

//   return Promise.reject(error)
// })

// // 添加响应拦截器
// axios.interceptors.response.use(response => {
//   // 对响应数据做点什么
//   // console.log(response)
//   if (response.config.url === 'http://api.diodio.tk/netease/banner') {
//     console.log(response)
//     return response
//   }

//   if (response.config.url === 'http://api.diodio.tk/netease/mv/top') {
//     let loading = store.getters.getLoading
//     loading -= 1
//     store.commit('setIsLoading', loading)
//     return response
//   }

//   if (response.config.url === 'http://api.diodio.tk/netease/artist/top') {
//     let isLoadingMore = false
//     store.commit('setIsLoadingMore', isLoadingMore)
//     return response
//   }

//   if (response.config.url === 'http://api.diodio.tk/netease/song/newest') {
//     let loading = store.getters.getLoading
//     loading -= 1
//     store.commit('setIsLoading', loading)
//     return response
//   }

//   if (response.config.params.pageSize === 18 && response.config.params.page > 0) {
//     let isLoadingMore = false
//     store.commit('setIsLoadingMore', isLoadingMore)
//     return response
//   } else {
//     let loading = store.getters.getLoading
//     loading -= 1
//     store.commit('setIsLoading', loading)
//     return response
//   }
// }, function (error) {
//   // 对响应错误做点什么
//   // console.log(error)

//   // 超时
//   if (error.code === 'ECONNABORTED') {
//     let loading = 0
//     store.commit('setIsLoading', loading)
//   }
//   return Promise.reject(error)
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

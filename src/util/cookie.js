/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 12:46:09
 * @LastEditTime: 2019-08-14 21:12:25
 * @LastEditors: Please set LastEditors
 */

export default {

  /**
     * @description: 设置 cookie 值的函数
     * @param cname 键
     * @param cvalue 值
     * @param exdays 过期天数
     * @return:
     */

  setCookie: function (cname, cvalue, exdays) {
    let d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toGMTString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  },

  /**
     * @description: 获取 cookie 值的函数
     * @param {type}
     * @return:
     */
  getCookie: function (cname) {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim()
      if (c.indexOf(name) === 0) { return c.substring(name.length, c.length) }
    }
    return ''
  },

  /**
     * @description: 检测 cookie 值的函数
     * @param cookieName cookie的键
     * @return:
     */

  checkCookie: function (cookieName) {
    let user = this.getCookie(cookieName)
    if (user !== '') {
      return true
    } else {
      return false
    }
  }
}

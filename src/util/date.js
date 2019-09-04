/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-03 11:46:32
 * @LastEditTime: 2019-08-14 21:06:57
 * @LastEditors: Please set LastEditors
 */
/**
 * @description: 格式化时间戳(通用)
 * @param {Number}
 * @return:
 */

export function formatDate (timestamp) {
  if (!timestamp) {
    return ''
  } else {
    let time = new Date(timestamp)
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDay()
    let date = year + '.' + month + '.' + day
    return date
  }
}

/**
 * @description: 格式化时间戳(多样化)
 * @param {Number}
 * @return:
 */

export function variedDate (timestamp) {
  if (!timestamp) {
    return ''
  } else {
    // 记录时间戳
    let time = new Date(timestamp)
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDay()

    // 当前时间戳
    let current = new Date()
    let currentYear = current.getFullYear()

    // 是否同一年
    if (year === currentYear) {
      let date = month + '月' + day + '日'
      return date
    } else {
      let date = year + '年' + month + '月' + day + '日'
      return date
    }
  }
}

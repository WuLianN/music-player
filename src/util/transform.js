/**
 * @description: 格式化秒数
 * @param {type}
 * @return:
 */
export function formatSec (num) {
  let Tnum = parseInt(num)
  // let H = this.$toZero(Math.floor(num / 3600));
  let M = toZero(Math.floor(Tnum % 3600 / 60))
  let S = toZero(Math.floor(Tnum % 60))
  // return H + ":" + M + ":" + S;
  return M + ':' + S
}

export function toZero (num) {
  if (num <= 9) {
    return '0' + num
  } else {
    return '' + num
  }
}

/**
 * @description: 洗牌算法 (随机算法 -> 随机播放音乐)
 * @param {Array}
 * @return: Array
 */
export function shuffle (array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1))
    let itemAtIndex = array[randomIndex]
    array[randomIndex] = array[i]
    array[i] = itemAtIndex
  }
  return array
}

/**
 * @description: vw转px
 * @param {Number}
 * @return:
 */

export function vw2px (vw) {
  let Tvw = vw / 100
  let screenW = window.screen.width
  // let dpr = Math.floor(window.devicePixelRatio);
  let vw2px = (screenW * Tvw) + 'px'
  return vw2px
}

/**
 * @description: 清空数组中的元素 （常用于更新数据）
 * @param {Array}
 * @return:
 */

export function clearArray (array) {
  let length = array.length
  array.splice(0, length)
  return array
}

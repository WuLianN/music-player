/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 12:02:17
 * @LastEditTime: 2019-08-29 16:30:55
 * @LastEditors: Please set LastEditors
 */
export default {
  /**
     * @description: touchstart事件 获得第一个触点
     * @param {type}
     * @return:
     */
  touchStart () {
    this.startTouches = event.touches
  },

  /**
     * @description: touchend事件 获得最后一个触点
     * @param {type}
     * @return:
     */
  touchEnd () {
    this.endTouches = event.changedTouches
  },

  /**
     * @description: touchmove事件
     * @param {type}
     * @return:
     */
  touchMove () {

  },

  /**
     * @description: 判断滑动的方向
     * @param orientation 滑动类型 'vertical' 垂直方向 'parallel' 水平方向
     * @return:
     */
  slide (orientation) {
    // 起点
    const startScreenX = this.startTouches[0].screenX
    const startScreenY = this.startTouches[0].screenY

    // 终点
    const endScreenX = this.endTouches[0].screenX
    const endScreenY = this.endTouches[0].screenY

    if (orientation === 'vertical') {
      if (startScreenY - endScreenY > 0) {
        // 上划
        return 'up'
      } else if (startScreenY - endScreenY < 0) {
        // 下划
        return 'down'
      } else {
        // 点击
        return 'none'
      }
    } else if (orientation === 'parallel') {
      if (startScreenX - endScreenX > 0) {
        // 左划
        return 'left'
      } else if (startScreenX - endScreenX < 0) {
        // 右划
        return 'right'
      } else {
        // 点击
        return 'none'
      }
    }
  }
}

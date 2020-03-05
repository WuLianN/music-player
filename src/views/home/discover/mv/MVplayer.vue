<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 16:29:50
 * @LastEditTime: 2019-09-03 20:47:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="mvPlayer">
    <div class="video-wrap" :class="{ fullscreen: isFullScreen}">
      <div class="header">
        <Header
          :leftTitle="leftTitle"
          :where="mv"
          :changeClass="true"
          :changeImg="true"
          :changeImgSize="true"
          v-show="isShowControls"
        />
      </div>
      <video
        autoplay
        @timeupdate="getCurrentTime"
        @canplay="getDuration"
        @play="play"
        @puase="pause"
        @click="showControls"
        ref="video"
        :class="{ fullscreen: isFullScreen}"
      ></video>

      <img class="video-img" :src="playOrPauseImg" @click="playOrPause" v-show="isShowControls" />

      <div class="controls" v-show="isShowControls">
        <div class="controls-timer">
          <span>{{ formatCurrentTime }}</span>
          <span class="controls-timer-duration">/{{ formatDuration }}</span>
        </div>

        <img @click="fullScreen" class="controls-switch" :src="fullScreenImg" alt />
      </div>

      <div class="progress" ref="progressLine" @touchend="touchEnd" @touchmove="touchMove">
        <div class="line1" ref="line1"></div>
        <div class="line2" :style="{ width : progress}"></div>
        <div class="circle" v-show="isShowControls" :style="{ left: circle }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import { formatSec } from '@/util/transform'
import Header from '@/components/public/Header'
export default {
  name: 'MVplayer',
  data () {
    return {
      mvID: '',
      currentTime: '',
      formatCurrentTime: '',
      duration: '',
      formatDuration: '',
      leftTitle: '',
      progress: '',
      circle: '',
      lineLength: '',
      mv: 'mv',
      playOrPauseImg: require('@/assets/player/MVpause.png'),
      fullScreenImg: require('@/assets/video/enlarge.png'),
      isFullScreen: false,
      isShowControls: true,
      isTouchMoving: false
    }
  },

  methods: {
    async fullScreen () {
      if (document.fullscreenElement) {
        this.isFullScreen = false
        this.fullScreenImg = require('@/assets/video/enlarge.png')
        await document.exitFullscreen()
        await screen.orientation.unlock()
      } else {
        this.isFullScreen = true
        this.fullScreenImg = require('@/assets/video/narrow.png')

        // 指定元素
        // await this.$refs.video.requestFullscreen();

        await document.documentElement.requestFullscreen()
        await screen.orientation.lock('landscape')
      }
    },

    // 获取MV当前的长度
    getDuration () {
      this.duration = this.$refs.video.duration
      this.formatDuration = formatSec(this.$refs.video.duration)
    },

    // 获取MV当前的长度
    getCurrentTime (e) {
      this.formatCurrentTime = formatSec(e.target.currentTime)
      this.currentTime = e.target.currentTime

      this.lineLength = this.$refs.line1.offsetWidth

      // 向下取整
      const TcurrentTime = Math.floor(this.currentTime)
      const Tduration = Math.floor(this.duration)
      const TlineLength = Math.floor(this.lineLength)
      const circleLength = 10

      // 当前进度
      if (!this.isTouchMoving) {
        this.progress =
          Math.floor((TcurrentTime / Tduration) * TlineLength) + 'px'

        this.circle =
          Math.floor(
            (TcurrentTime / Tduration) * (TlineLength - circleLength)
          ) + 'px'
      }
    },

    // 展示controls控件
    showControls () {
      this.isShowControls = true

      // 3s
      setTimeout(() => {
        this.isShowControls = false
      }, 3000)
    },

    // 首次1s后关闭controls控件
    setOneSec () {
      setTimeout(() => {
        this.isShowControls = false
      }, 1000)
    },

    // 开始播放状态
    play () {
      this.playOrPauseImg = require('@/assets/player/MVpause.png')
    },

    // 暂停状态
    pause () {
      this.playOrPauseImg = require('@/assets/player/MVplay.png')
    },

    playOrPause () {
      if (!this.$refs.video.paused) {
        this.$refs.video.pause()
        this.playOrPauseImg = require('@/assets/player/MVplay.png')
      } else {
        this.$refs.video.play()
        this.playOrPauseImg = require('@/assets/player/MVpause.png')
      }
    },

    // 触摸抬手
    touchEnd (e) {
      // 触摸点距离左屏幕宽度的距离
      // let touchEnd = e.changedTouches[0].screenX;
      const touchEnd = e.changedTouches[0].clientX

      // 恢复updatetime中计算progress
      this.isTouchMoving = false

      const TtouchEnd = Math.floor(touchEnd)
      const Tduration = Math.floor(this.duration)
      const TlineLength = Math.floor(this.lineLength)

      // 进度条距离左屏幕宽度的距离
      const otherLength = this.$refs.progressLine.offsetLeft
      // console.log(otherLength);

      // style样式
      const leftLength = TtouchEnd - otherLength + 'px'
      this.progress = leftLength

      const currentTime = Math.floor(
        ((TtouchEnd - otherLength) / TlineLength) * Tduration
      )

      // 更改当前进度
      this.$refs.video.currentTime = currentTime
    },

    // 触摸移动进度条
    touchMove (e) {
      const touchMove = e.touches[0].clientX
      const TtouchMove = Math.floor(touchMove)

      // 暂停在updatetime中计算progress
      this.isTouchMoving = true

      // 显示控件
      this.isShowControls = true

      // 进度条距离左屏幕宽度的距离
      const otherLength = this.$refs.progressLine.offsetLeft
      const leftLength = TtouchMove - otherLength

      const Tduration = Math.floor(this.duration)
      const TlineLength = Math.floor(this.lineLength)
      const TleftLength = Math.floor(leftLength)

      this.formatCurrentTime = formatSec(
        (leftLength / TlineLength) * Tduration
      )

      this.progress = leftLength + 'px'
    },

    getMVurl () {
      this.mvID = this.$store.getters.getmvID
      api.getMVurl(this.mvID).then(res => {
        this.$refs.video.src = res.data.data.url
      })
    },

    goBack () {
      if (this.$route.params.videos === 'videos') {
        this.mv = 'videos'
      } else {
        this.mv = 'mv'
      }
    }
  },

  created () {
    this.getMVurl()
    this.setOneSec()
    this.goBack()
    this.leftTitle = this.$route.params.title
  },

  components: {
    Header
  }
}
</script>

<style scoped>
.mvPlayer {
  width: 100vw;
  height: 100vh;
}

.video-wrap {
  width: 100vw;
  height: 32vh;
  position: relative;
}

.header {
  width: 100vw;
  height: 7vh;
  position: absolute;
  top: 0;
  color: white;
  z-index: 10;
}

video {
  width: 100vw;
  height: 32vh;
  object-fit: fill;
}

.video-img {
  width: 7vw;
  height: 5vh;
  position: absolute;
  top: calc(50% - 3.5vw);
  left: calc(50% - 2.5vh);
  z-index: 10;
}

.fullscreen {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}

.controls {
  width: 100vw;
  height: 4vh;
  position: absolute;
  bottom: 0.5vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.controls-timer {
  color: white;
  font-size: 1.8vh;
  margin: 0 0 0 3vw;
}

.controls-timer-duration {
  color: gray;
}

.controls-switch {
  width: 7%;
  height: 100%;
  margin: -1vh 3vw 0 0;
}

.progress {
  width: 100vw;
  height: 0.5vh;
  position: absolute;
  bottom: 0;
  display: flex;
}

.line1 {
  width: 100vw;
  height: 0.5vh;
  background: rgba(184, 179, 179, 0.658);
}

.line2 {
  height: 0.5vh;
  background: red;
  position: absolute;
  left: 0;
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: red;
  position: absolute;
  left: 0;
  top: -0.5vh;
}
</style>

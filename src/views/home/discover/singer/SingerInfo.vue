<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 18:47:34
 * @LastEditTime: 2019-08-22 14:48:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="singerInfo">
    <div class="mask" v-if="isShowMask">
      <span class="mask-title">{{ artist.artistName }}</span>
    </div>
    <div class="singerInfo-header">
      <img class="singerInfo-left" src="@/assets/arrow-left.png" @click="onClickLeft" alt />
      <img class="singerInfo-img" :src="artist.picUrl" alt />
      <div class="singerInfo-artistName">{{ artist.artistName }}</div>
    </div>

    <div
      class="singerInfo-content"
      :class="{ active: isActive }"
      @touchstart="getStart"
      @touchend="getEnd"
      @touchmove="touchMove"
    >
      <!-- 二级路由 -->
      <div class="singerInfo-content-header">
        <div class="toCircle-left"></div>
        <div class="singerInfo-content-title">
          <span @touchstart="showSongs">
            <router-link
              class="router-link"
              :style="{ 'color': index === 0  ? 'red': 'black'  }"
              :to="{ name: 'songs' }"
            >热门单曲</router-link>
          </span>
          <span @touchstart="showAlbums">
            <router-link
              class="router-link"
              :style="{ 'color': index === 1  ? 'red': 'black'  }"
              :to="{ name: 'albums' }"
            >专辑</router-link>
          </span>
          <span @touchstart="showVideos">
            <router-link
              class="router-link"
              :style="{ 'color': index === 2  ? 'red': 'black'  }"
              :to="{ name: 'videos' }"
            >视频</router-link>
          </span>
          <span @touchstart="showArtistInfo">
            <router-link
              class="router-link"
              :style="{ 'color': index === 3  ? 'red': 'black'  }"
              :to="{ name: 'artist' }"
            >艺人信息</router-link>
          </span>
        </div>
        <div class="toCircle-right"></div>
      </div>

      <div class="router-view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      artist: '',
      artistID: '',
      index: 0,
      isShow: false,
      isActive: false,
      isShowMask: false,
      startTouches: [],
      endTouches: []
    }
  },

  created () {
    this.getWYartist()
    if (this.$route.params.index === 2) {
      this.showVideos()
    }
  },

  methods: {
    getStart (e) {
      // 第一个触点
      this.startTouches = e.touches
      // console.log(this.startTouches);
    },

    getEnd (e) {
      // 最后一个触点
      this.endTouches = e.changedTouches
      // onsole.log(this.endTouches);

      this.slide()
    },

    touchMove () {
      // this.slide();
    },

    slide () {
      // 起点
      const startScreenX = this.startTouches[0].screenX
      const startScreenY = this.startTouches[0].screenY

      // 终点
      const endScreenX = this.endTouches[0].screenX
      const endScreenY = this.endTouches[0].screenY

      if (startScreenY - endScreenY > 0) {
        // 上划
        return (this.isActive = true), (this.isShowMask = true)
      } else {
        // 下滑
        return (this.isActive = false), (this.isShowMask = false)
      }
    },

    // 歌手信息
    getWYartist () {
      this.artist = this.$store.getters.getWYartist
      this.artistID = this.artist.artistID
    },

    onClickLeft () {
      this.$router.push({ name: 'singers' })
    },

    showSongs () {
      this.index = 0
    },

    showAlbums () {
      this.index = 1
    },

    showVideos () {
      this.index = 2
    },

    showArtistInfo () {
      this.index = 3
    }
  }
}
</script>

<style scoped>
.active {
  position: absolute;
  top: 17vh;
}

.singerInfo {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.mask {
  width: 100vw;
  height: 17vh;
  background: rgba(0, 0, 0, 0.349);
  position: fixed;
  top: 0;
}

.mask-title {
  font-size: 3vh;
  color: white;
  position: absolute;
  top: 3.5vh;
  left: 18vw;
}

.singerInfo-header {
  width: 100vw;
  height: 40vh;
}

.singerInfo-left {
  width: 11vw;
  height: 7vh;
  position: absolute;
  top: 2vh;
  left: 4vw;
}

.singerInfo-artistName {
  width: 50vw;
  height: 7vh;
  position: absolute;
  top: 22vh;
  left: 8vw;
  font-size: 3vh;
  font-weight: bold;
  color: white;
}

.singerInfo-img {
  width: 100%;
  height: 40vh;
  margin: 0;
  padding: 0;
}

.singerInfo-content {
  width: 100vw;
  height: 50vh;
  margin: -7vh 0 0 0;
}

.singerInfo-content-header {
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-flow: row nowrap;
}

.singerInfo-content-title {
  width: 80vw;
  height: 7vh;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.router-link {
  color: black;
}

.toCircle-left {
  width: 10vw;
  height: 7vh;
  border-top-left-radius: 100%;
  background: white;
}

.toCircle-right {
  width: 10vw;
  height: 7vh;
  border-top-right-radius: 100%;
  background: white;
}

.router-view {
  width: 100vw;
  height: 72vh;
  overflow: auto;
  border-top: 1px solid rgba(128, 128, 128, 0.185);
  background: white;
}
</style>

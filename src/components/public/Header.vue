<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-25 11:06:47
 * @LastEditTime: 2019-08-21 16:01:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="header">
    <div class="header-arrow" @click="onClickLeft(where)">
      <img class="img" :src="picUrl" alt :class="{ changeImgSize: changeImgSize}" />
    </div>

    <div class="headerTitle" :class="{ changeClass: changeClass}">{{ leftTitle }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      picUrl: require('@/assets/arrow-left-gray.png')
    }
  },

  props: {
    leftTitle: String,
    where: String,
    active: Number,
    changeClass: Boolean,
    changeImg: Boolean,
    changeImgSize: Boolean
  },

  methods: {
    onClickLeft (where) {
      if (this.where === 'user') {
        this.$router.push({ name: where, params: { index: 0 } })
      } else if (this.where === 'songList') {
        this.$router.push({ name: where, params: { active: this.active } })
      } else if (this.where === 'videos') {
        // 返回当前歌手的视频
        this.$router.go(-1)
      } else {
        this.$router.push({ name: where })
      }
    },

    isChangeImg () {
      if (this.changeImg) {
        this.picUrl = require('@/assets/arrow-left-white.png')
      }
    }
  },

  created () {
    this.isChangeImg()
  }
}
</script>

<style scoped>
.header {
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.header-arrow {
  width: 10vw;
  height: 7vh;
  position: relative;
  left: 3vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img {
  width: 100%;
  height: 100%;
}

.headerTitle {
  width: 60vw;
  height: 7vh;
  line-height: 7vh;
  margin: 0 0 0 5vw;
  font-weight: bold;
  font-size: 3vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.changeClass {
  font-size: 2vh;
  color: white;
  font-weight: 100;
}

.changeImgSize {
  position: relative;
  width: 60%;
  height: 70%;
}
</style>

<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-28 19:57:29
 * @LastEditTime: 2019-08-26 23:59:51
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="video">
    <div class="video-content" v-for="(item, index) in mv" :key="index">
      <img class="video-content-img" :src="item.picUrl" @click="goMVplayer(item)" />
      <div class="video-content-info">
        <div class="content-info-songName">
          <span class="content-info-mv">MV</span>
          <span class="content-info-name">{{ item.songName | snippet15 }}</span>
        </div>
        <div class="content-info-publishTime">{{ item.publishTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
export default {
  data () {
    return {
      mv: []
    }
  },

  created () {
    this.getWYMV()
  },

  methods: {
    // MV
    getWYMV () {
      const artist = this.$store.getters.getWYartist
      const artistID = artist.artistID
      // console.log(artistID);

      api
        .getSingerMV(artistID)
        .then(res => {
          const result = res.data.data
          this.mv = []

          result.forEach(item => {
            this.mv.push({
              mvID: item.id,
              songName: item.name,
              picUrl: item.imgurl,
              duration: item.duration,
              publishTime: item.publishTime
            })
          })
        })
    },

    goMVplayer (item) {
      this.$store.commit('setmvID', item.mvID)
      this.$router.push({ name: 'mvPlayer', params: { videos: 'videos' } })
    }
  }
}
</script>

<style scoped>
.video {
  width: 100vw;
}

.video-content {
  width: 90vw;
  height: 15vh;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.video-content-img {
  width: 35vw;
  height: 12vh;
  border-radius: 5%;
}

.video-content-info {
  width: 55vw;
  height: 12vh;
  position: relative;
}

.content-info-songName {
  position: relative;
  width: 100%;
  /* height: 6vh;
  border: 1px solid green; */
}

.content-info-mv {
  display: inline-block;
  width: 7.5vw;
  height: 2.5vh;
  border: 1px solid red;
  border-radius: 10%;
  color: red;
  line-height: 2.3vh;
  text-align: center;
  font-size: 1.8vh;
  position: absolute;
  top: 1.5vh;
  left: 2vw;
}

.content-info-name {
  display: inline-block;
  position: relative;
  width: 55vw;
  text-indent: 11vw;
  top: 1vh;
  left: 1vw;
  font-size: 2.5vh;
}

.content-info-publishTime {
  font-size: 2vh;
  text-indent: 2vw;
  margin: 1vh 0 0 0;
}
</style>

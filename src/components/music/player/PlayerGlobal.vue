<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 12:45:40
 * @LastEditTime: 2019-08-22 15:17:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="player">
    <!-- 头像 -->
    <div @click="songDetail" class="player-detail">
      <div class="song-pic">
        <img :src="picUrl" alt class="song-img" ref="songImg" />
      </div>

      <!-- 歌曲、作者 -->
      <div class="song-info">
        <div class="song-name">{{ songName | snippet10 }}</div>
        <div class="song-artist">{{ songArtist | snippet10 }}</div>
      </div>
    </div>

    <!-- 播放器 -->
    <div class="song-player">
      <img src="@/assets/play-gray.png" @click="exChange" ref="img" alt class="song-player-img" />
    </div>

    <div class="song-player">
      <img src="@/assets/musiclist-gray.png" @click="musicList" class="song-player-img" />
    </div>
  </div>
</template>

<script>
import KWapi from '@/api/kuwo/kwIndex'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      songID: '',
      picUrl: require('@/assets/recordx.png'),
      songArtist: '',
      songName: '',
      api: ''
    }
  },

  computed: { ...mapGetters(['getIsUpdate', 'getIsPlay', 'getIsPause']) },

  watch: {
    getIsUpdate (isChange) {
      if (isChange === true) {
        this.getData()

        this.getPicUrl()

        const recoverFalse = false
        // 恢复false状态
        this.$store.commit('setIsUpdate', recoverFalse)
      }
    },

    getIsPlay (isChange) {
      if (isChange) {
        // 播放
        this.$refs.img.src = require('@/assets/play-gray.png')
      }
    },

    getIsPause (isChange) {
      if (isChange) {
        // 暂停
        this.$refs.img.src = require('@/assets/pause-gray.png')
      }
    }
  },

  methods: {
    getData () {
      this.songID = this.$store.getters.getID
      this.songArtist = this.$store.getters.getSongArtist
      this.songName = this.$store.getters.getSongName
      this.api = this.$store.getters.getAPI
    },

    exChange () {
      const isPlayOrPause = this.$store.getters.getIsPlayOrPause
      // console.log(isPlayOrPause);

      if (isPlayOrPause) {
        // true -> pause
        const pause = false

        // 请求停止
        this.$store.commit('setIsPlayOrPause', pause)
      } else {
        // false -> play
        const play = true

        // 请求播放
        this.$store.commit('setIsPlayOrPause', play)
      }
    },

    // 跳转到Player.vue
    songDetail () {
      const isShow = false
      this.$store.commit('setIsShow', isShow)
    },

    // 歌单
    musicList () {
      // 展示musicList
      const isShowMusicList = true
      this.$store.commit('setIsShowMusicList', isShowMusicList)

      // 展示mask
      const isShowMask = true
      this.$store.commit('setIsShowMask', isShowMask)
    },

    // 获取音乐图片
    getPicUrl () {
      if (this.api === 'WY') {
        // 获取网易云音乐图片
        this.picUrl = this.$store.getters.getPicUrl
      } else if (this.api === 'KW') {
        // 获取酷我音乐图片
        this.getKWpicData(this.songID)
      } else if (this.api === 'QQ') {
        // 获取QQ音乐图片
        this.picUrl = this.$store.getters.getPicUrl
      }
    },

    // 请求酷我音乐图片
    getKWpicData (ID) {
      KWapi.getKWpic(ID)
        .then(res => {
          return (
            'data:image/png;base64,' +
            btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            )
          )
        })
        .then(KWpicData => {
          this.$refs.songImg.src = KWpicData
        })
    }
  }
}
</script>

<style scoped>
.player {
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-flow: row nowrap;
  border-top: 1px solid rgba(209, 194, 194, 0.801);
  background: white;
}

.player-detail {
  display: flex;
  flex-flow: row nowrap;
}

.song-pic {
  width: 14vw;
  height: 8vh;
  margin: 1vh 0 0 2vw;
}

.song-img {
  width: 100%;
  height: 100%;
}

.song-info {
  width: 50vw;
  height: 10vh;
  position: relative;
  text-indent: 3vw;
}

.song-name {
  position: absolute;
  top: 1vh;
  font-size: 2.5vh;
}

.song-artist {
  position: absolute;
  bottom: 1.5vh;
  font-size: 2vh;
  color: gray;
}

.song-player {
  width: 15vw;
  height: 8vh;
  margin: 1vh 0 0 0;
}

.song-player-img {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

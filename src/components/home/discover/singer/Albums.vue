<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-27 19:49:37
 * @LastEditTime: 2019-08-27 00:00:51
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="albums">
    <div class="albums-content" v-for="(item, index) in album" :key="index">
      <img class="albums-content-img" :src="item.picUrl" alt />
      <div class="albums-content-songInfo">
        <div class="content-songInfo-songName">
          <span class="songInfo-songName-name">{{ item.songName }}</span>
          <span :style="{ color: 'gray'}">{{ item.alias }}</span>
        </div>
        <div class="content-songInfo-other">
          <span :style="{ margin: '0 2vw 0 0'}">{{ item.publishTime }}</span>
          <span>歌曲{{ item.albumSize }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import { formatDate } from '@/util/date'
export default {
  data () {
    return {
      album: []
    }
  },

  created () {
    this.getWYalbums()
  },

  methods: {
    // 专辑
    getWYalbums () {
      const artist = this.$store.getters.getWYartist
      const artistID = artist.artistID

      api.getSingerAlbum(artistID).then(res => {
        const result = res.data.data

        result.forEach(item => {
          const formatTime = formatDate(item.publishTime)

          let alias
          if (item.alias.length === 0) {
            alias = ''
          } else {
            alias = '(' + item.alias[0] + ')'
          }

          this.album.push({
            songID: item.id,
            songName: item.name,
            artist: item.artist.name,
            picUrl: item.picUrl,
            albumSize: item.size,
            publishTime: formatTime,
            alias: alias
          })
        })

        // console.log(this.album);
        // console.log(res.data.data);
      })
    }
  }
}
</script>

<style scoped>
.albums {
  width: 100vw;
}

.albums-content {
  width: 90vw;
  height: 12vh;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.albums-content-img {
  width: 20vw;
  height: 10vh;
}

.albums-content-songInfo {
  width: 68vw;
  height: 10vh;
  margin: 0 0 0 2vw;
  text-indent: 1vw;
}

.content-songInfo-songName {
  padding: 2vh 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.songInfo-songName-name {
  width: 68vw;
  margin: 0 2vw 0 0;
}
.content-songInfo-other {
  font-size: 2vh;
  color: gray;
  margin: 1vh 0 0 0;
}
</style>

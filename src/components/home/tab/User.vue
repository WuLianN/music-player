<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-31 20:55:29
 * @LastEditTime: 2019-09-05 13:36:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user">
    <div>
      <div
        class="myFavour"
        v-for="(item, index) in userSongList"
        :key="index"
        @click="goSongListDetail(item)"
      >
        <div class="myFavour-img-wrap">
          <img class="myFavour-img" :src="item.coverImgUrl" alt />
        </div>

        <div class="myFavour-title">
          <div class="myFavour-title-detail">{{ item.name }}</div>
          <div class="myFavour-title-count">{{ item.trackCount }}首</div>
        </div>
      </div>
    </div>

    <div>
      <div
        class="myFavour"
        v-for="(item, index) in qqUserSongList"
        :key="index"
        @click="goSongListDetail(item)"
      >
        <div class="myFavour-img-wrap">
          <img class="myFavour-img" :src="item.coverImgUrl" alt />
        </div>

        <div class="myFavour-title">
          <div class="myFavour-title-detail">{{ item.name }}</div>
          <div class="myFavour-title-count">{{ item.trackCount }}首</div>
        </div>
      </div>
    </div>

    <div class="myFavour" @click="goMyFavourite" v-if="isCollect">
      <div class="myFavour-img-wrap">
        <img class="myFavour-img" :src="coverImg" alt />
      </div>

      <div class="myFavour-title">
        <div class="myFavour-title-detail">我喜欢的音乐</div>
        <div class="myFavour-title-count">{{ songLength }}首</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import QQapi from '@/api/qq/qqIndex'
import KWapi from '@/api/kuwo/kwIndex'
import cookie from '@/util/cookie'
import { exists } from 'fs'
export default {
  name: 'user',
  data () {
    return {
      purifyResult: [],
      userSongList: [],
      qqUserSongList: [],
      coverImg: '',
      songLength: '',
      isCollect: false
    }
  },

  created () {
    this.getLocalStorage()
    this.getCookieData()
  },

  methods: {
    goMyFavourite () {
      this.$router.push({
        name: 'myFavourite',
        params: { purifyResult: this.purifyResult }
      })
    },

    getLocalStorage () {
      // storage是对象
      const storage = window.localStorage

      const favourite = []

      for (const key in storage) {
        if (storage.hasOwnProperty(key)) {
          if (key.match('song-')) {
            // console.log(key);

            const jsonObj = JSON.parse(storage[key])
            // console.log(jsonObj);

            const obj = {}

            for (const key in jsonObj) {
              obj[key] = jsonObj[key]
            }

            favourite.push(obj)
          }
        }
      }
      this.purifyResult.push(favourite)

      // console.log(this.purifyResult)

      // 判断是否有收藏音乐
      if (this.purifyResult[0].length > 0) {
        // 显示收藏歌单
        this.isCollect = true

        this.songLength = this.purifyResult[0].length

        const picUrl = this.purifyResult[0][0].picUrl

        // console.log(picUrl)

        if (picUrl !== '') {
          this.coverImg = picUrl
          
        } else {
          // 获取KW音乐图片
          const id = this.purifyResult[0][0].id
          this.getKWpicData(id)
        }
      }
    },

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
          this.coverImg = KWpicData
        })
    },

    getCookieData () {
      const existCookie = cookie.checkCookie('userId')
      const existqqCookie = cookie.checkCookie('qqUserId')
      let cookieInfo, transCookieInfo, uid
      let qqCookieInfo, transqqCookieInfo, QQuid

      if (existCookie || existqqCookie) {
        if (existCookie) {
          cookieInfo = cookie.getCookie('userId')
          transCookieInfo = JSON.parse(cookieInfo)
          uid = transCookieInfo.userId
        }

        if (existqqCookie) {
          qqCookieInfo = cookie.getCookie('qqUserId')
          transqqCookieInfo = JSON.parse(qqCookieInfo)
          QQuid = transqqCookieInfo
        }

        if (existCookie) {
          api.getUsetSongList(uid).then(res => {
            const result = res.data.playlist
            // console.log(result);
            result.forEach(item => {
              this.userSongList.push({
                coverImgUrl: item.coverImgUrl,
                id: item.id,
                playCount: item.playCount,
                trackCount: item.trackCount,
                name: item.name,
                avatarUrl: item.creator.avatarUrl,
                nickname: item.creator.nickname,
                shareCount: '分享',
                commentCount: '评论',
                type: 'songList'
              })
            })
          })
        }

        if (existqqCookie) {
          QQapi.getUserSongList(QQuid).then(res => {
            const result = res.data.data
            // console.log(result);
            result.forEach((item, index) => {
              if (index > 1) {
                this.qqUserSongList.push({
                  coverImgUrl: item.diss_cover,
                  name: item.diss_name,
                  trackCount: item.song_cnt,
                  id: item.tid,
                  nickname: transqqCookieInfo.hostname,
                  shareCount: '分享',
                  commentCount: '评论',
                  type: 'qqSongList'
                })
              }
            })
          })
        }
      }
    },

    goSongListDetail (item) {
      this.$store.commit('setSongList', item)

      this.$router.push({
        name: 'songListDetail',
        params: { user: 'user' }
      })
    }
  }
}
</script>

<style scoped>
.user {
  width: 100vw;
  height: 100vh;
}

.myFavour {
  width: 90vw;
  height: 10vh;
  display: flex;
  flex-flow: row nowrap;
  margin: 2vh auto;
}

.myFavour-img-wrap {
  width: 20vw;
  height: 10vh;
  position: relative;
}

.myFavour-img {
  position: relative;
  width: 100%;
  height: 10vh;
  border-radius: 10%;
}

.myFavour-title {
  width: 50vw;
  height: 7vh;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
  margin: 1.5vh 0 0 3vw;
}
.myFavour-title-detail {
  font-size: 2.6vh;
}

.myFavour-title-count {
  font-size: 1.9vh;
  color: gray;
}
</style>

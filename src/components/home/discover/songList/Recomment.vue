<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-03 19:33:12
 * @LastEditTime: 2019-09-05 12:25:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="recomment">
    <div class="main-wrap" ref="scroll">
      <div class="main">
        <div class="main-swipe-wrap">
          <div
            class="main-swipe"
            @touchstart="getTouchStart"
            @touchend="getTouchEnd"
            @touchmove="getTouchMove"
          >
            <div class="main-swipe-div1" ref="div1" @click="goSongListDetail(swipeResult[2])">
              <img class="main-swipe-img" :src="swiperImg3" alt />
              <div class="main-swipe-title-wrap">
                <div class="main-swipe-title">{{ swiperName3 | snippet15 }}</div>
              </div>
              <div class="main-individuality-count-wrap">
                <img class="main-individuality-count-img" src="@/assets/play-icon.png" alt />
                <span class="main-individuality-count">{{ swiperCount3 | snippetNum }}</span>
              </div>
            </div>
            <div
              class="main-swipe-div2 main-swipe-transform"
              ref="div2"
              @click="goSongListDetail(swipeResult[0])"
            >
              <img class="main-swipe-img" :src="swiperImg1" alt />
              <div class="main-swipe-title-wrap">
                <div class="main-swipe-title">{{ swiperName1 | snippet15 }}</div>
              </div>
              <div class="main-individuality-count-wrap">
                <img class="main-individuality-count-img" src="@/assets/play-icon.png" alt />
                <span class="main-individuality-count">{{ swiperCount1 | snippetNum }}</span>
              </div>
            </div>
            <div class="main-swipe-div3" ref="div3" @click="goSongListDetail(swipeResult[1])">
              <img class="main-swipe-img" :src="swiperImg2" alt />
              <div class="main-swipe-title-wrap">
                <div class="main-swipe-title">{{ swiperName2 | snippet15 }}</div>
              </div>

              <div class="main-individuality-count-wrap">
                <img class="main-individuality-count-img" src="@/assets/play-icon.png" alt />
                <span class="main-individuality-count">{{ swiperCount2 | snippetNum }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="main-individuality">
          <div
            class="main-individuality-info"
            @click="goSongListDetail(item)"
            v-for="(item, index) in purifyResult"
            :key="index"
          >
            <img class="main-individuality-img" :src="item.coverImgUrl" alt />
            <div class="main-individuality-count-wrap">
              <img class="main-individuality-count-img" src="@/assets/play-icon.png" alt />
              <span class="main-individuality-count">{{ item.playCount | snippetNum }}</span>
            </div>
            <div class="main-individuality-title">{{ item.name | snippet15}}</div>
          </div>
        </div>
      </div>
    </div>
    <van-loading
      type="spinner"
      color="#1989fa"
      size="24px"
      class="loading"
      v-if="isLoadingMore"
    >努力加载中..</van-loading>
  </div>
</template>

<script>
import api from '@/api/index'
import { songListCat1 } from '@/api/config/songList'
import { vw2px } from '@/util/transform'
import BScroll from 'better-scroll'
import { mapGetters } from 'vuex'
const _ = require('lodash')

export default {
  data () {
    return {
      swipeResult: [],
      purifyResult: [],
      startTouches: [],
      endTouches: [],
      page: 0,
      scroll: null,
      isLoadingMore: false,
      swiperImg1: '',
      swiperImg2: '',
      swiperImg3: '',
      swiperName1: '',
      swiperName2: '',
      swiperName3: '',
      swiperCount1: '',
      swiperCount2: '',
      swiperCount3: ''
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initScroll()
    })
  },

  computed: {
    ...mapGetters(['getIsLoadingMore'])
  },

  watch: {
    getIsLoadingMore (isChange) {
      if (isChange) {
        this.isLoadingMore = true
      } else {
        this.isLoadingMore = false
      }
    }
  },

  created () {
    this.getData(0)
  },

  methods: {
    getData (page) {
      api.getHotSongList(songListCat1, 18, page).then(res => {
        const result = res.data.playlists
        result.forEach((item, index) => {
          if (index > 2) {
            this.purifyResult.push({
              name: item.name,
              coverImgUrl: item.coverImgUrl,
              playCount: item.playCount,
              avatarUrl: item.creator.avatarUrl,
              nickname: item.creator.nickname,
              description: item.description,
              shareCount: item.shareCount,
              tags: item.tags,
              id: item.id,
              trackCount: item.trackCount,
              commentCount: item.commentCount,
              api: 'WY',
              type: 'songList'
            })
          } else {
            this.swipeResult.push({
              name: item.name,
              coverImgUrl: item.coverImgUrl,
              playCount: item.playCount,
              avatarUrl: item.creator.avatarUrl,
              nickname: item.creator.nickname,
              description: item.description,
              shareCount: item.shareCount,
              tags: item.tags,
              id: item.id,
              trackCount: item.trackCount,
              commentCount: item.commentCount,
              api: 'WY',
              type: 'songList'
            })
          }
        })

        this.swiperImg1 = this.swipeResult[0].coverImgUrl
        this.swiperImg2 = this.swipeResult[1].coverImgUrl
        this.swiperImg3 = this.swipeResult[2].coverImgUrl

        this.swiperName1 = this.swipeResult[0].name
        this.swiperName2 = this.swipeResult[1].name
        this.swiperName3 = this.swipeResult[2].name

        this.swiperCount1 = this.swipeResult[0].playCount
        this.swiperCount2 = this.swipeResult[0].playCount
        this.swiperCount3 = this.swipeResult[0].playCount
      })
    },

    getMoreData (page) {
      api.getHotSongList(songListCat1, 18, page).then(res => {
        const result = res.data.playlists
        result.forEach((item, index) => {
          this.purifyResult.push({
            name: item.name,
            coverImgUrl: item.coverImgUrl,
            playCount: item.playCount,
            avatarUrl: item.creator.avatarUrl,
            nickname: item.creator.nickname,
            description: item.description,
            shareCount: item.shareCount,
            tags: item.tags,
            id: item.id,
            trackCount: item.trackCount,
            commentCount: item.commentCount,
            api: 'WY'
          })
        })
      })
    },

    goSongListDetail (item) {
      // console.log(item);
      // 传递purifyResult

      this.$store.commit('setSongList', item)

      this.$router.push({ name: 'songListDetail' })
    },

    getTouchStart (e) {
      this.startTouches = e.touches
    },

    getTouchEnd (e) {
      this.endTouches = e.changedTouches

      this.slide(e)
    },

    getTouchMove (e) {
      // 起点
      const startScreenX = this.startTouches[0].screenX

      // 移动点
      const moveScreenX = e.touches[0].screenX

      // 两点距离
      this.distance = startScreenX - moveScreenX
    },

    slide (e) {
      // 起点
      const startScreenX = this.startTouches[0].screenX
      const startScreenY = this.startTouches[0].screenY

      // 终点
      const endScreenX = this.endTouches[0].screenX
      const endScreenY = this.endTouches[0].screenY

      const vw25 = vw2px(25)
      const vw50 = vw2px(50)

      if (startScreenX - endScreenX < 0) {
        e.stopPropagation()
        // window.getComputedStyle(this.$refs.div0).left
        // 左划

        if (window.getComputedStyle(this.$refs.div1).left === 0 + 'px') {
          this.$refs.div1.style.left = vw25
          this.$refs.div2.style.left = vw50
          this.$refs.div3.style.left = 0 + 'px'
          this.$refs.div1.classList.add('main-swipe-transform')
          this.$refs.div2.classList.remove('main-swipe-transform')
        } else if (window.getComputedStyle(this.$refs.div1).left === vw25) {
          this.$refs.div1.style.left = vw50
          this.$refs.div2.style.left = 0 + 'px'
          this.$refs.div3.style.left = vw25
          this.$refs.div3.classList.add('main-swipe-transform')
          this.$refs.div1.classList.remove('main-swipe-transform')
        } else if (window.getComputedStyle(this.$refs.div1).left === vw50) {
          this.$refs.div1.style.left = 0 + 'px'
          this.$refs.div2.style.left = vw25
          this.$refs.div3.style.left = vw50
          this.$refs.div2.classList.add('main-swipe-transform')
          this.$refs.div3.classList.remove('main-swipe-transform')
        }
      } else if (startScreenX - endScreenX > 0) {
        e.stopPropagation()

        // console.log(window.getComputedStyle(this.$refs.div0[0]).left);
        // console.log(this.$refs.div0[0].offsetLeft);

        // 右划;
        if (window.getComputedStyle(this.$refs.div1).left === 0 + 'px') {
          this.$refs.div1.style.left = vw50
          this.$refs.div2.style.left = 0 + 'px'
          this.$refs.div3.style.left = vw25
          this.$refs.div3.classList.add('main-swipe-transform')
          this.$refs.div2.classList.remove('main-swipe-transform')
        } else if (window.getComputedStyle(this.$refs.div1).left === vw25) {
          this.$refs.div1.style.left = 0 + 'px'
          this.$refs.div2.style.left = vw25
          this.$refs.div3.style.left = vw50
          this.$refs.div2.classList.add('main-swipe-transform')
          this.$refs.div1.classList.remove('main-swipe-transform')
        } else if (window.getComputedStyle(this.$refs.div1).left === vw50) {
          this.$refs.div1.style.left = vw25
          this.$refs.div2.style.left = vw50
          this.$refs.div3.style.left = 0 + 'px'
          this.$refs.div1.classList.add('main-swipe-transform')
          this.$refs.div3.classList.remove('main-swipe-transform')
        }
      }
    },

    getScrollTop: _.throttle(
      function () {
        this.getScrollData()
        this.scroll.finishPullUp()
      },
      500,
      { leading: true, trailing: false }
    ),

    getScrollData () {
      this.page++
      const page = this.page * 18
      this.getMoreData(page)
    },

    initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.scroll, {
          scrollY: true,
          scrollBar: false,
          click: true,
          tap: true,
          pullUpLoad: {
            threshold: 1
          }
        })

        this.scroll.on('pullingUp', this.getScrollTop)
      } else {
        this.scroll.refresh()
      }
    }
  }
}
</script>

<style scoped>
.main-wrap {
  width: 100vw;
  height: 76vh;
  overflow: hidden;
}

.main {
  width: 100vw;
}

.main-swipe-wrap {
  width: 100vw;
  height: 40vh;
  border-top: 1px solid rgba(128, 128, 128, 0.158);
  margin: 2px 0 0 0;
}

.main-swipe {
  width: 90vw;
  height: 30vh;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  position: relative;
  padding: 5vh 0 0 0;
  background: rgba(255, 255, 255, 0.445);
}

.main-swipe-img {
  position: relative;
  width: 100%;
  height: 75%;
  z-index: -50;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
}

.main-swipe-playCount {
  display: inline-block;
  width: 15vw;
  height: 3vh;
  position: absolute;
  right: 0.5vw;
  font-size: 1.8vh;
  color: white;
  background: url("../../../../assets/play-icon.png") 0% 25% no-repeat;
  background-size: 25% 60%;
  text-indent: 4vw;
}

.main-swipe-title-wrap {
  width: 100%;
  height: 20%;
  font-size: 2.2vh;
  z-index: -50;
  position: relative;
}

.main-swipe-title {
  width: 80%;
  height: 100%;
  position: relative;
  margin: 0 auto;
}

.main-swipe-div1 {
  width: 40vw;
  height: 30vh;
  position: absolute;
  left: 0;
  border: 1px solid rgba(128, 128, 128, 0.274);
  border-radius: 5%;
}

.main-swipe-div2 {
  width: 40vw;
  height: 30vh;
  position: absolute;
  left: 25vw;
  border: 1px solid rgba(128, 128, 128, 0.274);
  border-radius: 5%;
}

.main-swipe-div3 {
  width: 40vw;
  height: 30vh;
  position: absolute;
  left: 50vw;
  border: 1px solid rgba(128, 128, 128, 0.274);
  border-radius: 5%;
}

.main-swipe-transform {
  transform: scale(1.1, 1.15);
  z-index: 50;
  background: white;
}

.main-individuality {
  width: 100vw;
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.main-individuality-info {
  width: 30vw;
  height: 25vh;
  margin: 0.5vh 0;
  position: relative;
}

.main-individuality-img {
  width: 30vw;
  height: 18vh;
  border-radius: 5%;
}

.main-individuality-title {
  width: 30vw;
  height: 5vh;
  font-size: 2.1vh;
  color: black;
  font-weight: 530;
}

.main-individuality-count-wrap {
  width: 15vw;
  height: 3vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0.8vw;
}

.main-individuality-count-img {
  width: 4vw;
  height: 2vh;
}

.main-individuality-count {
  font-size: 1.8vh;
  color: white;
}

.loading {
  width: 100vw;
  height: 5vh;
  text-align: center;
  position: absolute;
  top: 77vh;
}
</style>

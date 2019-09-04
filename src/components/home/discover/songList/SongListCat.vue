<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-06 19:45:47
 * @LastEditTime: 2019-08-22 15:04:29
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="main-individuality-wrap" ref="scroll">
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
import BScroll from 'better-scroll'
import api from '@/api/index'
import { mapGetters } from 'vuex'
const _ = require('lodash')
export default {
  data () {
    return {
      purifyResult: [],
      page: 0,
      scroll: null,
      isLoadingMore: false
    }
  },

  props: {
    category: String
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
      api.getHotSongList(this.category, 'hot', 18, page).then(res => {
        const result = res.data.data
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
            api: 'WY',
            type: 'songList'
          })
        })
      })
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
      this.getData(page)
    },

    goSongListDetail (item) {
      this.$store.commit('setSongList', item)

      this.$router.push({ name: 'songListDetail' })
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
.main-individuality-wrap {
  width: 100vw;
  height: 76vh;
  overflow: hidden;
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

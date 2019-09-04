<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 18:11:42
 * @LastEditTime: 2019-08-22 14:47:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="singerRankList" ref="scroll">
    <div class="search-result-wrap">
      <div
        v-for="(item, index) in purifyResult"
        :key="index"
        @click="play(item)"
        class="search-result"
      >
        <div class="search-result-index">{{ index + 1 }}</div>
        <img class="search-result-img" :src="item.picUrl" alt />
        <div class="search-info">
          <div class="search-info-artist">{{ item.artistName | snippet15 }}</div>
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
import BScroll from 'better-scroll'
import { mapGetters } from 'vuex'
const _ = require('lodash')
export default {
  data () {
    return {
      purifyResult: [],
      scroll: null,
      page: 0,
      isLoadingMore: false
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initScroll()
    })
  },

  created () {
    this.getData(0)
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

  methods: {
    getData (page) {
      api.getSingerRankList(30, page).then(res => {
        const result = res.data.data
        // console.log(result);
        result.forEach(item => {
          this.purifyResult.push({
            artistName: item.name,
            artistID: item.id,
            picUrl: item.picUrl
          })
        })
      })
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
    },

    getScrollData () {
      const pages = this.page++
      this.getData(pages)
    },

    getScrollTop: _.throttle(
      function () {
        this.getScrollData()
        this.scroll.finishPullUp()
      },
      500,
      { leading: true, trailing: false }
    ),

    play (item) {
      // artistInfo
      const index = this.purifyResult.indexOf(item)
      this.$store.commit('setWYartist', this.purifyResult[index])
      // console.log(this.$store.getters.getWYartist);

      this.$router.push({ name: 'singerInfo' })
    }
  }
}
</script>

<style scoped>
.singerRankList {
  width: 100vw;
  height: 83vh;
  margin: 0 auto;
  overflow: hidden;
}

.search-result {
  width: 90vw;
  height: 12vh;
  margin: 1vh auto;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-radius: 5%;
}

.search-result-index {
  width: 15vw;
  height: 12vh;
  font-size: 3.5vh;
  line-height: 12vh;
  text-indent: 1vw;
  font-weight: bold;
  /* text-align: center; */
  color: red;
}

.search-result-img {
  width: 22vw;
  height: 12vh;
  border-radius: 5%;
}

.search-info-artist {
  width: 40vw;
  height: 5vh;
  color: black;
  font-size: 2.5vh;
  margin: 0 0 0 5vw;
}

.search-songArtist {
  color: gray;
  font-size: 1.8vh;
  position: absolute;
  bottom: 1vh;
}

.loading {
  width: 100vw;
  height: 5vh;
  text-align: center;
  position: absolute;
  top: 77vh;
}
</style>

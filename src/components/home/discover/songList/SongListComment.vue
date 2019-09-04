<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 21:04:00
 * @LastEditTime: 2019-08-22 15:04:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="comment">
    <header>
      <Header :leftTitle="leftTitle" :where="songListDetail" />
    </header>

    <div class="main">
      <div class="nav">
        <img class="nav-img" :src="picUrl" alt />
        <div class="nav-info">
          <div class="nav-info-name">{{ name }}</div>
          <div class="nav-info-nickname">
            <span>by</span>
            <span class="info-nickname">{{ nickname }}</span>
          </div>
        </div>
      </div>

      <div class="separate"></div>

      <div class="mian-content">
        <div class="comments-type">精彩评论</div>
        <div class="comments-wrap" v-for="(item, index) in hotComments" :key="index">
          <div class="comments">
            <img class="comments-img" :src="item.user.avatarUrl" alt />
            <div class="comments-info">
              <div>{{ item.user.nickname }}</div>
              <div class="comments-info-date">{{ item.time | formatDate }}</div>
            </div>
            <span class="comments-likeCount-wrap">
              <span class="comments-likeCount">{{ item.likedCount }}</span>
              <img class="comments-likeCount-img" src="@/assets/like.png" alt />
            </span>
          </div>
          <div class="comments-content">{{ item.content }}</div>
        </div>

        <div class="comments-type">最新评论</div>
        <div class="comments-wrap" v-for="item in comments" :key="item.commentId">
          <div class="comments">
            <img class="comments-img" :src="item.user.avatarUrl" alt />
            <div class="comments-info">
              <div>{{ item.user.nickname }}</div>
              <div class="comments-info-date">{{ item.time | formatDate }}</div>
            </div>
            <span class="comments-likeCount-wrap">
              <span class="comments-likeCount">{{ item.likedCount }}</span>
              <img class="comments-likeCount-img" src="@/assets/like.png" alt />
            </span>
          </div>
          <div class="comments-content">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import Header from '@/components/public/Header'
import { variedDate } from '@/util/date'
export default {
  data () {
    return {
      leftTitle: '',
      commentCount: '',
      songListID: '',
      picUrl: '',
      songListDetail: 'songListDetail',
      hotComments: [],
      comments: []
    }
  },

  components: {
    Header
  },

  created () {
    this.getData()
    this.getComment()
  },

  methods: {
    getData () {
      const res = this.$store.getters.getSongList
      this.songListID = res.id
      this.commentCount = res.commentCount
      this.leftTitle = `评论(${this.commentCount})`
      this.picUrl = res.coverImgUrl
      this.name = res.name
      this.nickname = res.nickname
    },

    getComment () {
      api.getSongListComment(this.songListID, 30, 0).then(res => {
        // console.log(res.data.data);
        const result = res.data.data
        this.hotComments = result.hotComments
        this.comments = result.comments
      })
    }
  },

  filters: {
    formatDate: variedDate
  }
}
</script>

<style scoped>
.comment {
  width: 100vw;
  position: relative;
}

header {
  width: 100vw;
  height: 7vh;
  position: sticky;
  top: 0;
  background: white;
}

.main {
  width: 100vw;
  height: 85vh;
  overflow: auto;
}

.nav {
  width: 100vw;
  height: 15vh;
  margin: 1vw 0 0 0;
  display: flex;
  flex-flow: row nowrap;
}

.nav-img {
  width: 20vw;
  height: 12vh;
  margin: 0 3.5vw;
  border-radius: 5%;
}

.nav-info {
  width: 60vw;
  height: 12vh;
}

.nav-info-name {
  font-size: 2.8vh;
  color: black;
  margin: 0 0 1vh 0;
}

.nav-info-nickname {
  font-size: 2vh;
}

.info-nickname-by {
  margin: 0 0 0 2vw;
  color: rgb(12, 12, 247);
}

.separate {
  width: 100vw;
  height: 1.5vh;
  background: rgba(128, 128, 128, 0.082);
}

.mian-content {
  width: 100vw;
}

.comments-type {
  font-weight: bold;
  margin: 2vh 3vw;
}

.comments-wrap {
  width: 100vw;
  margin: 0 0 2vh 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.205);
}

.comments {
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-flow: row nowrap;
  margin: 1vh 0 0 0;
}

.comments-img {
  width: 10vw;
  height: 6vh;
  margin: 0 0 0 4vw;
  border-radius: 50%;
}

.comments-info {
  width: 60vw;
  height: 7vh;
  margin: 0 0 0 2vw;
}

.comments-info-date {
  color: gray;
  font-size: 1.8vh;
}

.comments-likeCount-wrap {
  width: 18vw;
  height: 3vh;
  display: flex;
  flex-flow: row nowrap;
}

.comments-likeCount {
  display: inline-block;
  width: 12vw;
  height: 3vh;
  text-align: right;
  margin: 0 1vw 0 0;
}

.comments-likeCount-img {
  width: 6vw;
  height: 3vh;
}

.comments-content {
  width: 60vw;
  margin: 0 0 2vh 16vw;
}
</style>

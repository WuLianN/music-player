<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 13:11:38
 * @LastEditTime: 2019-09-18 18:20:43
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="songListDetail">
    <Header :leftTitle="leftTitle" :where="songList" :active="active" />
    <van-notice-bar class="mask" v-if="isShowMask" background="transparent">{{ res.name }}</van-notice-bar>

    <div class="main">
      <img class="main-info-img" :src="res.coverImgUrl" alt />
      <span class="main-info-count">{{ res.playCount | snippetNum }}</span>
      <div class="main-info-content">
        <div class="main-info-title">{{ res.name | snippet17 }}</div>
        <div class="main-info-creator">
          <img class="main-info-creator-img" :src="res.avatarUrl" v-if="res.avatarUrl" alt />
          <span>{{ res.nickname | snippet10 }}</span>
        </div>
        <div class="main-info-des">{{ res.description | snippet17 }}</div>
      </div>
    </div>

    <div class="nav">
      <div class="nav-title" @touchend="goComment">
        <img :style="{ paddingTop: '0.5vh'}" src="@/assets/comment.png" alt />
        <div :style="{ marginTop: '-0.5vh'}" class="nav-title-info">{{ res.commentCount }}</div>
      </div>

      <div class="nav-title">
        <img src="@/assets/share.png" alt />
        <div class="nav-title-info">{{ res.shareCount }}</div>
      </div>

      <div class="nav-title">
        <img src="@/assets/download.png" alt />
        <div class="nav-title-info">下载</div>
      </div>

      <div class="nav-title">
        <img src="@/assets/select.png" alt />
        <div class="nav-title-info">多选</div>
      </div>
    </div>

    <div
      class="footer"
      :class="{ active: isActive }"
      @touchstart="getStart"
      @touchend="getEnd"
      @touchmove="touchMove"
    >
      <div class="footer-header">
        <div class="toCircle-left"></div>
        <div class="footer-header-title"></div>
        <div class="toCircle-right"></div>
      </div>

      <div class="footer-list">
        <SearchList :purifyResult="purifyResult" />
      </div>
    </div>

    <img class="songListDetail-bg" :src="res.coverImgUrl" alt />
  </div>
</template>

<script>
import api from "@/api/index";
import QQapi from "@/api/qq/qqIndex";
import Header from "@/components/public/Header";
import SearchList from "@/components/music/search/SearchList";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      leftTitle: "歌单",
      songList: "songList",
      res: [],
      purifyResult: [],
      isActive: false,
      isShowMask: false,
      active: Number
    };
  },

  components: {
    Header,
    SearchList
  },

  created() {
    this.getActive();

    this.getData();
    // console.log(this.active)

    // 若是主页的歌单被点进来，则返回到主页
    if (this.$route.params.home === "home") {
      this.songList = this.$route.params.home;

      if (this.$route.params.leftTitle) {
        this.leftTitle = "专辑";
      }
    } else if (this.$route.params.rankList === "rankList") {
      this.songList = this.$route.params.rankList;
    } else if (this.$route.params.user === "user") {
      this.songList = this.$route.params.user;
    } else if (this.$route.params.CD === "newCD") {
      this.songList = this.$route.params.CD;
      if (this.$route.params.leftTitle) {
        this.leftTitle = "专辑";
      }
    }
  },

  methods: {
    getData() {
      // 获得songList的信息
      this.res = this.$store.getters.getSongList;

      const ID = this.res.id; // 歌单/专辑 ID

      const type = this.res.type;

      if (type === "songList") {
        api.getSongList(ID).then(res => {
          const result = res.data.playlist.tracks;
    
          const purifyRes = [];
          result.forEach(item => {
            purifyRes.push({
              id: item.id,
              songName: item.name,
              artist: item.ar[0].name,
              picUrl: item.al.picUrl,
              api: "WY"
            });
          });

          this.purifyResult.push(purifyRes);
        });
      } else if (type === "album") {
        const result = this.res.songs;

        const purifyRes = [];
        result.forEach(item => {
          purifyRes.push({
            id: item.id,
            songName: item.name,
            picUrl: item.al.picUrl,
            artist: item.ar[0].name,
            artistID: item.ar[0].id,
            api: "WY"
          });

          this.purifyResult.push(purifyRes);
        });
      } else if (type === "qqSongList") {
        QQapi.getSongList(ID, 1).then(res => {
          const result = res.data.data;

          const purifyRes = [];
          result.forEach(item => {
            purifyRes.push({
              id: item.id,
              songName: item.name,
              artist: item.singer,
              picUrl: item.pic,
              api: "QQ"
            });
          });

          this.purifyResult.push(purifyRes);
        });
      }
    },

    getStart(e) {
      // 第一个触点
      this.startTouches = e.touches;
      // console.log(this.startTouches);
    },

    getEnd(e) {
      // 最后一个触点
      this.endTouches = e.changedTouches;
      // onsole.log(this.endTouches);

      this.slide();
    },

    touchMove() {
      // this.slide();
    },

    slide() {
      // 起点
      const startScreenX = this.startTouches[0].screenX;
      const startScreenY = this.startTouches[0].screenY;

      // 终点
      const endScreenX = this.endTouches[0].screenX;
      const endScreenY = this.endTouches[0].screenY;

      if (startScreenY - endScreenY > 0) {
        // 上划
        return (
          (this.isActive = true),
          (this.isShowMask = true),
          (this.leftTitle = "")
        );
      } else {
        // 下滑
        return (
          (this.isActive = false),
          (this.isShowMask = false),
          (this.leftTitle = "歌单")
        );
      }
    },

    goComment() {
      this.$router.push({
        name: "songListComment"
      });
    },

    getActive() {
      this.active = this.$store.getters.getActive;
    }
  }
};
</script>

<style scoped>
.active {
  position: absolute;
  top: 7vh;
}

.mask {
  width: 70vw;
  height: 7vh;
  position: fixed;
  top: 0;
  left: 16vw;
  font-size: 3vh;
  color: white;
}

.songListDetail {
  width: 100vw;
  height: 100vh;
}

.main {
  width: 100vw;
  height: 25vh;
  margin: 3vh 0 0 0;
  display: flex;
  flex-flow: row nowrap;
}

.main-info-img {
  width: 38vw;
  height: 20vh;
  margin: 0 0 1vh 5vw;
}

.main-info-count {
  display: inline-block;
  width: 15vw;
  height: 3vh;
  position: absolute;
  left: 29vw;
  font-size: 1.8vh;
  color: white;
  background: url("../../../../assets/play-icon.png") 0% 25% no-repeat;
  background-size: 25% 60%;
  text-indent: 4vw;
}

.main-info-content {
  width: 50vw;
  height: 25vh;
  margin: 0 0 0 5vw;
}

.main-info-title {
  width: 50vw;
  height: 8vh;
  font-size: 2.7vh;
  color: white;
}
.main-info-creator {
  width: 50vw;
  height: 5vh;
  margin: 1vh 0 1vh 0;
  display: flex;
  flex-flow: row nowrap;
}

.main-info-creator-img {
  width: 10vw;
  height: 5vh;
  border-radius: 50%;
}

.main-info-creator span {
  text-indent: 2vw;
  color: #9b9b9b;
  line-height: 5vh;
}

.main-info-des {
  font-size: 1.8vh;
  color: #9b9b9b;
}

.nav {
  width: 90vw;
  height: 10vh;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}

.nav-title {
  width: 15vw;
  height: 10vh;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.nav-title img {
  width: 10vw;
  height: 6vh;
}

.nav-title-info {
  color: #9b9b9b;
  font-size: 2vh;
  text-align: center;
}

.footer {
  width: 100vw;
  height: 84vh;
  overflow: auto;
}

.footer-header {
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-flow: row nowrap;
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

.footer-header-title {
  width: 80vw;
  height: 7vh;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-list {
  width: 100vw;
  background: white;
}

.songListDetail-bg {
  width: 100vw;
  height: 100vh;
  z-index: -10;
  -webkit-filter: blur(5px); /* Chrome, Safari, Opera */
  filter: blur(70px);
  position: absolute;
  top: 0;
}
</style>

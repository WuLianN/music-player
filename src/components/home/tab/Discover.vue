<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-01 15:04:53
 * @LastEditTime: 2019-09-18 18:27:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="discover-wrap">
    <div class="discover" @touchstart="getStart" @touchend="getEnd" @touchmove="touchMove">
      <van-swipe :autoplay="3000" class="swipe">
        <van-swipe-item v-for="(image, index) in bannerResults" :key="index">
          <img v-lazy="image.picUrl" class="swipe-img" @click="getBannerInfo(image)" />
          <div
            class="banner-type"
            :style="{ background: image.typeTitle==='独家'?'red':'#3366FF', width: image.typeTitle.length > 2 ? '18vw': '10vw' }"
          >{{ image.typeTitle }}</div>
        </van-swipe-item>
      </van-swipe>

      <div class="tab-bar">
        <div class="category" @click="goSingers">
          <div class="category-content">
            <img src="@/assets/home/songer.png" class="soner-img" alt />
          </div>
          <div class="category-title">歌手</div>
        </div>

        <div class="category">
          <div class="category-content" @click="goSongList">
            <img src="@/assets/home/musiclist.png" class="musicList-img" alt />
          </div>
          <div class="category-title">歌单</div>
        </div>

        <div class="category" @click="goRankList">
          <div class="category-content">
            <img src="@/assets/home/rankList.png" class="rankList-img" alt />
          </div>
          <div class="category-title">排行榜</div>
        </div>

        <div class="category">
          <div class="category-content" @click="goMV">
            <img src="@/assets/home/MV.png" class="musicList-img" alt />
          </div>
          <div class="category-title">MV</div>
        </div>
      </div>

      <div class="recommentList">
        <div class="recommentList-header">
          <span class="recommentList-header-firstTitle">推荐歌单</span>
          <span class="recommentList-header-span-wrap" @touchstart="goSongList">
            <span class="recommentList-header-leftSpan"></span>
            <span class="recommentList-header-lastTitle">歌单广场</span>
            <span class="recommentList-header-rightSpan"></span>
          </span>
        </div>
        <div class="recommentList-show-wrap">
          <div
            class="recommentList-show"
            @click="goSongListDetail(item)"
            v-for="(item, index) in purifyResult"
            :key="index"
          >
            <img class="recommentList-show-img" :src="item.coverImgUrl" alt />
            <div class="recommentList-show-count-wrap">
              <img class="recommentList-show-count-img" src="@/assets/play-icon.png" alt />
              <span class="recommentList-show-count">{{ item.playCount | snippetNum }}</span>
            </div>

            <div class="recommentList-show-title">{{ item.name | snippet15}}</div>
          </div>
        </div>
      </div>

      <van-tabs v-model="tabsActive" line-height="0" class="tabs">
        <van-tab title="新碟" class="tabs-tab">
          <div class="tabs-tab-component">
            <rowOfDisplayCase :data="topAlbum" v-if="isShowTopAlbum" />
          </div>
          <div class="tabs-tab-more">
            <span class="recommentList-header-span-wrap" @click="moreCD">
              <span class="recommentList-header-leftSpan"></span>
              <span class="recommentList-header-lastTitle">更多新碟</span>
              <span class="recommentList-header-rightSpan"></span>
            </span>
          </div>
        </van-tab>
        <van-tab title="新歌" class="tabs-tab">
          <div class="tabs-tab-component">
            <rowOfDisplayCase :data="newSong" v-if="isShowNewSong" />
          </div>
          <div class="tabs-tab-more">
            <span class="recommentList-header-span-wrap" @click="moreSongs">
              <span class="recommentList-header-leftSpan"></span>
              <span class="recommentList-header-lastTitle">更多新歌</span>
              <span class="recommentList-header-rightSpan"></span>
            </span>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import { clearArray } from "@/util/transform";
import rowOfDisplayCase from "@/components/public/rowOfDisplayCase";
export default {
  name: "discover",
  data() {
    return {
      bannerResults: [],
      purifyResult: [],
      songInfo: [],
      topAlbum: [],
      newSong: [],
      active: 0,
      tabsActive: 0,
      isShowTopAlbum: false,
      isShowNewSong: false
    };
  },

  created() {
    this.getBanner();
    this.getRecommentList();
    this.getTopAlbum();
    this.getNewSong();
  },

  methods: {
    goSearch() {
      // this.$router.push({ name: "search", params: { category: "song" } });  //http://localhost:8080/Search
      this.$router.push({ name: "search", query: { category: "song" } }); // http://localhost:8080/Search?category=song
    },

    goRankList() {
      this.$router.push({ name: "rankList" });
    },

    goSingers() {
      this.$router.push({ name: "singers" });
    },

    goMV() {
      this.$router.push({ name: "mv" });
    },

    goSongList() {
      this.$router.push({ name: "songList" });
    },

    goSongListDetail(item) {
      this.$store.commit("setSongList", item);

      this.$router.push({
        name: "songListDetail",
        params: { home: "home" }
      });
    },

    getBanner() {
      api.getBanner(1).then(res => {
        const result = res.data.banners;
        result.forEach(item => {
          this.bannerResults.push({
            picUrl: item.pic,
            targetType: item.targetType,
            targetId: item.targetId,
            song: item.song,
            typeTitle: item.typeTitle,
            titleColor: item.typeColor
          });
        });
      });
    },

    getBannerInfo(image) {
      const targetType = image.targetType;

      if (targetType === 1) {
        const id = image.song.al.id;
        const picUrl = image.song.al.picUrl;
        const songName = image.song.al.name;
        const songArtist = image.song.ar[0].name;
        const api = "WY";

        clearArray(this.songInfo);

        this.songInfo.push({
          id,
          picUrl,
          songName,
          songArtist,
          api
        });

        const isUpdate = true;
        const isFirstTime = true;

        // id
        this.$store.commit("setID", this.songInfo[0].id);
        // 图片链接
        this.$store.commit("setPicUrl", this.songInfo[0].picUrl);
        // 歌曲名
        this.$store.commit("setSongName", this.songInfo[0].songName);
        // 歌曲作者
        this.$store.commit("setSongArtist", this.songInfo[0].songArtist);
        // api来源
        this.$store.commit("setAPI", this.songInfo[0].api);
        // 更新数据
        this.$store.commit("setIsUpdate", isUpdate);
        // 首次加载歌词
        this.$store.commit("setIsFirstTime", isFirstTime);
      } else if (targetType === 10) {
        // "/album?id=80848946"
        const albumID = image.targetId;

        api.getAlbum(albumID).then(res => {
          const result = res.data.album;
          const songs = res.data.songs;

          const albumInfo = {
            name: result.name,
            description: result.description,
            publishTime: result.publishTime,
            trackCount: result.size,
            id: result.id,
            coverImgUrl: result.picUrl,
            shareCount: result.info.shareCount,
            likedCount: result.info.likedCount,
            commentCount: result.info.commentCount,
            nickname: result.artist.name,
            avatarUrl: result.artist.picUrl,
            songs,
            type: "album"
          };

          this.$store.commit("setSongList", albumInfo);

          this.$router.push({
            name: "songListDetail",
            params: { home: "home", leftTitle: "专辑" }
          });
        });
      }
    },

    getRecommentList() {
      const offset = 6 * Math.floor(Math.random() * 11); // 0 - 60
      api.getRecommentList(6, offset).then(res => {
        const result = res.data.result;
        result.forEach((item, index) => {
          this.purifyResult.push({
            id: item.id,
            name: item.name,
            coverImgUrl: item.picUrl,
            playCount: item.playCount,
            description: item.copywriter,
            shareCount: "分享",
            tags: item.tags,
            trackCount: item.trackCount,
            commentCount: "评论",
            type: "songList"
          });
        });
      });
    },

    getStart(e) {
      // 第一个触点
      this.startTouches = e.touches;
    },

    getEnd(e) {
      // 最后一个触点
      this.endTouches = e.changedTouches;

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

      // 下滑
      if (startScreenY - endScreenY < -50) {
        // 清空原数组中的数据 -> 再添加数据

        clearArray(this.purifyResult);
        this.getRecommentList();
      }
    },

    getTopAlbum() {
      api.getTopAlbum(50, 0).then(res => {
        const result = res.data.albums;
        result.forEach(item => {
          this.topAlbum.push({
            id: item.id,
            songName: item.name,
            coverImgUrl: item.picUrl,
            playCount: item.playCount,
            description: item.description,
            shareCount: "分享",
            tags: item.tags,
            trackCount: item.trackCount,
            commentCount: "评论",
            publishTime: item.publishTime,
            artist: item.artist.name,
            type: "songList",
            api: "WY",
            playStyle: "album"
          });
        });

        // 展示新碟
        this.isShowTopAlbum = true;
        this.$store.commit("setNewCD", this.topAlbum);
      });
    },

    getNewSong() {
      api.getNewSong().then(res => {
        const result = res.data.result;
        result.forEach(item => {
          this.newSong.push({
            id: item.id,
            songName: item.name,
            // coverImgUrl: item.picUrl,
            coverImgUrl: item.song.album.blurPicUrl,
            playCount: item.playCount,
            description: item.description,
            shareCount: item.shareCount,
            tags: item.tags,
            trackCount: item.trackCount,
            commentCount: item.commentCount,
            publishTime: item.publishTime,
            artist: item.song.artists[0].name,
            type: "songList",
            api: "WY",
            playStyle: "song"
          });
        });

        // 展示新歌
        this.isShowNewSong = true;
        this.$store.commit("setNewSongs", this.newSong);
      });
    },

    moreCD() {
      this.$router.push({ name: "newCD" });
    },

    moreSongs() {
      this.$router.push({ name: "newSongs" });
    }
  },

  components: {
    rowOfDisplayCase
  }
};
</script>

<style scoped>
.discover {
  width: 100vw;
  height: 82vh;
  overflow: auto;
}

.swipe {
  width: 90vw;
  height: 25vh;
  margin: 0 auto;
  border-radius: 4%;
}

.swipe-img {
  width: 90vw;
  height: 25vh;
}

.banner-type {
  height: 4vh;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 2vh;
  color: white;
  line-height: 4vh;
  border-top-left-radius: 20%;
  text-align: center;
}

.tab-bar {
  width: 80vw;
  height: 10vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 2.5vh auto 1.5vh auto;
}

.category {
  width: 15vw;
  height: 10vh;
}
.category-content {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0 auto;
  background: red;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.soner-img {
  width: 60%;
  height: 60%;
  margin: 0 auto;
}

.rankList-img {
  width: 80%;
  height: 80%;
  margin: 0 auto;
}

.musicList-img {
  width: 85%;
  height: 85%;
  margin: 0 auto;
}

.category-title {
  width: 15vw;
  height: 4vh;
  text-align: center;
}

.recommentList {
  width: 100vw;
  height: 60vh;
  border-top: 1px solid rgba(128, 128, 128, 0.089);
  /* overflow: auto; */
}

.recommentList-header {
  width: 93vw;
  height: 5vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
}

.recommentList-header-span-wrap {
  width: 21vw;
  height: 3vw;
  display: flex;
  align-items: center;
}

.recommentList-header-firstTitle {
  font-size: 2.5vh;
  font-weight: bold;
  line-height: 5vh;
}

.recommentList-header-leftSpan {
  display: inline-block;
  width: 3vw;
  height: 3vh;
  border-top-left-radius: 70%;
  border-bottom-left-radius: 70%;
  border-top: 1px solid rgba(128, 128, 128, 0.295);
  border-bottom: 1px solid rgba(128, 128, 128, 0.295);
  border-left: 1px solid rgba(128, 128, 128, 0.295);
}

.recommentList-header-lastTitle {
  display: inline-block;
  width: 14vw;
  height: 3vh;
  border-top: 1px solid rgba(128, 128, 128, 0.295);
  border-bottom: 1px solid rgba(128, 128, 128, 0.295);
  text-align: center;
  font-size: 1.9vh;
  color: rgb(65, 59, 59);
}

.recommentList-header-rightSpan {
  display: inline-block;
  width: 3vw;
  height: 3vh;
  border-top-right-radius: 70%;
  border-bottom-right-radius: 70%;
  border-top: 1px solid rgba(128, 128, 128, 0.295);
  border-bottom: 1px solid rgba(128, 128, 128, 0.295);
  border-right: 1px solid rgba(128, 128, 128, 0.295);
}

.recommentList-show-wrap {
  width: 100vw;
  display: flex;
  flex-flow: row wrap;
}

.recommentList-show {
  margin: 1vh 0 1vh 2.5vw;
  position: relative;
}

.recommentList-show-img {
  width: 30vw;
  height: 18vh;
  border-radius: 5%;
}

.recommentList-show-title {
  width: 30vw;
  height: 6vh;
  font-size: 2.1vh;
  color: black;
  font-weight: 530;
}

.recommentList-show-count-wrap {
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

.recommentList-show-count-img {
  width: 4vw;
  height: 2vh;
}

.recommentList-show-count {
  font-size: 1.8vh;
  color: white;
}

.tabs {
  width: 26vw;
  height: 5vh;
  /* text-indent: 1vw; */
}

.tabs-tab {
  width: 100vw;
  height: 20vh;
  position: relative;
}

.tabs-tab-component {
  width: 100vw;
  height: 20vh;
}

.tabs-tab-more {
  width: 21vw;
  height: 3vh;
  position: absolute;
  margin: -24vh 0 0 75vw;
}
</style>

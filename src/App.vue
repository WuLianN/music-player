<!--
 * @Description: In User Settings Edit
 * @Author: WuLianN
 * @Date: 2019-08-01 14:37:27
 * @LastEditTime: 2019-09-04 11:25:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app">
    <div class="mask" @click="mask" v-if="isShowMask"></div>
    <div class="loding-wrap" v-if="isLoading">
      <van-loading type="spinner" color="#1989fa" size="50px"></van-loading>
    </div>

    <keep-alive exclude="SongListDetail,SingerInfo,SearchXX,MVplayer">
      <router-view />
    </keep-alive>

    <div class="player" v-show="isShow">
      <PlayerGlobal />
    </div>

    <div v-show="!isShow">
      <Player />
    </div>

    <div class="music-list" v-show="isShowMusicList">
      <SearchList :purifyResult="purifyResult" :isMusicListDo="isMusicListDo" />
    </div>

    <audio
      @canplay="getDuration"
      @timeupdate="getCurrentTime"
      @ended="getNextSong"
      @play="getPlayState"
      @pause="getPauseState"
      ref="audio1"
      :loop="IsLoop"
    ></audio>
  </div>
</template>

<script>
import api from "@/api/index";
import PlayerGlobal from "@/components/music/player/PlayerGlobal.vue";
import Player from "@/components/music/player/Player.vue";
import SearchList from "@/components/music/search/SearchList.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      ID: "",
      api: "",
      KWmp3: "",
      WYmp3: "",
      currentIndex: "",
      lyric: "",
      searchResult: [],
      purifyResult: [],
      isShow: true,
      isShowMusicList: false,
      isMusicListDo: true,
      isShowMask: false,
      IsLoop: false,
      isPlay: true,
      isPause: true,
      isLoading: false
    };
  },

  components: {
    PlayerGlobal,
    Player,
    SearchList
  },

  computed: {
    ...mapGetters([
      "getIsShow",
      "getIsUpdate",
      "getIsPlayOrPause",
      "getIsLoop",
      "getIsShowPlayerGlobal",
      "getIsShowMusicList",
      "getIsShowMask",
      "getIsMusicList",
      "getIsUpdateCurrentTime",
      "getLoading"
    ])
  },

  watch: {
    getIsShow(isChange) {
      if (isChange) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },

    async getIsUpdate(isChange) {
      if (isChange === true) {
        await this.getData();

        await this.getPlay();
      }
    },

    getIsPlayOrPause(isChange) {
      // console.log(isChange);
      if (isChange) {
        // true -> 播放
        this.$refs.audio1.play();
      } else {
        // false -> 暂停
        this.$refs.audio1.pause();
      }
    },

    getIsLoop(isChange) {
      if (isChange) {
        this.IsLoop = true;
      } else {
        this.IsLoop = false;
      }
    },

    getIsShowMusicList(isChange) {
      if (isChange) {
        this.isShowMusicList = true;
        this.musicList();
      } else {
        this.isShowMusicList = false;
      }
    },

    getIsShowMask(isChange) {
      if (isChange) {
        this.isShowMask = true;

        const recoverFalse = false;
        this.$store.commit("setIsShowMask", recoverFalse);
      }
    },

    getIsMusicList(isChange) {
      if (isChange) {
        this.musicList();

        const recoverFalse = false;
        this.$store.commit("setIsGetMusicList", recoverFalse);
      }
    },

    getIsUpdateCurrentTime(isChange) {
      if (isChange) {
        const currentTime = this.$store.getters.getCurrentTimeByTouch;
        this.$refs.audio1.currentTime = currentTime;

        const recoverFalse = false;
        this.$store.commit("setIsUpdateCurrentTime", recoverFalse);
      }
    },

    getLoading(isChange) {
      if (isChange === 0) {
        this.isLoading = false;
      } else {
        this.isLoading = true;
      }
    }
  },

  methods: {
    // 获取数据
    async getData() {
      this.ID = this.$store.getters.getID;

      await api.getUrl(this.ID).then(res => {
        const url = res.data.data[0].url;

        // 检查资源是否可用
        this.checkResource(url, "WYmp3");
      });
    },

    // 播放哪个平台的音乐
    getPlay() {
      // 判断api
      const api = this.$store.getters.getAPI;

      if (api === "WY") {
        this.$refs.audio1.src = this.WYmp3;
      } else if (api === "KW") {
        this.$refs.audio1.src = this.KWmp3;
      } else if (api === "QQ") {
        this.$refs.audio1.src = this.QQmp3;
      }

      this.$refs.audio1.play();

      // 获取要播放的数组 - 搜索的歌曲 - 歌单的歌曲 - 喜欢的歌曲
      this.searchResult = this.$store.getters.getSearchResult;
      // console.log(this.searchResult);

      // 获得数组中当前对象的索引
      this.currentIndex = this.searchResult
        .map(item => item.id)
        .indexOf(this.ID);

      this.$store.commit("setCurrentIndex", this.currentIndex);
    },

    // 获取歌曲的长度
    getDuration() {
      const duration = this.$refs.audio1.duration;
      // console.log(duration);
      this.$store.commit("setDuration", duration);
    },

    // 获取歌曲当前的长度
    getCurrentTime(e) {
      const currentTime = e.target.currentTime;
      this.$store.commit("setCurrentTime", currentTime);
    },

    // 侦测是否播放
    getPlayState() {
      this.$store.commit("setIsPlayState", this.isPlay);

      // pause -> false
      const recoverFalse = false;
      this.$store.commit("setIsPauseState", recoverFalse);
    },

    // 侦测是否暂停
    getPauseState() {
      this.$store.commit("setIsPauseState", this.isPause);

      // play -> false
      const recoverFalse = false;
      this.$store.commit("setIsPlayState", recoverFalse);
    },

    // 自动获取下一首
    getNextSong() {
      this.ID = this.searchResult[this.currentIndex + 1].id;
      // console.log(this.ID);

      this.api = this.searchResult[this.currentIndex + 1].api;

      if (this.api === "WY") {
        api.getUrl(this.ID).then(res => {
          this.KWmp3 = res.data.data.url;
          this.$refs.audio1.src = this.KWmp3;
          this.$refs.audio1.play();
        });
      } else if (this.api === "KW") {
        this.KWmp3 = `https://v1.itooi.cn/kuwo/url?id=${this.ID}&quality=flac`;
        this.$refs.audio1.src = this.KWmp3;
        this.$refs.audio1.play();
      } else if (this.api === "QQ") {
        this.QQmp3 = `https://v1.itooi.cn/tencent/url?id=${this.ID}&quality=flac`;
        this.$refs.audio1.src = this.QQmp3;
        this.$refs.audio1.play();
      }

      const songName = this.searchResult[this.currentIndex + 1].songName;
      const songArtist = this.searchResult[this.currentIndex + 1].artist;
      const picUrl = this.searchResult[this.currentIndex + 1].picUrl;
      const isUpdate = true;
      const isChangeTitle = true;

      // 改变vuex状态
      this.$store.commit("setID", this.ID);
      this.$store.commit("setSongName", songName);
      this.$store.commit("setSongArtist", songArtist);
      this.$store.commit("setPicUrl", picUrl);

      // 更新PlayerGlobal
      this.$store.commit("setIsUpdate", isUpdate);
      // 更新Player Title
      this.$store.commit("setIsChangeTitle", isChangeTitle);
    },

    // 歌单
    musicList() {
      // 清空数组
      const purifyResultLength = this.purifyResult.length;
      this.purifyResult.splice(0, purifyResultLength);

      // 获取数据 改变 -> 随机不展示、还是展示原数组
      const reserveResult = this.$store.getters.getReserveResult;
      this.purifyResult.push(reserveResult);
    },

    // 遮罩层
    mask() {
      // 关闭遮罩层
      this.isShowMask = false;
      this.$store.commit("setIsShowMask", this.isShowMask);

      // 关闭musicList
      this.isShowMusicList = false;
      this.$store.commit("setIsShowMusicList", this.isShowMusicList);
    },

    // 检查资源是否可用
    checkResource(url, api) {
      if (url === null) {
        // 存在歌单
        if (this.searchResult) {
          // 获取下一首
          this.getNextSong();
        } else {
          throw new Error("资源不存在！");
        }
      } else {
        // 策略模式 -> 可以将platform模块化
        const platform = {
          WYmp3: () => {
            return (this.WYmp3 = url);
          }
        };

        platform[api]();
      }
    }
  }
};
</script>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 0;
}

.player {
  position: fixed;
  bottom: 0;
}

.music-list {
  width: 100vw;
  height: 60vh;
  position: fixed;
  bottom: 0;
  background: white;
  z-index: 150;
  overflow: auto;
}

.mask {
  width: 100vw;
  height: 40vh;
  background: rgba(0, 0, 0, 0.349);
  z-index: 200;
  position: fixed;
  top: 0;
}

.loding-wrap {
  width: 100vw;
  height: 10vh;
  text-align: center;
  position: absolute;
  top: 55vh;
  z-index: 999;
}
</style>

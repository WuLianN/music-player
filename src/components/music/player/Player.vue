<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 12:45:40
 * @LastEditTime: 2019-09-03 21:37:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="player">
    <!-- 导航 -->

    <div class="player-nav">
      <div class="player-nav-arrow" @click="onClickLeft">
        <img src="@/assets/arrow-left.png" alt />
      </div>
      <div class="player-nav-song">
        <div class="player-song-name">{{ songName | snippet15 }}</div>
        <div class="player-song-artist">{{ songArtist | snippet15 }}</div>
      </div>
    </div>

    <!-- 内容 -->

    <div @click="exchange" class="player-content">
      <!-- 音乐转盘 -->
      <div v-show="isPlayerOrlyrics" class="player-tray">
        <div class="player-record" :style="{ transform: rotate }">
          <img alt class="player-img" ref="playerImg" />
        </div>

        <div class="user-function">
          <div class="user-function-icon" @click="isCollect">
            <img src="@/assets/collect.png" class="user-img" ref="collectImg" alt />
          </div>

          <div class="user-function-icon">
            <img src="@/assets/download.png" class="user-img" alt />
          </div>

          <div class="user-function-icon">
            <img src="@/assets/message.png" class="user-img" alt />
          </div>

          <div class="user-function-icon">
            <img src="@/assets/share.png" class="user-img" alt />
          </div>
        </div>
      </div>

      <!-- 歌词 -->
      <div class="player-lyric" ref="scrollWrap">
        <div v-show="!isPlayerOrlyrics" class="player-lyrics-wrap" ref="scroll">
          <p
            v-for="(item, index) in lyric[0]"
            :key="index"
            :time="item.time"
            ref="p"
            class="player-lyrics"
            :class="{ active: isActive === index}"
          >{{ item.lyrics }}</p>
        </div>
      </div>
    </div>

    <!-- 底部 -->

    <div class="player-footer">
      <!-- 进度条 -->
      <div class="progress">
        <span class="progress-currentTime">{{ currentTime }}</span>
        <div class="progress-line" ref="progressLine" @touchend="touchEnd" @touchmove="touchMove">
          <div class="line1" ref="line"></div>
          <div class="line2" :style="{ width : progress }"></div>
          <div class="circle" :style="{ left: progress }"></div>
        </div>
        <span class="progress-duration">{{ duration }}</span>
      </div>

      <!-- 控制 -->
      <div class="controls">
        <div class="controls-playStyle">
          <img src="@/assets/loop.png" @click="playStyle" class="controls-img" ref="playStyleImg" />
        </div>
        <div class="controls-pre" @click="preSong">
          <img src="@/assets/previous.png" alt class="controls-img" />
        </div>
        <div class="controls-switch" @click="playOrPause">
          <img src="@/assets/play-white.png" alt class="controls-img" ref="switchImg" />
        </div>
        <div class="controls-next" @click="nextSong">
          <img src="@/assets/nextsong.png" alt class="controls-img" />
        </div>
        <div class="controls-musicList" @click="musicList">
          <img src="@/assets/home/musiclist.png" alt class="controls-img" />
        </div>
      </div>
    </div>

    <!-- 高斯模糊背景图片 -->
    <img :src="picUrl" alt class="player-bg" ref="playerBgImg" />
  </div>
</template>

<script>
import api from "@/api/index";
import QQapi from "@/api/qq/qqIndex";
import KWapi from "@/api/kuwo/kwIndex";
import { setInterval, clearInterval } from "timers";
import { mapGetters } from "vuex";
import { shuffle, formatSec } from "@/util/transform";

export default {
  data() {
    return {
      picUrl: "",
      songName: "",
      songArtist: "",
      songID: "",
      api: "",
      duration: "",
      currentTime: "",
      preID: "",
      nextID: "",
      interval: "",
      intervalLyric: "",
      reserveResult: "",
      progress: "",
      distance: "",
      rotate: `rotate({0})`,
      lyric: [],
      lyrics: [],
      startTouches: [],
      endTouches: [],
      purifyResult: [],
      isActive: 0,
      index: 0,
      rotateAngle: 0,
      playStyleNum: 0,
      collectNum: 0,
      isPlayerOrlyrics: true,
      isUpdate: true,
      isShowMusicList: false,
      isFirstTime: false,
      isCollected: Boolean
    };
  },

  computed: {
    ...mapGetters([
      "getIsShow",
      "getIsChangeTitle",
      "getIsPlay",
      "getIsPause",
      "getIsRecoverScrollTop"
    ])
  },

  watch: {
    // 侦测变化 -> 是否展示Player组件 （这一步是点击PlayerGlobal改变vuex状态)
    getIsShow(isChange) {
      // console.log(isChange);

      if (isChange === false) {
        // 获取数据
        this.getData();

        // 清除定时器
        clearInterval(this.interval);
        clearInterval(this.intervalLyric);

        // 恢复旋转角度
        // this.rotateAngle = 0;

        // 音乐转盘
        setTimeout(this.rotating, 300);

        // 获取歌词
        this.getLyrics();

        // 获取音乐图片
        this.getPicUrl();

        // 歌曲当前的长度
        this.updateCurrentTime();
      }
    },

    getIsChangeTitle(isChange) {
      if (isChange === true) {
        this.getData();
        // 清除定时器
        clearInterval(this.interval);
        clearInterval(this.intervalLyric);

        // 音乐转盘
        setTimeout(this.rotating, 300);

        // 获取歌词
        const isFirstTime = true;
        this.$store.commit("setIsFirstTime", isFirstTime);
        this.getLyrics();

        // 获取音乐图片
        this.getPicUrl();

        // 初始化歌词滚动的位置
        this.recoverScrollTop();

        // 歌曲当前的长度
        this.updateCurrentTime();

        // 初始化收藏状态
        this.recoverIsCollect();

        const isChangeTitle = false;
        this.$store.commit("setIsChangeTitle", isChangeTitle);
      }
    },

    getIsPlay(isChange) {
      if (isChange) {
        // 播放
        this.$refs.switchImg.src = require("@/assets/play-white.png");
      }
    },

    getIsPause(isChange) {
      if (isChange) {
        // 暂停
        this.$refs.switchImg.src = require("@/assets/pause-white.png");
      }
    },

    getIsRecoverScrollTop(isChange) {
      if (isChange) {
        this.recoverScrollTop();

        const recoverFalse = false;
        this.$store.commit("setIsRecoverScrollTop", recoverFalse);
      }
    }
  },

  methods: {
    getData() {
      this.picUrl = this.$store.getters.getPicUrl;
      this.songName = this.$store.getters.getSongName;
      this.songArtist = this.$store.getters.getSongArtist;
      this.songID = this.$store.getters.getID;
      this.api = this.$store.getters.getAPI;
      // console.log(this.songID, this.api);

      const duration = this.$store.getters.getDuration;
      this.duration = formatSec(duration);

      const currentTime = this.$store.getters.getCurrentTime;
      this.currentTime = formatSec(currentTime);
    },

    // 获取音乐歌词
    getLyrics() {
      if (this.api === "WY") {
        // 获取网易云音乐歌词
        this.getWYlyric();
      } else if (this.api === "KW") {
        // 获取酷我音乐歌词
        this.getKWlyric();
      } else if (this.api === "QQ") {
        // 获取QQ音乐歌词
        this.getQQlyric();
      }
    },

    // 获取酷我音乐歌词
    getKWlyric() {
      // 检测是否第一次加载歌词
      this.isFirstTime = this.$store.getters.getIsFirstTime;
      // console.log(this.isFirstTime);

      if (this.isFirstTime === true) {
        // 清空数组
        this.lyric = [];
        this.lyrics = [];

        KWapi.getKWlrc(this.songID)
          .then(res => {
            const result = res.data;
            const resultSplit = result.split("\n");
            // console.log(result_split);
            resultSplit.forEach(ele => {
              // console.log(ele);

              const res = ele.split("]");

              const time = res[0].slice(1, 6);
              const lyric = res[1];
              // console.log(res[1]);

              this.lyrics.push({
                time: time,
                lyrics: lyric
              });
            });

            this.lyric.push(this.lyrics);
            // console.log(this.lyric);

            // 不再加载歌词(第一次)
            this.$store.commit("setIsFirstTime", this.isFirstTime);
          })
          .catch(err => {
            console.log(err);
          });
      }

      // 不再加载歌词(重复调用)
      this.isFirstTime = false;
    },

    // 获取网易云音乐歌词
    getWYlyric() {
      // 检测是否第一次加载歌词
      this.isFirstTime = this.$store.getters.getIsFirstTime;
      // console.log(this.isFirstTime);

      if (this.isFirstTime === true) {
        // 清空数组
        this.lyric = [];
        this.lyrics = [];

        // console.log(this.songID);

        api
          .getLrc(this.songID)
          .then(res => {
            const result = res.data.lrc.lyric;
            const resultSplit = result.split("\n");
            // console.log(result_split);
            resultSplit.forEach(ele => {
              // console.log(ele);

              const res = ele.split("]");

              const time = res[0].slice(1, 6);
              const lyric = res[1];
              // console.log(res[1]);

              this.lyrics.push({
                time: time,
                lyrics: lyric
              });
            });

            this.lyric.push(this.lyrics);
            // console.log(this.lyric);

            // 不再加载歌词(第一次)
            this.$store.commit("setIsFirstTime", this.isFirstTime);
          })
          .catch(err => {
            console.log(err);
          });
      }

      // 不再加载歌词(重复调用)
      this.isFirstTime = false;
    },

    // 获取QQ音乐歌词
    getQQlyric() {
      // 检测是否第一次加载歌词
      this.isFirstTime = this.$store.getters.getIsFirstTime;
      // console.log(this.isFirstTime);

      if (this.isFirstTime === true) {
        // 清空数组
        this.lyric = [];
        this.lyrics = [];

        QQapi.getLrc(this.songID)
          .then(res => {
            const result = res.data;
            const resultSplit = result.split("\n");
            // console.log(result_split);
            resultSplit.forEach(ele => {
              // console.log(ele);

              const res = ele.split("]");

              const time = res[0].slice(1, 6);
              const lyric = res[1];
              // console.log(res[1]);

              this.lyrics.push({
                time: time,
                lyrics: lyric
              });
            });

            this.lyric.push(this.lyrics);
            // console.log(this.lyric);

            // 不再加载歌词(第一次)
            this.$store.commit("setIsFirstTime", this.isFirstTime);
          })
          .catch(err => {
            console.log(err);
          });
      }

      // 不再加载歌词(重复调用)
      this.isFirstTime = false;
    },

    // 获取音乐图片
    getPicUrl() {
      if (this.api === "WY") {
        // 获取网易云音乐图片
        this.$refs.playerImg.src = this.picUrl;
        this.$refs.playerBgImg.src = this.picUrl;
      } else if (this.api === "KW") {
        // 获取酷我音乐图片
        this.getKWpicData(this.songID);
      } else if (this.api === "QQ") {
        // 获取QQ音乐图片
        this.$refs.playerImg.src = this.picUrl;
        this.$refs.playerBgImg.src = this.picUrl;
      }
    },

    // 音乐转盘旋转
    rotating() {
      this.interval = setInterval(() => {
        this.rotateAngle += 1;
        this.rotate = `rotate(${this.rotateAngle}deg)`;
      }, 100);
    },

    // 互换 音乐转盘、歌词
    exchange() {
      // 获得isShowMusicList的状态
      const isShowMusicList = this.$store.getters.getIsShowMusicList;

      if (this.isPlayerOrlyrics && !isShowMusicList) {
        this.isPlayerOrlyrics = false;
        const recoverFalse = false;
        this.$store.commit("setIsShowMusicList", recoverFalse);
      } else if (this.isPlayerOrlyrics && isShowMusicList) {
        const recoverFalse = false;
        this.$store.commit("setIsShowMusicList", recoverFalse);
      } else if (!this.isPlayerOrlyrics && isShowMusicList) {
        const recoverFalse = false;
        this.$store.commit("setIsShowMusicList", recoverFalse);
      } else {
        this.isPlayerOrlyrics = true;
        const recoverFalse = false;
        this.$store.commit("setIsShowMusicList", recoverFalse);
      }
    },

    // 更新当前的进度
    updateCurrentTime() {
      this.intervalLyric = setInterval(() => {
        // 当前时间
        const currentTime = this.$store.getters.getCurrentTime;
        // console.log(currentTime);
        this.currentTime = formatSec(currentTime);
        // console.log(this.currentTime);

        // 歌曲总长度
        const duration = this.$store.getters.getDuration;

        // dom总长度
        // let lineLength = window.getComputedStyle(this.$refs.line).width; //只读
        const lineLength = this.$refs.line.offsetWidth;

        // 向下取整
        const TcurrentTime = Math.floor(currentTime);
        const Tduration = Math.floor(duration);
        const TlineLength = Math.floor(lineLength);

        // 当前进度
        this.progress =
          Math.floor((TcurrentTime / Tduration) * TlineLength) + "px";
        // console.log(this.progress);

        // 匹配当前进度的歌词(高亮)
        // console.log(this.$refs.p instanceof Array);

        for (const i of this.$refs.p) {
          if (this.currentTime === i.getAttribute("time")) {
            this.isActive = this.$refs.p.indexOf(i);
            // console.log(this.isActive);

            let needScrollHeight = 0;

            // qq音乐歌词特殊
            if (this.api === "QQ") {
              // 歌词滚动
              if (this.$refs.p.indexOf(i) > 10) {
                const FIRST = 10; // 第11条歌词开始滚动
                const screenHeight = window.screen.height;
                const transMarginTop = screenHeight * 0.065; // 0.065为 6.5vh
                const preScrollHeight = -100; // 前10条歌词的高度

                needScrollHeight =
                  -transMarginTop * (this.$refs.p.indexOf(i) - FIRST) +
                  preScrollHeight;

                this.$refs.scroll.style.top = needScrollHeight + "px";
              }
            } else {
              // 歌词滚动
              if (this.$refs.p.indexOf(i) > 5) {
                const FIRST = 6;
                const screenHeight = window.screen.height;
                const transMarginTop = screenHeight * 0.065;
                const preScrollHeight = -60;

                needScrollHeight =
                  -transMarginTop * (this.$refs.p.indexOf(i) - FIRST) +
                  preScrollHeight;

                this.$refs.scroll.style.top = needScrollHeight + "px";
              }
            }
          }
        }
      }, 1000);
    },

    // 恢复歌词滚动的初始位置
    recoverScrollTop() {
      this.$refs.scroll.style.top = 0 + "px";
    },

    // 点击左箭头返回
    onClickLeft() {
      // 恢复初始化
      this.isPlayerOrlyrics = true;

      // 展示PlayerGlobal
      const isShow = true;
      this.$store.commit("setIsShow", isShow);

      // 关闭musicList
      const recoverFalse = false;
      this.$store.commit("setIsShowMusicList", recoverFalse);
    },

    // 上一首
    preSong() {
      const currentIndex = this.$store.getters.getCurrentIndex;

      // 排除 - 第一首
      if (currentIndex !== 0) {
        const preCurrentIndex = currentIndex - 1;
        const searchResult = this.$store.getters.getSearchResult;

        this.preID = searchResult[preCurrentIndex].id;
        this.$store.commit("setID", this.preID);

        // 更新当前歌曲的索引
        this.$store.commit("setCurrentIndex", preCurrentIndex);

        const songName = searchResult[preCurrentIndex].songName;
        const songArtist = searchResult[preCurrentIndex].artist;
        const picUrl = searchResult[preCurrentIndex].picUrl;
        const isUpdate = true;
        const isChangeTitle = true;
        const song = searchResult[preCurrentIndex];

        if (song.picUrl === "") {
          this.getKWpicData(this.preID);
        }

        // 改变vuex状态
        this.$store.commit("setSongName", songName);
        this.$store.commit("setSongArtist", songArtist);
        this.$store.commit("setPicUrl", picUrl);

        // 更新PlayerGlobal
        this.$store.commit("setIsUpdate", isUpdate);

        // 更新Player Title
        this.$store.commit("setIsChangeTitle", isChangeTitle);
      }
    },

    // 下一首
    nextSong() {
      const currentIndex = this.$store.getters.getCurrentIndex;
      const searchResult = this.$store.getters.getSearchResult;
      const searchResultLength = searchResult.length;

      // 排除 - 最后一首
      if (currentIndex < searchResultLength) {
        const nextCurrentIndex = currentIndex + 1;

        this.nextID = searchResult[nextCurrentIndex].id;
        this.$store.commit("setID", this.nextID);

        // 更新当前歌曲的索引
        this.$store.commit("setCurrentIndex", nextCurrentIndex);

        const songName = searchResult[nextCurrentIndex].songName;
        const songArtist = searchResult[nextCurrentIndex].artist;
        const picUrl = searchResult[nextCurrentIndex].picUrl;
        const isUpdate = true;
        const isChangeTitle = true;
        const song = searchResult[nextCurrentIndex];

        if (song.picUrl === "") {
          this.getKWpicData(this.nextID);
        }

        // 改变vuex状态
        this.$store.commit("setSongName", songName);
        this.$store.commit("setSongArtist", songArtist);
        this.$store.commit("setPicUrl", picUrl);

        // 更新PlayerGlobal
        this.$store.commit("setIsUpdate", isUpdate);

        // 更新Player Title
        this.$store.commit("setIsChangeTitle", isChangeTitle);
      }
    },

    // 播放or暂停
    playOrPause() {
      const isPlayOrPause = this.$store.getters.getIsPlayOrPause;
      // console.log(isPlayOrPause);

      if (isPlayOrPause) {
        // true -> pause
        const pause = false;

        // 请求停止
        this.$store.commit("setIsPlayOrPause", pause);

        // 清除定时器
        clearInterval(this.interval);
      } else {
        // false -> play
        const play = true;

        // 请求播放
        this.$store.commit("setIsPlayOrPause", play);

        // 继续旋转
        this.rotating();
      }
    },

    // 歌单
    musicList() {
      // 展示musicList
      const isShowMusicList = true;
      this.$store.commit("setIsShowMusicList", isShowMusicList);
    },

    // 请求酷我音乐图片
    getKWpicData(ID) {
      KWapi.getKWpic(ID)
        .then(res => {
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then(KWpicData => {
          this.$refs.playerImg.src = KWpicData;
          this.$refs.playerBgImg.src = KWpicData;
        });
    },

    // 播放方式 随机播放、单曲循环、列表播放
    playStyle() {
      this.playStyleNum += 1;

      if (this.playStyleNum > 3) {
        this.playStyleNum = 1;
      }

      if (this.playStyleNum === 1) {
        // 随机 -> 打乱数组
        this.$refs.playStyleImg.src = require("@/assets/random.png");

        // 随机算法
        let searchResult = this.$store.getters.getSearchResult;
        shuffle(searchResult);
        // console.log(searchResult);

        this.$store.commit("setSearchResult", searchResult);
      } else if (this.playStyleNum === 2) {
        // 单曲
        this.$refs.playStyleImg.src = require("@/assets/singlecycle.png");

        // 开始单曲循环
        const isLoop = true;
        this.$store.commit("setIsLoop", isLoop);
      } else if (this.playStyleNum === 3) {
        // 列表
        this.$refs.playStyleImg.src = require("@/assets/loop.png");

        // 恢复原始数组
        const reserveResult = this.$store.getters.getReserveResult;
        // console.log(reserveResult);

        this.$store.commit("setSearchResult", reserveResult);

        // 关闭单曲循环
        const isLoop = false;
        this.$store.commit("setIsLoop", isLoop);
      }
    },

    // 收藏
    isCollect(e) {
      this.isCollected = this.$store.getters.getIsCollect; // true
      if (this.isCollected) {
        this.$refs.collectImg.src = require("@/assets/collect1.png");

        // localSession
        const storage = window.localStorage;
        const data = {
          songName: this.songName,
          artist: this.songArtist,
          id: this.songID,
          picUrl: this.picUrl,
          api: this.api
        };
        const DATA = JSON.stringify(data);
        storage.setItem("song-" + this.songName, DATA);

        // 恢复false
        const recoverFalse = false;
        this.$store.commit("setIsCollect", recoverFalse);

        // 阻止冒泡
        e.stopPropagation(); // 阻止捕获和冒泡阶段中当前事件的进一步传播。
      } else {
        this.$refs.collectImg.src = require("@/assets/collect.png");

        const storage = window.localStorage;
        storage.removeItem("song-" + this.songName);

        // 恢复true
        const recoverTrue = true;
        this.$store.commit("setIsCollect", recoverTrue);

        e.stopPropagation();
      }
    },

    // 恢复不收藏状态
    recoverIsCollect() {
      this.$refs.collectImg.src = require("@/assets/collect.png");
    },

    // 触摸抬手
    touchEnd(e) {
      // 触摸点距离左屏幕宽度的距离
      // let touchEnd = e.changedTouches[0].screenX;
      const touchEnd = e.changedTouches[0].clientX;

      // 歌曲总长度
      const duration = this.$store.getters.getDuration;

      // 总长度
      const lineLength = this.$refs.line.offsetWidth;

      const TtouchEnd = Math.floor(touchEnd);

      const Tduration = Math.floor(duration);
      const TlineLength = Math.floor(lineLength);

      // 进度条距离左屏幕宽度的距离
      const otherLength = this.$refs.progressLine.offsetLeft;
      // console.log(otherLength);

      // style样式
      const leftLength = TtouchEnd - otherLength + "px";
      this.progress = leftLength;

      const currentTime = Math.floor(
        ((TtouchEnd - otherLength) / TlineLength) * Tduration
      );

      // 存取currentTime
      this.$store.commit("setCurrentTimeByTouch", currentTime);

      // 触发更新currentTime
      const isUpdateCurrentTime = true;
      this.$store.commit("setIsUpdateCurrentTime", isUpdateCurrentTime);

      // console.log(currentTime);
    },

    // 触摸移动进度条
    touchMove(e) {
      const touchMove = e.touches[0].clientX;
      const TtouchMove = Math.floor(touchMove);

      // 进度条距离左屏幕宽度的距离
      const otherLength = this.$refs.progressLine.offsetLeft;
      const leftLength = TtouchMove - otherLength + "px";
      this.progress = leftLength;
    }
  }
};
</script>

<style scoped>
.player {
  width: 100vw;
  height: 100vh;
  background: rgb(110, 108, 108);
  z-index: 100;
}

/* 导航 */
.player-nav {
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  /* border: 1px solid red; */
  position: relative;
}

.player-nav-arrow {
  width: 10vw;
  height: 8vh;
  position: relative;
  left: 3vw;
}

.player-nav-arrow img {
  width: 100%;
  height: 100%;
}

.player-nav-song {
  width: 70vw;
  height: 10vh;
  position: relative;
  left: 5vw;
}

.player-song-name {
  color: white;
  font-size: 2.5vh;
  position: absolute;
  top: 1.5vh;
}

.player-song-artist {
  color: rgba(255, 255, 255, 0.589);
  font-size: 2vh;
  position: absolute;
  bottom: 1.5vh;
}

/* 内容 */
.player-content {
  width: 100vw;
  height: 70vh;
  overflow: auto;
  position: relative;
}

.player-tray {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.player-record {
  width: 300px;
  height: 270px;
  background: url("../../../assets/recordx.png") 100% 100% no-repeat;
  background-size: 100% 100%;
  position: fixed;
  top: 20vh;
}

.player-img {
  width: 154px;
  height: 152px;
  border-radius: 50%;
  margin: 54px 0 0 74px;
  /* background: red; */
}

.player-lyric {
  width: 100vw;
  height: 72vh;
  overflow: auto;
}

.player-lyrics-wrap {
  width: 100vw;
  position: relative;
  top: 0;
}

.player-lyrics {
  position: relative;
  width: 100vw;
  text-align: center;
  font-size: 2.5vh;
  color: rgba(184, 179, 179, 0.94);
  margin: 0 0 4vh 0;
}

.active {
  color: white;
}

.user-function {
  width: 70vw;
  height: 8vh;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  position: relative;
  top: 62vh;
}

.user-function-icon {
  width: 8vw;
  height: 5vh;
}

.user-img {
  width: 100%;
  height: 100%;
}

/* 底部 */

.player-footer {
  width: 100vw;
  height: 28vh;
}

/* 进度条 */
.progress {
  /* border: 1px solid red; */
  width: 100vw;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
}

.progress-currentTime {
  font-size: 1vh;
  color: #9b9b9b;
  position: relative;
  left: 5vw;
}

.progress-line {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 65vw;
  height: 4vh;
  position: relative;
}

.line1 {
  width: 65vw;
  height: 1px;
  background: rgb(184, 179, 179);
}

.line2 {
  height: 2px;
  background: white;
  position: absolute;
  left: 0;
}

.circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  position: absolute;
  left: 0;
}

.progress-duration {
  font-size: 1vh;
  color: #9b9b9b;
  position: relative;
  left: -5vw;
}

/* 控制 */
.controls {
  width: 90vw;
  height: 10vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
}

.controls-playStyle {
  width: 12vw;
  height: 8vh;
}

.controls-pre {
  width: 12vw;
  height: 8vh;
}

.controls-switch {
  width: 18vw;
  height: 12vh;
}

.controls-next {
  width: 12vw;
  height: 8vh;
}

.controls-musicList {
  width: 12vw;
  height: 8vh;
}

.controls-img {
  width: 100%;
  height: 100%;
}

.player-bg {
  width: 100vw;
  height: 100vh;
  z-index: -10;
  -webkit-filter: blur(50px);
  filter: blur(50px);
  position: absolute;
  top: 0;
}
</style>

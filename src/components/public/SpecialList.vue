<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 11:12:59
 * @LastEditTime: 2019-09-03 12:19:20
 * @LastEditors: Please set LastEditors
  
 -->
<template>
  <div class="specialList">
    <div class="list-wrap" v-for="(item, index) in purifyResult[0]" :key="index">
      <div
        class="list showContent"
        ref="list"
        :class="{ showFeature: index === featureIndex && isShowFeature }"
      >
        <div class="list-checkbox"></div>
        <div
          class="list-content"
          @touchstart="touchStart"
          @touchend="touchEnd(index)"
          @click="play(item) === isplay"
        >
          <div class="list-content-index">{{ index + 1 }}</div>
          <div class="list-content-info">
            <div class="list-content-songName">{{ item.songName | snippet15 }}</div>
            <div class="list-content-songArtist">{{ item.artist | snippet15 }}</div>
          </div>
        </div>
        <div class="list-feature" @click="delCollect(item)">{{ colOrdel }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import KWapi from "@/api/kuwo/kwIndex";
import touch from "@/util/touch";
import { Dialog } from "vant";
export default {
  data() {
    return {
      colOrdel: "删除",
      startTouches: "",
      endTouches: "",
      isplay: false,
      isShowFeature: true,
      purifyResult: [],
      featureIndex: Number
    };
  },

  created() {
    this.getLocalStorage();
  },

  methods: {
    touchStart() {
      touch.touchStart();
    },

    touchEnd(index) {
      touch.touchEnd();

      const direction = touch.slide("parallel");

      if (direction === "left") {
        if (this.$refs.list[index].classList.length === 1) {
          // 显示 content
          this.$refs.list[index].classList.add("showContent");
          // 手指滑动到了
        } else if (this.$refs.list[index].classList.length === 2) {
          // 显示功能框
          this.featureIndex = index;
          this.isShowFeature = true;
        } else if (this.$refs.list[index].classList.length === 3) {
          this.$refs.list[index].classList.add("showContent");
        }
      } else if (direction === "right") {
        console.log("right");

        if (this.$refs.list[index].classList.length === 1) {
          // 隐藏功能框
          this.isShowFeature = false;
        } else if (this.$refs.list[index].classList.length === 2) {
          // 显示多选框
          this.$refs.list[index].classList.remove("showContent");
        } else if (this.$refs.list[index].classList.length === 3) {
          // 隐藏功能框
          this.isShowFeature = false;
        }
      } else if (direction === "none") {
        this.isplay = true;
      }
    },

    getLocalStorage() {
      // storage是对象
      const storage = window.localStorage;

      const favourite = [];

      for (const key in storage) {
        if (storage.hasOwnProperty(key)) {
          if (key.match("song-")) {
            const jsonObj = JSON.parse(storage[key]);

            const obj = {};

            for (const key in jsonObj) {
              obj[key] = jsonObj[key];
            }

            favourite.push(obj);
          }
        }
      }
      this.purifyResult.push(favourite);

      // 判断是否有收藏音乐
      if (this.purifyResult[0].length > 0) {
        // 显示收藏歌单
        this.isCollect = true;

        this.songLength = this.purifyResult[0].length;

        const picUrl = this.purifyResult[0][0].picUrl;

        if (picUrl !== "") {
          this.coverImg = this.picUrl;
        } else {
          // 获取KW音乐图片
          const id = this.purifyResult[0][0].id;
          this.getKWpicData(id);
        }
      }
    },

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
          this.coverImg = KWpicData;
        });
    },

    play(item) {
      const isUpdate = true;
      const isFirstTime = true;
      const isRecoverScrollTop = true;

      // id
      this.$store.commit("setID", item.id);
      // 图片链接
      this.$store.commit("setPicUrl", item.picUrl);
      // 歌曲名
      this.$store.commit("setSongName", item.songName);
      // 歌曲作者
      this.$store.commit("setSongArtist", item.artist);
      // api来源
      this.$store.commit("setAPI", item.api);
      // 更新数据
      this.$store.commit("setIsUpdate", isUpdate);
      // 首次加载歌词
      this.$store.commit("setIsFirstTime", isFirstTime);

      // 恢复歌词滚动的初始位置
      this.$store.commit("setIsRecoverScrollTop", isRecoverScrollTop);

      // 在musciList中播放歌曲
      if (this.isMusicListDo) {
        const isChangeTitle = true;
        this.$store.commit("setIsChangeTitle", isChangeTitle);
      }

      // 逆解
      const result = JSON.parse(JSON.stringify(this.purifyResult));
      const result1 = result.pop();

      this.$store.commit("setSearchResult", result1);
      // 备份
      const reserveResult = JSON.parse(JSON.stringify(result1));
      this.$store.commit("setReserveResult", reserveResult);
    },

    delCollect(item) {
      const songName = item.songName;
      const key = "song-" + songName;
      Dialog.confirm({
        message: "确定删除吗？"
      }).then(res => {
        localStorage.removeItem(key);
        this.$router.push({ name: "specialList" });
      });
    }
  }
};
</script>

<style scoped>
.specialList {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.list-wrap {
  width: 100vw;
  height: 8vh;
  margin: 0 0 1vh 0;
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
}

.list {
  width: 136vw;
  display: flex;
  position: relative;
}

.showContent {
  transform: translate3d(-17.9vw, 0, 0);
}

.showFeature {
  transform: translate3d(-36vw, 0, 0);
}

.list-checkbox {
  width: 18vw;
  height: 8vh;
  background: green;
}

.list-content {
  width: 100vw;
  height: 8vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
}

.list-feature {
  width: 18vw;
  height: 8vh;
  background: red;
  color: white;
  line-height: 8vh;
  text-align: center;
}

.list-content-index {
  width: 15vw;
  height: 7vh;
  font-size: 2.5vh;
  line-height: 7vh;
  text-align: center;
  color: gray;
}

.list-content-songName {
  color: black;
  font-size: 2.5vh;
  position: absolute;
  top: 1vh;
}

.list-content-songArtist {
  color: gray;
  font-size: 1.8vh;
  position: absolute;
  bottom: 1vh;
}
</style>

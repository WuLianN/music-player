<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 13:25:26
 * @LastEditTime: 2019-09-11 17:23:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="case-wrap">
    <div class="case">
      <div v-for="(item, index) in songList" :key="index" @click="play(item)">
        <img class="case-img" :src="item.coverImgUrl" alt />
        <div class="case-info-songName">{{ item.songName }}</div>
        <div class="case-info-artist">{{ item.artist }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songList: []
    };
  },

  props: {
    data: Array
  },

  created() {
    this.songList = this.data.slice(0, 3);
  },

  methods: {
    play(item) {
      if (item.playStyle === "song") {
        const isUpdate = true;
        const isFirstTime = true;
        const isRecoverScrollTop = true;

        // id
        this.$store.commit("setID", item.id);
        // 图片链接
        this.$store.commit("setPicUrl", item.coverImgUrl);
        // 歌曲名
        this.$store.commit("setSongName", item.name);
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
      } else if (item.playStyle === "album") {
        
        this.$store.commit("setSongList", item);
        this.$router.push({
          name: "songListDetail",
          params: {
            home: "home",
            leftTitle: "专辑"
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.case-wrap {
  width: 100vw;
  height: 28vh;
}

.case {
  width: 100vw;
  height: 28vh;
  display: flex;
  flex-flow: row nowrap;
}

.case-img {
  width: 30vw;
  height: 18vh;
  border-radius: 5%;
  margin: 1vh 0 1vh 2.5vw;
}

.case-info-songName {
  width: 30vw;
  font-size: 2vh;
  margin: 0 0 0 2.5vw;
  text-indent: 1vw;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.case-info-artist {
  width: 30vw;
  font-size: 1.5vh;
  color: gray;
  margin: 0.5vh 0 0 2.5vw;
  text-indent: 1vw;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
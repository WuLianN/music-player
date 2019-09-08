<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-08 20:05:10
 * @LastEditTime: 2019-09-08 21:20:00
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="cd">
    <Header :leftTitle="leftTitle" :where="home" class="header" />

    <div class="main-individuality-wrap">
      <div class="main-individuality">
        <div
          class="main-individuality-info"
          @click="goSongListDetail(item)"
          v-for="(item, index) in cd"
          :key="index"
        >
          <img class="main-individuality-img" :src="item.coverImgUrl" alt />

          <div class="main-individuality-songName">{{ item.name }}</div>
          <div class="main-individuality-artist">{{ item.artist }}</div>
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
  </div>
</template>

<script>
import Header from "@/components/public/Header";
export default {
  data() {
    return {
      leftTitle: "更多新碟",
      home: "home",
      cd: [],
      scroll: null,
      isLoadingMore: false
    };
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      this.cd = this.$store.getters.getNewCD;
    },

    goSongListDetail(item) {
      this.$store.commit("setSongList", item);

      this.$router.push({
        name: "songListDetail",
        params: { CD: "newCD", leftTitle: "专辑" }
      });
    }
  },

  components: {
    Header
  }
};
</script>

<style scoped>
.cd {
  width: 100vw;
  height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 7vh;
  z-index: 100;
  background: white;
}

.main-individuality-wrap {
  margin: 7vh 0 0 0;
  width: 100vw;
  height: 76vh;
}

.main-individuality {
  width: 100vw;
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}

.main-individuality-info {
  width: 35vw;
  height: 25vh;
  margin: 0.5vh 0;
  position: relative;
}

.main-individuality-img {
  width: 35vw;
  height: 18vh;
  border-radius: 5%;
}

.main-individuality-songName {
  width: 35vw;
  height: 3vh;
  font-size: 2.1vh;
  color: black;
  font-weight: 530;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.main-individuality-artist {
  width: 35vw;
  height: 3vh;
  font-size: 1.5vh;
  color: gray;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.loading {
  width: 100vw;
  height: 5vh;
  text-align: center;
  position: absolute;
  top: 77vh;
}
</style>
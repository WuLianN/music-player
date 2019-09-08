<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-08 20:05:42
 * @LastEditTime: 2019-09-08 21:54:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="songs">
    <Header :leftTitle="leftTitle" :where="home" />

    <div class="tabs">
      <van-tabs v-model="active" title-active-color="red" @click="onClick">
        <van-tab title="推荐">
          
        </van-tab>
        <van-tab title="华语"></van-tab>
        <van-tab title="欧美"></van-tab>
        <van-tab title="韩国"></van-tab>
        <van-tab title="日本"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Header from "@/components/public/Header";
import {
  newSongCat1,
  newSongCat2,
  newSongCat3,
  newSongCat4
} from "@/api/config/newSongs";
export default {
  data() {
    return {
      leftTitle: "最新音乐",
      home: "home",
      songs: [],
      active: 0
    };
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      this.songs = this.$store.getters.getNewSongs;
      console.log(this.songs);
    },

    onClick() {}
  },

  components: {
    Header
  }
};
</script>

<style scoped>
.songs {
  width: 100vw;
  height: 100vh;
}

.tabs {
  width: 100vw;
  height: 7vh;
  font-size: 2vh;
}
</style>
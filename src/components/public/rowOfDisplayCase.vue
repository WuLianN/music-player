<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 13:25:26
 * @LastEditTime: 2019-09-07 21:06:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="case-wrap">
    <div class="case">
      <div v-for="(item, index) in songList" :key="index">
        <img class="case-img" :src="item.coverImgUrl" alt />
        <div class="case-info-songName">{{ item.name }}</div>
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
}

.case-info-artist {
  font-size: 1.5vh;
  color: gray;
  margin: 0.5vh 0 0 2.5vw;
  text-indent: 1vw;
}
</style>
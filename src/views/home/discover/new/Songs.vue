<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-08 20:05:42
 * @LastEditTime: 2019-09-11 17:58:31
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="songs">
    <Header :leftTitle="leftTitle" :where="home" class="header" />

    <div class="tabs">
      <van-tabs v-model="active" title-active-color="red" @click="onClick">
        <van-tab title="推荐">
          <SongList :title="cat0" />
        </van-tab>
        <van-tab title="华语">
          <SongList :title="cat1" />
        </van-tab>
        <van-tab title="欧美">
          <SongList :title="cat2" />
        </van-tab>
        <van-tab title="韩国">
          <SongList :title="cat3" />
        </van-tab>
        <van-tab title="日本">
          <SongList :title="cat4" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import SongList from '@/components/home/discover/new/SongList'

export default {
  data () {
    return {
      leftTitle: '最新音乐',
      home: 'home',
      cat0: '推荐',
      cat1: '华语',
      cat2: '欧美',
      cat3: '韩国',
      cat4: '日本',
      active: 0
    }
  },

  created () {
    this.getData()
  },

  methods: {
    getData () {},

    onClick () {}
  },

  components: {
    Header,
    SongList
  }
}
</script>

<style scoped>
.songs {
  width: 100vw;
  height: 100vh;
}

.header {
  width: 100vw;
  height: 7vh;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  background: white;
}

.tabs {
  width: 100vw;
  height: 7vh;
  font-size: 2vh;
  background: white;
  z-index: 200;
}
</style>

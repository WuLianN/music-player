<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 13:11:38
 * @LastEditTime: 2019-08-19 10:46:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="songList">
    <Header :leftTitle="leftTitle" :where="home" />
    <div class="tab">
      <van-tabs v-model="active" swipeable title-active-color="red" @click="onClick">
        <van-tab :title="cat1">
          <Recomment />
        </van-tab>
        <van-tab :title="cat2">
          <SongListCat :category="cat2" />
        </van-tab>
        <van-tab :title="cat3">
          <Boutique />
        </van-tab>
        <van-tab :title="cat4">
          <SongListCat :category="cat4" />
        </van-tab>
        <van-tab :title="cat5">
          <SongListCat :category="cat5" />
        </van-tab>
        <van-tab :title="cat6">
          <SongListCat :category="cat6" />
        </van-tab>
        <van-tab :title="cat7">
          <SongListCat :category="cat7" />
        </van-tab>
        <van-tab :title="cat8">
          <SongListCat :category="cat8" />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import Recomment from '@/components/home/discover/songList/Recomment'
import Boutique from '@/components/home/discover/songList/Boutique'
import { mapGetters } from 'vuex'
import SongListCat from '@/components/home/discover/songList/SongListCat'
import {
  songListCat1,
  songListCat2,
  songListCat3,
  songListCat4,
  songListCat5,
  songListCat6,
  songListCat7,
  songListCat8
} from '@/api/config/songList'

export default {
  data () {
    return {
      leftTitle: '歌单广场',
      home: 'home',
      active: 0,
      purifyResult: [],
      cat1: songListCat1,
      cat2: songListCat2,
      cat3: songListCat3,
      cat4: songListCat4,
      cat5: songListCat5,
      cat6: songListCat6,
      cat7: songListCat7,
      cat8: songListCat8
    }
  },

  components: {
    Header,
    SongListCat,
    Recomment,
    Boutique
  },

  created () {
    if (this.$route.params.active) {
      this.active = this.$route.params.active
    }
  },

  methods: {
    onClick (name) {
      this.$store.commit('setActive', name)
    }
  }
}
</script>

<style scoped>
.songList {
  width: 100vw;
  height: 100vh;
}

.tab {
  width: 100vw;
  height: 7vh;
  font-size: 3vh;
}
</style>

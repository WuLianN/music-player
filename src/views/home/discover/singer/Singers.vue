<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 13:11:38
 * @LastEditTime: 2019-08-26 11:59:06
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="songers">
    <div class="header">
      <Header :leftTitle="leftTitle" :where="home" />
      <van-icon name="search" size="30" class="header-search" @click="goSearch" />
    </div>

    <div class="list">
      <SingerRankList />
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import SingerRankList from './SingerRankList'
export default {
  data () {
    return {
      leftTitle: '歌手',
      home: 'home'
    }
  },

  components: {
    Header,
    SingerRankList
  },

  methods: {
    goSearch () {
      this.$router.push({ name: 'search', query: { category: 'song' } })
    }
  }
}
</script>

<style scoped>
.songers {
  width: 100vw;
  height: 100vh;
}

.header {
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-flow: row nowrap;
}

.header-search {
  position: relative;
  top: 1.2vh;
  left: -5vw;
}

.searchSinger {
  width: 100vw;
  height: 7vh;
  margin: 0 auto;
}

.list {
  width: 100vw;
  height: 83vh;
}
</style>

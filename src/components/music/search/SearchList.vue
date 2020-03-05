<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 12:45:40
 * @LastEditTime: 2019-09-11 17:33:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="search-list">
    <div v-for="(item, index) in results[0]" :key="index" @click="play(item)" class="search-result">
      <div class="search-result-index">{{ index + 1 }}</div>
      <div class="search-info">
        <div class="search-songName">{{ item.songName | snippet15 }}</div>
        <div class="search-songArtist">{{ item.artist | snippet15 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchList',
  data () {
    return {
      results: this.purifyResult
    }
  },

  props: {
    purifyResult: Array,
    isMusicListDo: Boolean
  },

  methods: {
    play (item) {
      const isUpdate = true
      const isFirstTime = true
      const isRecoverScrollTop = true

      // id
      this.$store.commit('setID', item.id)
      // 图片链接
      this.$store.commit('setPicUrl', item.picUrl)
      // 歌曲名
      this.$store.commit('setSongName', item.songName)
      // 歌曲作者
      this.$store.commit('setSongArtist', item.artist)
      // api来源
      this.$store.commit('setAPI', item.api)
      // 更新数据
      this.$store.commit('setIsUpdate', isUpdate)
      // 首次加载歌词
      this.$store.commit('setIsFirstTime', isFirstTime)

      // 恢复歌词滚动的初始位置
      this.$store.commit('setIsRecoverScrollTop', isRecoverScrollTop)

      // 在musciList中播放歌曲
      if (this.isMusicListDo) {
        const isChangeTitle = true
        this.$store.commit('setIsChangeTitle', isChangeTitle)
      }

      // 存在lrc -> qq音乐
      if (item.lrc) {
        this.$store.commit('setLrc', item.lrc)
      }

      // 逆解
      const result = JSON.parse(JSON.stringify(this.purifyResult))
      const result1 = result.pop()

      this.$store.commit('setSearchResult', result1)
      // 备份
      const reserveResult = JSON.parse(JSON.stringify(result1))
      this.$store.commit('setReserveResult', reserveResult)
    }
  }
}
</script>

<style scoped>
.search-list {
  width: 100vw;
  height: 80vh;
  overflow: scroll;
}

.search-result {
  width: 90vw;
  height: 8vh;
  /* border: 1px solid red; */
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
}

.search-result-index {
  width: 10vw;
  height: 7vh;
  font-size: 2.5vh;
  line-height: 7vh;
  text-align: center;
  color: gray;
  text-indent: -5vw;
}

.search-songName {
  color: black;
  font-size: 2.5vh;
  position: absolute;
  top: 1vh;
}

.search-songArtist {
  color: gray;
  font-size: 1.8vh;
  position: absolute;
  bottom: 1vh;
}
</style>

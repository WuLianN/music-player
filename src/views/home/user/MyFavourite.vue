<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 13:11:38
 * @LastEditTime: 2019-08-26 11:59:13
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="favourite">
    <Header :leftTitle="leftTitle" :where="user" />

    <SearchList :purifyResult="purifyResult" />
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import SearchList from '@/components/music/search/SearchList'
export default {
  data () {
    return {
      leftTitle: '我喜欢',
      user: 'user',
      purifyResult: []
    }
  },

  components: {
    Header,
    SearchList
  },

  created () {
    this.purifyResult = this.$route.params.purifyResult
  }

}
</script>

<style scoped>
</style>

<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-01 14:45:41
 * @LastEditTime: 2019-09-05 13:23:29
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="songs">
    <SearchList :purifyResult="purifyResult" />
  </div>
</template>

<script>
import api from '@/api/index'
import SearchList from '../../../music/search/SearchList'
export default {
  data () {
    return {
      purify: [],
      purifyResult: []
    }
  },

  components: {
    SearchList
  },

  created () {
    this.getWYsongs()
  },

  methods: {
    // 歌单
    getWYsongs () {
      const artist = this.$store.getters.getWYartist
      const artistID = artist.artistID
      api.getSingerSongList(artistID).then(res => {
        const result = res.data.hotSongs

        const obj = {}
        const purifyData = result.reduce((cur, next) => {
          obj[next.al.name] ? '' : (obj[next.al.name] = true && cur.push(next))
          return cur
        }, [])

        // console.log(purifyData);

        purifyData.forEach(item => {
          let artists = ''
          item.ar.forEach(item => {
            artists += item.name + '&'
          })
          const purifyArtist = artists.slice(0, artists.length - 1)

          this.purify.push({
            songName: item.name,
            id: item.id,
            picUrl: item.al.picUrl,
            artist: purifyArtist,
            api: 'WY'
          })
        })

        // console.log(this.purify);

        // 配合searchList
        this.purifyResult.push(this.purify)
      })
    }
  }
}
</script>

<style scoped>
</style>

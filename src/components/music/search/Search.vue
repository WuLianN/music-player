<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-01 14:37:08
 * @LastEditTime: 2019-09-06 13:27:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="search">
    <div class="search-nav">
      <div class="search-arrow" @click="onClickLeft">
        <img src="@/assets/arrow-left-gray.png" alt />
      </div>

      <div class="search-form">
        <form action="/">
          <van-search
            v-model="value"
            :placeholder="placeholder"
            show-action
            shape="round"
            @search="onSearch"
          >
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
        </form>
      </div>
    </div>

    <SearchList :purifyResult="purifyResult" v-if="hackReset" />
  </div>
</template>

<script>
import api from "@/api/index";
import { searchCat1 } from "@/api/config/search/search";
import KWapi from "@/api/kuwo/kwIndex";
import SearchList from "@/components/music/search/SearchList";
export default {
  data() {
    return {
      value: "",
      purifyResult: [],
      hackReset: false, // 第一次result是空的
      isChange: false
    };
  },

  components: {
    SearchList
  },

  props: {
    type: Number,
    placeholder: String
  },

  methods: {
    onSearch() {
      if (this.type === 1) {
        if (this.isChange === false) {
          // const result = []
          // const r1 = []
          // const r2 = []

          // 执行多个并发请求
          //   this.$axios.all([this.getKWapi(), this.getWYapi()]).then(
          //     this.$axios.spread((KW, WY) => {
          //       // console.log(KW.data.data);

          //       result.push(KW.data.data)
          //       result.push(WY.data.data.songs)

          //       // 酷我
          //       for (let i = 0; i < result[0].length; i++) {
          //         const coarseID = result[0][i].MUSICRID
          //         const simplifiedID = coarseID.slice(6)

          //         r1.push({
          //           songName: result[0][i].SONGNAME,
          //           id: simplifiedID,
          //           artist: result[0][i].ARTIST,
          //           picUrl: '',
          //           api: 'KW'
          //         })
          //       }

          //       // 网易云
          //       for (let i = 0; i < result[1].length; i++) {
          //         r2.push({
          //           songName: result[1][i].name,
          //           id: result[1][i].id,
          //           artist: result[1][i].ar[0].name,
          //           picUrl: result[1][i].al.picUrl,
          //           api: 'WY'
          //         })
          //       }

          //       // 合并两个数组
          //       const r3 = r1.concat(r2)

          //       // 数组中的对象去重
          //       const obj = {}
          //       const r4 = r3.reduce((cur, next) => {
          //         obj[next.songName]
          //           ? ''
          //           : (obj[next.songName] = true && cur.push(next))
          //         return cur
          //       }, [])

          //       this.purifyResult.push(r4)
          //       this.hackReset = true
          //       this.isChange = true
          //     })
          //   )
          // } else {
          //   const result = []
          //   const r1 = []
          //   const r2 = []

          //   // 清空数组
          //   const PURIFYRESULT_LENGTH = this.purifyResult.length
          //   this.purifyResult.splice(0, PURIFYRESULT_LENGTH)

          //   this.$axios.all([this.getKWapi(), this.getWYapi()]).then(
          //     this.$axios.spread((KW, WY) => {
          //       result.push(KW.data.data)
          //       result.push(WY.data.data.songs)

          //       // 酷我
          //       for (let i = 0; i < result[0].length; i++) {
          //         const coarseID = result[0][i].MUSICRID
          //         const simplifiedID = coarseID.slice(6)

          //         r1.push({
          //           songName: result[0][i].SONGNAME,
          //           id: simplifiedID,
          //           artist: result[0][i].ARTIST,
          //           picUrl: '',
          //           api: 'KW'
          //         })
          //       }

          //       // 网易云
          //       for (let i = 0; i < result[1].length; i++) {
          //         r2.push({
          //           songName: result[1][i].name,
          //           id: result[1][i].id,
          //           artist: result[1][i].ar[0].name,
          //           picUrl: result[1][i].al.picUrl,
          //           api: 'WY'
          //         })
          //       }

          //       // 合并两个数组
          //       const r3 = r1.concat(r2)

          //       const obj = {}

          //       const r4 = r3.reduce((cur, next) => {
          //         obj[next.songName]
          //           ? ''
          //           : (obj[next.songName] = true && cur.push(next))
          //         return cur
          //       }, [])

          //       this.purifyResult.push(r4)
          //     })
          //   )

          this.getWYapi().then(res => {
            const result = res.data.result.songs;
            const tempArr = [];
            result.forEach(item => {
              tempArr.push({
                songName: item.name,
                id: item.id,
                artist: item.artists[0].name,
                picUrl: item.artists[0].img1v1Url,
                api: "WY"
              });
            });

            this.purifyResult.push(tempArr);

            this.hackReset = true;
            this.isChange = true;
          });
        }
      }
    },

    getWYapi() {
      return api.getSearch(this.value, this.type, 20);
    },

    getKWapi() {
      return KWapi.getKWsearch(this.value, this.type, 40);
    },

    onClickLeft() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped>
.search {
  width: 100vw;
  height: 7vh;
}

.search-nav {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.search-arrow {
  width: 10vw;
  height: 7vh;
  position: relative;
  left: 3vw;
  top: 0.5vh;
}

.search-arrow img {
  width: 100%;
  height: 100%;
}

.search-form {
  width: 90vw;
  height: 7vh;
}
</style>

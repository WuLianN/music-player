<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 16:00:46
 * @LastEditTime: 2019-09-23 22:06:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="songList">
    <div class="footer">
      <img :src="image" class="songList-img" alt />

      <div class="footer-list">
        <SearchList :purifyResult="purifyResult" />
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import {
  newSongsCat1, // 华语
  newSongsCat2, // 日本
  newSongsCat3, // 韩国
  newSongsCat4 // 欧美
} from "@/api/config/newSongs.js";
import SearchList from "@/components/music/search/SearchList";
import { clearArray } from "@/util/transform";

export default {
  data() {
    return {
      image: "",
      purifyResult: []
    };
  },

  props: {
    title: String
  },

  created() {
    this.getData();
  },

  components: {
    SearchList
  },

  methods: {
    getData() {
      if (this.title === "推荐") {
        // 更换图片
        this.image = require("@/assets/newSongs/recomment.jpg");

        // 清空purifyResult
        clearArray(this.purifyResult);

        // 获取音乐歌单
        this.purifyResult.push(this.$store.getters.getNewSongs);
      } else if (this.title === "华语") {
        this.image = require("@/assets/newSongs/mandarin.jpg");

        clearArray(this.purifyResult)
        this.getSongList(newSongsCat1);
      } else if (this.title === "欧美") {
        this.image = require("@/assets/newSongs/western.jpg");

        clearArray(this.purifyResult);
        this.getSongList(newSongsCat2);
      } else if (this.title === "韩国") {
        this.image = require("@/assets/newSongs/korean.jpg");

        clearArray(this.purifyResult);
        this.getSongList(newSongsCat3);
      } else if (this.title === "日本") {
        this.image = require("@/assets/newSongs/japanese.jpg");

        clearArray(this.purifyResult);
        this.getSongList(newSongsCat4);
      }
    },

    getSongList(type) {
      api.getTopSong(type).then(res => {
        const result = res.data.data;
        const newSong = [];

        result.forEach(item => {
          newSong.push({
            id: item.id,
            songName: item.name,
            picUrl: item.album.blurPicUrl,
            artist: item.artists[0].name,
            api: "WY"
          });
        });

        this.purifyResult.push(newSong);
      });
    }
  }
};
</script>

<style scoped>
.songList {
  width: 100vw;
  height: 100vh;
}

.songList-img {
  width: 100vw;
  height: 30vh;
}

.footer {
  width: 100vw;
  height: 76vh;
  overflow: auto;
}

.footer-header-title {
  width: 80vw;
  height: 7vh;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-list {
  width: 100vw;
  background: white;
}
</style>
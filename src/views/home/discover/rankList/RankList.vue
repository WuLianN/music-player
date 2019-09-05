<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 13:11:38
 * @LastEditTime: 2019-09-05 15:46:36
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="rankList-wrap">
    <Header :leftTitle="leftTitle" :where="home" />

    <div class="rankList">
      <div class="official-title">官方榜</div>
      <div class="official">
        <div
          class="official-type"
          v-for="(item, index) in offcial"
          :key="index"
          @click="goSongListDetail(item)"
        >
          <img :src="item.coverImgUrl" class="official-type-img" alt />
          <div class="official-type-info">
            <div
              class="official-type-title"
              v-for="(i, index) in item.tracks"
              :key="index"
            >{{index + 1}}. {{ i.first }} - {{ i.second}}</div>
          </div>
        </div>
      </div>

      <div class="recomment-title">推荐榜</div>
      <div class="recomment">
        <div
          class="recomment-type"
          v-for="(item, index) in recomment"
          :key="index"
          @click="goSongListDetail(item)"
        >
          <img :src="item.coverImgUrl" class="recomment-type-img" alt />
          <div>{{ item.name }}</div>
        </div>
      </div>

      <div class="recomment-title">全球榜</div>
      <div class="recomment">
        <div
          class="recomment-type"
          v-for="(item, index) in global"
          :key="index"
          @click="goSongListDetail(item)"
        >
          <img :src="item.coverImgUrl" class="recomment-type-img" alt />
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>

    <div class="recomment-title">更多榜单</div>
  </div>
</template>

<script>
import api from "@/api/index";
import Header from "@/components/public/Header";
export default {
  data() {
    return {
      rankListDetail: [],
      offcial: [],
      recomment: [],
      global: [],
      leftTitle: "排行榜",
      home: "home"
    };
  },

  components: {
    Header
  },

  created() {
    // this.getOfficial();
    // this.getRecomment();
    // this.getGlobal();

    this.getRankListDetail();
  },

  methods: {
    onClickLeft() {
      this.$router.push({ name: "home" });
    },

    // 获取"所有榜单内容摘要" 
    getRankListDetail() {
      api.getRankListDetail().then(res => {
        const result = res.data.list;
        result.forEach(item => {
          this.rankListDetail.push({
            updateFrequency: item.updateFrequency,
            coverImgUrl: item.coverImgUrl,
            id: item.id,
            tracks: item.tracks,
            description: item.description,
            type: "songList",
            api: "WY",

          });
        });

        // 获取 “官方榜” 歌单
        this.offcial = this.rankListDetail.slice(0,4)
      });
    },

    // 获取 “推荐榜” 歌单
    getRecomment() {
      this.$axios
        .all([
          getSongList.getYOLOsongs(),
          getSongList.getRap(),
          getSongList.getElectronica(),
          getSongList.getACGsongs(),
          getSongList.getEnglishNewSongs(),
          getSongList.getTikToKSongs()
        ])
        .then(
          this.$axios.spread(
            (YOLO, rap, electronica, ACG, englishSongs, TikTok) => {
              const result = [];
              result.push(YOLO.data.data.playlists[0]);
              result.push(rap.data.data.playlists[0]);
              result.push(electronica.data.data.playlists[0]);
              result.push(ACG.data.data.playlists[0]);
              result.push(englishSongs.data.data.playlists[0]);
              result.push(TikTok.data.data.playlists[0]);

              result.forEach(item => {
                this.recomment.push({
                  coverImgUrl: item.coverImgUrl,
                  playCount: item.playCount,
                  trackCount: item.trackCount,
                  id: item.id,
                  nickname: item.creator.nickname,
                  description: item.description,
                  name: item.name,
                  avatarUrl: require("../../../../assets/home/neteaseLogo.png"),
                  shareCount: "分享",
                  commentCount: "评论",
                  type: "songList"
                });
              });

              // console.log(result);
            }
          )
        );
    },

    // 获取 “全球榜” 歌单
    getGlobal() {
      this.$axios
        .all([
          getSongList.getBillboard(),
          getSongList.getUK(),
          getSongList.getBeatport(),
          getSongList.getOricon(),
          getSongList.getiTunes(),
          getSongList.getQboard()
        ])
        .then(
          this.$axios.spread(
            (Billboard, UK, Beatport, Oricon, iTunes, Qboard) => {
              const result = [];
              result.push(Billboard.data.data.playlists[0]);
              result.push(UK.data.data.playlists[0]);
              result.push(Beatport.data.data.playlists[0]);
              result.push(Oricon.data.data.playlists[0]);
              result.push(iTunes.data.data.playlists[0]);
              result.push(Qboard.data.data.playlists[0]);

              result.forEach(item => {
                this.global.push({
                  coverImgUrl: item.coverImgUrl,
                  playCount: item.playCount,
                  trackCount: item.trackCount,
                  id: item.id,
                  nickname: item.creator.nickname,
                  description: item.description,
                  name: item.name,
                  avatarUrl: item.coverImgUrl,
                  shareCount: "分享",
                  commentCount: "评论",
                  type: "songList"
                });
              });

              // console.log(result);
            }
          )
        );
    },

    goSongListDetail(item) {
      this.$store.commit("setSongList", item);
      this.$router.push({
        name: "songListDetail",
        params: { rankList: "rankList" }
      });
    }
  }
};
</script>

<style scoped>
.rankList-wrap {
  width: 100vw;
  height: 100vh;
}

.rankList-nav {
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.rankList-arrow {
  width: 10vw;
  height: 7vh;
  position: relative;
  left: 3vw;
}

.rankList-arrow img {
  width: 100%;
  height: 100%;
}

.rankList {
  width: 100vw;
  height: 83vh;
  overflow: auto;
}

.rankList-official {
  width: 90vw;
  height: 3vh;
  font-size: 2.5vh;
  font-weight: bold;
  margin: 1vh 0 2.5vh 6vw;
}

.official-title {
  font-size: 2.5vh;
  width: 80vw;
  height: 7vh;
  margin: 0 0 0 6vw;
  line-height: 7vh;
  font-weight: bold;
}

.official-type {
  width: 90vw;
  height: 18vh;
  margin: 0 auto 2vh auto;
  display: flex;
  flex-flow: row nowrap;
}

.official-type-img {
  width: 30vw;
  height: 18vh;
  border-radius: 10%;
}

.official-type-info {
  width: 56vw;
  height: 18vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  margin: 0 0 0 3vw;
}

.official-type-title {
  width: 56vw;
  font-size: 2.2vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recomment-title {
  width: 90vw;
  height: 3vh;
  font-size: 2.5vh;
  font-weight: bold;
  margin: 4vh 0 2.5vh 6vw;
}

.recomment {
  width: 90vw;
  height: 45vh;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.recomment-type {
  width: 28vw;
  height: 18vh;
  font-size: 1.8vh;
}

.recomment-type-img {
  width: 28vw;
  height: 15vh;
  border-radius: 10%;
}
</style>

<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-02 13:11:38
 * @LastEditTime: 2019-10-12 19:55:41
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

      <div class="recomment-title">更多榜单</div>
      <div class="recomment">
        <div
          class="recomment-type"
          v-for="(item, index) in more"
          :key="index"
          @click="goSongListDetail(item)"
        >
          <img :src="item.coverImgUrl" class="recomment-type-img" alt />
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
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
      more: [],
      leftTitle: "排行榜",
      home: "home"
    };
  },

  components: {
    Header
  },

  created() {
    this.getRankListDetail();
    this.getTopList();
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
            api: "WY"
          });
        });

        // 获取 “官方榜” 歌单
        this.offcial = this.rankListDetail.slice(0, 4);
      });
    },

    // 获取“所有榜单”
    getTopList() {
      api.getTopList().then(res => {
        const result = res.data.list;
        let list = [];

        // 云音乐类型
        let cloudMusicList = [];
        // 抖音排行榜
        let TikTok = [];
        // 全球榜
        let globalList = [];
        // 更多榜单
        let moreList = [];

        result.forEach(item => {
          if (item.name.match("云音乐")) {
            cloudMusicList.push(item);
          } else {
            list.push(item.name);

            if (item.name.match("抖音排行榜")) {
              TikTok.push(item);
            } else if (item.name.match("美国Billboard周榜")) {
              globalList.push(item);
            } else if (item.name.match("UK排行榜周榜")) {
              globalList.push(item);
            } else if (item.name.match("Beatport全球电子舞曲榜")) {
              globalList.push(item);
            } else if (item.name.match("日本Oricon周榜")) {
              globalList.push(item);
            } else if (item.name.match("iTunes榜")) {
              globalList.push(item);
            } else if (item.name.match("英国Q杂志中文版周榜")) {
              globalList.push(item);
            } else {
              if (!item.name.match("网易原创歌曲榜")) {
                moreList.push(item);
              }
            }
          }
        });

        // 推荐榜中的 4种类型榜单
        let temp1 = cloudMusicList.slice(3, 7);
        // 云音乐欧美新歌榜
        let temp2 = cloudMusicList.slice(10, 11);

        let recommentList = [...temp1, ...temp2, ...TikTok];
        recommentList.forEach(item => {
          this.recomment.push({
            updateFrequency: item.updateFrequency,
            coverImgUrl: item.coverImgUrl,
            id: item.id,
            tracks: item.tracks,
            description: item.description,
            name: item.name,
            playCount: item.playCount,
            type: "songList",
            api: "WY"
          });
        });

        globalList.forEach(item => {
          this.global.push({
            updateFrequency: item.updateFrequency,
            coverImgUrl: item.coverImgUrl,
            id: item.id,
            tracks: item.tracks,
            description: item.description,
            name: item.name,
            playCount: item.playCount,
            type: "songList",
            api: "WY"
          });
        });

        moreList.forEach(item => {
          this.more.push({
            updateFrequency: item.updateFrequency,
            coverImgUrl: item.coverImgUrl,
            id: item.id,
            tracks: item.tracks,
            description: item.description,
            name: item.name,
            playCount: item.playCount,
            type: "songList",
            api: "WY"
          });
        });
      });
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

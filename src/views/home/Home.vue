<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 14:11:55
 * @LastEditTime: 2019-08-28 00:17:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="home">
    <div class="userInfo-wrap" v-if="isUserInfo">
      <div class="userInfo">
        <Login @goUser="goUser"  />
      </div>
      <div class="userInfo-mask" @click="recoverHome"></div>
    </div>
    <div>
      <div class="nav-bar">
        <img class="nav-content" @click="showUserInfo" src="@/assets/home/content.png" alt />
        <div class="nav-tab">
          <span @touchstart="goUser">
            <router-link
              ref="x"
              :to="{ name: 'user' }"
              class="router-link"
              :class="{ active: index === 0  ? true: false }"
              :style="{ 'color': index === 0  ? 'black': 'gray'  }"
            >我的</router-link>
          </span>
          <span @touchstart="goDiscover">
            <router-link
              :to="{ name: 'discover'}"
              class="router-link"
              :class="{ active: index === 1  ? true: false }"
              :style="{ 'color': index === 1  ? 'black': 'gray'  }"
            >发现</router-link>
          </span>
          <span @touchstart="goFriends">
            <router-link
              :to="{ name: 'friends'}"
              class="router-link"
              :class="{ active: index === 2  ? true: false }"
              :style="{ 'color': index === 2  ? 'black': 'gray'  }"
            >云村</router-link>
          </span>
          <span @touchstart="goVlog">
            <router-link
              :to="{ name: 'vlog'}"
              class="router-link"
              :class="{ active: index === 3  ? true: false }"
              :style="{ 'color': index === 3  ? 'black': 'gray'  }"
            >视频</router-link>
          </span>
        </div>
        <van-icon name="search" size="25" @click="goSearch" />
      </div>

      <div class="router-view">
        <keep-alive>
         <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { searchCat1 } from '@/api/config/search/search'
import { mapGetters } from 'vuex'
import Login from '@/components/home/user/Login'
export default {
  data () {
    return {
      index: 1,
      isUserInfo: false
    }
  },

  created () {
    // 路由是否传来索引
    if (this.$route.params.index === 0) {
      this.getIndex()
    }
  },

  computed: {
    ...mapGetters(['getIsShowUserInfo'])
  },

  watch: {
    getIsShowUserInfo (isChange) {
      if (isChange) {
        this.isUserInfo = true
      } else {
        this.isUserInfo = false
      }
    }
  },

  components: {
    Login
  },

  methods: {
    showUserInfo () {
      const isShowUserInfo = true
      this.$store.commit('setIsShowUserInfo', isShowUserInfo)
    },

    recoverHome () {
      const isShowUserInfo = false
      this.$store.commit('setIsShowUserInfo', isShowUserInfo)
    },

    goSearch () {
      // this.$router.push({ name: "search", params: { category: "song" } });  //http://localhost:8080/Search
      this.$router.push({ name: 'search', query: { category: searchCat1 } }) // http://localhost:8080/Search?category=song
    },

    goUser () {
      this.index = 0
    },

    goDiscover () {
      this.index = 1
    },

    goFriends () {
      this.index = 2
    },

    goVlog () {
      this.index = 3
    },

    // 获取路由传过来的索引
    getIndex () {
      this.index = this.$route.params.index
    }
  }
}
</script>

<style scoped>
.active {
  font-weight: bold;
}

.home {
  width: 100vw;
  height: 8vh;
}

.userInfo-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: row nowrap;
  z-index: 200;
  position: absolute;
  top: 0;
  left: 0;
}

.userInfo {
  width: 80vw;
  height: 100vh;
  background: white;
}

.userInfo-mask {
  width: 20vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.534);
}

.nav-bar {
  width: 100vw;
  height: 8vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
}

.nav-content {
  width: 10vw;
  height: 5.5vh;
}

.nav-tab {
  width: 65vw;
  height: 8vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  font-size: 2.5vh;
  color: gray;
}

.router-link {
  color: gray;
}

.router-view {
  width: 100vw;
  height: 80vh;
}
</style>

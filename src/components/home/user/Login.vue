<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 10:29:31
 * @LastEditTime: 2019-09-23 21:41:56
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login-wrap">
    <div class="netease">
      <div class="login" v-if="!isLogin">
        <img class="login-logo" src="@/assets/home/neteaseLogo.png" alt />
        <span class="login-title">网易云用户ID</span>
        <input class="login-input" type="text" required v-model="uid" placeholder="userId" />
        <button class="login-btn" @click="getUserInfo">登录</button>
      </div>

      <div class="user" v-else>
        <img class="user-img" :src="userImg" alt />
        <div class="user-name">{{ nickname }}</div>
      </div>
    </div>

    <div class="qq" v-if="!isqqLogin">
      <div class="login">
        <img class="qq-logo" src="@/assets/home/qqmusicLogo.png" alt />
        <span class="qq-title">QQ音乐用户ID</span>
        <input class="qq-input" type="text" required v-model="uin" placeholder="hosteuin" />
        <button class="qq-btn" @click="getQQuserInfo">登录</button>
      </div>
    </div>

    <div :class="{ qquser: isLogin, qqUSER: !isLogin}" v-else>
      <img
        :class="{ qqUserimg: isLogin, qqUserIMG: !isLogin  }"
        src="@/assets/home/qqmusicLogo.png"
        alt
      />
      <div class="qqUser-name">{{ hostname }}</div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import QQapi from '@/api/qq/qqIndex'
import cookie from '@/util/cookie'
export default {
  data () {
    return {
      uid: '',
      uin: '',
      isLogin: false,
      isqqLogin: false,
      userInfo: [],
      qqUserInfo: [],
      userImg: '',
      nickname: '',
      hostname: ''
    }
  },

  created () {
    this.checkUserInfo()
    this.checkqqUserInfo()
  },

  methods: {
    getUserInfo (index) {
      const uid = this.uid
      api.getUsetSongList(uid).then(res => {
        this.isLogin = false

        const result = res.data.playlist

        result.forEach((item, index) => {
          if (index === 0) {
            this.userInfo = {
              nickname: item.creator.nickname,
              avatarUrl: item.creator.avatarUrl,
              userId: item.creator.userId,
              backgroundUrl: item.creator.backgroundUrl,
              birthday: item.creator.birthday,
              detailDescription: item.creator.detailDescription,
              city: item.creator.city,
              province: item.creator.province
            }
          }
        })

        // 登录成功 关闭登录页面
        this.isLogin = true

        this.userImg = this.userInfo.avatarUrl

        const cookieValue = JSON.stringify(this.userInfo)

        // console.log(cookieValue);

        // 设置cookie
        cookie.setCookie('userId', cookieValue, 365)

        // 隐藏login页面
        const recoverFalse = false
        this.$store.commit('setIsShowUserInfo', recoverFalse)
        if (this.$route.name === 'user') {
          this.$router.go(0)
          this.$emit('goUser')
        } else {
          this.$router.push({ name: 'user' })
          this.$emit('goUser')
        }
      })
    },

    checkUserInfo () {
      const existCookie = cookie.checkCookie('userId')
      // console.log(existCookie);

      if (existCookie) {
        this.isLogin = true
        const cookieInfo = cookie.getCookie('userId')
        // console.log(cookieInfo);

        const transCookieInfo = JSON.parse(cookieInfo)
        // console.log(transCookieInfo);

        this.userImg = transCookieInfo.avatarUrl
        this.nickname = transCookieInfo.nickname
      } else {
        this.isLogin = false
      }
    },

    getQQuserInfo () {
      const uid = this.uin

      QQapi.getUserSongList(uid).then(res => {
        // console.log(res.data.data)

        this.isqqLogin = true

        const cookieValue = JSON.stringify(uid)

        // 设置cookie
        cookie.setCookie('qqUserId', cookieValue, 365)

        // 隐藏login页面
        const recoverFalse = false
        this.$store.commit('setIsShowUserInfo', recoverFalse)

        if (this.$route.name === 'user') {
          this.$router.go(0)
          this.$emit('goUser')
        } else {
          this.$router.push({ name: 'user' })
          this.$emit('goUser')
        }
      })
    },

    checkqqUserInfo () {
      const existCookie = cookie.checkCookie('qqUserId')
      // console.log(existCookie);

      if (existCookie) {
        this.isqqLogin = true
        const cookieInfo = cookie.getCookie('qqUserId')

        const transCookieInfo = JSON.parse(cookieInfo)

        this.hostname = transCookieInfo
      } else {
        this.isqqLogin = false
      }
    }
  }
}
</script>

<style scoped>
.login-wrap {
  width: 100vw;
  height: 100vh;
}

.netease {
  width: 80vw;
  height: 40vh;
  background: rgba(128, 128, 128, 0.11);
}

.login {
  width: 80vw;
  height: 40vh;
  background: rgba(128, 128, 128, 0.11);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: space-around;
}

.login-logo {
  width: 20vw;
  height: 10vh;
}

.login-title {
  font-size: 3vh;
  font-weight: bold;
}

.login-input {
  width: 50vw;
  height: 4vh;
  text-indent: 1vw;
  border: 1px solid rgb(204, 18, 27);
}

.login-input::placeholder {
  text-align: center;
  font-size: 2.5vh;
}

.login-btn {
  width: 25%;
  height: 13%;
  color: white;
  background: rgba(255, 0, 0, 0.842);
  font-weight: bold;
  border-radius: 26%/50%;
  border-radius: 30px;
  border: none;
}

.user {
  width: 40vw;
  height: 30vh;
}

.user-img {
  width: 23vw;
  height: 13vh;
  border-radius: 50%;
  margin: 5vh 0 0 5vw;
}

.user-name {
  width: 25vw;
  height: 3vh;
  margin: 1vh 0 0 6vw;
  font-weight: bold;
  font-size: 2.6vh;
}

.qq {
  width: 80vw;
  height: 40vh;
  background: rgba(128, 128, 128, 0.11);
  margin: 2vh 0 0 0;
}

.qq-logo {
  width: 20vw;
  height: 10vh;
}

.qq-title {
  font-size: 3vh;
  font-weight: bold;
}

.qq-input {
  width: 50vw;
  height: 4vh;
  text-indent: 1vw;
  border: 1px solid rgb(18, 204, 95);
}

.qq-input::placeholder {
  text-align: center;
  font-size: 2.5vh;
}

.qq-btn {
  width: 25%;
  height: 13%;
  color: white;
  background: rgb(3, 143, 38);
  font-weight: bold;
  border-radius: 26%/50%;
  border: none;
}

.qquser {
  position: absolute;
  top: 0;
  left: 40vw;
  width: 40vw;
  height: 30vh;
}

.qqUSER {
  position: relative;
  width: 40vw;
  height: 30vh;
}

.qqUserimg {
  width: 23vw;
  height: 13vh;
  border-radius: 50%;
  margin: 5vh 0 0 5vw;
}

.qqUserIMG {
  width: 23vw;
  height: 13vh;
  border-radius: 50%;
  margin: 5vh 0 0 5vw;
}

.qqUser-name {
  width: 20vw;
  height: 3vh;
  margin: 1vh 0 0 6vw;
  font-weight: bold;
  font-size: 2.6vh;
  text-align: center;
}
</style>

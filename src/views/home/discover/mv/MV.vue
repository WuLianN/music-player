<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 15:47:30
 * @LastEditTime: 2019-08-27 00:06:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="mvTop">
    <div class="mvTop-nav">
      <div class="mvTop-nav-arrow" @click="onClickLeft">
        <img src="@/assets/arrow-left-gray.png" alt />
      </div>

      <div class="rankTitle">MV排行榜</div>
    </div>

    <div class="mvTop-content">
      <div v-for="(item, index) in purifyResult" :key="index" class="mvTop-detail">
        <img :src="item.mvCover" @click="play(item)" />
        <div class="mvTop-info">
          <div class="mvTop-info-index">{{ index + 1 }}</div>
          <div>
            <div class="mvTop-info-mvName">{{ item.mvName | snippet15 }}</div>
            <div class="mvTop-info-artistName">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
export default {
  data () {
    return {
      purifyResult: []
    }
  },

  created () {
    api.getMVtop().then(res => {
      this.topMV = res.data.data
      this.topMV.forEach(item => {
        this.purifyResult.push({
          mvID: item.id,
          mvName: item.name,
          artistName: item.artistName,
          mvCover: item.cover
        })
      })

      // console.log(this.purifyResult);
    })
  },

  methods: {
    onClickLeft () {
      this.$router.push({ name: 'home' })
    },

    play (item) {
      const mvID = item.mvID

      this.$store.commit('setmvID', mvID)

      this.$router.push({ name: 'mvPlayer', params: { title: item.mvName } })
    }
  }
}
</script>

<style scoped>
.mvTop {
  width: 100vw;
  height: 100vh;
}

.mvTop-nav {
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  /* border: 1px solid red; */
  position: relative;
}

.mvTop-nav-arrow {
  width: 10vw;
  height: 7vh;
  position: relative;
  left: 3vw;
}

.mvTop-nav-arrow img {
  width: 100%;
  height: 100%;
}

.rankTitle {
  width: 30vw;
  height: 7vh;
  line-height: 7vh;
  margin: 0 0 0 5vw;
  font-weight: bold;
  font-size: 3vh;
}

.mvTop-content {
  width: 100vw;
  height: 83vh;
  overflow: auto;
}

.mvTop-detail {
  width: 90vw;
  height: 38vh;
  margin: 0 auto;
}

.mvTop-detail img {
  width: 90vw;
  height: 28vh;
  border-radius: 5%;
}

.mvTop-info {
  width: 90vw;
  height: 7vh;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0.5vh 0;
}

.mvTop-info-index {
  width: 10vw;
  height: 7vh;
  color: red;
  font-size: 3.5vh;
  font-weight: bold;
  line-height: 7vh;
}

.mvTop-info-mvName {
  font-size: 2.5vh;
  font-weight: bold;
  margin: 0 0 0.2vh 0;
}

.mvTop-info-artistName {
  font-size: 1.9vh;
}
</style>

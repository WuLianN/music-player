/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 10:41:09
 * @LastEditTime: 2019-09-03 12:16:21
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const SpecialList = () => import('./components/public/SpecialList')

// 主页
const Home = () => import('./views/home/Home')

// User
const User = () => import('./components/home/tab/User')
const MyFavourite = () => import('./views/home/user/MyFavourite')

// 发现
const Discover = () => import('./components/home/tab/Discover')

// 云村
const Friends = () => import('./components/home/tab/Friends')

// 视频
const Vlog = () => import('./components/home/tab/Vlog')

// 歌单
const SongList = () => import('./views/home/discover/songList/SongList')
const SongListDetail = () => import('./views/home/discover/songList/SongListDetail')
const SongListComment = () => import('./components/home/discover/songList/SongListComment')

// 排行榜
const RankList = () => import('./views/home/discover/rankList/RankList')

// 歌手
const Singers = () => import('./views/home/discover/singer/Singers')
const SingerInfo = () => import('./views/home/discover/singer/SingerInfo')
const Songs = () => import('./components/home/discover/singer/Songs')
const Albums = () => import('./components/home/discover/singer/Albums')
const Videos = () => import('./components/home/discover/singer/Videos')
const Artist = () => import('./components/home/discover/singer/Artist')

// MV
const MV = () => import('./views/home/discover/mv/MV')
const MVplayer = () => import('./views/home/discover/mv/MVplayer')

// 搜索
const Search = () => import('./views/home/search/Search')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '*', redirect: '/' },

    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/discover',
      children: [
        {
          path: '/user',
          name: 'user',
          component: User
        },

        {
          path: '/discover',
          name: 'discover',
          component: Discover
        },

        {
          path: '/frieds',
          name: 'friends',
          component: Friends
        },

        {
          path: '/vlog',
          name: 'vlog',
          component: Vlog
        }
      ]
    },

    {
      path: '/search',
      name: 'search',
      component: Search
    },

    {
      path: '/rankList',
      name: 'rankList',
      component: RankList
    },

    // 歌单
    {
      path: '/songList',
      name: 'songList',
      component: SongList
    },

    {
      path: '/songListDetail',
      name: 'songListDetail',
      component: SongListDetail
    },

    {
      path: '/songListComment',
      name: 'songListComment',
      component: SongListComment
    },

    // 排行榜

    {
      path: '/singers',
      name: 'singers',
      component: Singers
    },

    {
      path: '/myFavourite',
      name: 'myFavourite',
      component: MyFavourite
    },

    // 歌手
    {
      path: '/singerInfo',
      name: 'singerInfo',
      component: SingerInfo,
      redirect: '/singerInfo/songs',
      children: [
        {
          path: '/singerInfo/songs',
          name: 'songs',
          component: Songs
        },

        {
          path: '/singerInfo/albums',
          name: 'albums',
          component: Albums
        },

        {
          path: '/singerInfo/videos',
          name: 'videos',
          component: Videos
        },

        {
          path: '/singerInfo/artist',
          name: 'artist',
          component: Artist
        }
      ]
    },

    // MV

    {
      path: '/mv',
      name: 'mv',
      component: MV
    },

    {
      path: '/mvPlayer',
      name: 'mvPlayer',
      component: MVplayer
    },

    {
      path: '/specialList',
      name: 'specialList',
      component: SpecialList
    }

  ]
})

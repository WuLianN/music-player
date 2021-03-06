<!--
 * @Description: In User Settings Edit
 * @Author: WuLianN
 * @Date: 2019-07-22 12:44:21
 * @LastEditTime: 2019-10-04 18:37:08
 * @LastEditors: Please set LastEditors
 -->
![](https://github.com/WuLianN/music-player/blob/master/src/assets/logo/cover.png)


<div align=center>

:musical_note: **双核音乐播放器(移动端)**

</div>       

<div align=center>

*网易云的歌单 + 腾讯系的音乐(没api了)*

</div>


<div align=center >
  <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg">
  <img src="https://img.shields.io/badge/vant-2.1.1-brightgreen.svg">
</div>


<br>

 :loudspeaker: ~~**本项目长期维护，有bug提交issues**~~

          
<br>

<br>

## display

![](https://github.com/WuLianN/music-player/blob/master/src/assets/display/discover.png)
![](https://github.com/WuLianN/music-player/blob/master/src/assets/display/songList.png)
![](https://github.com/WuLianN/music-player/blob/master/src/assets/display/mv.png)
![](https://github.com/WuLianN/music-player/blob/master/src/assets/display/rankList.png)
![](https://github.com/WuLianN/music-player/blob/master/src/assets/display/player.png)
![](https://github.com/WuLianN/music-player/blob/master/src/assets/display/lyrics.png)

<br>


## 技术栈
* [vue](https://cn.vuejs.org/index.html)
* [vue-router](https://router.vuejs.org/zh/)
* [vuex](https://vuex.vuejs.org/zh/)
* [vue-cli](https://cli.vuejs.org/zh/)
* [vant](https://youzan.github.io/vant/#/zh-CN/intro)
* [axios](http://www.axios-js.com/zh-cn/docs/)
* [better-scroll](https://ustbhuangyi.github.io/better-scroll/#/)
* [lodash](https://www.lodashjs.com/docs/latest)

<br>


## :eyes: 功能
1. 网易云音乐的歌单、腾讯系的音乐
2. 网易云用户歌单、QQ音乐用户歌单 (分享歌单，获得userid/hosteuin，登录一次，可用一年)
3. 本地收藏功能 


<br>

##  :heart: 感谢
* 感谢[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)提供api
* 感谢帮助我解惑的各位大佬


<br>

 :warning: **注意**

 :raised_hand: 本项目为仅作为技术研究和项目开发练习，非商业用途 
 
 :u7981: 不允许引用本项目进行商业用途，否则自行承担法律责任

<br>


## :key: 项目数据来源 :point_down:

:warning: 运行[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)获得api

### 开启node服务器 

```
cd NeteaseCloudMusicApi 

npm install (下载依赖)

node app (开启node服务)
```
<br>

### :key: 运行项目
```
npm install

npm run serve
```

<br>


## :mask: 坑
```
  better-scroll 无论是chrome，还是firefox，在移动端模式下，无法滚动，需刷新一下，方可滚动；pc模式正常滚动。
```


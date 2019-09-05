<!--
 * @Description: In User Settings Edit
 * @Author: WuLianN
 * @Date: 2019-07-22 12:44:21
 * @LastEditTime: 2019-09-05 16:56:56
 * @LastEditors: Please set LastEditors
 -->
![](https://github.com/WuLianN/music-player/blob/master/src/assets/logo/cover.png)


<div align=center>

:musical_note: **双核音乐播放器(移动端)(继续中。。。)**

</div>       

<div align=center>

*网易云的歌单 + 腾讯系的音乐*

</div>


<div align=center >
  <img src="https://img.shields.io/badge/vue-2.6.10-brightgreen.svg">
  <img src="https://img.shields.io/badge/vant-2.1.1-brightgreen.svg">
</div>




<br>

 :loudspeaker: **本项目长期维护，有bug提交issues**

 :loudspeaker: **基于老项目 更换api 升级改造中。。。**

 :eyes: [老项目 -- 还能复活吗?](https://github.com/messoer/dual-core-player)
 
<br>


 :baby_chick:   :point_right:   :water_buffalo: 
 
 
<br>

## :movie_camera: demo 演示


<br>

<!-- :point_right: ~~[在线演示](https://messoer.github.io/dual-core-player/dist/#/discover)~~ -->

<br>

*最佳演示浏览器*
* :100: chrome 
* firefox



<br>

  
##  :heart: 感谢
* 感谢[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)提供api
* 感谢帮助我解惑的各位大佬



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

 :warning: **注意**

 :raised_hand: 本项目为仅作为技术研究和项目开发练习，非商业用途 
 
 :u7981: 不允许引用本项目进行商业用途，否则自行承担法律责任

<br>


## :key: 项目数据来源 :point_down:

:warning: 运行[Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)获得api

<br>

## :key: Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```


<br>


## :mask: 坑
```
  better-scroll 无论是chrome，还是firefox，在移动端模式下，无法滚动，需刷新一下，方可滚动；pc模式正常滚动。

```

## :pencil: js
```
  根据数组中的对象的属性值去重 [{}, {}, {}]

  合并两个数组
   const r3 = r1.concat(r2)

   const obj = {}

   const r4 = r3.reduce((cur, next) => {
      obj[next.songName]
         ? ''
         : (obj[next.songName] = true && cur.push(next))
       return cur
   }, [])
   
```

```
  获取xxx元素距离左边的距离

  window.getComputedStyle(this.$refs.xxx).left);
  this.$refs.xxx.offsetLeft();

```
## :pencil: vue
```
v-for 遍历绑定动态class和ref 但获得的是集合
<div
  :class="'main-swipe-div'+index"
  :ref="'div'+index"
  v-for="(item, index) in swipeResult"
  :key="index"
>
  <img class="main-swipe-img" :src="item.coverImgUrl" alt />
  <span class="main-swipe-playCount">{{ item.playCount | snippetNum }}</span>
  <div class="main-swipe-title-wrap">
     <div class="main-swipe-title">{{ item.name | snippet15 }}</div>
  </div>
</div>

```

```
路由刷新

1、 this.$router.go(0) vue-router
2、 location.reload()  js
```


## :pencil: CSS
```
div中单行文字超出显示省略号

overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;
```

```
div中的图片居中(方法之一) -> 设置到div

display: table-cell;
vertical-align: middle;
text-align: center;
```

```
取消浏览器默认的滚动条

 * {
    /* 兼容firefox */
    scrollbar-width: none;
    /* 兼容IE */
    -ms-overflow-style: none;
  }

  /* 兼容chrome */
  *::-webkit-scrollbar {
    display: none;
  }

```  

```
z-index 相关问题

谷歌浏览器在设置position:fixed;后会触发元素创建一个新的层叠上下文，并且当成一个整体在父层叠上下文中进行比较。
如上面的dom结构，当给b设置了position:fixed;属性后，会触发创建一个新的层叠上下文，它的父层叠上下文变成了a，
所以b只能在a的内部进行层叠比较。这也就是大家熟听的“从父原则”。

  解决方案是给父级元素设置z-index，一般设置为0就可以了。

1. z-index只有在设置了position为relative,absolute,fixed时才会有效。
2. z-index的“从父原则”。当你发现把z-index设的多大都没用时，看看其父元素是否设置了有效的z-index，
当然别忘了先看看自身是否设置了position。
```
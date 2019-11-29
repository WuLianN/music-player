<!--
 * @Description: In User Settings Edit
 * @Author: WuLianN
 * @Date: 2019-07-22 12:44:21
 * @LastEditTime: 2019-10-04 18:37:08
 * @LastEditors: Please set LastEditors
 -->
![](https://github.com/WuLianN/music-player/blob/master/src/assets/logo/cover.png)


<div align=center>

:musical_note: **双核音乐播放器(移动端)(继续中。。。)**

</div>       

<div align=center>

*网易云的歌单 + 腾讯系的音乐(没api了)*

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


  **浅拷贝**
  * 概念
  ```
  创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，
  拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，
  所以如果其中一个对象改变了这个地址，就会影响到另一个对象
  ```


  **深拷贝**
  * 概念
  ```
  将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象
  ```
  
  * 乞丐版
  ```
  JSON.parse(JSON.stringify(target))
  ```

  * 面试版
  ``` 
  function clone(target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
  }
 ```

```
  获取xxx元素距离左边的距离

  window.getComputedStyle(this.$refs.xxx).left);
  this.$refs.xxx.offsetLeft();

```
## :pencil: vue
```
Vue包装了数个数组操作函数，使用这些方法操作的数组去，其数据变动时会被vue监测： 

    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()
    vue2.0还增加个方法可以观测Vue.set(items, indexOfItem, newValue)
    filter(), concat(), slice() 。这些不会改变原始数组，但总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组

Vue 不能检测以下变动的数组： 

    ① 当你利用索引直接设置一个项时，vm.items[indexOfItem] = newValue
    ② 当你修改数组的长度时，例如： vm.items.length = newLength
```


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
border-radius百分比设置原理
场景：长方形左右圆角 本项目的logi使用此方法（放弃了vw、vh -换算麻烦，使用百分比）
width: 25%;
height: 13%;
border-radius: 26%/50%; 注： ”/” 前面的一个值 -> 椭圆的水平半径,后面的值 -> 椭圆的垂直半径

公式
当宽度 > 高度时

水平：( (1/2*高度) / 宽度 ) * 100%
垂直：( (1/2*高度) / 高度) * 100% 即为50%
```


```
div中单行文字超出显示省略号

overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;
```

```
div中的图片居中 
法一 -> 设置到div
display: table-cell;
vertical-align: middle;
text-align: center;

法二 -> 设置到img
display: block;
margin: 0 auto;

法三 -> flex布局
justify-content: center; 水平居中
align-items: center; 垂直居中
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

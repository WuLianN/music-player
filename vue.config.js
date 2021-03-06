/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-22 12:44:21
 * @LastEditTime: 2019-09-03 16:55:44
 * @LastEditors: Please set LastEditors
 */
module.exports = {
  // 部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  /* 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
     注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  */
  outputDir: 'dist',

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: '',

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',

  // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,

  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,

  devServer: {
    open: true,
    host: 'localhost',
    // host: '192.168.0.102',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域

      '/itooi': {
        target: 'https://v1.itooi.cn',
        secure: false, // 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/itooi': ''
        }
      },

      '/Netease': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/Netease': ''
        }
      }
    },
    before: app => { }
  }
}

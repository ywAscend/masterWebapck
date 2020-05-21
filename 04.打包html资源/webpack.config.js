/**
 *  laoder: 1.下载  2.使用（配置loader）
 *  plugins:1.下载  2.引用  3.使用
 */

const Path = require('path')

//引入html-webpack-plugin 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bulit.js',
    path: Path.resolve(__dirname,'build')
  },
  module:{
    rules:[
      //loader的配置

    ]
  },
  plugins:[
    //pligins的配置
    //html-webpack-plugin
    //功能：默认会创建一个空的 HTML，自动引入打包输出所有资源（JS/CSS）
    // 需求： 需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html',并自动引入打包输出的所有资源 （JS/CSS）
      template: './src/index.html'
    })

  ],
  mode: 'development'
    
  
}
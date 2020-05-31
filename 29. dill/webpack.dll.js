/*
  使用dill技术，对某些库（第三方库: jqyuery、react、vue...）进行单独打包

  当运行webpack时，默认查找webpack.config.js文件
  需求：需要运行webpack.dill.js文件
  --> webpack --config webpack.dll.js
  
 */

 const Path = require('path')
 const webpack = require('webpack')

module.exports = {
  entry: {
    //最终打包生成的[name] --> jquery
    // ['jquery'] --> 要打包的库是jquery
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: Path.resolve(__dirname,'dll'),
    library:'[name]_[hash:10]'  //打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins:[
    new webpack.DllPlugin({
      //打包生成一个manifest.json --> 提供和jquery映射关系
      name: '[name]_[hash]', //映射库的暴露的内容名称
      path: Path.resolve(__dirname,'dll/manifest.json') //输出的名称
    })
  ],
  mode: 'production'
}
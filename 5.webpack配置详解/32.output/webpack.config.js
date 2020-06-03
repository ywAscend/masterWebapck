const Path = require('path')
const { CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: './src/index.js',
  output:{
    //文件名称（指定名称+目录）
    filename: 'js/[name].js',
    //输出文件目录 （将来所有资源输出的公共目录）
    path: Path.resolve(__dirname, 'build'),
    //所有输出资源引入公共路径的前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js', //非入口chunk的名称  通过import()导入或者 node_modules optimization配置
    //library: '[name]', //整个库向外暴露的变量名  通常结合dll使用
    //libraryTarget: 'window', // 变量名添加到哪个上 browser
    //libraryTarget: 'global' // 变量名添加到哪个上 node
    libraryTarget: 'commonjs' //  commonjs、amd
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  mode: 'development'
}
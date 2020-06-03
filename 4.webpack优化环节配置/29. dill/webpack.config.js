

const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack')
//将某个文件打包输出去，并在html中自动引入该资源
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

/**
 *
  dll: 动态连接库，类似externals，会指示webpack哪些库是不参与打包的
  不同的是 dill会对某些库进行单独的打包，将多个库打包成一个chunk
  正常情况下，node_modules中的模块会打包成一个chunk
  但是当有很多第三方库的时候，全打包成一个文件，这样打的包体积就会太大
  所以通过dill技术，可以将这些库单独拆开来，打包成不同的chunk，更加有利于性能优化

  

 */
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bulit.js',
    path: Path.resolve(__dirname,'build')
  },
  plugins:[
    
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    //告诉webpack哪些库不参与打包，同时使用时名称也得变
    new webpack.DllReferencePlugin({
      manifest: Path.resolve(__dirname,'dll/manifest.json')
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: Path.resolve(__dirname,'dll/jquery.js')
    })

  ],
  mode: 'production'
    
  
}
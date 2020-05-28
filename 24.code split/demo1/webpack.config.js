const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

process.env.NODE_ENV = 'prodution'


module.exports = {
  //单入口
  //entry: './src/js/index.js'
    entry: {
      //多入口：有一个入口，最终输出就有一个bundle
      index:'./src/js/index.js',
      test: './src/js/test.js',
    },
    output:{
      // [name]: 文件名
        filename:'js/[name].[contenthash:10].js',
        path: Path.resolve(__dirname,'build')
    },
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            minify:{ //压缩html
                collapseWhitespace:true, //移除空格
                removeComments: true  //移除注释
            }
        })
    ],
    devtool:'source-map',
    devServer:{
        contentBase: 'build',
        compress:true,
        port:3000,
        open:true,
        hot:true  //开启热加载
    }

}
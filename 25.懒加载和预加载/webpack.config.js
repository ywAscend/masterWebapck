const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

process.env.NODE_ENV = 'prodution'


module.exports = {
    //单入口
    entry: './src/js/index.js',
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
    /**
     * 1.可以将 node_modules中代码单独打包一个chunk最终输出
     * 2.自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
     */
    optimization:{
      splitChunks: {
        chunks: 'all'
      }
    },

    devtool:'source-map',
    devServer:{
        contentBase: 'build',
        compress:true,
        port:3000,
        open:true,
        hot:true  //开启热加载
    }

}
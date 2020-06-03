const Path = require('path')
const { CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * entry: 入口起点
 * 1.string --> './src/index.js'
 *    单入口
 *    打包形成一个chunk。 输出一个bundle文件。
 *    此时chunk的名称默认是 main
 * 
 * 2.array --> ['./src/index.js','./src/add.js']
 *    多入口
 *    所有入口文件最终只会形成一个chunk,输出出去只有一个bundle文件
 *    --> 只有在 HMR功能中让html热更新生效~
 * 
 * 3.object
 *    多入口
 *    有个入口文件就形成几个chunk,输出几个bundle
 *    此时chunk的名称是key
 *    
 *    --> 特殊用法
 *        {
 *          //所有入口文件最终只会形成一个chunk,输出出去只有一个bundle文件
 *          index: ['./src/index.js','./src/add.js'],
 *          // 形成一个chunk,输出一个bundle文件
 *          add: './src/add.js'
 *        }
 * 
 */


module.exports = {
  //entry: './src/index.js',
  //entry:['./src/index.js','./src/add.js'],
  entry:{
    index: ['./src/index.js','./src/add.js'],
    add: './src/add.js'
  },
  output:{
    filename: '[name].js',
    path: Path.resolve(__dirname, 'build')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  mode: 'development'
}
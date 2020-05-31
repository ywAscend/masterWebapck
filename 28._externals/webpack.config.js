
const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


// _externals: 防止将某些包打包到最终输出的bundle中
// 如希望jquery通过cdn引入，则打包的时候不将jquery打包

module.exports = {
  entry: './src/js/index.js',
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
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })

  ],
  mode: 'production',
  externals:{
    // 忽略jquery包打进来
    //忽略库名 --npm包名
    jquery: 'jQuery'
  }
    
  
}


const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output:{
    filename: 'built.js',
    path:Path.resolve(__dirname,'build')
  },
  module:{
    rules:[
      //laoder

      //样式loader
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      //图片loader, url-loader,需要同时安装 file-loader
      {
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options:{
          limit: 8*1024,  //小于8K的图片会被 base64编码
          esModule: false, //关闭es6模块，使用commonjs模块
          name:'[hash:10].[ext]'  //给图片重命名
          
        }
      },
      //html处理图片loader, html-loader
      {
        test:/.html$/,
        use:['html-loader']
      },
      //打包其他资源（除了html/js/css资源以外的资源）
      {
        exclude:/\.(css|js|html|less|png|jpg|gif)$/,
        loader: 'file-loader',
        options:{
          name:'[hash:10].[ext]'
        }
      }
    ]
  },
  plugins:[
    //plugins
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode: 'development'

}
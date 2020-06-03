/**
 * 开发环境配置，能够让代码运行起来
 * webpack 会将打包结果输出去
 * npx webpack-dev-server 只会在内存中编译打包，没有输出
 * 
 */

const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output:{
    filename:'js/built.js',
    path:Path.resolve(__dirname,'build')
  },
  module:{
    rules:[
      //loader的配置
      {
        //处理less资源
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      {
        //处理css资源
        test: /\.css$/,
        use:['style-loader','css-loader']
      },
      { //处理图片资源
        test:/\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options:{
          //小于8K的图片进行base64编码
          limit: 8*1024,
          //关闭es模块，启用commonjs模块
          esModule:false, 
          //取hash值前10位的，原扩展名
          name:'[hash:10].[ext]',
          //输出路径
          outputPath:'imgs'
        }
      },
      {
        //html 图片处理模块
        test: /\.html$/,
        use:['html-loader']
      },
      {
        //处理其他资源，除了 css/js/html
        exclude: /.(css|js|html|less|png|jpg|gif)/,
        loader: 'file-loader',
        options:{
          name:'[hash:10].[ext]',
          outputPath:'media'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',

  //开发服务器配置 安装webpack-dev-server ，启动指令 npx webpack-dev-server
  devServer:{
    //项目运行目录，构建后的目录
    contentBase: Path.resolve(__dirname,'build'),
    //启动 gzip压缩，代码体积更小
    compress: true,
    //端口
    port: 3000,
    //自动打开浏览器
    open: true

  }

}
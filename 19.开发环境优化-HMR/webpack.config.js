/**
 * HMR: hot module replacement 热模块替换 / 模块热替换
 * 作用： 一个模块发生变化，只会重新打包这个一个模块（而不是打包所有模块）
 *      极大提升构建速度
 *  
 *  样式文件： 可以使用HMR功能，因为 style-loader内部实现了HMR功能
 *  js文件： 默认不能使用HMR功能  --> 需要修改js代码，添加支持 HMR功能的代码
 *    注意： HMR功能对js的处理，只能处理非入口js文件的其他文件
 *  html文件：默认不能使用HMR功能，html文件不能热更新了~ (index.html只有一个文件，不需要HMR功能)
 *  解决：修改entry入口，将html文件引入
 * 
 */

const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: ['./src/js/index.js','./src/index.html'],
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
    open: true,
    //开启HMR功能
    hot: true 

  }

}
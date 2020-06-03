const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports={
  entry:'./src/index.js',
  output:{
    filename: 'built.js',
    path:Path.resolve(__dirname,'build')
  },
  module:{
    rules:[
      //样式loader
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },{
        test: /.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      //图片loader
      {
        test:/\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options:{
          limit:8*1024,
          esModule:false,
          name:'[hash:10].[ext]'
        }
      },{ //html处理图片loader, html-loader
        test:/\.html$/,
        loader: 'html-loader'
      },
      {
        exclude:/.(css|js|html|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options:{
          name:'[hash:10].[ext]'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode: 'development',

  //开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器``）
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动 devServer指令为：npx webpack-dev-server
  devServer:{
    //项目构建后的路径
    contentBase: Path.resolve(__dirname,'bulid'), //要运行项目的目录
    //启动gzip 压缩，让代码体积更小，运行更快
    compress: true,
    // 端口号
    port: 3000,
    //自动打开浏览器
    open:true

  }

}
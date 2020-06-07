const Path = require('path')
const { CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: './src/js/index.js',
  output:{
    //文件名称（指定名称+目录）
    filename: 'js/[name].js',
    //输出文件目录 （将来所有资源输出的公共目录）
    path: Path.resolve(__dirname, 'build'),
    //所有输出资源引入公共路径的前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    //publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js', //非入口chunk的名称  通过import()导入或者 node_modules optimization配置
    //library: '[name]', //整个库向外暴露的变量名  通常结合dll使用
    //libraryTarget: 'window', // 变量名添加到哪个上 browser
    //libraryTarget: 'global' // 变量名添加到哪个上 node
    //libraryTarget: 'commonjs' //  commonjs、amd
  },
  module:{
    rules:[
     
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ],
  mode: 'development',
  //解析模块的规则
  resolve: {
    //配置路径模块别名: 优点简写路径，缺点没有提示
    alias:{
      $css: Path.resolve(__dirname,'src/css')
    },
    //配置省略文件路径后缀名
    extensions:['.js','.json','jsx','.css'],
    //告诉webpack解析模块是去找哪个目录
    modules: [Path.resolve(__dirname,'../../node_modules','node_modules')]
  },
  devServer:{
    //运行代码目录
    contentBase: Path.resolve(__dirname,'build'),
    //监视 contentBase目录下的所有文件，一旦文件变化就会reload
    watchOptions: {
      //忽略文件
      ignored: /node_modules/
    },
    watchContentBase: true,
    //启动gzip压缩
    compress: true,
    //端口号
    port: 5000,
    //域名
    host: 'localhost',
    //自动打开浏览器
    open: true,
    //开启HMR功能
    hot: true,
    //不显示启动服务器日志信息
    clientLogLevel: 'none',
    //除了一些基本启动信息以外，其他内容都不要打印
    quit: true,
    //如果出错了，不要全屏提示
    overlay: false,
    //服务器代理 --> 解决开发环境跨域问题
    proxy: {
      //一旦devServer（5000）服务器受到 /api/xxx 的请求，就会把请求转发到另外一个服务器（3000）
      '/api' : {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx  去掉 /api
        pathRewrite: {
          '^api':''
        }
      }
    }


  }
}
const Path = require('path')
const { CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
  output:{
    //文件名称（指定名称+目录）
    filename: 'js/[name].[contenthash:10].js',
    //输出文件目录 （将来所有资源输出的公共目录）
    path: Path.resolve(__dirname, 'build'),
    //所有输出资源引入公共路径的前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    //publicPath: '/',
    chunkFilename: 'js/[name].[contenthash:10]_chunk.js', //非入口chunk的名称  通过import()导入或者 node_modules optimization配置
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
  mode: 'production',
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      // 默认值，可以不写
      // minSize: 30*1024, //分割的chunk最小为30kb
      // maxSize: 0, //最大没有限制
      // minChunks: 1, //要提取的chunk最少被引用1次
      // maxAsyncRequests: 5 , //按需加载时并行加载的文件的最大数量，如果超过数量就不会打包成单独的chunk
      // maxInitialRequests: 3 , //入口js文件最大并行请求数量
      // automaticNameDelimiter: '~' , //名称连接符
      // name: true, //可以使用命名规则
      // cacheGroups: { //分割chunk的组,有几组就分割成几个chunk
      //   //node_modules文件会被打包到 vendors组中的chunk中。 --> vendors~xxx.js
      //   //满足上面的公共规则，如：大小超过30kb,至少被引用一次
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     //优先级
      //     priority: -10, 
      //     default: {
      //       //要提取的chunk最少被引用2次
      //       minChunks: 2 ,
      //       priority: -20,
      //       //如果当前要打包的模块，和之前已经被提取的模块，就会复用，而不是重新打包模块
      //       reuseExistingChunk: true,
      //     }
      //   }

      // }

    },
    //将当前模块的记录其他模块的hash值单独的打包为一个文件 runtime
    //解决： 修改a文件导致b文件的contenthash变化
    runtimeChunk:{
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      //配置生产环境的压缩方案： js和css
      // webpack 4.2以上用 terser压缩，不再使用uglify
      new TerserWebpackPlugin({
        //开启缓存
        cache: true,
        parallel: true, //开启多进程打包
        sourceMap: true , //启动source-map
        

      })
    ]


  }
}
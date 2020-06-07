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
  }
}
/**
 * 
 * webpack.config.js webpack配置文件
 * 作用： 指示 webpack 干哪些活 （当你运行webpack指令时，会加载里面的配置）
 * 
 * 所有构建工具都是基于nodejs平台运行的，模块化默认采用common.js
 * commonjs 通过module.exports = {} 去暴露对象 
 * 
 */
  
  const Path = require('path')

 module.exports = {
  //webpack配置

  //入口起点，指示webpack从哪个文件开始打包
  entry:'./src/index.js',
  
  //输出
  output:{
    //输出文件名
    filename: 'built.js',
    //输出路径,一般使用绝对路径，引入nodejs path模块

    //__dirname nodejs 的变量，代表当前文件的目录绝对路径
    path: Path.resolve(__dirname,'build')
  },

  //loader 配置

  module:{
    rules:[
      //详细loader配置
      {
        //匹配哪些文件
        test:/\.css$/,
        //使用哪些loader
        use:[
          //use数组中loader执行顺序： 从右到左，从下到上，依次执行
          //创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          //将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          //将less文件编译成css文件
          //需要下载 less less-loader
          'less-loader'
        ]
      }

    ]
  },

  //plugins的配置
  plugins: [
    //详细plugins的配置
  ],

  //模式
  mode: 'development'
  //mode: 'production'


 }

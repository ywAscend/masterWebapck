
//引入环境路径
const Path = require('path')

//引入 html-webpack-pluign 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output:{
    filename: 'built.js',
    path: Path.resolve(__dirname,'build')
  },
  module:{
    rules:[
      //loader配置
      {
        test: /\.less$/,
        // 要使用多个loader处理用use
        use:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      //处理图片资源
      //问题： 默认处理不了html中的img图片
      {
        test:/\.(jpg|png|gif)$/,
        //使用一个loader 可直接写 loader
        // 下载 url-loader file-loader
        loader:'url-loader',
        options: {  //图片loader 配置项 options
          // 图片大小小于8kb，就会被base64处理
          //优点： 减少请求数量（减轻服务器压力）
          //缺点： 图片体积会更大（文件请求速度更慢）
          limit: 8*1024,
          //问题： 因为url-loader 默认使用es6模块化解析，而html-loader引入图片是commonjs
          //解析式会出现问题：[object Module]
          //解决： 关闭 url-loader的es6模块化
          esModule: false,
          //给图片进行重命名
          //[hash:10] 去图片的hash的值前10位
          //[ext]取文件原来扩展名
          name: '[hash:10].[ext]'
        }
      },
      {
        test:/\.html$/,
        //处理html文件的img图片（负责引入img,从而能够被 url-loader进行处理）
        loader: 'html-loader'
      }

    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}
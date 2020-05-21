const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//css提取为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//配置nodejs的环境变量
process.env.NODE_ENV = 'development'

module.exports = {
  entry: './src/js/index.js',
  output:{
    filename: "js/built.js",
    path: Path.resolve(__dirname,'build')
  },
  module:{
    rules:[
      //样式loader
      {
        test:/\.css$/,
        use:[
          //'style-loader',
          //提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          'css-loader',
          //使用 postcss-loader的默认配置
          //'postcss-loader'
          //修改loader的配置
          {
            loader: 'postcss-loader',
            options:{
              ident: 'postcss',
              plugins: ()=> [
                //postcss的插件
                require('postcss-preset-env')
              ]
            }
          }
        ]
        
      },
      {  //less loader
        test: /\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      { //图片loader
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options:{
          limit: 8*1024,
          esModule:false,
          name: '[hash:10].[ext]'
        }
      },
      { //html的loader
        test:/\.html$/,
        loader: 'html-loader'
      },
      { //其他资源，如 字体图标
        exclude: /.(css|js|html|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options:{
          name: '[hash:10].[ext]'
        }
      },
      /**
       * 语法检查： 团队代码风格统一，检查常见的错误
       * eslint-loader eslint
       * 
       * 注意：只检查自己写的源代码，第三方的库是不检查的
       * 
       * 设置检查规则
       *    package.json中 eslintConfig中设置~
       *    "eslintConfig": {
              "extends": "airbnb-base"
            }
       *    推荐使用 airbnb 规则:
       *    airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import 
       *    
       */
      // {
      //   test:/\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options:{

      //   }
      // }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],
  mode: 'development',
  devServer:{
    contentBase: Path.resolve(__dirname,'build'),
    compress: true,
    port:3000,
    open:true
  }
}
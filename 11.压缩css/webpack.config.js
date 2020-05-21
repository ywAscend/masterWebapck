const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//引入压缩css插件
const OptimezeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

//设置 nodejs 环境变量
//process.env.NODE_ENV = 'development'

//压缩css插件： optimize-css-assets-webpack-plugin

module.exports={
  entry:'./src/js/index.js',
  output:{
    filename: 'built.js',
    path:Path.resolve(__dirname,'build')
  },
  module:{
    rules:[
      //样式loader
      {
        test:/\.css$/,
        use:[
          //'style-loader', //创建style标签，将样式放入head中
          // 这个loader取代style-loader。作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,

          'css-loader',   // 将css文件整合到js文件中
          /**
           * css兼容处理： postcss--> postcss-loader postcss-preset-env
           * 帮 postcss找到package.json中的 browerslist里面的配置，通过配置加载指定的css兼容性样式
           * 
           * "browserslist":{
           * //开发环境 --> 设置node 环境变量： process.env.NODE_ENV = development
              "development":[
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生产环境： 默认是看生产环境
              "production":[
                ">0.2%",
                "not dead",
                "not op_mini all"
              ]
            }
           * 
           * 
           * 
           */
          //使用loader的默认配置
          //'postcss-loader',
          //修改loader的配置
          {
            loader: 'postcss-loader',
            options:{
              ident: 'postcss',
              plugins: ()=>[
                //postcss的插件
                require('postcss-preset-env')()
              ]
            }
          }
      ]
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
    }),
    new MiniCssExtractPlugin({
      //对输出的文件进行重命名
      filename: 'css/built.css'
    }),
    //压缩css
    new OptimezeCssAssetsWebpackPlugin()
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
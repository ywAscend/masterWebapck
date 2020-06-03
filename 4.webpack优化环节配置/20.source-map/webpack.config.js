const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output:{
    filename:'js/built.js',
    path: Path.resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },
      {
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options:{
          limit: 8*1024,
          name:'[hash:10].[ext]',
          esModule:false,
          outputPath:'imgs'
        }
      },
      {
        test:/\.html$/,
        loader: 'html-loader'
      },
      {
        test:/\.(eot|woff|ttf|woff2|svg)$/,
        loader:'file-loader',
        options:{
          outputPath:'media'
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
  devServer:{
    contentBase:'build',
    compress: true,
    port:3000,
    open: true,
    hot:true
  },
  //开启source-map
  devtool: "nosources-source-map"
}
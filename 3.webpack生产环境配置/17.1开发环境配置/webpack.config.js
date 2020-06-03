const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'development'
//process.env.NODE_ENV = 'prodution'

module.exports = {
    entry: './src/js/index.js',
    output:{
        filename:'js/built.js',
        path: Path.resolve(__dirname,'build')
    },
    module:{
        rules:[
            //css样式
            {
                test:/\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            //图片
            {
                test:/\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{
                    limit:8*1024,
                    name:'[hash:10].[ext]',
                    esModule:false,
                    outputPath:'imgs'
                }
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            //字体图标
            {
                test:/\.(ttf|woff|woff2|svg|eot)$/,
                loader:'file-loader',
                options:{
                    outputPath:'media'
                }
            }
        ]
    },
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    devServer:{
        contentBase: 'build',
        compress:true,
        port:3000,
        open:true
    }
}
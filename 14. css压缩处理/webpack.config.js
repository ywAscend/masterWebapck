//路径
const Path = require('path')
//打包后的js自动注册html
const HtmlWebpackPlugin = require('html-webpack-plugin')
//css-link引入
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//css压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

//css兼容需设置nodejs 中的环境变量
process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/index.js',
    output:{
        filename: 'built.js',
        path: Path.resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:()=>[
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options:{
                    limit: 8*1024,
                    esModule:false,
                    outputPath:'imgs'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(woff2|eot|ttf|woff|svg)$/,
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]',
                    outputPath:'media'
                }
            }
        ]
    },
    mode: 'development',
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin() //压缩css
    ],
    devServer:{
        contentBase: Path.resolve(__dirname,'build'),
        port:3000,
        compress:true,
        open:true
    }
}
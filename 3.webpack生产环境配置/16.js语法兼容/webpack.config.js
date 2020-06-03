
const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

process.env.NODE_ENV = 'development'

const Config = {
    entry: './src/js/index.js',
    output:{
        filename: 'js/built.js',
        path: Path.resolve(__dirname,'build')
    },
    module:{
        rules:[
            // {
            //     test:/\.js$/,
            //     exclude:/node_modules/,
            //     loader: 'eslint-loader',
            //     options:{
            //         fix:true
            //     }
            // },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                // options:{
                //     presets:[
                //         [
                //             '@babel/preset-env',
                //             {
                //                 //按需加载
                //                 useBuiltIns: 'usage',
                //                 //指定core-js版本
                //                 corejs:{
                //                     version: 3
                //                 },
                //                 //指定兼容性做到哪个版本
                //                 targets:{
                //                     chrome: '60',
                //                     firefox: '60',
                //                     ie:'9',
                //                     safari: '10',
                //                     edge:'11'
                //                 }
                //             }
                //         ]

                //     ]
                // }
            },
            {
                test: /\.css$/,
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
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader',
                options:{
                    limit: 8*1024,
                    name:'[name].[hash:10].[ext]',
                    esModule:false,
                    outputPath:'imgs'
                }
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            {
                test:/\.(ttf|woff|woff2|eot|svg)$/,
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
            filename:'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    devServer:{
        contentBase: Path.resolve(__dirname,'build'),
        compress:true,
        port:3000,
        open:true
    }
}
module.exports = Config
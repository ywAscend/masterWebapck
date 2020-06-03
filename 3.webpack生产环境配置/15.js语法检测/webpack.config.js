const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

//css兼容需设置nodejs 中的环境变量
process.env.NODE_ENV = 'prodction'

module.exports = {
    entry: './src/js/index.js',
    output:{
        filename: 'built.js',
        path: Path.resolve(__dirname,'build')
    },
    module:{
        rules:[
            {   
                /**
                 * 只检查自己写的源代码，第三方的库不用检查
                 * 
                 * eslint eslint-loader 
                 * 
                 * 插件airbnb： eslint-config-airbnb-base eslint-plugin-import
                 * 
                 * package.json中配置
                 * 
                 * "eslintConfig":{
                 *      "extends":"airbnb-base"
                 *  }
                 * 
                 */
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'eslint-loader',
                options:{
                    fix: true
                }
            },
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
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
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
                loader:'html-loader'
            },
            {
                test:/\.(woff|woff2|ttf|eot|svg)$/,
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
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    devServer:{
        contentBase:Path.resolve(__dirname,'build'),
        compress:true,
        port:3000,
        open:true
    }
}
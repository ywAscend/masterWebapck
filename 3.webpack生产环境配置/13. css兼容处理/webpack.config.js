const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
//css提取为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//css兼容处理 postcss: postcss-loader postcss-preset-env
// css兼容默认使用生产模式，注意这个生产模式 和 webpack中的 mode 没有关系，
//而是 nodejs中 process.env.NODE_ENV 中的环境变量

//设置 nodejs环境变量
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
                test: /\.css$/,
                use:[
                    //'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    //第一种写法
                    //'postcss-loader'  //不推荐
                    //第二种写法：修改loader配置,推荐
                    {
                        loader:'postcss-loader',
                        options:{
                            ident: 'postcss', //固定写法
                            plugins:()=>[
                                //postcss插件，帮助postcss找到pack.json中 'browserslist里面的配置'
                                /**
                                 * browserslist配置：
                                 *  "browserslist":{
                                 *      "development":[
                                 *          "last 1 chrome version",
                                 *          "last 1 firefox version",
                                 *          "last 1 safari version",
                                 * 
                                 *       ],
                                 *      "production":[
                                 *          ">0.2%",
                                 *          "not dead",
                                 *          "not op_min all"
                                 *       ]
                                 *  }
                                 * 
                                 */
                                require('postcss-preset-env')()
                            ]

                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options:{
                    limit: 8*1024,
                    esModule: false,
                    name:'[name].[hash:10].[ext]',
                    outputPath: 'img'
                }    
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            {
                test: /\.(woff2|eot|ttf|woff|svg)$/,
                loader: 'file-loader',
                options:{
                    name:'[hash:10].[ext]'
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
        })
    ],
    devServer:{
        contentBase: './build',
        compress: true,
        port: 3000,
        open: true
    }
}
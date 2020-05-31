const Path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
//css抽取为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//css压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

//process.env.NODE_ENV = 'development'
process.env.NODE_ENV = 'prodution'

const commonCssConfig = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    //css兼容
    {
        loader:'postcss-loader',
        options:{
            indent: 'postcss',
            plugins:()=>[
                require('postcss-preset-env')()   // package.json需配置 'browserslist'
            ]
        }
    }
]

module.exports = {
    entry: './src/js/index.js',
    output:{
        filename:'js/built.js',
        path: Path.resolve(__dirname,'build')
    },
    module:{
        rules:[
            //js处理
            {
                test: /\.js$/, //js语法检查 eslint -->eslint-loader eslint-config-airbnb-base - eslint-plugin-import
                exclude:/node_modules/,
                enforce: 'pre',
                loader:'eslint-loader', //package.json 配置 "eslintConfig": {"extends":"airbnb-base"}
                options:{
                    fix:true //自动修复
                }
            },
            {   //js兼容
                test:/\.js$/, // babel: babel-loader-->@babel/core-->@babel/preset-env -- core-js -->@babel/poly-fill
                exclude:/node_modules/,
                loader:'babel-loader',
                options:{
                    presets:[
                        [
                            "@babel/preset-env",
                            {
                                useBuiltIns: 'usage', //按需加载
                                corejs: 3, //指定corejs版本
                                targets:{ //指定兼容到哪个版本
                                    "chrome":"60",
                                    "firefox":"60",
                                    "ie":"9",
                                    "safari":"10",
                                    "edge":"11"
                                }
                            }

                        ]
                    ]
                } 
            },
            //css样式
            {
                test:/\.css$/,
                use: [...commonCssConfig]
            },
            {
                test:/\.less$/,
                use:[ ...commonCssConfig,'less-loader']
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
            template:'./src/index.html',
            minify:{ //压缩html
                collapseWhitespace:true, //移除空格
                removeComments: true  //移除注释
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css' //重命名打包后的css
        }),
        new OptimizeCssAssetsWebpackPlugin() //压缩css
    ],
    devServer:{
        contentBase: 'build',
        compress:true,
        port:3000,
        open:true,
        hot:true  //开启热加载
    }
}
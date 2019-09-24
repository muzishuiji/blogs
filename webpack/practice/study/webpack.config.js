const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack= require('webpack');
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map', // 加了inline后则不会打包单独的mapjs文件,而是把mapjs打包到[name].js中
    entry: {
        main: './src/js/index.js'
    },
    devServer: {
        contentBase: './dist',
        open: true,
        hot: true,
        hotOnly: true, //hmr失效的时候不要自动刷新页面
        proxy: {
            '/api': {
                target: 'https://other-server.example.com'
            }
        }
    },
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/,  // 配置不做处理的文件
                loader: "babel-loader",
                // options: {
                    // "presets": [["@babel/preset-env", {
                    //     "targets": {
                    //         "chrome": "67" // 如果新特性已被支持,则不进行es6转es5
                    //     },
                    //     useBuiltIns: 'usage'  // 只polyfill用到的新特性
                    // }]]
                //     "plugins": [
                //         [
                //         "@babel/plugin-transform-runtime",
                //             {
                //                 "corejs": 2,
                //                 "helpers": true,
                //                 "regenerator": true,
                //                 "useESModules": false
                //             }
                //         ]
                //     ]
                // }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // placeholer
                        name: '[name]_[hash].[ext]',
                        limit: 2048
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true   // 开启css的模块化打包
                        }
                    }, 'sass-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
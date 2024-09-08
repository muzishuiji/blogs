const webpack= require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        main: './src/js/index.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            child: path.resolve(__dirname, '../src/child')
        }
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/,
                use: ['babel-loader', {
                    loader: 'eslint-loader'
                }],
            },
             {
                test: /\.css$/,
                use: [
                    'css-loader'
                ]
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll/react.dll.js')
        }),
        // 当主代码逻辑里引入了第三方模块,webpack会先去对应的json文件里去找对应模块的映射关系
        // 如果找到就不需要再次打包该模块,直接引用即可,如果没有发现对应模块的映射,
        // 则会再去node_modules下查找并打包
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll/vendors.manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll/react.manifest.json'),
        })
        // 我们可以通过providePlugin暴露某个模块中的单个导出值
        // 这样可以很好的与tree shaking结合,将lodash库中的其他没用到的部分去掉
        // new webpack.ProvidePlugin({
        //     join: ['lodash', 'join']
        // })
        // 可以通过imports-loader来覆盖某一个模块的this
    ],
    performance: false,
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',  // 定义间接引入的模块文件的打包命名规则
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'cheap-module-eval-source-map', // 加了inline后则不会打包单独的mapjs文件,而是把mapjs打包到[name].js中
    devServer: {
        overlay: true,   // 会把有打包过程中有eslint错误的js代码在页面上弹出层
        contentBase: '../dist',
        hot: true,
        hotOnly: true, //hmr失效的时候不要自动刷新页面
        proxy: {
            '/api': {
                target: 'https://other-server.example.com'
            }
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 50000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,  // 决定某个是否被打包到这个组的优先级
                },
                default: {
                    priority: -20,
                    reuseExistingChunk: true,  // 如果某个模块已经被打包过,则不再重新对该模块进行打包
                    filename: 'common.js'
                }
            }
        }
    }
}
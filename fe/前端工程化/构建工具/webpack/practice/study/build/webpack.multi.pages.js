const webpack= require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const fs = require('fs');
const makePlugins = (config) => {
    const plugins = [new CleanWebpackPlugin()]
    Object.keys(config.entry).forEach((item) => {
        plugins.push(
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                filename: `${item}.html`,
                chunks: ['runtime', 'vendors', item]
            })
        )
    });
    const files = fs.readdirSync(path.resolve(__dirname, '../dll'));
    files.forEach((file) => {
        if(/.*\.dll.js/.test(file)) {
            plugins.push(new AddAssetHtmlWebpackPlugin({
                filepath: path.resolve(__dirname, '../dll', file)
            }))
        }
        if(/.*\.mainfest.js/.test(file)) {
            plugins.push(new webpack.DllReferencePlugin({
                manifest: path.resolve(__dirname, '../dll', file),
            }))
        }
    })
    return plugins;
}
const config = {
    mode: 'development',
    entry: {
        index: './src/js/index.js',
        list: './src/js/list.js',
        detail: './src/js/detail.js'
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
        // 当主代码逻辑里引入了第三方模块,webpack会先去对应的json文件里去找对应模块的映射关系
        // 如果找到就不需要再次打包该模块,直接引用即可,如果没有发现对应模块的映射,
        // 则会再去node_modules下查找并打包
    ],
    performance: false,
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',  // 定义间接引入的模块文件的打包命名规则
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'cheap-module-eval-source-map' // 加了inline后则不会打包单独的mapjs文件,而是把mapjs打包到[name].js中
}
config.plugins = makePlugins(config);
module.exports = config;

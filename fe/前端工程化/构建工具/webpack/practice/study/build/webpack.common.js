const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const testConfig = require('./webpack.test.js');
const prodConfig = require('./webpack.prod.js');
const baseConfig = {
    entry: {
        main: './src/js/index.js'
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     _: 'lodash'
        // })
    ],
    performance: false
}
module.exports = (env) => {
    console.log(env.NODE_ENV)
    if(env.NODE_ENV === 'test') {
        return merge(baseConfig, testConfig);
    } else if(env.NODE_ENV === 'prod') {
        return merge(baseConfig, prodConfig);
    } else {
        return baseConfig;
    }
}

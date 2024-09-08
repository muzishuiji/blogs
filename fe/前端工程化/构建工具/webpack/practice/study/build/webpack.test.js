const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',  // 定义间接引入的模块文件的打包命名规则
        path: path.resolve(__dirname, '../dist')
    },
    // devtool: 'cheap-module-source-map', // 加了inline后则不会打包单独的mapjs文件,而是把mapjs打包到[name].js中
    optimization: {
        // 兼容老版本webpack用户的contenthash的问题的配置
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            chunks: 'all', // 默认是async
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,  // 决定某个是否被打包到这个组的优先级
                    filename: '[name].js'
                },
                default: {
                    priority: -20,
                    reuseExistingChunk: true,  // 如果某个模块已经被打包过,则不再重新对该模块进行打包
                    filename: 'common.js'
                }
            }
        },
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 
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
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ]
}
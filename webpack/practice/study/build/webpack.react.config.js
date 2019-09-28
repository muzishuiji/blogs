// 这里是对react进行打包的webpack配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack= require('webpack');
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map', // 加了inline后则不会打包单独的mapjs文件,而是把mapjs打包到[name].js中
    entry: {
        main: './src/react/index.js'
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
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/react-index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
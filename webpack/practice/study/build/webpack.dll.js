const path = require('path');
const webpack= require('webpack');
module.exports = {
    mode: 'production',
    entry: {
        vendors: ['lodash'],
        react: ['react'],
        reactDom: ['react-dom']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dll'),
        library: '[name]'  // 把js以一个library暴露出来,可在webpack中引入
    },
    plugins: [
        // 对打包生成的dll中的模块之间映射关系的进行分析
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, '../dll/[name].manifest.json'),
        })
    ]
}
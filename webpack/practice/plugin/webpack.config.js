const path = require('path');
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin.js');
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: []
            }
        ]
    },
    plugins: [
        new CopyrightWebpackPlugin()
    ]
}
const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolveLoader: {
        modules: ['node_modules', './loaders']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'replaceLoader',
                        options: {
                            name: 'muzishuiji1'
                        }
                    },
                    {
                        loader: 'replaceLoaderAsync',
                        options: {
                            name: 'hello114'
                        }
                    }
                ]
            }
        ]
    }
}
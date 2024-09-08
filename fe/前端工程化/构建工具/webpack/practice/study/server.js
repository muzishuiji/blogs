const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compiler = webpack(config);   // 执行webpack打包

const app = express();

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.listen(3001, () => {
    console.log('server is running');
})
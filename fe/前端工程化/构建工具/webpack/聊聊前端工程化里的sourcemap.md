
## Source Map 是什么？
前端开发中，源码映射（source map）是一种将压缩后的代码映射回源代码的技术。这对于调试非常重要，因为在开发阶段，我们通常会使用未压缩的、格式良好的源代码，但在生产环境中，代码会被压缩和混淆以减小文件大小，提高加载速度。源代码映射可以帮助开发工具在调试时将压缩后的代码映射回原始源代码，使开发者能够查看未压缩的源代码一样方便的进行测试。

## 如何生成Source Map？

源代码映射的生成通常在构建过程中完成的，具体步骤如下：
1. 编写源代码：首先，你编写你的源代码，通常是未压缩的JavaScript、CSS以及可能的模版文件；
2. 配置构建工具：使用构建工具（如Webpack、Gulp、Grunt，Rollup）等来配置打包流程。这些工具通常提供插件或选项来生成source map。
3. 编译/压缩：在构建过程中，你的源代码会被编译、压缩和混淆。在执行这些操作的同时，构建工具会生成相应的source map文件。
4. 生成Source Map文件：生成的source map文件会包含原始源代码和压缩后的代码之间的映射关系。这个文件通常是一个json文件，其中包含了足够的信息来在压缩后的代码中找到对应的原始代码位置。

## Source Map的文件结构
一个典型的Source Map文件通常包含以下字段：
- version：Source Map的版本号，通常是3；
- file：转换后的文件名；
- sourceRoot：源文件的根路径；
- sources：源文件的数组；
- sourcesContent：源文件的内容数组（可选）；
- names：转换后的代码使用的标识符数组；
- mappings：映射数据，表示转换后的代码与原始代码之间的映射关系；


## Source Map的配置选项

在大多数构建工具中，生成source map时可以选择不同的配置选项，以适应不同的开发和生产环境需求。

-  development：在开发环境中，通常会使用更详细的source map，以便于调试。常见的选项包括eval-source-map和inline-source-map。
    -  eval-source-map：将source map以eval的形式嵌入到javascript中。
    -  inline-source-map：将source map以base64编码的形式直接内联到输出文件中。
-  production： 在生产环境中，source map通常会单独输出到一个文件中，以减少文件的体积。常见的选项包括source-map和hidden-source-map。
    -  source-map：生成一个独立的source map文件，通常命名为<output>.map；
    - hidden-source-map：类似于source-map，但不将指向source map的注释添加到压缩后的文件中，需要手动配置服务器来传递source map文件。

## 生成Source Map的工具

1. Babel

Babel是一个javascript编译器，可以将ES6+代码转换为ES5代码。Babel可以通过配置生成Source Map。

配置示例：
```js
{
  "presets": ["@babel/preset-env"],
  "sourceMaps": "inline"
}
```
- `sourceMaps: 'inline'`: 将Source Map内联到转换后的代码中。
- `sourceMaps: 'both'`: 生成单独的Source Map文件，并在转换后的代码中添加`//# sourceMappingURL=...` 注释。

2. TypeScript

TypeScript编译器可以将TypeScript代码编译为javascript代码，并生成Source Map。

配置示例：
```js
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```
- sourceMap: true: 生成 Source Map 文件。

3. Webpack
Webpack是一个模块打包工具，可以将多个模块打包成一个或多个文件。Webpack可以通过配置生成Source Map。

配置示例：
```js
    const path = require('path');
    const webpack = require('webpack');
    module.exports = {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        }, 
        devtool: 'source-map', // 或者 'inline-source-map', 'eval-source-map', 'hidden-source-map' module: { 
        rules: [ {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: { 
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
                }
        }]
    }
 };
```
在这个配置中，devtool的属性设置为'source-map',这意味着Webpack会在打包时生成一个单独的.map文件，并且会在生成的bundle.js文件末尾加上一行注释，指向生成的.map文件。
    
4. Sass/Less

Sass和Less是CSS预处理器，可以将Sass/Less代码编译为CSS代码，并生成Source Map。

Sass配置示例：
```bash
sass input.scss output.css --sourcemap
```
- `--sourcemap`: 生成Source Map文件；

Less配置示例：
```bash
less input.less output.css --source-map
```
- `--sourcemap`: 生成Source Map文件；

## 使用Source Map

在浏览器调试中，浏览器会自动加载Source Map文件，并根据其中的映射关系，将调试器指向原始代码。开发者可以在浏览器的开发者工具中查看原始代码，而不是转换后的代码，可显著提高开发效率和调试体验。



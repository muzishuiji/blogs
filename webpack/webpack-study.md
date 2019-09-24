## webpack

### webpack究竟是什么?

1. webpack是一个模块打包工具

2. webpack.config.js是webpack默认的打包配置文件,可以通过--config参数来指定其他的打包配置文件

3. webpack-cli使得我们可以直接在命令号里执行webpack命令

4. chunks, 存放每个文件对应的id值,和相关联的文件的id值

5. chunksName, 每个文件对应的名字,和相关的文件的名字.

6. mode,打包模式,默认是production.development模式打包出来的文件时非压缩的.production模式打包出来的文件时压缩过的.

### loader

1. file-loader用于打包图片类文件.它为我们做了以下工作:

* 移动图片到打包目录下,并可以做一些重命名,压缩之类的操作

* 在引入该图片的文件中,填充上图片相当于该文件的地址

2. 需要处理什么类型的资源就去安装对应的loader

3. file-loader会把我们的图片资源打包到对应的目录下
url-loader会帮我们把图片打包成base64字符串,然后在打包的js中导出这个baose64字符串,在引用到它的js中引入.

4. 图片比较小的话,把图片打包成base64是可取的,但是如果图片很大,打包成的base64字符串就会很大,这也会导致打包后的js体积很大,如果图片比较大的情况,我们则把它打包成图片而不是base64字符串.我们可以通过配置limit,来帮我们把图片大小小于limit的图片打包成base格式的,大于limit的图片打包成图片文件.

5. loader的执行顺序是后引入的先执行.

### loader

1. html-webpack-plugin会在打包结束后,自动生成一个html文件,并把打包生成的js都自动引入到这个html文件中.

2. plugin可以在webpack运行到某个时刻帮助webpack做一些事情.

### entry与output

1. 如果页面用到的静态js资源需要放到cdn上,则可以在output的publicPath里面配置静态资源所在地址,这样打包后的index.html里引入的打包的js的src都会包含这里配置的地址.

### sourceMap

1. source-map

打包会生成出口js对应的单独的map文件.

2. inline-source-map

打包会生成出口js对应的map文件,且对应的map文件的代码会放在打包的出口js中.

3. inline-cheap-source-map

打包报错信息只映射到行,不映射到具体那一列的字符,且只会关注业务代码里的报错.

4. inline-cheap-module-source-map

设置不仅关注业务代码中的报错,还要关注模块中的报错.

5. eval

打包速度最快的一种方式,一样可以准确定位错误所在行.不会打包出口js对应的map文件,它是通过eval机制来生成js与source-map的映射关系的,但是针对复杂逻辑的代码,eval提示出来的内容可能并不全面.

推荐的写法:

    // 开发环境
    cheap-module-eval-source-map
    // 正式环境
    cheap-module-source-map

### webpack-dev-server

1. 使用node.js可以实现类似于webpack-dev-server的功能.

简单实现的代码示例:

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

这样实现的代码,会自动打包,但是需要我们手动刷新来更新界面内容,且页面上未发生改变的模块的状态也不能被保存下来.每次刷新页面,所有内容回归为初始状态.


2. webpack-dev-server打包生成的文件不再dist目录下,而是在内存里.

3. 配置文件修改之后的热更新

        new webpack.HotModuleReplacementPlugin()

热更新可以保存我们页面未被修改部分的状态,只改变发生改变的内容.

手动触发热更新的代码示例:

    import counter from './counter';
    import number from './number';
    counter();
    number();
    if(module.hot) {
        module.hot.accept('./number', () => {
            document.body.removeChild(document.getElementById('number'));
            number();
        })
    }

4. @babel/plugin-transform-runtime

一个能够复用babel的注入的工具函数来减少代码体积的插件,
@babel/plugin-transform-runtime插件的;另一个作用就是为你的代码创建一个沙箱环境,可以避免全局变量的污染.

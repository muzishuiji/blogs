## webpack

### webpack 究竟是什么?

1. webpack 是一个模块打包工具

2. webpack.config.js 是 webpack 默认的打包配置文件,可以通过--config 参数来指定其他的打包配置文件

3. webpack-cli 使得我们可以直接在命令行里执行 webpack 命令

4. chunks, 存放每个文件对应的 id 值,和相关联的文件的 id 值

5. chunksName, 每个文件对应的名字,和相关的文件的名字.

6. mode,打包模式,默认是 production, development 模式打包出来的文件时非压缩的, production 模式打包出来的文件时压缩过的.

### loader

1. file-loader 用于打包图片类文件.它为我们做了以下工作:

- 移动图片到打包目录下,并可以做一些重命名,压缩之类的操作

- 在引入该图片的文件中,填充上图片相当于该文件的地址

2. 需要处理什么类型的资源就去安装对应的 loader

3. file-loader 会把我们的图片资源打包到对应的目录下
   url-loader 会帮我们把图片打包成 base64 字符串,然后在打包的 js 中导出这个 baose64 字符串,在引用到它的 js 中引入.

4. 图片比较小的话,把图片打包成 base64格式 是可取的,但是如果图片很大,打包成的 base64格式的字符串就会很大,这也会导致打包后的 js 体积很大,如果图片比较大的情况,我们则把它打包成图片而不是 base64 字符串.我们可以通过配置 limit,来帮我们把图片大小小于 limit 的图片打包成 base64 格式的,大于 limit 的图片打包成图片文件.

5. loader 的执行顺序是后引入的先执行,我的理解有点像栈结构,后进先出.

### loader

1. `html-webpack-plugin` 会在打包结束后,自动生成一个 html 文件,并把打包生成的 js 都自动引入到这个 html 文件中.

2. plugin 可以拿到 webpack 的生命周期, 在 webpack 运行到某个时刻帮助 webpack 做一些事情.

### entry 与 output

1. 如果页面用到的静态 js 资源需要放到 cdn 上,则可以在 `output` 的 `publicPath` 里面配置静态资源所在地址,这样打包后的 index.html 里引入的打包的 js 的 src 都会包含这里配置的地址.`publicPath`指定资源的引入地址.

### sourceMap

1. source-map

打包会生成出口 js 对应的单独的 map 文件.

2. inline-source-map

打包会生成出口 js 对应的 map 文件,且对应的 map 文件的代码会放在打包的出口 js 中.

3. inline-cheap-source-map

打包报错信息只映射到行,不映射到具体哪一列的字符,且只会关注业务代码里的报错,不关注引入的第三方模块的报错

4. inline-cheap-module-source-map

设置不仅关注业务代码中的报错,还要关注模块中的报错.

5. eval

打包速度最快的一种方式,一样可以准确定位错误所在行.不会打包出口 js 对应的 map 文件,它是通过 eval 机制来生成 js 与 source-map 的映射关系的,但是针对复杂逻辑的代码,eval 提示出来的内容可能并不全面.

推荐的写法:

    // 开发环境
    // 打包出来可以看到原始源代码,仅限行
    cheap-module-eval-source-map
    // 正式环境
    // 打包出来可以看到原始源代码,仅限行
    cheap-module-source-map

### webpack-dev-server

1. 使用 node.js 可以实现类似于 webpack-dev-server 的功能.

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

2.  webpack-dev-server 打包生成的文件不再 dist 目录下,而是在内存里.

3.  配置文件修改之后的热更新

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

一个能够复用 babel 的注入的工具函数来减少代码体积的插件,
@babel/plugin-transform-runtime 插件的;另一个作用就是为你的代码创建一个沙箱环境,可以避免全局变量的污染.

5. 一些参数

changeOrigin: true; // 解决 origin 的请求限制

secure: false; // 解除 https 协议下的安全限制

      // 设置请求头的相关配置
      header: {
         host: '',
         cookie: ''
      }

6.  webpackDevServer 解决单页面应用路由的问题.

        historyApiFallback: true;   // 可以帮助我们实现路由映射
        // 把history上对任何路径的请求都转化到对根路径的index.html的请求
        // 在index.html再配置对应的路由地址展示对应的内容
        // 还可以这样写:
        historyApiFallback: {
            rewrites: [
                {
                    // 访问abc.html转发到index.html
                    from: '/abc.html/',
                    to: '/index.html'
                }
            ]
        }

### tree-shaking

webpack4.0 已经提供了 tree-shaking 的功能,仅支持 ES6 Module 引入的语法.
tree-shaking 的主要作用就是只打包用到的代码逻辑

1. package.json 里可以通过设置 sideEffects 的值来指定不需要进行 tree-shaking 的模块.

一般如果页面中是用来 css 文件,使用 tree-shaking 的时候可能也会在打包的时候被丢掉,我们会在 package.json 里这样配置:

    sideEffects: ['*.css'];  // 意思对.css为后缀的文件不要使用tree-shaking

### development 和 production 模式的区分打包

- development 环境下生成的的 sourcemap 的更完整, production 环境下的 sourcemap 更简洁.

- 压缩与非压缩, development 的 map 文件可以不用压缩,production 的 map 文件要压缩

### webpack 和 code splitting

1. 第三方 npm 单独打包,因为这些资源,不会重复发生变更,所以我们就不需要每次发版都重新打包这些文件,用户访问又去重新加载,我们可以单独打包体积较大的第三方模块,这样用户再次访问应用,这部分资源就不需要重新加载了.

2. webpack 的代码分割有两种方式:

- 通过 webpack 的配置项来实现代码的分割,这里根据代码的体积和之间的联系进行代码分割:

        optimization: {
            splitChunks: {
                chunks: "all"
            }
        }

- 通过在用到的地方 import,也就是异步加载的方式进行代码分割,webpack 会将我们异步加载的文件打包成单独的 js 文件,从而减少 main.js 的体积,在用到的时候再去加载对应的 js 文件.代码示例:

        function getComponent() {
            return import('lodash').then(({default: _}) => {
                var element = document.createElement('div');
                element.innerHTML = _.join(['li', 'jie'], '.');
                return element;
            })
        }

3.  splitChunksPlugin 参数详解

        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                automaticNameMaxLength: 30,
                name: true,
                cacheGroups: {
                    vendors: false,
                    default: false
                }
            }
        }

- chunks:

'async'表示只对异步代码进行分割,

'all'对同步代码和异步代码都进行代码分割,同步代码的分割需要依据 cacheGroups 的参数配置

- minSize 与 maxSize

minSize 进行代码分割的文件的最小体积

maxSize 进行代码分割的文件的最大体积

- minChunks

minChunks,模块的被引入次数大于某个数值时进行代码分割.

- maxAsyncRequests

maxAsyncRequests 对异步模块进行代码分割的最大模块数

- maxInitialRequests

设置入口文件引入模块进行代码分割的个数

- automaticNameDelimiter

组合文件名之间的连接符设置

- automaticNameMaxLength

- name

打包生成的文件的名字

- cacheGroups

配置同步代码的代码分割规则,把符合某一组规则的模块打包到一起,所以叫缓存组.

    vendors: {
        test: '',      // 要打包到这个组的模块需要满足的要求
        priority: 0,   // 模块打包选择哪个组的优先级
        filename: ''   // 打包后的文件名
    }
    // 默认的打包组,所有打包组都不匹配则会被打包到默认的打包组中.
    default: {
        priority: -20,
        reuseExistingChunk: true,  // 如果某个模块已经被打包过,则不再重新对该模块进行打包
        filename: 'common.js'
    }

### lazy loading 和 chunk

1. 懒加载的文件,webpack 会在打包的时候会在引入的地方写一个 ajax 请求对应文件的逻辑,只有在需要用到懒加载文件的时候,才会发送 ajax 去请求对应的文件.这样页面一开始需要加载的文件会减少,从而加速了首屏渲染.

2. chunk 就是一个打包生成的 js 文件的标识.

### 打包分析, preloading, prefetching

1. 我们可以借用可视化的打包分析工具来分析哪些模块重复打包,或者体积过大,能否进行拆分,按需引入,以减少打包后的体积,对于体积比较大的模块有没有更好的替代方案,等等.

2) 开发的时候应该注重代码的使用率(可以通过谷歌调试工具中的Coverage来查看代码的使用率),这样尽可能减少页面首次加载的代码体积.

3) preloading

可以利用 webpack(magic comments)魔法注释的功能在网络空闲的时候为我们加载需要的异步模块,这样既可以减少首屏加载的代码的体积,又省去了用到该异步代码逻辑的时候等待对应资源加载的过程.

webpackPrefetch: 会在核心代码加载完毕,网络空闲的状态加载异步资源,但是 webpackPrefetch 在某些浏览器中会存在兼容性问题.
webpackLoad: 会在核心业务代码的加载过程中加载

4. prefetching

5. 优化项目的思考因素

除了从缓存上去优化代码,我们还可以从提高代码利用率的方向优化代码,把暂时不会用到的代码,异步载入,通过 webpack 的配置,在网络空闲的状态去加载以后会用到的资源,它少去了 lazy loading 的等待时间.

### css 代码分割

1. mini-css-extract-plugin

不同的 css 代码的分割打包可以在 cacheGroup 里面做配置,就可以把不同的 css 文件打包进不同的模块下.

### webpack 与浏览器缓存(Caching)

1.  为了解决用户浏览器上缓存文件的问题,我们可以在打包输出的文件的 name 加上`[contenthash]`这样的后缀,`contenthash`是根据文件内容产生的 hash 值.这样发生改变的文件在用户访问的时候就会因为文件名发生了变化而去服务器请求最新的资源文件,而内容没有发生变化的则文件名不变,浏览器则会返回缓存的对应的 js 文件给用户.

2.  runtimeChunk

        // 使用示例
        optimization: {
            // 兼容老版本webpack用户的contenthash的问题的配置
            runtimeChunk: {
                name: 'runtime'
            }
        }

runtimeChunk 里面存放的是各个 js 文件之间的关联关系,这样每次打包 js 之间的关联关系发生了变化,但是 js 文件没有变化,产生的 contenthash 也不会变化.老版本的 webpack4 会将各个 js 之间的关联关系也就是 manifest 打包进各个 js 文件中,这样即使 js 没有发生变化,但是它们之间的关联关系发生了变化,也会重新生成 contentHash.新版本的 webpack 已经不用配置了,新版本的 webpack 把 js 之间的关联关系放在 runtime 文件中,这样文件自身没有改变,关联关系改变,也只是会改变 runtime 的 contenthash,文件自身的 contenthash 则不会发生变化.

### Shimming

1.  Shimming 就是 webpack 中的垫片,能够解决 webpack 打包过程中的兼容性问题.

2.  关于在 js 文件中使用了\$的兼容的 webpack 配置:

        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                _: 'lodash'
                // 还可以用
                // _join: ['lodash', 'join']
            })
        ]

通过这样的配置,webpack 会为使用了`$`的文件自动引入`jquery`,是用来`_`的文件为我们自动引入`lodash`,这个插件可以理解为是一个垫片.

3. 垫片的一个使用场景:imports-loader

imports-loader 可以对文件的 this 的指向做一个变更,让它指向 window.配置示例如下:

    rules: [
        {
            test: /\.js$/,
            use: [
                {
                    loader: 'babel-loader'
                },
                {
                    // 把js文件的this由指向模块自身改成指向window
                    loader: 'imports-loader?this=>window'
                }
            ]
        }
    ]

### PWA 的打包配置

PWA 是 progressive web app 的英文缩写,翻译过来就是渐进式增强 WEB 应用,是谷歌在 2016 年移除的概念,目的就是在移动端利用提供的标准化框架,在网页应用中实现和原生应用相近的用户体验的渐进式网页应用.

pwa 可以创建一份本地离线缓存,当成功访问网站后,其后如果网站服务器挂掉,也会从本地缓存读取页面资源,用户还是可以访问到页面.

webpack 中使用`workbox-webpack-plugin`来打包后,会为我们自动生成一个 service-worker.js,这个 js 为我们缓存相应的页面,从而保证当页面的服务器崩溃,仍然可以从缓存中读取页面返回给用户.为了真正的实现 pwa,我们还要写相应的业务代码.

配置步骤如下:

    // 1. webpack的配置文件增加以下代码:
    const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
    plugins: [
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ]
    // 2. 项目的入口js文件中增加以下内容:
    // 注册service-worker
    if('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('service-worker registed');
                }).catch(error => {
                    console.log('service-worker register error');
                })
        })
    }

这样浏览器就可以将你的页面缓存下来,当服务器挂掉的时候返回缓存中的静态页面给用户.

### TypeScript 的打包配置

    // 安装ts-loader模块,安装typescript模块等,新增webpack配置如下
     module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }

### eslint 在 webpack 中的配置

只需要在项目中安装 eslint 模块,eslin-loader 模块,eslintrc.js,创建然后在 webpack 中做以下配置:

    // 创建 .eslintrc.js
    module.exports = {
        "extends": "airbnb",
        "parser": "babel-eslint",
        "rules": {
            "react/prefer-stateless-function": 0,
            "react/jsx-filename-extension": 0
        },
        globals: {
            document: false
        }
    }


    // webpack中的配置
    {
        test: /\.js$/,
        exclude: /node_modules/,  // 配置不做处理的文件
        use: ["babel-loader", "eslint-loader"]
    }

还可以使用 git 的钩子命令,在提交代码的时候对代码做 eslint 校验.

### .babelrc

在.babelrc中配置 userBuildIns 为 usage后,babel会在使用用到es6以上的新特性的时候,自动为我们添加babel-polyfill 的引用.

'usage'这个属性值还在实验阶段

可以通过给userBuildIns设置为true来根据浏览器兼容列表自动引入所需的polyfill

    {
        "presets": [
            ["env", {
                "modules": false,
                "targets": {
                    "browsers": ["ie >= 9"]
                },
                "userBuildIns": true,
                "debug": true
            }]
        ]
    }
    // 还需要在webpack的入口文件中引入 "babel-polyfill"
    

### wepack 性能优化

1. 跟上技术的迭代(尽可能的使用最新的 webpack,npm,yarn)

2. 尽可能的减少 loader 的使用频率(缩小 loader 的适用范围).

配置 js 的打包规则(rules)的时候通过 include 和 exclude 来排除不必要的文件的打包,提升打包速度.

3. 尽可能少的使用 plugin,且确保 plugin 的可靠性.

如开发环境下可以不用对 js 和 css 进行压缩,减少了 plugin 的使用,尽可能使用官方推荐的插件.

4. 合理的使用 resolve 配置

过多的配置 extensions 和 mainFields 会降低 webpack 的打包速度,所以我们需要在必要的情况下省略文件名的后缀和为嵌套过多的路径设置别名.

5. 使用 DllPlugin 来有效提高打包速度

单独对第三方模块进行统一的打包,打包成[name].dll.js,这样打包自己的逻辑代码的时候就不需要再打包这部分代码了,在自己的逻辑代码中直接引入打包好的[name].dll.js 文件, 从而有效提升打包速度.主要操作步骤如下:

* 1. 创建一个webpack.dll.js,用于整合打包第三方模块的webpack配置文件,内容如下:
   
        const path = require('path');
        const webpack= require('webpack');
        module.exports = {
            mode: 'production',
            entry: {
                vendors: ['react', 'react-dom', 'lodash']
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

* 2. 然后在对应的项目的webpack配置文件中增加一下代码:
     
        // 引入webpack插件
        const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
        plugins: [
            // ...
            new webpack.DllReferencePlugin({
                manifest: path.resolve(__dirname, '../dll/vendors.manifest.json'),
            })
        ]


6. 控制包文件的大小从而提升webpack的打包速度

避免没有使用到的模块的打包,这样会增加打包后的js的体积,拖慢打包速度.

7. thread-loader, parallel-webpack, happypack多进程打包

借助node里面的多进程来帮助我们提升打包速度.

8. 合理使用sourceMap

sourceMap越完整,打包出来的代码的体积就会越大,打包速度就会越慢

9. 结合stats分析打包结果

利用目前已有的可视化工具,结合stats.json帮助我们分析是哪些模块占据了打包后的代码的体积,那些模块托慢了打包速度,从而进行有针对性的优化.

10. 开发环境内存编译.

11. 开发环境无用插件剔除

比如一些代码压缩插件在开发环境是不需要的.

### 多页面打包配置


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
        // 通过dllPlugin来打包公共模块,下次打包则不需要对公共模块做重复打包,
        // 直接引入模块对应的dll文件即可
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

### loader和plugin

1. loader的作用: 帮助我们去处理模块,当我们需要对代码的逻辑做一层包装的时候就可以编写一个对应的loader.比如: 我们需要实现界面展示的国际化, 需要对函数添加异常捕获等.

2. 编写一个loader的大致流程:

* 1.创建loader对应的文件夹,以及js,编写对应的处理逻辑,代码示例:

        const LoaderUtils = require('loader-utils');
        // loaders的导出函数最好不要使用箭头函数,因为使用箭头函数你会找不到想要的this.
        module.exports = function(source) {
            const options = LoaderUtils.getOptions(this);
            const result = source.replace('dongdong', options.name);
            return this.callback(null, result);  
        }

* 2.在webpack中做以下配置

        // 这里我们把编写的loaders放在loaders目录中
        // loaders的查找顺序,先从node_modules里查找,然后从loaders中查找
        resolveLoader: {
            modules: ['node_modules', './loaders']
        },
        // 这样我们就对js文件引入了两个loader
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

3. plugin的作用: plugin生效的场景,在打包的某个时刻想要做一些处理逻辑的时候,比如: 在新的打包代码生成的时候先清空dist目录的插件(clean-webpack-plugin),多用于文件的创建和移除操作.

4. 编写一个plugin的大致流程:

我们一起来写一个在打包后的代码中创建一个copyright.txt的文本的plugin.

* 1.在项目下创建plugins文件夹,创建copyright-webpack-plugin.js文件,示例代码如下:

        class CopyrightWebpackPlugin {
            constructor(options) {
            }
            apply(compiler) {
                // compiler 是webpack的实例
                // compiler hook,我们可以拿到webpack的生命周期,
                // 所以可以让我们在特定的时刻做一些处理逻辑
                // compile是一个同步的钩子函数
                compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
                    console.log('compiler')
                })
                // emit是一个异步的钩子函数
                compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
                    debugger;
                    compilation.assets['copyright.txt'] = {
                        source:function() {
                            return 'copyright by muzishuiji'
                        },
                        size: function() {
                            return 21;
                        }
                    }
                    cb();
                })
            }
        }
        module.exports = CopyrightWebpackPlugin;

* 2.在webpack中进行以下配置

        // 引入对应的插件
        const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin.js');
        // 实例化plugin
        plugins: [
            new CopyrightWebpackPlugin()
        ]

5. loader是一个函数,插件是一个类.因为插件通常是一个构造函数,在使用的时候实例化一个对象.

### bundler源码编写

当我们要对一个项目做打包的时候,我们首先需要对项目的入口文件用到的模块做分析,然后在对其他的入口文件引入的模块做分析.

1. 解析对应文件的依赖

        const moduleAnalyser = (filename) => {
            const content = fs.readFileSync(filename, 'utf-8');
            // 生成抽象语法树ast
            const ast = parser.parse(content, {
                sourceType: 'module'
            })
            const dependencies = {}
            // 对入口文件的依赖分析
            traverse(ast, {
                // 引入语模块的语句
                ImportDeclaration({node}) {
                    const dirname = path.dirname(filename)
                    const newFile = dirname + node.source.value.replace("./", "/");
                    dependencies[node.source.value] = newFile;
                }
            })     
            // ast, code, options
            // code即为编译生成的,可在浏览器上运行的代码
            const { code } = babel.transformFromAst(ast, null, {
                presets: ["@babel/preset-env"]
            })
            return {
                filename,
                code,
                dependencies
            }
        }

2. dependencies Graph(依赖图谱)

        const makeDependenciesGraph = (entry) => {
            const entryModule = moduleAnalyser('./src/index.js');
            // 借用队列实现递归调用
            const graphArray = [ entryModule ]
            for(let i = 0; i < graphArray.length; i++) {
                const item = graphArray[i];
                const { dependencies } = item;
                if(dependencies) {
                    for(let j in dependencies) {
                        graphArray.push(
                            moduleAnalyser(dependencies[j])
                        )
                    }
                }
            }
            const graph = {}
            graphArray.forEach(item => {
                graph[item.filename] = {
                    dependencies: item.dependencies,
                    code: item.code
                }
            });
            return graph;
        }

3. 完整源代码

        const fs = require('fs');
        const parser = require('@babel/parser');
        const traverse = require('@babel/traverse').default;
        const babel = require('@babel/core');
        const path = require('path');
        const moduleAnalyser = (filename) => {
            const content = fs.readFileSync(filename, 'utf-8');
            // 生成抽象语法树ast
            const ast = parser.parse(content, {
                sourceType: 'module'
            })
            const dependencies = {}
            // 对入口文件的依赖分析
            traverse(ast, {
                // 引入语模块的语句
                ImportDeclaration({node}) {
                    const dirname = path.dirname(filename)
                    const newFile = dirname + node.source.value.replace("./", "/");
                    dependencies[node.source.value] = newFile;
                }
            })
            
            // ast, code, options
            // code即为编译生成的,可在浏览器上运行的代码
            const { code } = babel.transformFromAst(ast, null, {
                presets: ["@babel/preset-env"]
            })
            return {
            filename,
            code,
            dependencies
            }
        }

        // 创建依赖图谱
        // 返回一个文件和图谱对应的map结构
        const makeDependenciesGraph = (entry) => {
            const entryModule = moduleAnalyser('./src/index.js');
            // 借用队列实现递归调用
            const graphArray = [ entryModule ]
            for(let i = 0; i < graphArray.length; i++) {
                const item = graphArray[i];
                const { dependencies } = item;
                if(dependencies) {
                    for(let j in dependencies) {
                        graphArray.push(
                            moduleAnalyser(dependencies[j])
                        )
                    }
                }
            }
            const graph = {}
            graphArray.forEach(item => {
                graph[item.filename] = {
                    dependencies: item.dependencies,
                    code: item.code
                }
            });
            return graph;
        }

        // 
        const gernerateCode = (entry) => {
            const graph =JSON.stringify(makeDependenciesGraph(entry));
            return `
                (function(graph) {
                    function require(module) {
                        function localRequire(relativePath) {
                            return require(graph[module].dependencies[relativePath])
                        }
                        var exports = {};
                        (function(require, exports, code) {
                            eval(code);
                        })(localRequire, exports, graph[module].code);
                        return exports;
                    };
                    require('${entry}')
                })(${graph})
            `
        }
        const generate = gernerateCode('./src/index.js');
        console.log(generate)

### 通过CreateReactApp深入学习webpack配置


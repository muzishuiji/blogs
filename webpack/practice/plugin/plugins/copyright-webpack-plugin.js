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

const LoaderUtils = require('loader-utils');

module.exports = function(source) {
    const options = LoaderUtils.getOptions(this);
    // 异步的写法
    const callback = this.async();
    setTimeout(() => {
        const result = source.replace('hello', options.name);
        callback(null,result);
    }, 1000);
}
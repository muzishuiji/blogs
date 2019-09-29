const LoaderUtils = require('loader-utils');
// loaders的导出最好不要使用箭头函数,因为使用箭头函数你会找不到想要的this.
module.exports = function(source) {
    const options = LoaderUtils.getOptions(this);
    const result = source.replace('lijie', options.name);
    // error, content, sourcemap, meta
    return this.callback(null, result);  
}
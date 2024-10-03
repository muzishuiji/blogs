
/**
 * 简易版本的commonjs模块化的实现
 */

//模块定义
var modules = {
    "./src/name.js": (module, exports, require) => {
      module.exports = "不要秃头啊";
    },
  };
  var cache = {};
  
  //接受模块的路径为参数，返回具体的模块的内容
  function require(modulePath) {
    var cachedModule = cache[modulePath]; //获取模块缓存
    if (cachedModule !== undefined) {
      //如果有缓存则不允许模块内容，直接retuen导出的值
      return cachedModule.exports;
    }
    //如果没有缓存，则定义module对象，定义exports属性
    //这里注意！！！module = cache[modulePath] 代表引用的是同一个内存地址
    var module = (cache[modulePath] = {
      exports: {},
    });
    //运行模块内的代码，在模块代码中会给module.exports对象赋值
    modules[modulePath](module, module.exports, require);
  
    //导入module.exports对象
    return module.exports;
  }
  
  (() => {
    let author = require("./src/name.js");
    console.log(author, "author");
  })();
  
/**
 * 简易版本的es module模块化的实现
 */

// 导出示例
const author = "muzishuiji";

export const age = "18";
export default author;

// 使用示例
import author, { age } from './name';
console.log(author, 'author');
console.log(age, "age")

// 将导出内容挂载到exports对象上，给exports赋值是通过代理实现的
const exports = {
    age: '18',
    default: 'muzishuiji'
}

// 模块引用时
import author from './name';
// 等价于
const exports = require('./name')

import { age } from './name';
const age = exports.age;

// 简易版本的实现
var modules = {
    './name.js': (module, exports, require) => {
        // 给模块设置tag：标识这是一个es module
        require.setModuleTag(exports);
        // 同代理给exports设置属性值
        require.defineProperty(exports, {
            age: () => age,
            default: () => DEFAULT_EXPORT,
        });

        const author = "muzishuiji";
        const age = 18;
        const DEFAULT_EXPORT = author;
    }
}

var cache = {};
function require(moduleId) {
    var cacheModule = cache[moduleId];
    if(cacheModule !== undefined) {
        return cacheModule.exports;
    }
    var module = (cache[moduleId] = {
        exports: {},
    });
    modules[moduleId](module, module.exports, require);
    return module.exports;
}

// 对exports对象做代理
require.defineProperty = (exports, definition) => {
    for(var key in definition) {
        Object.defineProperties(exports, key, {
            enumerable: true,
            get: definition[key],
        })
    }
}

// 标记模块类型为esmodule
require.setModuleTag = (exports) => {
    Object.defineProperties(exports, Symbol.toStringTag, {
        value: 'Module',
    });
    Object.defineProperties(exports, '__esModule', {
        value: true,
    });
}

// mainjs编译后的代码
var _name__WEBPACK_IMPORTED_MODULE_0__ = require('./name.js');
// 访问default其实是访问的DEFAULT_EXPORT变量，访问age属性时，访问的事age变量 
console.log(_name__WEBPACK_IMPORTED_MODULE_0__['default'], 'author');
console.log(_name__WEBPACK_IMPORTED_MODULE_0__.age, 'age');
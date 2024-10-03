var modules = {
    './src/name.js': (module) => {
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
};

var cache = {};
function require(modulePath) {
    var cachedModule = cache[modulePath];
    if (cachedModule !== undefined) {
        return cachedModule.exports;
    }
    var module = (cache[modulePath] = {
        exports: {},
    });
    module[modulePath](module, module.exports, require);
    return module.exports;
}

require.n = (module) => {
    var getter =
        module && module.__esModule ? () => module['default'] : () => module;
    require.defineProperty(getter, {
        // 随便找一个属性赋值，为了走defineProperty这段逻辑
        a: getter,
    });
    return getter;
}

require.defineProperty = (target, definition) => {
    for(var key in definition) {
        Object.defineProperties(target, {
            enumerable: true,
            get: definition[key]
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

var __webpack_exports__ = {};
(() => {
    "use strict";
    require.setModuleTag(__webpack_exports__);
    var _name__WEBPACK_IMPORTED_MODULE_0__ = require('./name.js');
    var _name__WEBPACK_IMPORTED_MODULE_0__default = require.n(_name__WEBPACK_IMPORTED_MODULE_0__);
    console.log(_name__WEBPACK_IMPORTED_MODULE_0__default(), 'author')
})();
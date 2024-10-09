# 深拷贝与浅拷贝

关于深拷贝与浅拷贝,我们首先需要清楚,对于基本类型的数据是不存在深浅拷贝的概念的,基本数据类型之间的复制操作都是完全的复制,申请一块新的内存,存放和被复制对象相同的值.

所以深拷贝与浅拷贝的研究对象就是引用类型的数据.

## 概念与区别

    var b = copy(a);

浅拷贝就是对一个变量的不完全拷贝,修改变量 a 或者 b 其中一个变量的修改会对另一个变量造成影响.

深拷贝是一个变量的完全拷贝,对变量 a 或者变量 b 其中一个变量的修改的修改不会对另一个变量造成影响.

## 浅拷贝

实现一个简单的浅拷贝:

    function clone(target) {
        let cloneTarget = {};
        for(const key in target) {
            cloneTarget[key] = target[key];
        }
        return cloneTarget;
    }

## 深拷贝

### 乞丐版实现

    JSON.parse(JSON.stringify(obj))

### 初版实现

    function deepClone(target) {
        if(typeof target !== 'object') {
            return target
        }
        let cloneTarget = {}
        for(const key in target) {
            cloneTarget[key] = deepClone(target[key])
        }
        return cloneTarget
    }

### 考虑数组

    function deepClone(target) {
        if(typeof target !== 'object') {
            return target
        }
        let cloneTarget = Array.isArray(target) ? [] : {};
        for(const key in target) {
            cloneTarget[key] = deepClone(target[key])
        }
        return cloneTarget
    }

### 循环引用

为了解决循环引用,我们可以利用 Map 数据结构键值可以是对象的特性.

    function deepClone(target, map = new Map()) {
        if(typeof target !== 'object') {
            return target
        }
        let cloneTarget = Array.isArray(target) ? [] : {}
        if(map.get(target)) {
            return map.get(target)
        }
        map.set(target, cloneTarget)
        for(const key in target) {
            cloneTarget[key] = deepClone(target[key], map)
        }
        return cloneTarget
    }

#### 使用 weakMap 代替 map

考虑到拷贝的变量过大时,占用内存会很多,利用弱引用的机制,若一个变量时弱引用的,则被认为是不可访问的(或弱访问的),因此可能在任何时刻被回收,这样可以有效利用垃圾回收机制,合理使用内存.

    function deepClone(target, map = new WeakMap()) {
        if(typeof target !== 'object') {
            return target
        }
        let cloneTarget = Array.isArray(target) ? [] : {}
        if(map.get(target)) {
            return map.get(target)
        }
        map.set(target, cloneTarget)
        for(const key in target) {
            cloneTarget[key] = deepClone(target[key], map)
        }
        return cloneTarget
    }

### 性能优化

用 while 来替代 for...in,提高代码的执行效率

    function forEach(array, iteratee) {
        let index = -1;
        const length = array.length;
        while(++index < length) {
            iteratee(array[index], index);
        }
        return array;
    }
    function deepClone(target, map = new WeakMap()) {
        if(typeof target !== 'object') {
            return target;
        }
        const isArray = Array.isArray(target);
        let cloneTarget = isArray ? [] : {};
        if(map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);

        const keys = isArray ? undefined : Object.keys(target);
        forEach(keys || target, (value, key) => {
            if(keys) {
                key = value
            }
            cloneTarget[key] = deepClone(target[key], map);
        })
        return cloneTarget;
    }

### 继续优化

    const mapTag = '[object Map]';
    const setTag = '[object Set]';
    const arrayTag = '[object Array]';
    const objectTag = '[object Object]';
    const argsTag = '[object Arguments]';
    const boolTag = '[object Boolean]';
    const dateTag = '[object Date]';
    const numberTag = '[object Number]';
    const stringTag = '[object String]';
    const symbolTag = '[object Symbol]';
    const errorTag = '[object Error]';
    const regexpTag = '[object RegExp]';
    const funcTag = '[object Function]';
    const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];
    function forEach(array, iteratee) {
        let index = -1;
        const length = array.length;
        while (++index < length) {
            iteratee(array[index], index);
        }
        return array;
    }
    function isObject(target) {
        const type = typeof target;
        return target !== null && (type === 'object' || type === 'function');
    }
    function getType(target) {
        return Object.prototype.toString.call(target);
    }
    function getInit(target) {
        const Ctor = target.constructor;
        return new Ctor();
    }
    function cloneSymbol(targe) {
        return Object(Symbol.prototype.valueOf.call(targe));
    }
    function cloneReg(targe) {
        const reFlags = /\w*$/;
        const result = new targe.constructor(targe.source, reFlags.exec(targe));
        result.lastIndex = targe.lastIndex;
        return result;
    }
    function cloneFunction(func) {
        const bodyReg = /(?<={)(.|\n)+(?=})/m;
        const paramReg = /(?<=\().+(?=\)\s+{)/;
        const funcString = func.toString();
        if (func.prototype) {
            const param = paramReg.exec(funcString);
            const body = bodyReg.exec(funcString);
            if (body) {
                if (param) {
                    const paramArr = param[0].split(',');
                    return new Function(...paramArr, body[0]);
                } else {
                    return new Function(body[0]);
                }
            } else {
                return null;
            }
        } else {
            return eval(funcString);
        }
    }
    function cloneOtherType(targe, type) {
        const Ctor = targe.constructor;
        switch (type) {
            case boolTag:
            case numberTag:
            case stringTag:
            case errorTag:
            case dateTag:
                return new Ctor(targe);
            case regexpTag:
                return cloneReg(targe);
            case symbolTag:
                return cloneSymbol(targe);
            case funcTag:
                return cloneFunction(targe);
            default:
                return null;
        }
    }
    function deepClone(target, map = new WeakMap()) {
        // 克隆原始类型
        if (!isObject(target)) {
            return target;
        }
        // 初始化
        const type = getType(target);
        let cloneTarget;
        if (deepTag.includes(type)) {
            cloneTarget = getInit(target, type);
        } else {
            return cloneOtherType(target, type);
        }
        // 防止循环引用
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        // 克隆set
        if (type === setTag) {
            target.forEach(value => {
                cloneTarget.add(clone(value, map));
            });
            return cloneTarget;
        }
        // 克隆map
        if (type === mapTag) {
            target.forEach((value, key) => {
                cloneTarget.set(key, clone(value, map));
            });
            return cloneTarget;
        }
        // 克隆对象和数组
        const keys = type === arrayTag ? undefined : Object.keys(target);
        forEach(keys || target, (value, key) => {
            if (keys) {
                key = value;
            }
            cloneTarget[key] = deepClone(target[key], map);
        });

        return cloneTarget;
    }
    module.exports = {
        deepClone
    };

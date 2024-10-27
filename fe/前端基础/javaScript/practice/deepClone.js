
// 乞丐版
// 乞丐版的实现有很多弊端，不能正确处理一些引用类型的拷贝，例如函数的拷贝，和解决循环引用的问题
function deepClone(target) {
    return JSON.parse(JSON.stringify(target));
}   
// 简易版
function deepClone(target, map = new WeakMap()) {
    if(typeof target !== 'object') {
        return target;
    }
    if(map.get(target)) return map.get(target)
    let cloneTraget = Array.isArray(target) ? [] : {}
    map.set(target, cloneTraget)
    for(const key in target) {
        cloneTraget[key] = deepClone(target[key], map)
    }
    return cloneTraget;
}
let obj1 = {
    a: 2,
    b: 3,
    c: function() {
        console.log('sdfsdfsd')
    }
}
deepClone(obj1)
let obj2 = {
    a: 2,
    b: 3,
    c: function() {
        console.log('sdfsdfsd')
    },
    d: {
        e: this.c
    },
    e:  /^fff/
}
deepClone(obj2)

// TODO: 持续优化，处理日期类型，正则类型，symbol等数据类型的正确拷贝。


// 如果比较完善的处理方法，可以将相关的判断逻辑都抽象成helper
// 一个更完善的，拥有各种数据类型判断的，可以处理循环依赖的方法
function deepClone(target, hash = new WeakMap()) {
    if(target === null || typeof target !== 'object') {
        return target;
    }
    if(target instanceof Date) {
        return new Date(target);
    }
    if(target instanceof RegExp) {
        return new RegExp(target);
    }
    if(hash.has(target)) {
        return hash.get(target);
    }
    let copy = Array.isArray(target) ? [] : {};
    hash.set(target, copy);
    Object.keys(target).forEach(key => {
        copy[key] = deepClone(target[key], hash);
    });
    return copy;
}
let obj2 = {
    a: 2,
    b: 3,
    c: function() {
        console.log('sdfsdfsd')
    },
    d: {},
    e:  /^fff/
}
obj2.d.e = obj2.c;
const copyObj2 = deepClone(obj2);
console.log(copyObj2.d === obj2.d); // false

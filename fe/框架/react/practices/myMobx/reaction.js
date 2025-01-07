// 进行依赖收集。作为observable 和 autorun 之间的桥梁
// 定义两个全局变量，源码的简单实现
let nowFn = null; // 这个表示当前autorun中的handler方法
let counter = 0; // 这里用counter记录一个计数器值作为每个observable属性的id值进行和nowFn进行绑定

class Reaction {
    constructor() {
        // 标识每一个proxy对象
        // 这里采用一个比较low的方法简易实现的，在每次对observable属性进行Proxy的时候，对Proxy进行标记
        this.id = ++counter;
        // 存储当前观察对象的nowFn，写入的形式如{id: [nowFn]}
        this.store = {};
    }

    collect() {
        // 进行依赖收集，只有当前有autorun绑定了相关属性观察后才会进行绑定
        if(nowFn) {
            this.store[this.id] = this.store[this.id] || [];
            this.store[this.id].push(nowFn);
        }
    }

    run() {
        if(this.store[this.id]) {
            this.store[this.id].forEach(fn => {
                fn()
            })
        }
    }
    // 定义两个静态方法，用于在调用autorun方法时候对nowFn进行设置和消除
    static start(handler) {
        nowFn = handler;
    }
    // 在注册绑定这个就要清空当前的nowFn，用于之后进行进行搜集绑定
    static end() {
        nowFn = null
    }
}

// 实现autorun方法，进行简单的依赖收集
export default function autorun(handler) {
    if(typeof handler !== "function"){
        throw new TypeError(`autorun function expect a function but get a ${typeof handler}`)
    } 
    // 开始依赖收集，设置Reaction的nowFn
    Reaction.start(handler);
    // 执行一次handler，在handler中有相对于响应属性的getter获取，此时就可以设置更改属性的proxy的reaction的状态依赖
    handler()
    // 清除nowFn
    Reaction.end()
}

// atom是mobx内部的一个抽象，表示一个可观察的最小单元，每个observable状态背后都有一个或多个atom
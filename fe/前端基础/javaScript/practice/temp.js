// 防抖节流
// 防抖：事件在被触发n秒后再执行，如果n秒内再次触发，则重新计时
function myDebounce(fn, wait) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, wait);
    }
}
const debounceSearch = myDebounce(search, 200);

// 节流：一个单位时间内，只触发一次函数。如果这个单位时间内，触发多次函数，则只有一次生息哦啊

function myThrottle(fn, wait) {
    let timer = null
    return function(...args) {
        let context = this;
        if(!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                clearTimeout(timer);
                timer = null;
            }, wait);
        }
    }
}

function myThrottle1(fn, wait) {
    let startTime = 0;
    return function (...args) {
        let context = this;
        let current = Date.now()
        if(current - startTime >= wait) {
            fn.apply(context, args);
            startTime = Date.now();
        }
    }
}

Function.prototype.myCall = function (context, args) {
    const fn = Symbol();
    context[fn] = this;
    let result = context[fn](...args)
    delete context[fn];
    return result;
}

// new
function myNew(fn) {
    let obj = {};
    obj.__proto__ = fn.prototype;
    let args = Array.prototype.slice.call(arguments, 1);
    let res = fn.apply(obj, args);
    return res instanceof Object ? res : obj;
}

// Object.create 创建一个以传入对象为原型的对象
function myCreate(obj) {
    function F() {}
    if(obj && typeof obj === 'object') {
        F.prototype = obj;
    }
    return new F();
}
// tsc --noEmit 检查ts代码不会将ts生成编译文件


// with语句主要用于扩展一个语句的作用域链


// promise
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
    constructor(executor) {
        this._value = undefined;
        this._reason = undefined;
        this._status = PENDING;
        this._resolveQueue = [];
        this._rejectQueue = []

        let _resolve = (value) => {
            queueMicrotask(() => {
                if(this._status === PENDING) {
                    this._value = value;
                    this._status = FULFILLED;
                    while(this._resolveQueue.length) {
                        let cb = this._rejectQueue.pop();
                        cb(value)
                    }
                }
            })
        }

        let _reject = (reason) => {
            queueMicrotask(() => {
                if(this._status === PENDING) {
                    this._reason = reason;
                    this._status = REJECTED;
                    while(this._rejectQueue.length) {
                        let cb = this._rejectQueue.pop();
                        cb();
                    }
                }
            })
        }

        executor(_resolve, _reject);
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; }
        let promise = new MyPromise((resolve, reject) => {
            let resolveFn = () => {
                try {
                    let x = onFulfilled(this._value);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch(err) {
                    reject(err);
                }
            }
            let rejectFn = (reason) => {
                try {
                    let x = onRejected(reason);
                    x instanceof MyPromise ? x.then(resolve, reject) : reject(reason)
                } catch(err) {
                    reject(err)
                }
            }
            switch(this._status) {
                case PENDING:
                    this._resolveQueue.push(resolveFn);
                    this._rejectQueue.push(rejectFn);
                    break;
                case FULFILLED:
                    resolveFn();
                    break;
                case REJECTED:
                    rejectFn();
                    break;
            }
        })
    }
}
MyPromise.prototype.resolve = function (value) {
    if(value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
}

MyPromise.prototype.reject = function(reason) {
    return new MyPromise((resolve, reject => reject(reason)))
}
MyPromise.all = function (promises) {
    let result = [];
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise).then(value => {
                result.push(value)
                if(result.length === promises.length) {
                    resolve(result)
                }
            }, err => reject(err))
        });
    })
}
MyPromise.race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise).then(value => {
                resolve(value)
            }, err => reject(err))
        });
    })
}
// finally 返回promise的同时执行callback



// 一些并发任务调度
class TaskPool {
    constructor(maxCount) {
        this.maxCount = maxCount;
        this.queue = [];
        this.runningCount = 0;
    }
    add(task) {
        this.queue.push(task);
        this.run();
    }
    run() {
        if(this.queue.length && this.runningCount < this.maxCount) {
            let task = this.queue.shift();
            this.runningCount++;
            return Promise.resolve(task()).then(() => {
                this.runningCount--;
                this.run();
            })
        }
    }
}
const taskpool = new TaskPool(2);

for (let i = 0; i < 10; i++) {
    const task = () => new Promise(resolve => {
        // 这里 i 的值也是以前非常高频的闭包题哦
        setTimeout(() => {
            console.log(`task${i} complete`);
            resolve(`task${i}`);
        }, 2000);
    });
    taskpool.add(task);
}

function schedule(n) {
    let maxCount = n;
    let runningCount = 0;
    return function runTasks(tasks) {
        let queue = tasks.slice();
        let taskLen = tasks.length;
        let result = []
        return new Promise((resolve, reject) => {
            let run = () => {
                while(queue.length && runningCount < maxCount) {
                    let task = queue.shift();
                    runningCount++;
                    Promise.resolve(task()).then(res => {
                        result.push(res);
                        if(taskLen === result.length) {
                            resolve(result);
                        }
                    }).finally(() => {
                        runningCount--;
                        run();
                    })
                }
            }
            run();
        })
    }
}
const runTask = schedule(4);

const tasks = new Array(10).fill(0).map((x, i) => () => new Promise(resolve => {
    setTimeout(() => {
        console.log(`task${i} complete`);
        resolve(`task${i}`);
    }, 2000);
}));

runTask(tasks).then(console.log);
// loader主要用于转换代码逻辑，后引入的先执行。
// plugin本身是一种事件流机制，到了固定的打包时间节点就广播特定的事件，用户可以在事件里执行特定的转换逻辑，类似于生命周期的概念
// 

// 存在一个正整数的坐标系，输入一个数组，数组的元素都是这个坐标系的坐标 [x, y]，现在需要将输入的坐标数组拆分为若干个子数组，
// 具有相邻关系（上下左右相邻）的坐标需要分配到同一个子数组中
// input 内坐标是无序的
const input = [
    [0, 0],
    [1, 1],
    [3, 1],
    [1, 2],
    [3, 2],
    [2, 3],
    [1, 4],
    [2, 4],
    [4, 4],
    [4, 5],
    [3, 4]
]
function getNears(x) {
    // 边界判断
    return [[x[0], x[1] - 1], [x[0] - 1, x[1]], [x[0] + 1, x[1]], [x[0], x[1] + 1]];
}
// 遍历分组
function groupBy(input) {
    let len = input.length;
    // 从左下角开始往右上角合并
    let i =0, j = 0, res =[];
    let obj = {}
    for(const item of input) {
        obj[`${item[0]}${item[1]}`] = true;
    }

    const dfs = (data, res, obj) => {
        delete obj[`${data[0]}${data[1]}`]; 
        let nears = getNears(data);
        // 过滤已经处理或不存在的节点
        nears = nears.filter(item => obj[`${item[0]}${item[1]}`]);
        if(!nears.length) {
            return res;
        }
        for(let near of nears) {
            res.push(near)
            dfs(near, res, obj)
        }
    }

    while(i < len) {
        let current = input[i];
        if(obj[`${current[0]}${current[1]}`]) {
            let group = [current];
            dfs(current, group, obj)
            res.push(group)
        }
        i++
        
    }
    return res;

}
console.log(groupBy(input))



//Proxy实现响应式
const reactive = (target) => {
    return new Proxy(target, {
        get(target, key, receiver) {
            // 依赖收集：记录哪个组件访问了这个数据；
            track(target, key);
            return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver) {
            const result = Reflect.set(target, key, value, receiver);
            // 触发更新：只更依赖这个数据的组件
            trigger(target, key);
            return result;
        }
    })
}

function patchKeyedChildren(oldChildren, newChildren) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldChildren.length - 1;
    let newEndIdx = newChildren.length - 1;
    while(oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if(oldChildren[oldStartIdx] === null) {
            oldStartIdx++;
        } else if(oldChildren[oldEndIdx] === null) {
            oldEndIdx--;
        } else if(oldChildren[oldStartIdx] === newChildren[newStartIdx]) {
            // 头部相同，继续比较
            patch(oldChildren[oldStartIdx], newChildren[newStartIdx]);
            oldStartIdx++;
            newStartIdx++;
        } else if(oldChildren[oldEndIdx] === newChildren[newEndIdx]) {
            // 尾部相同，继续比较
            patch(oldChildren[oldEndIdx], newChildren[newEndIdx]);
            oldEndIdx--;
            newEndIdx--;
        } else if(oldChildren[oldStartIdx] === newChildren[newEndIdx]) {
            // 头部和尾部相同，继续比较
            patch(oldChildren[oldStartIdx], newChildren[newEndIdx]);
            parent.insertBefore(oldChildren[oldStartIdx].el, oldEndVnode.el.nextSibling);
            oldStartIdx++;
            newEndIdx--;
        } else if(oldChildren[oldEndIdx] === newChildren[newStartIdx]) {
            // 尾部和头部相同，继续比较
            patch(oldChildren[oldEndIdx], newChildren[newStartIdx]);
            parent.insertBefore(oldChildren[oldEndIdx].el, oldStartVnode.el);
            oldEndIdx--;
            newStartIdx++;
        } else {
            // 以上四种情况都不满足，则需要遍历查找
            let oldKeyToIdx = new Map();
            for(let i = oldStartIdx; i <= oldEndIdx; i++) {
                oldKeyToIdx.set(oldChildren[i].key, i);
            }
            let idxInOld = oldKeyToIdx.get(newChildren[newStartIdx].key);
            if(idxInOld === undefined) {
                // 新节点在旧节点中不存在，直接插入
            } else {
                // 新节点在旧节点中存在，则进行patch
                patch(oldChildren[idxInOld], newChildren[newStartIdx]);
                oldChildren[idxInOld] = null;
            }
            newStartIdx++;
        }
    }
    if(oldStartIdx <= oldEndIdx) {
        // 旧节点有剩余，删除
        for(let i = oldStartIdx; i <= oldEndIdx; i++) {
            if(oldChildren[i] !== null) {
                parent.removeChild(oldChildren[i].el);
            }
        }
    }
}

// then 方法的参数是 promise变为resolve状态的value
// js 是单线程的，因为多线程又会涉及竞态条件，数据同步问题，以及复杂的锁逻辑的处理
// 但可以借助事件循环和异步编程，来实现高并发处理
// 浏览器的GUI渲染线程和js引擎互为护持关系，当js引擎执行时GUI线程会被挂起
// 问了不阻塞dom解析，加速首屏渲染，应该将script标签放在底部，或者给script标签添加defer或者async属性
// defer可执行有依赖关系的js，不会阻塞dom执行，可访问dom，下载完后才开始解析执行
// async边下载边执行，不适合执行有依赖关系的js，会阻塞dom解析，访问dom时可能会报错；
// 三次握手主要是为了确认双方的发送能力和接收能力都正常；
/**
 * 1. 应用层（DNS、http协议）DNS将域名解析为IP地址并发送HTTP请求，OSI参考模型中靠近用户的一层；
 * 2. 传输层（TCP、UDP）建立TCP连接（三次握手），客户端和服务端数据传输就是在这层进行的；
 * 3. 网络层（IP、ARP地址解析协议）IP寻址及路由选择，所起的作用就是在众多的选项内选择一条传输线路；
 * 4. 数据链路层：用来处理连接网络的硬件部分，硬件上的范畴均在链路层的作用范围之内；
 * 
 * 从应用层的dns解析，将域名解析为IP地址，并发送http请求，到传输层通过三次握手建立tcp/ip连接，再到网络层的ip寻址
 * 再到数据层的封装成帧，利用物理介质传输；
 * 一个请求的内容：
 * - 请求行
 * - 请求头
 * - 空行（空行是必须的，表示请求头结束，请求头和正文之间的分隔符）
 * - 请求征文
 * 
 * 报头压缩算法HPACK算法，
 * 服务端推送：服务器主动将相关资源预测性的推给客户端，减少后续的请求和延迟
 * 
 * 下载和解析css的工作是在预解析线程中进行的，这是css不回阻塞html解析的根本原因。
 * 考虑到js代码的执行可能修改dom，所以js的下载解析执行，和dom的解析haz执行呼哧js会阻塞html的解析，和dom树的生成
 * 解析html生成dom树的过程：字节数据 --> 字符串 --> token --> Node --> DOM
 * 解析css生成cssom：字节数据 --> 字符串 --> token --> Node --> CSSOM
 * dom树和cssom树合并成渲染树，这一过程不是简单的合并，而是会过滤掉不需要显示的节点
 * 主线程会遍历得到的dom树，依次为树中的每个节点计算出它最终的样式，称之为computed style
 * 这一过程中，很多预设值会变成绝对值，相对单位会变成绝对单位，最终得到一个带有样式的dom树
 * 主线程会使用一套复杂的策略对整个布局树进行分层。
 * 分层的好处在于，将来某一个层改变后，仅会对该层进行后续处理，从而提升效率
 * 滚动条、堆叠上下文、transform、opacity等样式都会或多或少的影响分层结果，也可以通过will-change属性更大程度的影响分层结果。
 * 绘制：主线程会为每个层单独产生绘制指令集，用于描述这一层的内容该如何画出来。完成绘制后，主线程将每个涂层的绘制信息提交给合成线程，
 * 剩余工作由合成线程完成。（分层绘制）
 * 合成线程首先对每个图层进行分块，将其划分为更多的小区域。
 * 它会从线程池拿取多个线程来完成分块工作。
 * 渲染完成后，渲染线程的工作到此为止，则会移交控制权给其他线程。
 * 
 * 浏览器会讲多次操作导致的布局树的反复计算合并起来，当一轮事件循环结束后，会进行统一计算，改动属性造成的回流时异步完成的。
 * 但为了保证js获取布局属性时，可以获取到最新的布局信息，浏览器在反复权衡下，最终决定获取属性（比如dom.clientWidth）立即 回流
 * 使用css的transform和opacity属性来创建动画
 * 使用requestAnimationFrame方法调度动画帧，确保动画在浏览器重绘周期内执行，从而避免不必要的回流，这种方式可以确保动画在最佳时间点进行渲染。
 * vue虚拟dom的渲染优化，就是用的文档片段来做diff，然后一次性插入到dom中，避免触发多次回流
 * 
 * cssom的构建会阻塞渲染，只有cssom构建完毕后才会进入下一个阶段构建渲染树，这点与浏览器优化有关，防止css规则不断改变，避免了重复的构建。
 * JS引擎线程和GUI渲染线程是互斥的
 * 
 * 下载和解析css的工作是在预解析线程中进行的，css的加载和解析不回溯则HTML的加息。
 * script 整体代码，整个js文件本身就是一个宏任务，当浏览器加载一个script标签时，它会作为一个宏任务被执行。
 * 宏任务：script包裹的js代码。setTimeout，setInterval， IO操作（网络请求、文件读写等）
 * 微任务：promis.then,promise.catch,promise.finally当promise状态变化时，相应的回调会被加入微任务队列)
 * mutationObserver（监听的dom发生变化时，会被加入微任务队列），queueMicrotask（一个专门用于将任务加入问任务队列的api），process.nextTick(nodejs环境中特有的微任务，优先级高于Promise)
 * 一次事件循环：取出一个宏任务并执行，接着清空微任务队列，此为一个事件循环
 * 
 * 多次触发的mutationObserver回调会被合并为一次
 * requestAnimationFrame，下一次重绘前执行的回调
 * 
 * 不会发生重新排序，添加或者删除的列表，是可以使用index作为key的。分页滚动加载的话用index作为key和用id作为key没区别，
 * 如果是虚拟列表，用index作为key反而能够提升性能。key的主要作用是用来复用节点，避免不必要的渲染。
 * 
 * 为什么不推荐用index作为key，主要问题如下：
 * 1. 性能问题：当列表项重新排序时，react会认为每个项都发生了变化，导致不必要的重渲染；
 * 2. 状态错乱：如果列表项有内部状态（如表单输入），重新排序后状态会错位；
 * 3. 动画问题：可能会导致动画效果异常；
 * 
 * 大量图片加载的弊端：
 * 1. 网络带宽的浪费，可能下面的图片没看，造成不必要的流量浪费；
 * 2. 页面加载速度慢，大量的图片请求比较耗时，阻塞页面渲染，可能会导致页面无有效内容渲染的时间过长，白屏时间过长；
 * 3. 服务器压力大：短时间内的大量图片请求会给服务器带来巨大的压力，影响服务器的响应速度和稳定性；
 * 4. 浏览器性能下降：图片解码和渲染会占用大量的cpu和内存资源，导致页面卡顿，影响交互流畅性；‘
 * 
 * 页面，解析html
 * 
 * 可通过访问触发回流的属性来强制触发渲染。
 * 图片未进入视野时可以给一个兜底图，当图片进入视野时，再将真实的url从其他地方（data-original）取出，赋值给image的src属性，触发图片加载。
 * webp：保证图片质量的同时体积更小
 * 
 * diff过程节点类型不同，则直接删除重建，节点类型相同，则可以通过key来确定是否要复用节点
 * react采用启发式算法，使得可以在O(n)的时间复杂度下完成dom diff逻辑
 * 当列表是静态的且不存在表单项、不会删除、添加、或者重新排序，使用index作为key是安全的，如果是虚拟列表，使用index作为key的性能反而比使用id作为key好
 * 
 * 
 * useLayoutEffect的执行时机在DOM更新之后，浏览器绘制之前同步执行。它会阻塞浏览器的绘制过程，
 * 如果这个过程耗时比较久，会导致卡顿。
 * useLayoutEffect(() => {
 * // 副作用代码，会阻塞浏览器绘制
 *  return () => {
 *      // 清理函数，可选
 * }
 * }, [])
 * 
 * useLayoutEffect 能够解决特定的视觉问题，比较适合用于处理一
 * 
 * 在渲染阶段，react会比较新生成的虚拟dom树与上一次渲染的虚拟DOM树之间的差异。整个过程被称为协调
 * 协调完成后，react会找出需要更新的最小差异集，将这些差异应用到真实dom上。从而更新浏览器界面。
 * dom diff的主要作用是找出最小的更新集，然后只对真实dom中需要改变的部门进行操作，而不是渲染整个页面。
 * 使用react.memo 要注意可能会导致引用类型的状态变化组件没有重渲染，react.memo 用在props不经常变化，且组件渲染开销较大时更有意义
 * 对于简单的计算，直接执行可能比使用useMemo的开销更小
 * 官方推荐用受控组件来处里表单输入，但非受控组件在特定场景下有其优势，有助于我们更好利用react特性，构建高性能、可维护的表单
 * 
 * 受控组件：值由react状态控制，变化由react事件处理。
 * 非受控组件比较适合简单表单和性能敏感的场景
 * react的函数组件默认无法直接接收ref，这是因为函数组件时纯粹的函数，它们没有实例，也没有可供ref引用的实体。
 * 如果你尝试给一个函数组件传递ref，rect会发出警告或报错。
 */
function MyInput() {
    return <input />
}
function ParentComponent() {
    const inputRef = useRef(null);
    // 尝试将ref传递给函数组件myinput，就导致告警或错误
    return <MyInput ref={inputRef} />
}

const MyComponent = React.forwardRef((props, ref) => {
    //
    return <div ref={ref}>hello, {prop.name}</div>
})
// 由于react的函数组件没有实例，react无法为其创建一个可供ref引用的句柄
// 如果绑定ref的组件是一个函数组件，通常需要借助forwardRef做一个中转处理
// 如果绑定ref的组件是一个类组件，通常可以直接传入ref，绑定这个类组件实例，访问类组件的相关方法
// 为了方便调试，devtools中，被forwardRef包裹的组件在react devtools会显示为 ForwardRef（YourComponentName），这有助于你识别哪些组件使用了ref转发
// 依赖倒置原则：高层模块不应该依赖低层模块，两者都应该依赖抽象。
// context api共享局部状态，避免props的层层传递。forwardRef的部分逻辑也可以通过传递回调函数实现。
// ai agent的有效性取决于两个要素：能够访问的工具数量，以及跨工具推理的能力，而computer use技术在这两个方面都带来了巨大提升。
// 一个能够操作浏览器、邮件和crm的ai agnet，可能会自主探索出新的工作方法，主动收集和综合信息，甚至发现人类没有意识到的工作流程优化机会。
// 从商业机会角度看，我相信那些能够掌握这些上下文策略的创业公司将在为企业提供有能力的定制化agent方面有明显优势。
/**
 * 虽然最佳实践仍在发展中，但高度专注的创业公司，而非模型提供商，更有可能解决这些垂直和公司特定的挑战。
 * 这就像当年的saas革命一样，通用平台提供了基础能力，但真正的价值往往来自哪些深度理解特定行业需求的专业化解决方案
 * 基于像素的模型和基于dom代码的llm
 * 基于dom代码的方法在大多数情况下逗比基于像素的方法有梗goad额准确性和耕地的延迟。有时候复杂的技术路径并不一定带来更好的效果，关键是找到效率和结果的最佳平衡点
 * 
 * 模型角度的效果提升，更准确完成各种复杂操作主要靠扩大训练数据集和训练运行。主要通过在安全副本/沙盒中利用监督微调来自合成交互逻辑的强化学习，并通过模拟驱动课程和扩展、更具代表性的benchmarks来拓展训练分布。
 * 效率提升：压缩或蒸馏（视觉语言模型），应用量化技术，缓存界面元素图仅重新处理更改的区域，将键盘输入或点击等常规操作委托给更简单的基于规则的控制器，以及尽可能使用显式工具调用
 * 
 * 这种整合带来了两个关键优势。第一，agent通过更多上下文在工作中变得更有效。它们可以独立手机和综合呢不和外部信息，增强任务执行。例如，起草邮件的销售agent可以无缝从google drive中纳入最新的产品路线图
 * 第二，这种工具的全面整合简化了部署和实施，agent自然融入现有的工作流程和工具集，无需专门的界面或像传统软件那样的独立平台，这减少了摩擦。
 * 营销agent、财务agent、销售agent。垂类agent能将垂直专业能力与横向通用能力相结合。
 * 
 * computer use技术的发展也对教育系统提出了新的要求。我们需要培养能够与ai协助的新一代人才，他们不仅需要理解技术，还需要具备设计ai工作流，管理ai团队，解决ai无法处理的复杂问题的能力，这可能需要教育内容和方法的根本性变革。
 * 
 * git merge：保留分支历史；不会改变现有的commit；操作安全，不会丢失信息；缺点是：会产生额外的commit，分支历史看起来复杂，可能产生菱形形状；
 * git merge 不会改变现有的commit，操作安全，不会丢失信息；缺点是；会产生额外的commit，分支历史看起来复杂，可能会产生菱形形状；
 * 找到差异 -> 合并差异 -> 创建merge commit。
 * git rebase：产生线性的提交历史，没有额外的merge commit，分支历史更清晰，适合整理本地分支。缺点：重写了commit历史，可能产生冲突需要诸葛解决，不适合已经发布的分支，操作相对复杂；
 * 团队协作中，merge通常更安全，rebase适合个人分支的整理，merge适合最终的分支合并。
 * git rebase：产生线性的提交历史，没有额外的merge commit，分支历史更清晰，适合整理本地分支。缺点：重写了commit历史，产生的每个合并产生的冲突要逐个解决，不适合已经发布的分支，操作相对复杂
 * 报讯修改 -> 移动挤出点 -> 一个个重新应用修改
 * 
 * zustand + context来做状态管理
 * zustand厉害的一点是，可以非常方便的处理异步逻辑，这个异步可以在usexxxstore里处理，也可以在组件内部处理后更新store的状态。
 * redux toolkit 大大简化了开发
 * zustand 提供了中间件机制，可以很方便的集成持久化、日志、immer等功能
 * 
 * 
 * 
 */
const useMyStore = create((set) => ({
    // 状态 state
    repos: [],
    loading: false,
    error: null,
    // 动作 actions
    fetchRepoList: async (owner) => {
        set({ loading: true, error: null})
        try {
            const res = await getRepoList(owner);
            set({ repos: res.data });
        } catch(err) {
            set({ error: err.message })
        } finally {
            set({ loading: false })
        }
    }
}))

import { create }  from 'zustand';
import { produce} from 'immer';
const useStore = create((set) => ({
    user: { name: 'xxx', age: 18 },
    updateUser: (updates) => set(
        produce(draft => {
            Object.assign(draft.user, updates)
        })
    ),
    updateState: (updater) => set(produce(updater)),
}))

const App = () => {
    const { user, updateUser } = useStore();
    const handleUpdate =()=>{
        updateUser(() => {
            user.age += 1;
            user.name = 'xxx' + user.age;
            userDraft.email = 'lisi@example.com'
        })
    }
    const handleUpdate2 =()=>{
        updateState(updater => {
            updater.user = {
                name: 'xxx',
                age: 18,
                email: 'lisi@example.com'
            }
        })
    }
    return (
        <div>
            <h2>dsfds</h2>
            <button onClick={handleUpdate}>dfef1</button>
            <button onClick={handleUpdate2}>dfef2</button>
        </div>
    )
}

// 解构赋值读取的是 [Symbol.iterator] 方法，重写[Symbol.iterator] 方法，可以实现对象的解构赋值；
var [a, b] = {
    a: 3,
    b: 4
}
console.log(a, b)
Object.prototype[Symbol.iterator] = function () {
    return Object.values(this)[Symbol.iterator]();
}
// 还有一种，给对象的迭代器赋值一个生成器函数
Object.prototype[Symbol.iterator] = function* () {
    yiled* Object.values(this);
}

/* 
 * 
 * 
 * 1. 使用useEffect为什么会有闪烁？
 * 2. react18 后的dom diff逻辑有什么变化吗？
 * 3. react19 有哪些新特性？
 */

// observable
export default function observable(target, key, descriptor)  {
    // 这里支持装饰器模式的observable写法
    if(typeof key === 'string') {
        // 如果是作为装饰器属性进行监听，现将装饰的对象进行深度代理
        let v = descriptor.initializer();
        v = createObservable(v);
        // 这里执行依赖收集：使用的reaction类会在之后实现
        let reaction = new Reaction();
        // 返回描述器
        return {
            enumerable: true,
            configurable: true,
            get() {
                // 在获取target属性时进行autorun中的handler的依赖收集
                reaction.collect();
                return v;
            },
            set(value) {
                v = value;
                // 在每次更新target中的属性时执行autorun中的依赖做派发更新
                reaction.run(); 
            }
        }
    }
    // 如果不是装饰器写法，则创建proxy代理
    return createObservable(target);
}

function createObservable(){
    // 用于生成代理对象的控制器
    const handler = () => {
        // 实例化reaction在autorun获取属性的时候进行依赖收集
        let reaction = new Reaction();
        return {
            set(target, key, value) {
                // 对于数组的值设置处理：当对数组进行观察监听时，由于对数组的操作会有两步执行
                // 1. 更新数组的元素值
                // 2. 更改数组的length属性，所以需要将更改length属性的操作拦截，避免一次操作数组，多次触发handler
                if(key === 'length') {
                    return true;
                }
                // 执行收集绑定，此时修改值需要先执行，这样在autorun中的handler才能拿到最新的值
                let r = Reflect.set(target, key, value);
                reaction.run();
                return r;
            },
            get(target, key, receiver) {
                // 在获取属性的时候进行依赖收集
                reaction.collect();
                return Reflect.get(target,key, receiver);
            }
        }
    }
    return deepProxy(val, handler);
}

// 设置深度proxy对象代理
function deepProxy(val, handler) {
    if(typeof val !== 'object') {
        return val;
    }
    // 深度递归进行proxy代理，此时的递归相当于后序遍历进行代理
    for(let key in val) {
        // 完成对val的每个属性的深度proxy
        val[key] = deepProxy(val[key], handler);
    }
    // 完成对val的proxy
    return new Proxy(val, handler);
}


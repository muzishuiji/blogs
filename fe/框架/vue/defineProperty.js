// Vue2在初始化时就递归处理所有嵌套对象
const data = {
    user: {
      profile: {
        address: {
          city: 'Beijing',
          street: 'xxx'
        }
      }
    }
  };

function observe(data) {
    if(typeof data !== 'object') return;
    Object.keys(data).forEach(key => {
        definedProperty(data, key, data[key])
        if(typeof data[key] === 'object') {
            observe(data[key])
        }
    })
}

function definedProperty(obj, key, value) {
    // 1. 创建依赖收集器，每个属性都有自己的dep
    const dep = new Dep();
    // 2. 属性描述符，检查是否可配置
    const property = Object.getOwnPropertyDescriptor(obj, key);
    // 3. 保存原有的getter 和 setter
    const getter = property.get;
    const setter = property.set;
    if((!getter || setter) && arguments.length > 2) {
        val = obj[key];
    }
    // 5. 递归观察嵌套对象
    let childObj = observe(val);
     Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = getter ? getter.call(obj) : val;
            if(Dep.target) {
                dep.depend();  // 当前属性依赖收集
                // 如果值是对象，也要收集到嵌套对象的依赖
                if(childObj) {
                    childObj.dep.depend();
                    // 如果是数组，也要收集到数组的依赖
                    if(Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value;
        },
        set: function reactiveSetter(newVal) {
            const value = getter ? getter.call(obj) : val;
            if(newVal === value) {
                return;
            }
            if(setter) {
                setter.call(obj, newVal);
            } else {
                val = newVal
            }
            // 重新观察新值，如果心值是对象
            childObj = observe(newVal);
            // 通知所有依赖更新
            dep.notify();

        }
     })
}
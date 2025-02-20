# 设计模式

## 策略模式
将不同的算法封装为独立的策略，避免复杂的条件判断。

```js
// 复杂条件判断
function calculateDiscount(type, price) {
    if(type === 'vip') {
        return price * 0.8;
    } else if(type === 'regular') {
        return price * 0.9;
    } else {
        return price;
    }
}

// 使用策略模式
// 1. 定义不同type对应的handler维护在策略对象中
const discountStrategies = {
    vip: price => price * 0.8,
    regular: price => price * 0.9,
    default: price => price,
};
// 2. 根据传入的type，获取对应该type的handler并执行
function calculateDiscount(type, price) {
    const strategy = discountStrategies[type] || discountStrategies.default;
    return strategy(price);
}
```
## 单例模式
```js
class Singleton {
    constructor() {
        if(!Singleton.instance) {
            Singleton.instance = this;
        }
        return Singleton.instance;
    }
    createInstance() {
        const object = {
            name: 'example'
        }
        return object;
    }
    getInstance() {
        if(!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true
```

## 观察者模式
观察者模式是一种对象间的一对多依赖关系，当一个对象状态改变时，所有依赖它的对象都会自动更新。在前端开发中，常用于事件监听和消息订阅等。观察者模式可以降低对象间的耦合度，提高代码的可读性和可用性。

- 直接通信（被观察者直接调用观察者的方法）
- 强耦合
- 适合对象数量手啊，关系简单的场景

```js
class Subject {
    constructor() {
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    removeObserver(observer) {
       let index = this.observers.indexOf(observer);
       if(index !== -1) {
        this.observers.splice(index, 1);
       }
    }
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}
class Observer {
    constructor() {}
    update(data) {
        console.log('Received data: ', data);
    }
}
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

// 被观察者需要感知观察者，并且在观察者发生变化之后，通知观察者更新数据
subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notify('hello world');
```

## 发布-订阅模式
发布-订阅模式（Pub-Sub）是一种设计模式，用于实现对象间的一对多的依赖关系。发布者（publisher）发布消息，订阅者（Subscriber）接收消息，两者通过一个中间层（通常是消息代理或事件总线）进行通信。

- 间接通信（通过事件总线）；
- 松耦合，通过消息通信；
- 对象数量多、关系复杂；

```js
class PubSub {
    constructor() {
        this.events = {};
    }
    // 订阅事件
    subscribe(name, listener) {
        if(!this.events[name]) {
            this.events[name] = [];
        }
        this.events[name].push(listener);
        return this.unsubscribe;
    }
    // 发布事件
    publish(name, ...args) {
        if(this.events[name]) {
            this.events[name].forEach(callback => callback(...args));
        }
    }

    // 取消订阅
    unsubscribe(name, listener) {
        if(this.events[name]) {
            this.events[name] = this.events[name].filter(cb => cb !== callback);
        }
    }
}
// 使用示例
const pubsub = new PubSub();
const sub1 = pubSub.subscribe('news', data => {
    console.log(`Subscriber 1 received news: ${data}`);   
});
const sub2 = pubSub.subscribe('news', data => {
    console.log(`Subscriber 2 received news: ${data}`);   
});

// 发布事件
pubsub.publish('news', 'muzishuiji');
// Subscriber 1 received news: muzishuiji!
// Subscriber 2 received news: muzishuiji!
```

## 工厂模式

工厂模式是一种根据参数的不同创建不同对象的模式。在前端开发中，常用于创建不同类型的组件、插件等。工厂模式可以将对象的创建和使用分离，提高代码的灵活性和可维护性。

工厂模式的代码实现：
```js
class Product {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class ProductFactory {
    static createProduct(name) {
        return new Product(name);
    }
}
const product = ProductFactory.createProduct('product1');
console.log(product.getName()); // product1
```

## 装饰器模式

装饰器模式是一种在不改变自身对象的基础上，动态的给对象增加新的功能的模式。常用于实现组件的复用和功能的增强等。装饰器模式可以避免类的继承带来的复杂性和耦合度，提高代码的灵活性和可维护性。

## 代理模式

代理模式是一种通过一个代理对象控制目标对象的访问的模式。在前端开发中，常用于实现图片懒加载、数据缓存等。代理模式可以保护目标对象，控制其访问和使用，提高代码的安全性和可读性。


## 适配器模式

磨平兼容性等差异，暴露统一的api是适配器的常见形式。比如electron的设计会磨平windows和macos等不同系统间的差异，为不同平台提供统一的接口，实现跨平台兼容。

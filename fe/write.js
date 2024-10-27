// 每个对象都有proto属性，该属性指向其原型对象，在调用实例的方法和属性时，如果当前对象中找不到，就会往其原型对象上找。
// 构造函数的prototype属性指向其实例的原型对象；
// 实例原型对象的constructor属性指向构造函数；

class TaskPool {
    constructor(maxCount) {
        this.maxCount = maxCount;
        this.queue = [];
        this.runningCount = 0;
    }

    addTask(task) {
        this.queue.push(task);
        this.runTask();
    }

    runTask() {
        while(this.queue.length > 0 && this.runningCount < this.maxCount) {
            const task = this.queue.shift();
            this.runningCount++;
            return new Promise((resolve, reject) => {
                task().then(res => {
                    resolve(res);
                }).catch(err => {
                    reject(err);
                }).finally(() => {
                    this.runningCount--;
                    this.runTask();
                })
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
    taskpool.addTask(task);
}


function schedule(n) {
    // 在此处写下你的实现
    return function(tasks) {
        this.maxCount = n;
        this.runningCount = 0;
        this.queue = tasks.map((task, index) => ({
            task,
            index,
        }));
        let result = [];
        return new Promise((resolve, reject) => {
            function runTask() {
                while(this.queue.length && this.runningCount < this.maxCount) {
                    this.runningCount++;
                    const task = this.queue.shift();

                    task.task().then((res) => {
                        result[task.index] = res
                        if(result.length === tasks.length) {
                            resolve(result);
                        }
                    }).catch((err) => {
                        reject(err);
                    }).finally(() => {
                        this.runningCount--;
                        runTask();
                    })
                }
            }
            runTask();
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


class AsyncQueue {
    constructor() {
      // 你的代码
      this.events = {}
    }
    // 事件注册
    tap(name, fn) {
      // 你的代码
      if(!this.events[name]) {
        this.events[name] = [fn];
      } else {
        this.events[name].push(fn);
      }
    }
    // 事件触发
    exec(name, fn) {
      // 你的代码
      // 总体思路，将下一个要执行的函数传入回调里
      if(this.events[name].length) {
        const dispatch = (i) => {
            const event = this.events[name][i];
            if(event) {
                event(() => dispatch(i+1));
            } else {
                fn();
            }
        }
        // 手动触发第一个任务的执行
        dispatch(0);
      }
    }
  }
  
  function fn1(cb) {
    console.log('fn1');
    cb();
  }
  
  function fn2(cb) {
    console.log('fn2');
    cb();
  }
  
  function fn3(cb) {
    setTimeout(() => {
      console.log('fn3');
      cb();
    }, 2000);
  }
  
  function fn4(cb) {
    setTimeout(() => {
      console.log('fn4');
      cb();
    }, 3000);
  }
  
  // 创建事件队列
  const asyncQueue = new AsyncQueue();
  // 注册事件队列
  asyncQueue.tap('init', fn1);
  asyncQueue.tap('init', fn2);
  asyncQueue.tap('init', fn3);
  asyncQueue.tap('init', fn4);
  
  // 执行事件队列
  asyncQueue.exec('init', () => {
    console.log('执行结束');
  });
  
  // 预期输出
  // fn1
  // fn2
  // 2s 后
  // fn3
  // 再 3s 后
  // fn4
  // 执行结束
  

interface Rule {
    key: API;
    transforms: {
        target: RuleTransformTarget, 
        handler: Function
    }[];
}


// react query
// 1. 能够获取数据，实现多个接口聚合，实现fn(params) => data， 当params固定式，data预期一致；
// 2. 派生数据计算：由server返回的数据再次计算出来的，放到fn外，有性能问题时再加useMemo;
// 3. 监听数据失效：全局的push单独处理；
// hook 及自定义hook的能力，极大的改善了组件中逻辑难以复用的问题，
// hook的出现可以将操作原子化，复杂功能可以由多个基础的hook组合而成；
// 状态管理的作用：更好的实现组件间状态共享

// react借助errorBoundary来捕获错误，componentDidCatch来执行错误信息上传等逻辑
// react可以通过缓存状态来实现keep-alive的效果，或者display属性的设置来实现

const compose = (...fns) => (initialValue) => fns.reduceRight((val, fn) => fn(val), initialValue);

// 图片加载
class ImageLoader {
    constructor(maxCount) {
        this.maxCount = maxCount;
        this.queue = [];
        this.runningCount = 0;
    }

    addImages(images) {
        this.queue = this.queue.concat(images);
    }

    loadImage(imageUrl) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = imageUrl;
            image.onload = () => {
                resolve(image);
            }
            image.onerror = (err) => {
                reject(err)
            }
        })
    }

    async processImage() {
        while(this.queue.length && this.runningCount < this.maxCount) {
            let imageUrl = this.queue.shift();
            this.runningCount++;
            try {
                await this.loadImage(imageUrl);
            } catch(err) {
                console.log(err);
            } finally {
                this.runningCount--;
                this.processImage();
            }
        }
    }
}
let images = ['xxx', '---']
let loader = new ImageLoader(5);
loader.addImages(images);
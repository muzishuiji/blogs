// js实现异步并发调度器

class Scheduler {
    maxCount = 0;
    tasks = [];
    working = [];
    constructor(count) {
        this.maxCount = count
    }
    // 添加任务
    addTask(timer, content) {
        // 创建一个控制函数，加入队列，等待执行
        const target = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(content);
                    resolve();
                }, 1000 * timer);
            })
        }
        this.tasks.push(target)
    }
    // 执行任务
    continueWork(fn) {
        // 递归重点，执行完成
        if(this.tasks.length > 0) {
            // 将后面的拿进来继续执行
            // 先确定下标
            let idx = -1;
            for(let i = 0; i < this.working.length; i++) {
                if(fn === this.working[i]) {
                    idx = i;
                    break;
                }
            }
            // 调用并执行
            const next = this.tasks.shift();
            next().then(() => {
                this.continueWork(next)
            })
            this.working[idx] = next; // 把新的任务插进来
        }
    }
}



const scheduler = new Scheduler(2);
scheduler.addTask(1, '1');
scheduler.addTask(2, '2');
scheduler.addTask(1, '3');
scheduler.addTask(1, '4');

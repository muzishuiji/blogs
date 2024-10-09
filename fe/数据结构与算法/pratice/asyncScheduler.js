class Scheduler {
    constructor(maxConcurrent) {
        this.queue = [];
        this.maxConcurrent = maxConcurrent;
        this.runningCount = 0;
    }

    addTask(task, priority = 0) {
        this.queue.push({
            task,
            priority
        });
        this.queue.sort((a, b) => a.priority - b.priority);
        this.processTask();
    }

    async processTask() {
        while(this.queue.length && this.runningCount < this.maxConcurrent) {
            const { task, priority } = this.queue.shift();
            this.maxConcurrent++;
            try {
                await task();
            }  catch(err) {
                console.log('processTask error', err);
            } finally {
                this.processTask();
            }
        }
    }
}

const createTask = (id, timer) => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('task finish: ', id)
        resolve();
    }, timer || 1000)
})
const sch = new Scheduler(2);
sch.addTask(() => createTask('1', 1000));
sch.addTask(() => createTask('2', 500));
sch.addTask(() => createTask('3', 300));
sch.addTask(() => createTask('4', 800));
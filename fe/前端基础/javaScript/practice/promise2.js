class MyPromise {
    // 构造方法接收一个回调
    constructor(executor) {
        // then收集的执行成功的回调队列
        this._resolveQueue = [];

         // then收集的执行成功的回调队列
        this._rejectQueue = [];

        let _resolve = (val) => {
            while(this._resolveQueue.length) {
                const callback = this._rejectQueue.shift();
                callback(val);
            }
        }
        let _reject = (val) => {
            while(this._rejectQueue.length) {
                const callback = this._rejectQueues.shift();
                callback(val);
            }
        }
        // new Promise()时立即执行exector，并传入resolve 和reject
        executor(_resolve, _reject);
    }

    then(resolveFn, rejectFn) {
        this._resolveQueue.push(resolveFn)
        this._rejectQueue.push(rejectFn)
    }
}



class MyPromise {
    constructor(constructor) {
        this._resolveQueue = [];
        this._rejectQueue = [];

        const _resolve = (val) => {
            while(this._resolveQueue.length) {
                const callback = this._resolveQueue.shift();
                callback(val);
            }
        }
        const _reject = (val) => {
            while(this._rejectQueue.length) {
                const callback = this._rejectQueue.shift();
                callback(val);
            }
        }

        executor(_resolve, _reject);
    }

    then(resolveFn, rejectFn) {
        this._resolveQueue.push(resolveFn);
        this._rejectQueue.push(rejectFn);
    }
}
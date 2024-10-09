function asyncFunc(fn) {
    return new Promise((resolve, reject) => {
        const g = fn();
        function _next(val) {
            let res = {
                done: false
            }
            try {
                res = g.next(val);
            } catch(err) {
                reject(err);
            }
            if(res.done) {
                return resolve(val);
            }
            Promise.resolve(res.value).then(
                _val => {
                    _next(_val);
                },
                err => {
                    g.throw(err);
                }
            )
        }
        _next();
    })
} 
const getNum = (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(num + 1)
        }, 1000);
    })
}

function* generatorFunc() {
    const num1 = yield getNum(1);
    const num2 = yield getNum(2);
    console.log(num2);
    console.log(yield Promise.reject('error'));
}

asyncFunc(generatorFunc);
const asyncFunc = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('resolved');
        }, 1000);
    })
}
const retryWithDelay = (fn, retryArr) => {
    let attemptFunc = () => {
        return new Promise((resolve, reject) => {
            fn().then(res => {
                console.log('success: ', res)
                resolve(res);
            }).catch((err) => {
                if(retryArr.length) {
                    const timer = retryArr.pop();
                    console.log('retry: ', timer, err)
                    setTimeout(() => {
                        attemptFunc();
                    }, timer);
                }
            })
        })
    }
    attemptFunc();
}

retryWithDelay(asyncFunc, [200, 500])
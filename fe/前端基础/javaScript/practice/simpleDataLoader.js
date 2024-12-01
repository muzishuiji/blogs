// 实现一个简易版的请求聚合逻辑，关键元素梳理：
// 1. 生成唯一id，每个请求参数都有一个唯一的ID，以便在结果返回时进行匹配
// 2. 队列管理：使用队列存储待处理的请求参数和对应的回调函数
// 3. 定时器：设定定时器，在延迟一定时间后发送批量请求
// 4. 发送批量请求：将对垒中的所有参数打包成一个请求体，发送给服务器
// 5. 结果处理：服务器返回结果后，根据ID将结果分发给对应的回调函数
const batchFetchFn = (ids) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('batchFetchFn===')
            let params = Array.isArray(ids) ? ids : [ids];
            let res = [];
            for(let i = 0; i < params.length; i++) {
                let id = params[i];
                res.push([]);
                for(let j = 1; j <= 10; j++) {
                    res[res.length - 1].push(`${j}-${id}`)
                }
            }
            resolve(res);
        }, 200);
    })
}
const debounce = (fn, wait) => {
    let timer = null;
   return function(...args)  {
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
        let context = this;
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
   } 
}
const queryClient = (function () {
    let queryMap = {};
    const interval = 1000;
    function createQuery(queryKey, {
        queryFn
    })  {
        if(queryMap[queryKey]) {
            return queryMap[queryKey];
        }
        queryMap[queryKey] = {
            key: queryKey,
            queryQueue: [],
            queryData: () => undefined,
            queryFn,
            cacheData: [],
            currentFetchPromise: undefined,
            batchSize: 0,
        }
        let context = queryMap[queryKey];
        
        context.queryData = function (id) {
            let index = context.queryQueue.push(id);
            context.cacheData[id] = {
                key: id, 
                index: index - 1,
                data: undefined,
            };
            return new Promise((resolve, reject) => {
                if(!context.currentFetchPromise) {
                    context.currentFetchPromise = new Promise(async (resolve, reject) => {
                        let timer = setTimeout(() => {
                            context.batchSize++;
                            clearTimeout(timer);
                            timer = null;
                            let params = context.queryQueue.slice();
                            context.queryQueue = [];
                            context.queryFn(params).then(res => {
                                params.forEach(id => {
                                    context.cacheData[id].data = res[context.cacheData[id].index];
                                });
                                context.currentFetchPromise = undefined;
                                resolve(res);  
                            });
                        }, interval);
                    });  
                }  
                context.currentFetchPromise.then(res => {
                    resolve(context.cacheData[id] ? context.cacheData[id].data : []);
                });  
            });
        }
        return queryMap[queryKey];
    }
    return {
        createQuery,
    }
})();
let queryIns = queryClient.createQuery('getUser', {
    queryFn: batchFetchFn,
})

const testFunc = () => {
    setTimeout(() => {
        for(let i = 0; i < 10; i++) {
            queryIns.queryData(`lijie_${i}_200`).then(res => {
                console.log('response data:', res);
            });
        }
    }, 200);
    setTimeout(() => {
        for(let i = 0; i < 10; i++) {
            queryIns.queryData(`lijie_${i}_500`).then(res => {
                console.log('response data:', res);
            });
        }
    }, 300);

    setTimeout(() => {
        for(let i = 0; i < 10; i++) {
            queryIns.queryData(`lijie_${i}_2000`).then(res => {
                console.log('response data:', res);
            });
        }
    }, 2000);
}
testFunc();

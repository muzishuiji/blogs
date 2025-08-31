// LRU 缓存基础版本，借助Set的特性，插入和删除是有序的
// class LRUCache 


// 使用map实现带有过期时间的lru，每次满了就遍历map 找到过期的删掉
// 存储的时候记得存value和过期时间


function retryPromise(promiseFn, maxRetries, delay) {
    return new Promise((resolve, reject) => {
        let retryCount = 0;
        function attemptFunc() {
            promiseFn().then(resolve).catch(err => {
                if(retryCount < maxRetries) {
                    retryCount++;
                    console.log(`第${retryCount}次重试`);
                    setTimeout(() => {
                        attemptFunc();
                    }, delay);
                } else {
                    // 重试后仍失败，则reject
                    reject(err);
                }
            })
        }
        attemptFunc();
    })
}

const fetchData = () => fetch('/api/data').then(res => res.json());
retryPromise(fetchData, 3, 2000)
  .then(data => console.log('成功:', data))
  .catch(err => console.log('失败:', err));


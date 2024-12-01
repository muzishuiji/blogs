## Ajax拦截器的概念

Ajax的拦截器（interceptors）是一种在Ajax请求和响应过程中插入自定义逻辑的机制。通过拦截器我们可以在请求发送之前、响应返回之后或请求失败时执行特定的操作。拦截器常用于日志记录、请求/响应的修改、错误处理等场景。

## Ajax拦截器的实现原理

实现Ajax拦截器的原理主要涉及以下几个步骤：

1. 重写`XHLHttpRequest`对象：通过重写`XHLHttpRequest`对象的属性和方法，可以在请求和响应的不同阶段插入自定义逻辑。

2. 保存原始方法：在重写`XHLHttpRequest`对象方法之前，需要保留原始的方法，以便在自定义逻辑执行完毕后调用原始方法。

3. 插入自定义逻辑：在重写的方法中插入自定义逻辑，比如在`open`方法中记录请求的URL和方法，在`send`方法中记录请求发送的时间，在readystatechange事件中记录响应的内容。


## 详细实现步骤

1. 保留原始的`XMLHttpRequest`对象;

首先，我们要保存原始的`XMLHttpRequest`对象，以便在创建新的`XMLHttpRequest`实例时使用。

```js
const originalXhr = window.XMLHttpRequest;
```
2. 创建一个新的`XMLHttpRequest`对象

创建一个新的`XMLHttpRequest`对象，并在其中重写相关的属性和方法。

```js
window.XMLHttpRequest = function() {
    // 创建原始的 XMLHttpRequest 实例
    const xhr = new originalXhr();

    // 保存原始方法
    const originalOpen = xhr.open;
    const originalSend = xhr.send;
    const originalSetRequestHeader = xhr.setRequestHeader;

    // 重写 open 方法
    xhr.open = function(method, url, async, user, password) {
        // 请求前的拦截逻辑
        console.log(`Request intercepted: ${method} ${url}`);
        originalOpen.apply(xhr, arguments);
    };

    // 重写 send 方法
    xhr.send = function(data) {
        // 请求发送前的拦截逻辑
        console.log('Sending request...');
        originalSend.apply(xhr, arguments);
    };

    // 重写 setRequestHeader 方法
    xhr.setRequestHeader = function(header, value) {
        // 请求头设置的拦截逻辑
        console.log(`Setting request header: ${header} = ${value}`);
        originalSetRequestHeader.apply(xhr, arguments);
    };

    // 监听 readystatechange 事件
    xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === 4) {
            // 响应返回后的拦截逻辑
            console.log('Response received:', xhr.responseText);
        }
    });

    return xhr;
};
```

3. 插入自定义逻辑

在重写的方法中插入自定义逻辑，也就是在请求发起前，响应返回前执行拦截逻辑。

  1. 保留原始方法：
  ```js
    const originalOpen = xhr.open;
    const originalSend = xhr.send;
    const originalSetRequestHeader = xhr.setRequestHeader;
  ```
  2. 重写open方法：
  ```js
    xhr.open = function(method, url, async, user, password) {
        console.log(`Request intercepted: ${method} ${url}`);
        originalOpen.apply(xhr, arguments);
    };
  ```
  3. 重写send方法：
  ```js
  xhr.send = function(data) {
      console.log('Sending request...');
      originalSend.apply(xhr, arguments);
  };
  ```
  4. 重写`setRequestHeader`方法：
   ```js
  xhr.setRequestHeader = function(header, value) {
      console.log(`Setting request header: ${header} = ${value}`);
      originalSetRequestHeader.apply(xhr, arguments);
  };
  ```
  5. 监听`readystatechange`事件：
  ```js
  xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === 4) {
            console.log('Response received:', xhr.responseText);
        }
  });
  ```

## mock实现Ajax的请求拦截(简版)

### 同步拦截器调用主逻辑
```js
function runSync() {
    const config = {
        method: "post",
    };
    let requestInterceptorChain = [
        // interceptor request 1: fulfilled
        () => {
            console.log("success request: ", 1);
        },
        // interceptor request 1: rejected
        () => {
            console.log("failed request: ", 1);
        },

        // interceptor request 2: fulfilled
        () => {
            console.log("success request: ", 2);
        },
        // interceptor request 2: rejected
        () => {
            console.log("failed request: ", 2);
        },

        // interceptor request 3: fulfilled
        () => {
            console.log("success request: ", 3);
        },
        // interceptor request 3: rejected
        () => {
            console.log("failed request: ", 3);
        },

        // interceptor request 4: fulfilled
        () => {
            console.log("success request: ", 4);
        },
        // interceptor request 4: rejected
        () => {
            console.log("failed: ", 4);
        },
    ];
    let responseInterceptorChain = [
        // interceptor response 1: fulfilled
        () => {
            console.log("success response: ", 1);
        },
        // interceptor response 1: rejected
        () => {
            console.log("failed response: ", 1);
        },

        // interceptor response 2: fulfilled
        () => {
            console.log("success response: ", 2);
        },
        // interceptor response 2: rejected
        () => {
            console.log("failed response: ", 2);
        },
        // interceptor response 3: fulfilled
        () => {
            console.log("success response: ", 3);
        },
        // interceptor response 3: rejected
        () => {
            console.log("failed response: ", 3);
        },
    ];
    // method called
    const dispatchMethod = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`${config.method} called`);
                resolve({
                    data: []
                })
            }, 200);
        })
    };
    let i = 0, len = requestInterceptorChain.length;
    // 若发生异常，则中断执行
    while(i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
            onFulfilled();
        } catch(err) {
            onRejected(err);
            break;
        }
    }
    try {
        promise = dispatchMethod();
    } catch(error) {
        return Promise.reject(error);
    }
    i = 0, len = requestInterceptorChain.length;
    // 构建response拦截的链式调用
    while(i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++])
    }
    return promise;
}

runSync();
```

### 异步拦截器调用主逻辑
```js
function runAsync() {
    const config = {
      method: "post",
    };
    let requestInterceptorChain = [
      // interceptor request 1: fulfilled
      () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("success request: ", 1);
                resolve('1');
            }, 200);
        })
      },
      // interceptor request 1: rejected
      () => {
        console.log("failed request: ", 1);
      },

      // interceptor request 2: fulfilled
      () => {
        console.log("success request: ", 2);
      },
      // interceptor request 2: rejected
      () => {
        console.log("failed request: ", 2);
      },

      // interceptor request 3: fulfilled
      () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("success request: ", 3);
                resolve('3');
            }, 2000);
        })
      },
      // interceptor request 3: rejected
      () => {
        console.log("failed request: ", 3);
      },
  
      // interceptor request 4: fulfilled
      () => {
        console.log("success request: ", 4);
      },
      // interceptor request 4: rejected
      () => {
        console.log("failed: ", 4);
      },
    ];
    let responseInterceptorChain = [
      // interceptor response 1: fulfilled
      () => {
        console.log("success response: ", 1);
      },
      // interceptor response 1: rejected
      () => {
        console.log("failed response: ", 1);
      },
  
      // interceptor response 2: fulfilled
      () => {
        console.log("success response: ", 2);
      },
      // interceptor response 2: rejected
      () => {
        console.log("failed response: ", 2);
      },
      // interceptor response 3: fulfilled
      () => {
        console.log("success response: ", 3);
      },
      // interceptor response 3: rejected
      () => {
        console.log("failed response: ", 3);
      },
    ];
  
    // method called
    const dispatchMethod = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`${config.method} called`);
                resolve({
                    data: []
                })
            }, 200);
        })
    };
    interceptorChain = [
      // method called
      dispatchMethod,
      undefined,
    ];
    interceptorChain = requestInterceptorChain.concat(interceptorChain);
    interceptorChain = interceptorChain.concat(responseInterceptorChain);
    let promise,
      i = 0;
    let len = interceptorChain.length;
    promise = Promise.resolve(config);
    // 总体思路：将请求拦截，请求体执行，响应拦截全部用promise then回调串联起来
    while (i < len) {
      promise = promise.then(interceptorChain[i++], interceptorChain[i++]);
    }
    return promise;
}

runAsync();
```



## mock实现Ajax的请求拦截(完整实现版)

待实现
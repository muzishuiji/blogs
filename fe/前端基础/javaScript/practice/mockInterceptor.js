// axios的拦截器，对于异步场景的主逻辑
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
    while (i < len) {
      promise = promise.then(interceptorChain[i++], interceptorChain[i++]);
    }
    return promise;
}

// runAsync();


// axios的拦截器，对于非异步场景的主逻辑
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
    while(i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++])
    }
    return promise;
}

runSync();
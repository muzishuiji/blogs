// 一个完整的节流函数
// - 保证最后一次调用执行；
// - 第一次立即触发
// - 保证执行func的参数是最新的，每次使用lastArgs来保存最新的参数
function myThrottle(fn, wait) {
    let timer;
    let start = 0;
    let lastArgs;
    return function (...args) {
      let now = Date.now();
      let context = this;
      lastArgs = args;
      let remaining = wait - (now - start);
      // 如果剩余时间<=0 或时间异常（系统时间被修改）
      if(remaining <= 0 || remaining > wait) {
        if(timer) {
          clearTimeout(timer);
          timer = null;
        }
        start = Date.now();
        fn.apply(context, lastArgs);
      }
      // 如果定时器未启动，保存最后一次调用的参数，并设置定时器
      else if(!timer) {
        lastArgs = args;
        timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null; 
          fn.apply(context, lastArgs);
        }, remaining);
      }
    } 
  }
  // 定义一个被节流的函数
  const logScroll = myThrottle((position) => {
    console.log("当前位置:", position);
  }, 1000);
  
  // 模拟连续触发
  logScroll(0);      // 立即输出：当前位置: 0
  logScroll(100);    // 被忽略，但保存参数
  logScroll(200);    // 被忽略，但保存参数
  logScroll(300); 
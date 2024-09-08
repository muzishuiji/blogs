## 函数的防抖与节流

对于一些频繁触发的事件,为了保证良好的用户体验,我们需要对事件触发之后的处理逻辑的执行频率做一个限制,这样就有了防抖与节流的概念.

## 防抖

### 概念

函数防抖: 当持续触发某个事件时,一定时间内没有再触发,事件处理程序就会执行一次,如果设定的时间到来之前,又再一次触发了事件,则重新开始计时,这样的处理方式成为防抖.

### 使用场景

* search搜索时,用户不断触发输入框的change事件,如果我们频繁的向服务器发送请求会导致服务器的压力很大,这个时候我们就可以采用防抖的策略,用户停止输入一段时间后再向服务器发送请求.

* window触发resize的时候,当停止resize一段时间间隔后,执行事件处理程序.

* 防止重复提交: 使用防抖来防止用户在短时间内重复提交信息

### 代码实现

    document.getElementById('container').onmousemove = debounce(handle, 1000)
    function debounce(cb, delay) {
        let timmer
        return function() {
          timmer && clearTimeout(timmer)
          timmer = setTimeout(cb, delay);
        }
    }
    function handle() {
        console.log("1122");
    }
    

## 节流

### 概念

函数节流: 当某个事件被持续触发时,采用策略保证一定时间内只调用一次处理函数的方式成为节流.

### 使用场景

* 鼠标不断点击触发(使用节流保证单位时间内只触发一次)

* 监听滚动事件,比如是否滚动到底部自动加载更多.

### 代码实现


    document.getElementById('container').onmousemove = throttle(handle, 1000)
    function handle() {
        console.log("1122");
    }
    function throttle(cb, delay) {
      let start = 0;
      return function() {
        let current = new Date()
        if(current - start >= delay) {
          cb();
          start = new Date();
        }
      }
    }
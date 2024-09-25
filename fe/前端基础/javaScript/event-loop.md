# 事件循环

## 宏任务与微任务

宏任务：

* setTimeOut

* setImmediate

* MessageChannel

微任务

* Promise.then

* MutationObserver

* process.nextTick

1. 一个tick执行的操作：

执行宏任务 -> 清空微任务队列 -> check渲染 （是否需要渲染，requestAnimationFrame， 阻塞本线程，切到渲染线程） -> check worker（是否需要处理worker的信息，requestidlecallback，离下次渲染还有时间，或者timeout到了）

## JS引擎

JS引擎 包括parser， 解释器，gc，JIT编译器几部分

* parser： 负责把JavaScript代码转成ast

* interpreter： 负责把ast转成字节码，并解释执行

* JIT compiler： 对执行时的热点函数进行编译，把字节码转成机器码，之后可以直接执行机器码

* gc（garbage collector）：垃圾回收器，清理堆内存中不再使用的对象

dom树和CSSOM树合并成到一起，计算布局layout，生成render tree之后把渲染树的内存复制到显卡就可以由显卡来完成渲染。每一次渲染流程叫做一帧，浏览器有一个帧率（比如一秒60帧）来刷新。

通常，主线程用来控制ui和渲染，其他线程用来执行一些任务（不能多个线程同时修改ui，顺序没法控制）

electron中分了主进程和渲染进程，window相关的操作只能在主线程，由渲染进程向主进程发消息。

因为js引擎只负责执行js，渲染引擎只知道渲染，所以需要一个机制来更好的实现两个的配合使用，那么event loop就出现了。

js引擎并没有提供event loop，它是宿主环境为了更好的处理渲染引擎和js的有序执行而设计的机制。

宿主环境由浏览器，node，跨端引擎等，不同的宿主环境有不同的需要调度的任务，所以也会有不同的设计。

* 浏览器主要是为了调度渲染和js执行，还有worker
* node里面主要是调度各种io
* 跨端引擎也是调度渲染和js执行

**跨端引擎**

跨端引擎的一般实现思路：

首先，跨端要有一套统一的api，一般都是实现前端的那些dom api，这样在容器之上就可以跑前端框架，再上层就是前端写的业务代码了。容器之下的api实现由native来实现，比如dom， style的api由安卓，ios各自的布局方式来实现，设备的api也是一样。原生实现的api通过jni等方式提供给c++调用，注入到js引擎（c++）中。这样前端的布局代码就可以用这些api来完成各种布局，交互，逻辑的开发了。

这套统一的api也不一定非要实现前端的那一套，比如flutter就是使用自己的标准，使用dart来写逻辑，渲染也是自己的一套，优点是针对性更强，缺点是不能对接前端生态。也有使用flutter的渲染能力对接前端的dom，style的api方案。比如kraken，这样容器之上依然是前端框架，只不过渲染相关api的实现换成了flutter。

容器的思路是运行时的思路，另一种思路是编译的思路，比如小程序的转译工具taro，uniapp等，不过这种思路边缘情况太多，它们也越来越多功能靠runtime来做了。

**requestAnimationFrame**

requestAnimationFrame，可以理解为渲染前的一个生命周期，requestAnimationFrame 会在check 渲染的结果返回true时，执行一个回调函数，不是宏任务也不是微任务。当js执行事件时间过长，或者其中一个流程耗时过长，就会导致渲染延迟，给用户的感觉就是卡顿，这也是fiber机制出现的原因。分段处理交互，递归改循环，通过链表来做计算的暂停恢复。

**requestIdleCallback**

requestIdleCallback会在每次check结束发现距离下一帧还有时间，就执行，如果时间不够，就下一帧再说。为了防止一直等待下去，提供了timeout参数来制定最长的等待时间，如果一直没时间处理这个逻辑，那就算拖延了帧渲染也要执行。这个api目前还有兼容性问题，react自己实现了类似requestIdleCallback的fiber机制，在执行之前判断距离下一帧执行还有多久，来判断是否执行逻辑。

计算机的本质就是解释器，cpu用电路解释机器码，解释器用机器码解释更上层的脚本代码，例如字节码。




# passive的作用与原理

## passive 到底有什么用？

passive主要用于优化浏览器页面滚动的性能，让页面滚动更顺滑。

## passive 产生的历史时间线

`addEventListener()`：为dom添加触发事件

早期的addEventListener是这样的：

`addEventListener(type, listener, useCapture)`

useCapture: 是否允许事件捕捉，很少会传true，然后就变成可选项了

现在的addEventListener是这样的：

```javascript
addEventListener(type, listener, {
    capture: false, // 是否在捕获阶段触发
    // 当你打算监听滚动操作而不打算阻止滚动（即不调用preventDefault），设置为true可以提高页面滚动性能
    passive: false, // 主动触发or被动触发
    once: false  // 只触发一次
})
```

## passive事件监听器的作用
1. 非阻塞处理：
    - 当使用`passive: true`作为事件监听器选项时，表示高速浏览器这个监听器不会阻止页面的滚动行为。这意味着浏览器可以更快的处理滚动操作，而不必等待监听器执行完毕。
    - 这样做可以让页面滚动更加流畅，因为浏览器可以在不等待javascript代码执行的情况下继续用户的输入事件。
2. 提高性能：
    - 使用passive监听器可以减少浏览器在处理触摸事件时的cpu和内存消耗。由于浏览器知道这些监听器不会阻止滚动，它可以提前优化渲染通道，从而提高性能。


## 页面卡顿的原因

手势事件有个属性 cancelable，作用是告诉浏览器该事件是否允许监听器通过 preventDefault() 方法阻止，默认为true。如果touch事件内部调用 preventDefault()，事件默认行为被取消，页面也静止不动了。但是浏览器不知道touch事件内部是否调用了preventDefault()，**浏览器只有等内核线程执行到事件监听器对应的js代码时，才知道内部是否会调用preventDefault函数来阻止事件的默认行为，所以浏览器本身无法优化这种场景。**手势输入事件是由连续的普通输入事件组成的，在这种场景下，无法快速产生，会导致页面无法快速执行滑动逻辑，从而让用户感到页面卡顿。

而chrome团队从统计数据分析得出，注册了mousewheel/touch的相关事件监听器的页面中，80%的页面内部都不会调用 preventDefault行为来阻止事件的默认行为。对于这80%的叶脉呢即使监听器内部什么都没有做，相对没有注册mouse/wheel/touch事件监听器的页面，在滑动流畅度上，由10%的叶脉呢增加至少100ms的延迟，1%的页面增加500ms以上的延迟。对于这些页面来说，他们是不希望因为注册mousewheel/touch相关的事件监听器而导致滑动延迟增加的。

## passive的诞生

passive的意思是顺从的，表示它不会对事件的默认行为说no，浏览器知道了一个监听器是passive的，它就可以在两个线程里同时执行监听器的JavaScript代码和浏览器的默认行为了，这样使得滚动行为可以更流畅的执行。

passive实际上是为了解决浏览器页面滚动流畅度而设计的，它通过扩展时间属性passive让web开发者告知浏览器是否阻止默认行为，从而让浏览器能够更智能的决策优化，这其中涉及到chrome的多线程渲染框架，输入事件处理等知识。

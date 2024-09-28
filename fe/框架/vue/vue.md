# VUE 

1. 加载渲染过程

父 beforeCreat -> 父craeted -> 父 beforeMount -> 子 beforeCreat -> 子 created -> 子 beforeMount -> 子mounted -> 父 mounted 

2. 子组件更新过程

父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

3. 父组件更新过程 

父 beforeUpdate -> 父 updated

4. 销毁过程

父 beforeDestory ->  子 beforeDestory ->  子destoryed ->  父 destoryed

5. v-model只是value和onChange结合实现的语法糖。

6. history模式下的a标签会跳转链接，刷新页面，这是a标签的默认行为，解决方案： 绑定点击事件，阻止默认行为或者使用 router-link ，link 组件等来做路由跳转。

7. vue页面刷新导致数据丢失的问题

推荐使用 vuex-persist插件，它是vuex持久化存储的一个插件。不需要手动存取storage。而是直接将状态保存在localStorage中。

8. vue的nextTick

vue的nextTick 的执行时机可能是当前事件循环的微任务阶段，也可能是下一个事件循环（tick，取出微任务执行）。这主要取决于nextTick 函数使用的是 Promise/Mutation ，色体体面面嗲特，messageChannel 还是setTimeout。

9. vue中的getters有什么用？

10. computed和method有什么区别？

11. 在部分ios系统中，h5页面设置 position： sticky属性进行固定元素，会导致z-index失效，可以将sticky改为fixed。

sticky的top值border上边缘和包裹元素下边缘之间的距离，但是一旦滚动起来，就是和浏览器顶部的距离了，

z-index 只能在 position为 relative/absolute/fixed属性上才能生效

sticky上x-index不生效的原因我猜测跟这个元素设计的目的有关系，因为本来设计sticky主要是用于滚动吸顶的效果，但是如果受到z-index的影响

12. Vue的双向绑定


13. 虚拟DOM的实现原理：

虚拟DOM的实现原理主要包括以下3个部分：

  - 用javascript对象模拟真实DOM树，对真实DOM进行抽象；
  - diff算法：比较两颗虚拟DOM树的差异；
  - patch算法：将两个虚拟DOM对象的差异应用到真实的DOM树；

优点：

  - 保证性能下限：框架的虚拟DOM需要适配任何上层API可能产生的操作，它的一些DOM操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的DOM操作性能要好很多，因此框架的虚拟DOM至少可以保证你在不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
  - 无需手动操作DOM：开发者不需要手动去操作DOM，只需要写好状态变更逻辑，框架会根据虚拟DOM和数据双向绑定等，帮开发者以可预期的方式更新视图，降低开发者的心智负担，极大提高开发效率。
  - 跨平台：虚拟DOM本质上是js对象，而DOM与平台强相关，相比之下虚拟DOM可以进行更方便的跨平台操作，例如服务端渲染，weex开发等等。

缺点：

  - 在一些大型复杂应用或者性能要求比较高的场景下，dom diff会比较耗时，虚拟DOM无法进行针对性的极致优化。

14. 路由缓存

使用`keep-alive`可缓存路由，它有include和exclude两个属性，分别表示包含和排除某些路由，值可以是字符串、数组或者正则表达式。独有的生命周期方法：activited、deactivited；




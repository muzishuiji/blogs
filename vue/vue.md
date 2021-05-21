#

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

vue的nextTick 的执行时机可能是当前事件循环的微任务阶段，也可能是下一个事件循环（tick，取出微任务执行）。这主要取决于nextTick 函数使用的是 Promise/Mutation ，色体体面面嗲特，messageChannel 还是settimeout。

9. vue中的getters有什么用？

10. computed和method有什么区别？

11. 在部分ios系统中，h5页面设置 position： sticky属性进行固定元素，会导致z-index失效，可以将sticky改为fixed。

sticky的top值border上边缘和包裹元素下边缘之间的距离，但是一旦滚动起来，就是和浏览器顶部的距离了，

z-index 只能在 position为 relative/absolute/fixed属性上才能生效

sticky上x-index不生效的原因我猜测跟这个元素设计的目的有关系，因为本来设计sticky主要是用于滚动吸顶的效果，但是如果受到z-index的影响





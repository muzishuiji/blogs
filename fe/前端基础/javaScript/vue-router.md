## vue-router

### 路由注册

* Vue编写插件的时候通常要提供静态的install方法

* Vue-router的install方法会给每一个㢟注入beforeCreated和destoryed钩子函数,在beforeCreate中做一些私有属性定义和路由的初始化工作.

### VueRouter

* 路由初始化的时机是在组件的初始化阶段,执行beforeCreate钩子函数的时候如果在根组件上,会执行router.init方法,初始化路由.然后执行history.transitionTo方法做路由过渡.

### matcher

* createMatcher的初始化就是根据路由的配置描述创建映射表,包括路径,名称到路由record的映射关系.

* match会根据传入的位置和路径计算出新的位置,并匹配对应的路由record,然后根据新的位置和record创建的路径并返回.

### transitionTo(路径切换)

* 完整的导航解析流程

1. 导航被触发
2. 在失活的组件里调用离开守卫
3. 调用全局的`beforeEach`守卫
4. 在重用的组件里调用`beforeRouteUpdate`守卫
5. 在路由配置里调用`beforeEnter`
6. 解析异步路由组件
7. 在被激活的组件里调用`beforeRouteEnter`
8. 调用全局的`beforeResolve`守卫
9. 导航被确认
10. 调用全局的`afterEach`钩子
11. 触发DOM更新
12. 用创建好的实例调用`beforeRouteEnter`守卫中传给`next`的回调函数
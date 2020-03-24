1. 设置了 httpOnly 的 js 脚本无法读取
2. 当 cookie 的 Expires 属性缺省或者 Session 的时候,表示的就是会话性 cookie,值保存在
3. 客户端内存中,饼子啊用户关闭浏览器时失效.
4. expires 和 max-age 同时存在时,max-age 优先级更高
5. path 可以指定请求特定路径下的资源才会携带 cookie,domain 和 path 标识共同定义了
6. cookie 的作用域,即 cookie 随哪些 url 请求发送
7. SameSite,跨站请求不发送 cookie.

SameSite 有三个值:

- Strict: 允许一方请求携带 cookie,即浏览器将只发送相同站点请求的 cookie,即当前网页 url 与请求目标的 url 完全一致.
- Lax,允许部分第三方请求携带 cookie
- None,无论是否跨站都会发送 cookie

chrome 之前都是默认 None,Chrome80 后默认是 Lax

8. 有效顶级域名 + 二级域名相同则就认为时同站, 跨站和跨域的概念不一样,跨域是浏览器的同源策略,即两个 url 的 协议 / 主机名 / 端口 有一个不相同就认为是跨域.
9. SameSite 由可跨站到不可跨站,受到影响的是哪些请求? POST 表单, iframe, ajax, image.

10. cookie 的作用

Cookie 主要用于以下三个方面:

    1. 会话状态管理(如用户登陆状态,购物车,游戏分数或其它需要记录的信息);
    2. 个性化设置(如用户自定义设置,主题等)
    3. 浏览器行为跟踪(如跟踪分析用户行为等)

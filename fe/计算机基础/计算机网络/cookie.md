1. 设置了 httpOnly 的 js 脚本无法读取
2. 当 cookie 的 Expires 属性缺省或者 Session 的时候,表示的就是会话性 cookie,值保存在 客户端内存中,并在用户关闭浏览器时失效.
4. expires 和 max-age 同时存在时,max-age 优先级更高
5. path 可以指定请求特定路径下的资源才会携带 cookie,domain 和 path 标识共同定义了
6. cookie 的作用域,即 cookie 随哪些 url 请求发送
7. SameSite,跨站请求不发送 cookie.

SameSite 有三个值:

- Strict: 允许一方请求携带 cookie,即浏览器将只发送相同站点请求的 cookie,即当前网页 url 与请求目标的 url 完全一致.
- Lax：默认值，相对Strict宽松，阻止发送Cookie，但对超链接放行；
- None,无论是否跨站都会发送 cookie，使用改值时需要保证Cookie为Secure，否则无效；

chrome 之前都是默认 None,Chrome80 后默认是 Lax

8. 有效顶级域名 + 二级域名相同则就认为时同站, 跨站和跨域的概念不一样,跨域是浏览器的同源策略,即两个 url 的 协议 / 主机名 / 端口 有一个不相同就认为是跨域.

9. SameSite 由可跨站到不可跨站,受到影响的是哪些请求? POST 表单, iframe, ajax, image.

10. cookie 的作用

Cookie 主要用于以下三个方面:

    1. 会话状态管理(如用户登陆状态,购物车,游戏分数或其它需要记录的信息);
    2. 个性化设置(如用户自定义设置,主题等)
    3. 浏览器行为跟踪(如跟踪分析用户行为等)


11. 第三方cookie的用处

- 性能监控或异常监控
监控的接口通常是第三方服务或者自己的不同域名下的服务，这个时候需要读取应用当前域名下的cookie信息来标识用户信息，从而更好的进行UV等信息的统计。
- 广告营销
浏览器或者各个数据分析平台可以通过在你访问的网站中植入一段js代码来从cookie里读取你的信息，收集你的浏览行为，从而分析你的行为，实现更为精准的广告营销。

12. Cookie的一个属性SameSite

- Strict

最严格的防护，如果网站不需要从外站链接到任何交易页面，这种场景最适合使用Strict标志。即不允许跨域携带cookie。

SameSite=Strict的作用：
  - 1. 防止csrf攻击：
  csrf攻击是指攻击者通过诱导用户访问恶意网站，利用用户在目标网站的登录状态，执行未经授权的操作。SameSite=Strict可以有效防止CSRF攻击，因为Cookie不会再跨站请求中发送;
  - 2. 减少XSS攻击的风险：
  XSS攻击是指攻击者通过注入恶意脚本，窃取用户的敏感信息。SameSite=Strict减少CSS攻击的风险，因为cookie不会在跨站请求中发送，从而减少了恶意脚本窃取Cookie的可能性。
  - 3. 

- Lax

对于允许用户从外部链接到达本站并使用已有会话的网站，默认的Lax值在安全性和可用性之间提供了合理的平衡，Lax属性只会在使用危险HTTP方法发送跨域cookie的时候进行阻止，例如post方式。同时，JavaScript脚本（请求js资源）发起的请求也无法携带cookie。

- None

浏览器会在同站请求，跨站请求下继续发送Cookies，不区分大小写。

Chrome在Chrome83版本的访客模式下禁用三方cookie，在2022年全面禁用第三方Cookie。

**那么问题来了，无痕模式和访客模式有什么区别，目前是都不会产生浏览记录，其他的就不知道了**

13. 一些补丁方案

- 允许加载的js脚本读取cookie，这样js脚本会将cookie信息以参数的形式发送给相关服务。
- 浏览器指纹
三方cookie的主要作用是标识你的身份，从而在你下一次访问的时候知道你是谁，那么如果有一种技术直接获取你的唯一标识时，那么就不需要存储Cookie了，这个技术就是“浏览器指纹”

WebRTC:

WebRTC（网页实时通讯，Web Real Time Communication），是可以让浏览器有音视频实时通讯的能力，通常被需要快速直接链接的网络应用程序所应用。即便你使用了代理，网站也能借此获取你真实的公共和本地IP地址。该插件可被用于泄漏你本地IP地址或追踪媒体设备。WebRTC会暴露你的： 公共IP地址，本地IP地址，媒体设备的数量以及其哈希值。

就算用户禁用了JavaScript，网站也可以通过css来获取一些信息。

14. session和cookie的区别

一个cookie可以认为是一个变量，形如 name=value，存储在浏览器，一个session可以理解为一种数据结构，多数情况是映射（键值对，存储在服务器上。

cookie的作用其实很简单，无非就是服务器给每个客户端（浏览器）打的标签，方便服务器辨认。

而cookie在请求头里，它不能承载太多的信息，这需要消耗更多的带宽，耗费网络资源。

session可以配合cookie解决这一问题，比如一个cookie存储这样一个变量sessionID=xxxx，传给服务器，服务器通过这个id找到对应的session，这个session是一个数据结构，里面存储这该用户的购物车等详细信息，服务器可以通过这些信息返回该用户的定制化网页，有效解决追踪用户的问题。

session是一个数据结构，由网站的开发者设计，可以承载各种数据。

15. cookie的一些属性值
name, value

domain: 想要设置cookie被多个二级域名共享，可以把cookie设置在顶级域名下面,注意只能设置自身的域名，以及自身的上级域名

path： 可以定义可以访问此cookie的页面路径，如果设置成 /test，那么只有/test路径下面的页面可以访问此cookie。

expires/Max-Age： cookie到期时间，不设置默认是Session，整个浏览器窗口关闭后，cookie失效。有些浏览器提供了会话恢复功能，及时关闭了浏览器，会话期的cookie也会被保留下来，好像浏览器从来没有关闭一样。

http： true，则js不能访问cookie

secure： 设置为true，则只能被https请求携带。







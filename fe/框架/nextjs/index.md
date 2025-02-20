## 简介
nextjs，是一个React开发框架，能有效协助开发者成功地构建React应用程序。

>> nextjs提供所有生产环境需要的功能来给你最佳的开发体验：构建时预渲染、服务端渲染、typeScript支持、自动拆包、路由预加载、零配置等等。

Next.js 具有同类框架中的最佳“开发人员体验”和许多内置功能：
  - 直观的、基于页面的路有系统（并支持动态路由）；
  - 预渲染：支持页面级的静态生成（SSG） 和 服务端渲染（SSR）；
  - 自动代码拆分，提升页面加载速度；
  - 具有经过优化的预取功能的客户端路由；
  - 内置CSS和Sass的支持，并支持任何CSS-in-JS库；
  - 开发环境支持快速刷新（热更新）；
  - 利用serverless functions及api路由构建api功能；
  - 完全可扩展；


## nextjs解决跨域问题

1. 改为服务端组件；

跨域访问限制是浏览器的行为，改为服务端组件，本质是Node后端调用，不会出现跨域问题。

2. 使用后端接口转发；

如果不适合改为服务端组件，我们可以用Next.js自定义一个接口，前端改为调用此接口。

3. 使用rewrites配置项

Nextjs提供了rewrites配置项用于重新给i饿请求，这是解决跨域问题常用的一种方式。

重写会将传入的请求路径映射到其他目标路径。可以理解为代理，并且它会屏蔽目标路径，使得用户看起来并没有改变其在网站上的位置。

修改 next.config.mjs，代码如下：

```ts
const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        // 当请求/api/juejin时，代理到https://juejin.cn
        source: '/api/juejin',
        destination: 'https://juejin.cn'
      }
    ]
  }
};
```

4. 使用中间件

不止可以通过next.config.js 重写配置，还可以在中间件实现重写。

```js
import { NextResponse } from 'next/server';
export function middleware(request) {
    if(request.nextUrl.pathname.startsWith('/api/juejin')) {
        return NextResponse.rewrite(new URL('https://juejin.cn'))
    }
}
export const config = {
    matcher: '/api/:path*'
}
```


## 借助next实现允许跨域的接口

1. 单个接口直接自定义headers允许跨域；
2. 批量接口，可以借助中间件设置headers允许跨域；
3. 借助next.config.ts，设置headers允许跨域；

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  }
};
```

4. 如果你使用vercel，也可以在vercel.json中配置。

```js
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
      ]
    }
  ]
}
```

## 中间件的作用

nextjs中间件的作用非常多样化，根据用户的喜好定制内容可以极大改善用户在网站上的体验，最终提高转化率。通过解析HTTP请求标头，支持向用户提供不同版本的网站。例如：
  - 国际化：基于请求头或URL参数调整内容以适应不同的区域和语言；
  - 重写和重定向：基于请求动态重写URL路径或进行重定向；
  - A/B测试：根据某些逻辑展示不同版本的页面；
  - 地理位置：根据用户的区域或地理位置（即由IP地址确定），您可以翻译文本、显示本地相关内容以及显示当地货币定制的价格；
  - 用户信息：一旦用户登陆，你就可以设置包含用户信息的cookie，例如他们的性别或者他们在您网站上购物的频率；
  - 技术栈：从浏览器的用户代理，您就可以向iphone或android呈现不同的内容，例如下载链接；
  - 回访用户：通过在首次访问时设置cookie，后续可以向回访用户显示特殊内容，例如下载链接；
  - 身份验证和授权：检查用户的身份验证和权限，如果用户没有适当的权限，可以在中间件中阻止请求继续进行，并返回适当的错误响应；
  
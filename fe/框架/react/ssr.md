## 概念

SSR：同样的组件在服务端渲染了一次，在客户端渲染了一次，这种可以在双端渲染的方式，叫做同构渲染。

服务端渲染是这样的：

```js
import { renderToString } from 'react-dom/server';
import App from './App';
// 会有http的server将renderToString的结果拼接成html返回
console.log(renderToString(<App />))
```

浏览器接收到后，再次渲染，这个过程就是hydrate的过程，将renderString与组件关联起来，就可以做状态更新和事件绑定了：

```js
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';

hydrateRoot(document.getElementById('root'), <App />);

```

hydrate会在渲染的过程中，不创建html标签，而是直接关联已有的。这样就避免了没必要的渲染。
服务端渲染组件为 string，拼接成 html 返回，浏览器渲染出返回的 html，然后执行 hydrate，把渲染和已有的 html 标签关联。

客户端进行水合的过程：
1. jsx 调用 react.createElement这种代码，叫做render function，render function执行之后，创建react element，也就是vdom。
2. react 会将vdom转成fiber结构，这个过程叫做reconcile。
  1. beginWork：根据不同的react dom的type，做不同的处理，函数组件、类组件、原生标签、文本节点等，hostRoot是fiber树的根，是reconcile的处理入口；
  水合的时候会执行enterHydrationState函数。
  2. completeWork：创建元素、添加子元素、更新属性等，然后把这个元素放到fiber.stateNode属性上。
  水合的过程通常会先判断已有的dom元素能否复用，可以复用的话，直接将dom的引用放到fiber.stateNode上，否则创建。

3. reconciler完成，fiber树创建之后，之后的渲染更新等就跟客户端渲染没有区别了。

## ssr的优缺点

### 优点

- 首屏加载速度提升：ssr提供更快的首屏加载时间，因为服务器直接渲染HTML并发送到客户端，减少了客户端的等待时间；
- SEO友好：搜索引擎可以更好的抓取服务器渲染的HTML，提高了页面的可索引行，从而提升搜索排名；

### 缺点

- 复杂性增加：需要管理客户端和服务端的渲染逻辑，增加了开发和维护的复杂性，同时确保服务器和客户端的状态同步可能较为复杂；
- 性能挑战：高并发情况下，服务器可能因为渲染压力而性能下降，需要优化和扩展，服务器距离客户端较远时，可能增加延迟；
- 调试苦难：服务器端和客户端的调试可能更为复杂；


## 首屏优化

### 完全服务端渲染SSR

客户端请求资源时，在服务器上完成完整的HTML生成，这样可以避免在客户端进行数据获取和模版化的其他往返过程，因为它是在浏览器获得响应之前进行处理的。

FP和FCP的差距通常很小，在服务器上运行页面逻辑和呈现可以避免想客户端发送大量js，这有助于实现快速的可交互时间（TTI）。而且可以将HTML流式传输到浏览器并立即呈现页面。不过，SSR需要花费更长的时间去解析，导致第一个字节到达（TTFB）浏览器的时间加长，并且我们没有利用现代应用程序的响应式功能和其他丰富的功能。

### 静态站点生成（SSG）

静态网站生成（static site generate）类似于服务端渲染，不过是在构建时而不是在请求时渲染页面。与服务端渲染不同，由不必动态生成HTML，因此它还可以保持始终如一的快速到第一字节的时间（TTFB）。通常，静态呈现意味着提前为每个URL生成单独的HTML文件。借助预先生成的HTML响应，可以将静态渲染器部署到多个CDN，以利用边缘缓存的优势。因此，我们可以快速显示页面，然后为后续页面提前获取SPA框架。但这种方法只适用于页面生成不依赖用户输入的场景。

### 带有(Re)Hydration的服务端渲染SSR + CSR 

Hydration译为水合。即对曾经渲染过的HTML进行重新渲染的过程称为水合。

导航请求由服务器处理，服务器将应用程序呈现为HTML，然后将js和用于呈现的数据嵌入到生成的文档中。理想状态下，就像服务端渲染一样可以得到快速的FCP，然后通过使用(Re)Hydration的技术在客户端再次渲染来修补（绑定事件处理程序等）。

借助React，我们可以在Node上使用ReactDOMServer模块，然后调用renderToString方法将组件生成为静态HTML字符串。使用Vue的话，我们可以使用vue-server-renderer，调用renderToString方法来将vue实例渲染为HTML。

这个方法也有其缺点，我们确实保留了客户端的全部灵活性，同时提供了更快的服务端渲染，但是FCP和TTI之间的间隔也越来越大，并且FID也增加了。Hydration非常昂贵，带有水合的SSR页面通常看起来具有欺骗性，并且具有交互性，但在执行客户端js并附加事件处理程序之前，实际上无法响应用户输入。

### 使用渐进(Re)Hydration进行流式服务端渲染（SSR+CSR）

为了最大程度的缩短TTI和FCP之间的间隔，我们可以发起多个请求，并在生成内容时分批发送内容（返回的响应体是流）。因此，在将内容发送到浏览器之前，我们不必等待完整的HTML字符串，还可以缩短第一个字节的时间。

在react中，我们可以使用renderToNodeStream而不是renderToString来通过管道返回响应并将HTML分块发送。在Vue中，我们可以使用renderToStream来实现管道和流传输。随着React Suspense的到来，我们也可以使用异步渲染来达到相同目的。

在客户端，我们不是一下启动整个应用程序，而是逐步启动组件。首先将应用程序的各部分分解供能放到独立脚本中，然后逐步激活（按优先级顺序）。我们可以先将关键组件激活，而其余的则随后激活。然后，可以针对每个组件定义为客户端还是服务端渲染（定义组件是server component还是client component）。然后，我们可以延迟某些组件的激活，直到它们出现在可视区域或用户交互需要或处理空闲状态时。

### 客户端预渲染

与服务端预渲染相似，但不是在服务器上动态渲染页面，而是在构建时将应用程序渲染为静态HTML。

在构建过程中使用renderToStaticMarkup方法而不是renderToString方法，生成一个没有data-reactid之类属性的静态页面，这个页面的主js和后续可能会用到的路由会做预加载。也就是说，当初打包时页面是怎么样，那么预渲染就是什么样。等到JS下载并完成执行，如果页面上有数据更新，页面会再次渲染。这会造成一种数据延迟的错觉。

达到的效果是TTFB和FCP的时间变少，并且缩短了TTI和FCP之间的间隔。如果预期内容会发生很大变化，就无法使用该方法。另外，必须提前知道所有URL才能生成所有页面。


### 三方同构渲染

三方同构渲染，在三个位置使用相同的代码渲染：在服务器上，在dom中或在service worker中。




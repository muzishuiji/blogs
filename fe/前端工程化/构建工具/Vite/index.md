## Vite的简介

Vite是一种新型的前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：
  - 一个开发服务器，它基于原生ES模块提供了丰富的内奸功能，如速度快到惊人的模块热替换（HMR）。
  - 一套构建指令，它使用Rollup打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源；

Vite是一种具有明确建议的工具，具备合理的默认设置。也提供了强大饿扩展性，可通过其插件API和JS API进行扩展，并提供完整的类型支持。

### 浏览器支持

在开发阶段，Vite将esnext作为转换目标，因为假设用户使用的是现代浏览器，它支持所有最新的js和css特性，这样可以防止语法降级，让vite尽可能接近原始源代码。

对于生产构建，默认情况下使用Vite的目标浏览器支持原生ES模块、原生ESM动态导入和import.meta。旧版本浏览器可以通过官方的@vitejs/plugin-legacy。

### 功能

对非常基础的使用来说，使用Vite开发和使用一个静态文件服务没有太大区别。然而，Vite还通过原生ESM导入提供了许多用于打包场景的增强功能。

### npm的依赖解析和预构建

原生es导入不支持下面这样的裸模块导入：

```js
import { someMethod } from 'my-dep'
```
上面的代码会在浏览器中抛出一个错误。Vite将会检测到所有被加载的源文件中的此类模块导入，并执行以下操作：

1. 「预构建」它们可以提高页面加载速度，并将CommonJS/UMD转换为ESM格式。预构建这一步由esbuild执行，这使得Vite的冷启动时间比任何基于js的打包器都要快得多。
2. 重写导入为合法的URL，例如`/node_modules/.vite/deps/my-dep.js?v=f3sf2ebd`以便浏览器能够正确导入它们。

### 模块热替换

Vite提供了一套原生ESM的HMR API。具有HMR功能的框架可以利用该API提供即时、准确的更新，而无需重新加载页面或清除应用程序状态。Vite内置了HMR到Vue但文件组件（SFC）和React Fast Refresh中。也通过@prefresh/vite对Preact实现了官方集成。

HMR是指在应用时进行动态模块替换，大多数打包起使用 ESM作为模块，因为它更容易分析导入和导出，这有助于了解一个模块的替换将如何影响其他模块。

模块通常可以访问HMR的生命周期API，以处理旧模块被丢弃以及新模块到位的情况。

#### Webpack hmr vs Vite hmr

Vite监听文件变更，文件发生变化后直接将更新信息推送到浏览器，浏览器接受更新信息，通过动态导入（import()）重新加载变化模块更新应用。

webpack同样是监听文件变化，重新打包推送更新到浏览器，浏览器重新加载发生变化的模块更新应用。

#### import.meta.hot.accept()

当你使用import.meta.hot.accept()，回调将负责用新模块替换旧模块，使用此API的模块也称为“已接受模块”。

- import.meta.hot.accept(cb: Function)- 接受自身的改变
- import.meta.hot.accept(deps: string | string[], cb: Function)- 接受来自导入模块的更改

#### import.meta.hot.dispose() 

清除旧模块创建的任何副作用：例如清楚事件监听器，定时器，或重置状态。

#### import.meta.hot.prune()

当需要从运行中完全删除模块时（例如删除文件），我们可以使用执行最终清理 import.meta.hot.prune()，这类似于import.meta.hot.dispose()，但它仅在删除模块时调用一次。

#### import.meta.hot.invalidate()

当调用此方法时，Vite服务器将被告知模块已失效，就像模块已更新一样。

#### 模块热更新的过程

- 编辑文件
当您编辑文件并保存时，HMR便会启动。文件系统监视程序将检测到并更改将此编辑的文件路径转发到下一步。

- 处理已编辑的模块
Vite开发服务器会获知已编辑的文件路径。然后使用文件路径在模块图中查找其相关模块，文件和模块是两个不同的概念，一个文件可能对应一个或多个模块。例如，vue文件可以编译为js模块和相关的css模块。
然后，模块将传递到vite插件的handleHotUpdate() 钩子进一步处理，它们可以选择过滤或扩展模块数组。处理后的模块将传递到下一步。

- 模块失效
在HMR传播之前，我们会急切的递归使更新模块及其导入器的最终数组失效。每个模块的转换代码都将被删除，并附加一个失效时间戳。该时间戳将用于下一个请求中在客户端获取新模块。

- HMR传播
最终更新的模块队列现在将经过HMR传播。这就是魔法发生的地方，并且常常是HMR无法按预期工作的原因。

从根本上讲，HMR传播就是以更新的模块为起点，找到HMR的边界，如果所有更新的模块都在边界内，vite dev服务器将通知HMR客户端通知已接受的模块执行HMR。如果有些模块不在边界内，则会触发整个页面重新加载。

####  剩下的

在需要完全重新加载的简单情况下，将向HMR客户端发送一条消息以重新加载页面。如果有可以热更新的模块，则HMR传播期间accept模块数组将发送到HMR客户端，它将触发上面讨论的相关HMR 的API，以便执行HMR。

#### HMR客户端
在Vite应用中，HTML中添加了一个特殊脚本，该脚本请求/@vite/client，这包含HMR客户端。

HMR客户端负责：
1. 与Vite开发服务器建立Websocket连接；
2. 监听来自服务器的HMR有效负载；
3. 在运行时提供并触发HMR API；
4. 将任何事件发送回Vite开发服务器；

#### HMR 更新

HMR传播过程中发现每个HMR边界通常对应一个HMR更新。在Vite中，更新以下签名。

```js
interface Update {
  // The type of update
  type: 'js-update' | 'css-update'
  // The URL path of the accepted module (HMR boundary root)
  path: string
  // The URL path that is accepted (usually the same as above)
  // (We'll talk about this later)
  acceptedPath: string
  // The timestamp when the update happened
  timestamp: number
}
```

### 仅执行转译

Vite仅执行.ts文件的转译工作，并不执行任何类型检查。并假定类型检查已经被你的IDE或构建过程处理了。

Vite之所以不把类型检查作为转换过程的一部分，是因为这两项工作在本质上是不同的。转译可以在每个文件的基础上运行，与Vite的按需编译模式完全吻合。相比之下，类型检查需要了解整个模块图。把类型检查塞进Vite的转换管道，将不可避免的损害Vite的速度优势。

Vite的工作是尽可能的将源模块转化为可以在浏览器中运行的形式。为此，我们建议将静态分析检查与Vite的转换管道分开。这一原则也适用于其他静态分析检查，例如ESLint。

Vite使用esbuild将ts转译成js，约是tsc速度的20-30倍，同时HMR更新反映到浏览器的时间小于50ms。

使用仅含类型的导入和导出形式的语法可以避免潜在的“仅含类型的导入被不正确打包”的问题，写法示例如下：

```js
import type { T } from 'only/types';
export type { T }  
```

## 简介

Rspack是一个基于Rust编写的高性能javascript打包工具，它提供对webpack生态良好的兼容性，能够无缝替换webpack，并提供闪电般的构建速度。

## Rspack和其他构建工具的对比

### 和webpack的对比

1. Rust语言优势：Rspack使用Rust语言编写，得益于Rust的高性能编译器支持，Rust编译生成的Native Code通常比js性能更为高效；
2. 高度并行的架构：webpack受限于js对多线程的赢弱支持，导致其很难进行高度的并行化计算，而得益于rust语言的并行化的良好支持，Rspack采用了高度并行化的架构，如模块图的生成，代码生成等阶段，都是采用多线程并行执行，这使得编译性能随着CPU核心数的增长而增长，充分挖掘CPU的多核优势。
3. 内置大部分的功能；事实上webpack本身的性能足够高效，但是因webpack本身内置了质量较少的功能，这使得我们在使用webpack做现代web app开发时，通常需要配合很多的plugin和loader进行使用，而这些loader和plugin往往是性能的瓶颈，而rspack虽然支持loader和plugin，但是保证绝大部分常用功能都内置在rspack内，从而减少js plugin ｜ loader导致的低性能和通信开销问题。
4. 增量编译：尽管rspack的全量编译足够高效，但是当项目庞大时，全量的编译让然难以满足HMR的性能要求，因此在HMR阶段，采用的是更为高效的增量编译策略，从而保证，无论你的项目多大，HMR的开销总是控制在合理范围内。

### 和vite的区别

Vite提供了很好的开发者体验，但是Vite在生产环境中依赖了Rollup，因此与其他基于js的工具链一样，面临着生产环境的构建性能问题。

另外，rollup相较于webpack做了一些平衡取舍，在这里同样适用。比如，rollup缺失了webpack对于拆包的灵活性，及缺失了optimization.splitChunks 提供的很多功能；

### 和esbuild的区别

用esbuild作为web app的构建工具存在的问题：

- 缺乏对js HMR和增量编译的良好支持，这导致大型项目的HMR性能较差；
- 拆包策略也非常原始，难以满足业务复杂多变的拆包优化需求；

### 和Turbopack的区别

Turbopack和Rspack都是基于rust实现的bundler，且都发挥了Rust语言的优势。

与Turbopack不同的是，Rspack选择了对webpack生态兼容的路线，一方面，这些兼容可能会带来一定的性能开销，但在实际的业务落地中，对大部分的应用来说，这些性能开销是可以接受的，另一方面，这些兼容也使得Rspack可以更好的上层的框架和生态进行集成，能够实现业务的渐进式迁移。

### 和Rollup的区别

Rspack和Rollup虽然都是打包工具，但是两者的侧重领域不同，Rollup更适合用于打包库，而Rspack适合用于打包应用。因此Rspack对打包应用进行了很多优化，如HMR、bundle spliting等功能，而rollup则比rspack的编译产物对库更为友好，如更好的esm产物支持。社区上也有很多的工具在rollup基础上进行了一定的封装，提供了对应用打包的更好的支持，如vite和wmr，目前Rspack比Rollup有更好的生产环境的构建性能。

### 和Parcel的区别

Rspack的整体架构与Parcel有很多共同之处。例如都将CSS资源视为一等公民，，都支持基于filter的transformer。然而，Parcel更加注重开箱即用的体验，而Rspack更加注重为上层框架提供更灵活的配置。Parcel开创性的设计了Unified Graph和使HTML成为一等公民的特性。RsPack也计划在未来支持这些特性。

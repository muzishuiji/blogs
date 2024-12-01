## css 面试题汇总

### 关于flex布局

1. 关于flex布局的内容移除撑大容器的问题。

min-width的默认值，在css2标准的布局模型中是0。但是在flex布局中，min-width的默认值最小content大小（min-content size， 是容器的宽度）。正是这个定义，导致了上文中Grid System被内容撑大。当没有明确设置width或者min-width的值时，flex-basis会不起作用，元素大小最后会收到min-width的限制。解决方案：

* overflow-x: hidden | scroll | auto;
* min-width: 0px; 比较小的值都可以
* width: 0px; 比较小的值都可以

2. flex-basis属性

 flex-basis 定义了flex item进行伸缩计算的基准值

除了 `auto/content/<'width'>`,还可以接受公共的一些值

```javascript
//  Specify <'width'>
flex-basis: 10em;
flex-basis: 3px;
flex-basis: auto;
flex-basis: content; // 基于元素的内容来设置基准值的尺寸
```
当flex-basis的值设置为auto时，会使用当前item设置的width或height的取值，如果width或height的取值是auto，那么会当作content的取值来处理。当设置成content时，会按照元素正常渲染出的content width或者height取值。

3.  flex base size

flex base size 由flex-basis的值计算而来，会直接用于计算压缩和拉伸的效果。

* 如果flex-basis设置了明确的值， flex base size的值就等于flex-basis的值

* 如果flex-basis没有设置明确的值，计算规则会略微复杂，简单理解就是根据item正常渲染时的width和height来定。

4. hypothetical main size

中文直译为【假设的main size】，表示在伸缩前，假设item的大小，该值会返回处于min_main_size 和 max_main_size区间的flex_base_size的值，用于计算剩余空间。

```javascript
hypothetical_main_size:
if flex_base_size  > max_main_size
    return max_main_size;
if flex_base_size  < min_main_size
    return min_main_size;
return flex_base_size;
```

5. 理解伸缩算法

6. display

display可以设置内部和外部显示类型，元素的外部显示类型将决定元素在流式布局中的表现（块级或者内联元素），元素的内部显示类型可以控制其子元素的布局（flow layout、grid， flex）。

7. tailwind css

tailwind就是基于postcss的AST实现的css代码生成工具，并且做了通过extractor提取js、html中class的功能。

tailwind的优点：

- 不用浪费精力发明类名：不需要添加愚蠢的类名，比如`sidebar-inner-wrapper`仅仅为了能够设置样式，也不再为真正一个flex容器的东西的完美抽象名称而苦恼；
- 你的css停止增长：使用传统方法，每次添加新功能时，你的css文件都会变大。使用原子class，一切都可以重用，因此您几乎不需要编写新的css；
- 做出改变感觉更安全：css是全局的，你永远不知道在进行更改时会破坏什么。HTML中的类是本地的，因此你可以更改他们而不用担心其他东西会破坏；

8. 外边距重叠与高度塌陷

  - 外边距重叠

  同一个BFC内的子元素的margin会发生重合，导致外边距重叠。解决方案之一就是将其变成BFC，比如设置display属性为inline-block、flex、grid等。
  
  - 高度塌陷

  当父元素包含浮动元素时，父元素的高度无法被正确计算，导致高度塌陷。可以通过设置清除浮动，设置overflow属性，或者设置display属性将父元素变成BFC来解决。

9. CSS标准盒模型与IE模型的区别

标准模型计算元素的高度只算content的高度，IE模型 content + padding + border的总尺寸。

```css
// 设置标准模型
box-sizing: content-box;
// 设置IE模型
box-sizing: border-box; // content+padding+border
```

10. px、em、rem、 vw&vh；
  - px：是绝对单位，表示屏幕上一个物理像素点。px的大小是固定的，不会随父元素或者跟元素的字体大小变化而变化；
  - em：相对单位，相当于当前元素的字体大小，如果当前元素没有字体大小，则会继承父元素的字体大小；
  - rem：相对单位，相当于根元素（html）的字体大小， 1rem 等于根元素的字体大小；
  - vw&vh：主要用于页面视口大小布局，在桌面端指的是浏览器的可视区域，在移动端指的是布局视口。

11. BFC（Block Formatting Context，块级格式上下文）

Box是CSS布局的对象和基本单位，直观来说，就是一个页面由多个box组成的。元素的类型和display属性，决定了这个Box的类型。不同类型的Box，会参与不同的formatting context（一个决定如何渲染文档的容器），因此box内的元素会以不同的方式渲染。有以下几种盒子：
  - block-level box：display属性为block、list-item、table的元素，会生成block-level box。并参与block formatting context；
  - inline-level box：display属性为inline、inline-block、inline-table的元素，会生成inline-level box，并且参与inline formatting context；

**Formatting Context**

Formatting Context是W3C CSS2.1规范中的一个概念，它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的Formatting Context有Block Formatting Context（BFC）和Inline Formatting Context（IFC）。

**BFC的布局规则**

- 内部的Box会在垂直方向，一个接一个的放置；
- Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。
- 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触（对于从左往右的格式化，否则相反）。即使存在浮动也是如此。
- BFC的区域不会与浮动的元素（兄弟元素）区域重叠；
- 计算BFC的高度时，浮动元素（子元素）也参与计算；
- BFC就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

**触发BFC的条件**
  1. 根元素，即HTML元素；
  2. float的值不是none；
  3. position的值为absolute或fixed；
  4. overflow的值不是visible，为auto、scroll、hidden；
  5. display的值是inline-block,table,table-cell, table-caption,inline-table,flex,inline-flex,grid,inline-grid;

**BFC的作用**
  1. 利用BFC避免margin重叠；
  2. 自适应两栏布局；
  3. 清除浮动；

12. 绘制三角形

```css
.box {
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 50px solid #333;
    width: 0;
    height: 0;
}
```
除了border的实现方式，还可以使用before伪元素和after伪元素实现。

13. CSS属性开启GPU加速

  - transform：使用translate3d，rotate3d，scale3d等3d变换属性；
  - opacity：设置元素的不透明度；
  - will-change：提前通知浏览器的某个元素的属性可能会发生变化，从而触发GPU加速。

14. h5的布局策略

引入手淘的flexible方案进行REM布局：

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/flexible.js/0.3.2/flexible.min.js"></script>

```
配合使用postcss-pxtorem 插件来自动将px单位转换为REM单位：

```js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // rootValue的设置值是基于设计稿的尺寸 / 100，如果你的设计稿是750px，那么设置rootValue:75。如果你的设计稿时375px，你的设置rootValue:37.5，这样设置后，设计稿上的1px对应 1/100rem，转换比较方便
      rootValue: 37.5, 
      propList: ['*'],
      minPixelValue: 2,
    }
  }
}
```

15. 响应式设计

响应式设计的基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理，为了很好的处理移动端的响应式，页面头部必须有meta声明viewport。

```js
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" >
```

属性对应如下：
  - width=device-width：自适应手机屏幕的最大尺寸；
  - maximum-scale： 缩放比例的最大值；
  - initial-scale：缩放的初始值；
  - user-scalable：是否允许用户做缩放操作；

实现响应式布局的方式如下：
 - 媒体查询；
 - 百分比；
 - vw/vh；
 - rem；

16. 媒体查询

```js
@media screen (min-width: 375px) and (max-width: 600px) {
  body {
    font-size: 18px;
  }
}
```

17. 实现垂直居中对齐的几种方式：

  - position + margin:auto;
  ```css
  .parent {
    width: 500px;
    height: 300px;
    position: relative;
  }
  .child {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  ```
  - position + margin:负值；

  ```css
  .parent {
    width: 500px;
    height: 300px;
    position: relative;
  }
  .child {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin-left: -50px;
    margin-top: -50px;
  }
  ```
  - position + transform；
   ```css
  .parent {
    width: 500px;
    height: 300px;
    position: relative;
  }
  .child {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translate(-50%, -50%);
  }
  ```
  - table布局；
  ```css
  .parent {
    width: 500px;
    height: 300px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .child {
    display: inline-block;
  }
  ```
  - flex布局；
  ```css
  .parent {
    width: 500px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .child {
    width: 100px;
    height: 100px;
  }
  ```
  - grid布局；
  ```css
  .parent {
    width: 500px;
    height: 300px;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .child {
    width: 100px;
    height: 100px;
  }
  ```
18. 经典的两栏布局

  - 左侧float，父元素设置overflow生成BFC；
  ```css
  .box {
    overflow: hidden; // BFC
  }
  .left {
    float: left;
    width: 200px;
    height: 400px;
  }
  .right {
    margin-left: 200px;
    height: 200px;
  }
  ```
  - flex布局；
  ```css
  .box {
    display: flex;
  }
  .left {
    width: 100px;
  }
  .right {
    flex: 1;
  }
  ```
19. 经典三栏布局

  - 左右两边float，中间使用margin；
  - 左右两边自适应，中间使用margin；
  - 左右两边使用float和负margin；
  - 使用display:table来布局；
  - 使用flex布局实现；
  - 使用grid布局实现；

20. 重排、重绘 和 composite

元素尺寸、布局的变化通常会触发重排，元素颜色的变化，背景的变化通常只会触发重绘，而如果利用animation动画，对opacity做变化（animation会默认触发GPU加速），则只会触发GPU层面的composite，不会触发重绘。

21. 利用css实现视差滚动效果

视差滚动（Parallax Scrolling）是指多层背景以不同的速度移动，形成立体的运动效果，带来出色的视觉体验。

我们可以把网页解刨成：背景层 -> 内容层 -> 悬浮层。
主要是借助background-attachment来视差滚动的效果。
perspective 可以定义我们眼睛看到的3d立体效果，即空间感。

22. grid网格布局

Grid布局即网格布局，是一个二维的布局方式，由纵横相交的两组网格线形成的框架性布局结构，能同时处理行与列，擅长将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次关系，可以更方便的定义对称、不对称等复杂的布局。

与之前讲到的flex一维布局不同，设置display:grid/inline-grid的元素就是网格布局容器，这样就能触发浏览器渲染引擎的网格布局算法。

利用grid布局可更容易的实现复杂的布局，目前的兼容性不错，IE10以下不支持，grid布局在手机端支持不太友好。



23. css像素、设备像素、设备独立像素、dpr、ppi

  - css像素
  px是一个相对单位，相对的是设备像素，一般情况下，页面缩放比为1，1个css像素等于1个设备独立像素。
  不同的设备，不同的分辨率下1个css像素代表的设备像素是不同的。
  px会受到下面的因素的影响而变化：
  - 设备像素
  设备像素又称为物理像素，指设备能控制显示的最小物理单位。从屏幕在工厂生产出的那天起，它上面的像素点就固定不变了，单位为pt。
  - 设备像素比（DPR）；
  设备独立像素：与设备无关的逻辑像素，代表可以通过程序控制使用的虚拟像素，是一个总体概念，包含了css像素。
  设备像素比DPR = 设备像素 / 设备独立像素。
  dpr为2时，使用4（2*2）个设备像素显示1个css像素，1px的css像素宽度对应2px的物理像素的宽度；
  dpr为3时，使用9（3*3）个设备像素显示1个css像素，1px的css像素宽度对应3px的物理像素的宽度；
  - 每英寸像素（PPI）；
  ppi：每英寸像素，表示每英寸所包含的像素点数目，更确切的说法是像素密度。数值越高，说明屏幕能以更高密度显示图像。

24. 回流和重绘

  - 回流（Layout）：布局引擎会根据各种样式计算每个盒子在页面上的大小与位置；
  - 重绘（Painting）：当计算好盒模型的位置、大小及其他属性后，浏览器根据每个盒子特性进行绘制；

回流的触发时机：

  - 添加/删除可见的DOM元素；
  - 元素的位置发生变化；
  - 元素的尺寸发生变化；
  - 元素内容变化，文本变化或图片被另一个不同尺寸的图片所替代；
  - 浏览器的窗口尺寸发生变化；

重绘触发时机：

  - 颜色的修改；
  - 文本方向的修改；
  - 阴影的修改；


浏览器优化机制：

由于每次重排都会造成额外的计算消耗，因此大多数浏览器会通过队列修改并批量执行来优化重排过程。浏览器会讲修改操作放入队列里，知道过了一段时间或者操作达到了一个阈值，才清空队列。

当你获取布局信息的操作的时候，会强制刷新队列，包括前面讲到的offsetTop等方法返回最新的数据。此时浏览器不得不清空队列，触发回流重绘来返回正确的值。

减少回流的策略：

  




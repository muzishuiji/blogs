## css 面试题汇总

### 关于flex布局

1. 关于flex布局的内容移除撑大容器的问题。

min-width的默认值，在css2标准的布局模型中是0。但是咋flex布局中，min-width的默认值最小content大小（min-content size， 我的理解是容器的宽度）。正是这个定义，导致了上文中Grid System被内容撑大。当没有明确设置width或者min-width的值时，flex-basis会不起作用，元素大小最后会收到min-wdith的限制。解决方案：

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

中文直译为【假设的main size】，表示在伸缩前，假设item的大小，该值会返回处于min main size 和 max main size区间的flex base size的值，用于计算剩余空间。

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

display可以设置内部和外部显示类型，元素的外部显示类型将决定元素在流式布局中的表现（块级或者内联元素），元素的内部显示类型可以控制其子元素的布局（flow layout吗grid， flex）。

7. tailwind css
tailwind就是基于postcss的AST实现的css代码生成工具，并且做了通过extractor提取js、html中class的功能。

tailwind的优点：
- 不用浪费精力发明类名：不需要添加愚蠢的类名，比如`sidebar-inner-wrapper`仅仅为了能够设置样式，也不再为真正一个flex容器的东西的完美抽象名称而苦恼；
- 你的css停止增长：使用传统方法啊，每次添加新功能时，你的css文件都会变大。使用原子class，一切都可以重用，因此您几乎不需要编写新的css；
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
box-sizing: border-box;
```

10. px、em、rem；
  - px：是绝对单位，表示屏幕上一个物理像素点。px的大小是固定的，不会随父元素或者跟元素的字体大小变化而变化；
  - em：相对单位，相当于当前元素的字体大小，如果当前元素没有字体大小，则会继承父元素的字体大小；
  - rem：相对单位，相当于根元素（html）的字体大小， 1rem 等于根元素的字体大小；

11. BFC（Block Formatting Context，块级格式上下文）

Box是CSS布局的对象和基本单位，直观来说，就是一个页面由多个box组成的。元素的类型和display属性，决定了这个Box的类型。不同类型的Box，会参与不同的formatting context（一个决定如何渲染文档的容器），因此box内的元素会以不同的方式渲染。有以下几种盒子：
  - block-level-box：display属性为block、list-item、table的元素，会生成block-level box。并参与block formatting context；
  - inline-level box：display属性为inline、inline-block、inline-table的元素，会生成inline-level box，并且参与inline formatting context；

**Formatting Context**

Formatting Context是W3C CSS2.1规范中的一个概念，它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的Formatting Context有Block Formatting Context（BFC）和Inline Formatting Context（IFC）。

**BFC的布局规则**

- 内部的Box会在垂直方向，一个接一个的放置；
- Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。
- 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触（对于从左往右的格式化，否则相反）。即使存在浮动也是如此。
- BFC的区域不会与float box重叠；
- BFC就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算；

**如何创建BFC**
  1. float的值不是none；
  2. position的值不是static或relative；
  3. overflow的值不是hidden；
  4. display的值是inline-block、table-cell、flex、table-caption或者inline-flex；

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

  - transform：使用translate3d，rotate3d，scale3d等3d变换属性‘
  - opacity：设置元素的不透明度；
  - will-change：提前通知浏览器的某个元素的属性可能会发生变化，从而触发GPU加速。

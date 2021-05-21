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



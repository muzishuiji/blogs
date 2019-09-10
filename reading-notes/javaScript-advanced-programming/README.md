# javascript-advanced-programming
JavaScript高级程序设计读书笔记.

第五章 引用类型
1. 使用Array构造函数时可以省略new操作符.
2. IE8以及更早的浏览器在数组的最后一项的末尾和对象的最后一项的末尾不建议添加",".
3. 通过设置数组的length属性可以实现数组元素的删除和值为undefind的新的元素的添加.
4. join()方法将数组拼接为字符串.
5. 如果数组中某一项的值是undefind,那么该值在join(),toLocalString(),toString(),valueOf()方法返回的结果中以空字符串表示.
6. 往数组中添加元素的函数返回的是数组的长度,往数组删除元素的函数返回的是删除的那个元素.
7. sort()方法默认是比较字符串的.
8. concat()方法不会改变原数组,它会创建并返回一个原数组的副本.
9. slice()函数,截取数组中的元素,不会改变原数组.
10. splice()方法会改变原数组,第一个参数是操作的开始位置,第二个参数为零表示往数组中添加元素,非零表示从数组中删除元素.
11. indexOf()从数组的开头向后查找,lastIndexOf()从数组的末尾向前查找.
12. 迭代方法
* every(): 对数组的每一项都运行指定函数,如果该函数对每一项都返回true则返回true.
* filter(): 对函数的每一项运行指定函数,返回一个过滤后的新的数组.
* foeEach(): 遍历数组进行相关操作,该方法没有返回值.
* map(): 返回每次函数调用的结果返回的数组.
* some(): 判断数组中有任何一个满足指定要求的就返回true,相当于或,而every相当于且.
以上所有函数的参数都是function(value, index, array) {/* 制定操作代码*/};
13. reduce()和reduceRight()函数
第一个函数从数组的第一项遍历到最后,后一个函数从数组的最后一项遍历到第一项,最终结果都是构建一个最后返回的值.
14. RegExp()函数第一个参数是正则表达式,第二个参数是可选的字符串,包含属性"g",i","m"分别用于指定全局匹配,区分大小写的匹配和多行匹配.
15. 正则表达式的valueOf()方法返回正则表达式本身.
16. 由于函数是一个对象,所以函数名实际上也就是一个指向函数的指针.
17. 函数表达式定义函数的方法就像声明变量一样.
18. 由于js中函数名就是指针,所以定义同名的函数就是改变了该函数名的指向,所以js中没有函数重载的概念,重名的函数后者会覆盖前者.
19. 函数的arguments对象的callee属性指向了拥有这个arguments对象的函数,有了这个属性,我们就可以消除在递归调用的时候函数的执行与函数名的紧耦合.这样的写法即使其他的对象指向了该函数,也不会对该函数的执行逻辑造成影响.
20. 函数对象的属性: caller,保存着调用当前函数的函数的引用.如果是在全局作用域中调用当前函数,它的值为null.还可以通过arguments.callee.caller来访问该属性.
21. 严格模式下,this不会转型为window,会变成undefind.
22. 函数对象的toLocaleString(),valueOf()fangfa 和toString()方法始终都会返回函数的代码.
23. 布尔表达式中所有对象都会被转换为true.
24. toFixed()方法是将数值转换为字符串.
25. charAt(index), charCodeAt(index)分别用于获取某个字符串索引index上的字符和字符编码.
26. slice(a, b)截取字符串的索引a开始到索引b的字符串若第二个参数不传,则默认是最后一个字符后面的位置.若a,b是负值,则会加上字符串的长度.
  substr(a,b)截取字符串从索引a开始的b个字符,b的默认值是字符串的长度.如果a是负值,则会自动加上字符串的长度,b是负值,则会被转换为0.
  substring(a,b)截取从索引a开始到索引b之间的字符串,索引b默认为最后一个字符后面的位置,若a,b中存在负值,则会被转换为0.
27. match()方法只接收一个参数,要么是一个正则表达式,要么是一个RegExp对象.
28. 正则表达式: 捕获组:
捕获组就是把正则表达式中子表达式匹配的内容保存到内存中以数字编号或显示命名的组里,方便后面引用.
29. str.replace(/at/g, 'con');全局匹配字符串at并替换成con.
30. fromCharCode()将一个或多个字符编码转换成一个字符串.
31. encodeURI()方法不会对URI的特殊字符进行编码,而encodeURIComponent()会对任何非标准字符进行编码.decodeURI()方法和decodeUTIComponent()是对应的解码函数.
32. eval()方法就像一个完整的ECMAScript解析器.
33. 三种基本包装类型, Boolean, Number, String.
34. 对象无非就是一组名值对,其中值可以使数据或者函数.
35. 增强的对象字面量其实就是当定义对象的属性名与定义的变量名相同的时候我们不需要明确指定属性名和属性值,而只需要写变量名,es6的对象会自动帮我们完成键到值的赋值.

第六章  面向对象的程序设计

1. ECMAScript有两种属性: 数据属性和访问属性.
2. 描述符: configurable,enumerable, writable,个value.
3. 一旦把一个对象的属性设置为不可配置,严格模式下delete这个属性就会报错,非严格模式会忽略.且该属性也不能变成可配置了,使用Object.defineProperty()方法只能修改除writable之外的特性.
4. 访问其属性
* [[Configurable]]
* [[Enumerable]]
* [[Get]]
* [[Set]]
5. 在属性名的前面加下划线表示定义的是只能通过对象的方法访问的属性.
6. 每个对象都有constructor属性,且这个属性指向构造它的函数.
7. 构造函数中执行同样任务的方法再不不同的实例中会重复创建,这就造成了内存的浪费,比较好的方法是我们把这个方法独立出来,然后构造函数里引用这个方法,这样创建不用的实例的该方法都指向同一个函数.
可是这样定义在全聚德函数只会被部分对象所引用就会让全局作用域显得名不副实,而且函数较多的话没有封装性可言了,我们可以使用原型模式来解决.
原型模式的解决方案就是在构造函数中,将所有属性和方法放在该函数的原型对象上,这样通过该构造函数实例化出来的对象就共有这些属性和方法了,而不需要重复创建.
8. isPrototypeOf()方法是用来判断某个对象的_proto_指向.
9. hasOwnProperty()判断对象的某个属性是否是自己本身的非继承的属性.
10. Object.keys()获取对象的所有可枚举属性.
11. 闭包是指有权访问另一个函数作用域内的变量的函数.
12. 通过构造函数和原型的混合使用我们可以实现私有属性和公有方法.
13. 如果在创建了实例之后重写原型,这对实例产生不了任何影响.
14. js中的继承是实现继承,其实现继承主要是依靠原型链来实现的.
15. 原型链是实现继承的主要方法,其基本原理是利用原型让一个引用类型去继承两一个引用类型的属性和方法.
16. 浅复制是指复制的对象和被复制对象的指向同一块内存区域.
17. Object.create(obj)方法实现的也是对obj对象的浅复制.该方法的第二个参数用于覆盖obj上原有的属性或者新建新的属性,然后再实现浅复制.
18. ES6中使用Array.fill()函数来初始化数组.
19. 寄生式继承是在原型继承的基础上添加一些属性或者方法然后再实现继承.
20. javascript主要是通过原型链实现继承,原型链的构建是通过一个类型的示例赋值给另一个构造函数的原型实现的.这样,子类型就可以访问继承得来的属性和方法了.
21. 函数声明的一个最重要的特征是函数声明提升.
22. 而函数表达式定义的函数属于匿名函数,不存在变量提升的问题,所以声使用前必须先定义.
23. arguments.callee()是一个正在执行的函数的指针,因此可以用它来实现对函数的递归调用.
24. 闭包是指有权访问另一个函数作用域中变量的函数.
25. 作用域链本质上是一个指向变量对象的指针列表.
26. 如果一个函数内部的匿名函数访问了该函数内部的变量,则在该函数调用结束以后,内部这个被引用的变量则不会被销毁,我们通过给该函数名赋值为null,来接触该函数的引用,这样垃圾回收机制会将该变量占用的内存回收.
27. 优化两点建议: 
  * 减少dom操作
  * 减少重绘和重排的次数
28. 在一个函数内部定义的函数将会包含外部函数的活动对象添加到它的作用域链中.
29. 闭包会携带包含它的函数的作用域,因此会比其他函数占用更多的内存.过度使用可能导致内存占用过多.
30. 匿名函数也会创建一个块级作用域.
31. 函数声明后是不可以跟圆括号的,只有函数表达式后面才可以跟圆括号,所以想把函数声明转换成函数表达式,只需要将函数声明外层加上一对圆括号即可.
32. 无论什么时候,只要需要一些临时变量,都可以使用块级作用域定义变量.
32. 函数的私有变量是指函数的参数,局部变量和函数内部定义的其他函数.
33. 使用构造函数可以来实现访问私有变量和方法的特权方法,但有一个弊端,就是针对不同的实例都会创建同一组新方法,而用私有静态变量来实现特权可以避免这个问题.
34. 其实所谓的使用静态私有变量来实现特权其实就是将特权方法绑定再构造函数的原型上,这样就保证了创建出来的不同的实例可以共享该特权方法.但这样不同的实例都可以共有的原型链上的属性,且查找层次加深,查找速度会受到影响.
35. 我们可以使用模块模式,创建一个单例,私有变量以及私有方法,然后将这些私有变量和私有方法暴露出来.
36. 有人进一步改进了模块模式,即在返回对象之前加入对其增强的代码.
37. 使用var添加的window属性有一个名为[Configurable]特性,这个特性被设置为false,这样定义的属性不可以通过delete操作符删除,在ie9有以前的浏览器中会报错,ie9之后的浏览器不会执行也不会报错.
38. 与框架有关的一个属性 --- name,这个属性相当于框架的标识.注意,除非最高层窗口是通过window.open()打开的,否则其window对象的name属相不会包含任何值
39. window.moveTo(x,y) 移动到新的位置
40. window.moveBy(x,y) 水平方向和垂直方向分别移动x个像素和y个像素.
41. 布局视口的大小是渲染后页面的实际大小,和可见视口不同,可见视口会随着窗口的缩放而发生改变.
42. 可以通过window.resizeTo(w,h),将浏览器窗口的宽度和高度调整到新高度和新宽度.
43. window.resizeBy(w,h),将当前浏览器的宽度和高度分别调整w和h 个像素.
44. window.open(),三个参数,第一个参数是要打开的链接,第二个参数是打开方式,第三个参数是打开窗口的工具栏,地址栏,状态栏的相关设置.
45. 获取视口的尺寸,document.body.clientWidth 和 document.body.clientHeight.
46. 判断测试对象的某个实例是否存在比较可靠的方法.

function isHostMethod(object, property) {
    var t = typeof object[property];
    return t=='function' || (!!(t == 'object' && object[property])) || t == 'unknown';
}

47. 在实际的加法和总,应该将能力检测作为确定下一步解决方案的依据,而不是用来判断用户使用的是什么浏览器.
48. 用户代理检测通过检测用户代理字符串来确定实际使用的浏览器.


第十三章  事件

1. 事件流描述的是从页面中接收事件的顺序.
2. IE的事件流叫做事件冒泡,即事件开始时由最具体的那个节点接收,然后逐级向上传播到较为不具体的节点(文档).
3. 注意使用removeEventListener()函数的时候,第二个参数必须是同一个函数才能有效移除该监听.
4. 注意:IE的attachEvent的回调函数的this指向window,不是指向所属元素的作用域.
5. 在IE中绑定的监听事件是和定义相反的顺序触发的,但是在其他浏览器中是按照定义的顺序来触发的.
**event对象的属性**
6. stopImmediatePropagation()取消事件进一步捕获或者冒泡,同时阻止任何事件处理程序被调用.
7. stopPropagation()取消事件进一步捕获或者冒泡,如果bubbles(控制事件是否冒泡)为true,则可以使用这个方法.
8. currentTarget和target都是指向触发该事件的元素.
9. eventPhase属性可以来判断当前事件处于事件流的哪一阶段,为1则处于事件捕获阶段,2处于目标阶段,3处于冒泡阶段.
10. returnValue属性是否取消事件的默认行为,为false可以阻止事件的默认行为.
11. IE阻止事件冒泡通过设置evet.cancelBubble属性来实现,true阻止冒泡,false不阻止.
12. 只有在一个元素上相继触发mousedown和mouseup事件,才可以触发click事件.
13. event.offsetX,event.offsetY,分别指光标相对于目标元素的x坐标和y坐标.
14. firefox的鼠标滚动事件是DOMMouseScroll,其他浏览器则是mousewheel事件.
15. 按住字符键不放,会重复触keydown和可以press事件,非字符键会重复触发keydown事件.
16. event.inputMethod表示把文本输入到文本框的方式.
17. 监听元素的contextmenu事件可以自定义元素的上下文菜单.
18. document.readyState有两个加载状态,interactive(交互,可以操作对象了,但还没有完全加载)和complete(完成,对象已经加载完毕)因为其先后顺序不确定,所以在判断的时候,应该同时检测交互阶段和完成阶段.这一个判断方法几乎所有的浏览器都支持
判断浏览器是否加载完毕还有一个方法,DOMContentLoaded方法,但是IE8及之前d的浏览器不支持该方法.
19. 可以通过自执行函数来防止对全局变量的污染.
20. load和hashChange的事件监听必须绑定在window上
21. 在移除某个元素的时候最好将和这个元素绑定的所有事件处理程序都移除.
22. 卸载页面的时候我们也应该移除相应的事件处理程序,只要是通过onload事件处理程序添加的东西,最后都要通过onunload事件处理程序将他们移除.
23. 但是使用onunload事件处理程序会导致页面不会被缓存在bfcache中.
24. IE有自己的模拟事件的方法,通过fireEvent()方法来模拟触发,接收两个参数,事件名和event对象,evenet对象是通过createEventObject()方法创建,属性自己定义.

其他浏览器则通过creatEvent()方法来创建event对象,这个对象包含了标准的event对象包含的属性.我们可以修改event对象的相关属性值,然后通过dispatch(event)方法了模拟触发.
25. 表单(HTMLFormElement)元素的一些属性
* acceptCharset: 服务器能够处理的字符集,等价于HTML中的accept-charset特性
* action: 接受请求的url,等价于HTML中的action特性
* elements: 表单中所有控件的集合
* enctype: 请求的编码类型,等价于HTML的enctype特性
* length: 表单中控件的数量
* method:要发送的HTTP请求类型,通常是get或post
* name: 表单的名称
* reset(): 将所有表单域重置为默认值
* submit(): 提交表单.
* target: 用于发送请求和接收相应的窗口名称.

26. 通过document.forms[(索引或者name)] 可以取得对应的表单.
27. 比较好的做法就是在提交表单后禁用提交按钮.
28. 如果表单元素的autofocus设置为true,则不能在调用focus()方法.
29. 一个好的习惯,在输入框获取焦点的时候默认选中输入框中的所有文本.
30. 要访问剪贴板中的数据,可以使用clipboardData对象.这个对象在IE中是window对象的属性,在其他浏览器中是event对象的属性.该对象有三个方法,getData(),setData()和clearData();
31. 每个表单元素都有一个checkValidity()方法,可以判断这个字段输入的值是否有效.
32. form有一个novalidate属性表示不验证表单.表单元素有一个formnovalidate属性表示不验证表单元素.
33. getSelectedOptions(selectbox)可以获取一个下拉列表中option选项为selected的条目项.
34. 创建一个下拉选项的方法,可以通过appendChild()函数或者new Option("option text", "option value")方法.后者存在兼容性问题.
35. 从下拉选框中移除某个选项,removeChild()方法和remove()方法.
36. 表单序列化的简单表示,encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value) + '&';
37. 使用document.execCommand()方法可以操作富文本编辑器,该方法接收三个参数,要执行的命令名称,表示浏览器是否应该为当前命令提供用户界面的一个布尔值和执行不命令不息的一个值
38. queryCommandEnabled()方法可以判断某个命令是否可以子啊当前稳本质性.

第十五章  使用canvas绘图

1. 可以用save方法保存上下文的设置和变换(不保存绘图上下文的内容),然后用restore()方法恢复之前的状态.
2. 可以通过toDataURL()方法来获得绘制的图形.
3. createPattern()方法来创建重复的图像.
4. getImageData()可以取得特定区域的图像数据
5. drawImage()看完已将一幅图像或者一个canvas元素绘制到画布上.
6. putImageData()方法把图像数据绘制到画布上.
7. globalCompositionOperation 表示后悔值得图形怎样与先绘制的图形结合
8. globalAlpha设置绘制图形的透明度.
9. webGL出错的话,可以通过gl.getError()来部捕获错误.

第十六章  HTML5脚本编程

1. 跨文档消息传送,有时候简称XDM,指的是在来自不同域的页面间传递消息.
2. event.source大多数情况下只是window对象的代理,并非实际的window对象.就是说,不能通过这个代理对象访问window的其他任何信息,记住,只通过这个代理调用postMessage()就好.
3. 在使用onmessage接受信息的时候,需要先通过event.origin来判断消息来源.
4. 默认很多元素是不支持防止拖拽目标的,如果想要它支持,就可以通过重写dragover和dragenter函数.
5. dataTransfer对象,该对象有两个方法,setData()和getData(),用于在拖放操作时实现数据交换.但该对象只在拖拽期间可访问.
6. 支持类型 url, text,  MIME类型(IE10以下不支持) text/uri-list  和 text/plain.
7. dataTransfer对象有两个属性,dropEffect和effectAllowed,dropEffect对象定义了被拖拽的元素执行哪种放置行为. effectAllowed 定义了执行那种行为下的dropEffect.

effectAllowed只能在ondragstart的时候设置, dropEffect必须在ondragenter事件中来设置.

8. dragable属性可以控制元素是否可以被拖动.
9. IE9以上才开始支持video和audio标签.
10. 浏览器并非支持所有的播放格式,所以可以通过canPlayType()方法来检查浏览器是否支持特定的格式.
10. history.state,返回当前状态的状态对象.

第十七章 错误处理与调试

1. 捕捉错误一般使用try catch,但是finally子句无论代码有没有发生错误都会执行.即使try或者catch子句中含有return 语句,都不会阻止finally子句的执行.
2. 一旦遇到throw操作符,代码会立即停止执行,金当有try-catch语句捕获到被抛出的值时代码才会继续执行.
3. 利用原型链可以通过Error来创建自定义错误类型.
`
function CustomError(message) {
    this.name = "CustomError";
    this.message = message;
}
CustomError.prototype = new Error();
throw new CustomError("my message");

`
4. IE只有在抛出Error对象的时候才显示自定义错误消息.对于其他类型,都无一例外显示抛出了异常,且未被捕获,
5. 只要代码中发生错误就会导致error事件的触发,IE中触发error事件不回终止代码的
执行,所有变量和数据将得到保留,因此能在onerror事件处理程序中访问他们,在firefox中,代码会停止执行,所以需要监听error事件的发生并处理,来组织浏览器默认的错误处理行为.

5. 基本类型的值使用typeof来检测类型,对象类型的值使用instanceof来检查类型
6. encodeURIComponent()方法,对查询字符串进行编码.
7. 良好的错误处理会给与用户更好的使用体验.
8. 语法错误还有除了分号和花括号为对应的原因,还可能是引入js的地方错引入了html;
9. 当url的长度超过最大长度限制的时候,系统会抛出无法找到指定资源的错误.
10. 致命错误的定义:
* 应用程序根本无法继续运行
* 错误明显影响到了用户的主要操作
* 会导致其他连带错误

第十八章 JavaScript与XML

1. DOMParser()方法,将xml转化为dom.传入数据的格式不合法,则会导致错误.
2. XMLSerializer()方法,将dom转化为xml.传入数据的格式不合法,则会导致错误
3. 创建一个XML文档的实例,需要使用ActiveXObject构造函数并为其传入一个表示XML文档版本的字符串.
4. 要解析XML字符串,首先必须创建一个DOM文档,然后调用loadXML()方法.
5. 如果解析过程出错,可以在parseError属性中找到错误消息.
6. IE将序列化XML的能力内置在拉DOM文档中,每个DOM节点都有一个xml属性,其中保存该节点的XML字符串.
7. IE中的XML文档对象也可以加载来自服务器的文件.
8. 这一章主要讲解了如何跨浏览器处理xml
9. XPath使用路径表达式来选取XML文档中的节点或节点集.
10. 目前,各个浏览器都比较好的支持XML,虽然IE浏览器的实现和其他浏览器有差异,但是还是有较多的公共功能可供我们实现跨浏览器的方案.

第十九章 E4X

1. E4X是ECMAScript的语言的可选扩展,用于处理XML的.
2. E4X定义如下几个新的全局类型
* XML: XML结构中的任何一个独立的部分
* XMLList: XML对象的集合
* Namespace: 命名空间前缀与命名空间URI之间的映射.
* QName: 由内部名称和命名空间URI组成的一个限定名.


**十八章十九章关于xml部分的内容暂时搁置,日后用到了再看.**

第二十章 JSON

1. JSON.stringify() 用于序列化JavaScript字符串,它接收三个参数,JavaScript对象, 另外两个参数指定以不同的方式序列化JavaScript对象,第一个参数是过滤器,可以是一个数组,也可以是一个函数.第二个参数是一个选项,表示是否在JSON字符串中保留缩进.
2. toJSON()方法,返回自身的JSON数据格式.

第二十一章 Ajax与Comet

1. Ajax技术的核心是XMLHTTPRequest对象(简称XHR),在XHR出现之前.Ajax式的通信必须借助一些hack手段来四线,大多数是使用隐藏的框架或内嵌框架.XHR为向服务器发送请求和解析服务器响应提供了流畅的接口.
2. 调用方法 var xhr = new XMLHttpRequest();
3. XHR对象的相关属性介绍:
* responseText: 作为响应主体被返回的文本;
* responseXML: 如果响应类型是"text/xml" 或者"application/xml",这个属性中将保存包含着相应数据的xml dom文档;
* status: 相应的HTTP状态
* statusText: HTTP状态的说明.

4. 判断一个请求是否响应成功的方法判断 (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) 即为请求成功.
5. readyState表示请求的状态, 0 : 未初始化, 1 : 启动, 2 : 发送, 3 : 接收, 4: 完成.
6. 使用xhr.abort()来取消异步请求.
7. User-Agent: 浏览器的用户代理字符串
8. setRequestHeader()方法,该方法应该写在open方法之后send方法之前来设置请求头.
9. 获取请求头的信息,getResponseHeader("Content-Type"), 或者获取所有头部信息getAllResponseHeaders();
10. firefox中的overrideMimeType()方法可以重写XHR相应的MIME类型.
11. 想要监听请求的进度,从而获得请求的进度条就需要xhr.progress事件.
12. xhr.open()方法接收三个参数,分别是请求的方法,请求的url和是否是异步请求.
13. 默认情况下,跨域请求不提供平局,通过将withCredentials属性设置为true,可以指定某个请求应该发送凭据.如果服务器接收该凭据,会将响应头中的Access-Control-Allow-Credentials的属性设置为true.如果服务器没有包含这个头部,则表示不接受该凭据,请求失败,会调用onerror事件处理程序.
14. 通过设置img标签的src属性可以实现浏览器与服务器之间的单向通信.
15. Comet是一种更高级的Ajax技术,是一种服务器向页面推送数据的技术.
16. 实现Comet有两种方式: 轮询和流
* HTTP流: 这个方法在页面的整个生命周期内只使用一个HTTP连接,具体来说,就是浏览器向服务器发送一个请求,而服务器保持连接打开,然后周期性地向浏览器发送数据.
* 轮询: 轮询又分为长轮询和短轮询, 短轮询即浏览器定时向服务器发送请求,看看有没有新的数据.长轮询是页面发起了一个到服务器的请求,然后服务器一直保持连接打开,直到有数据可发送,发送完数据之后,浏览器关闭连接,随即又发出一个到服务器的心情求.这一过程在页面打开期间一直持续不断.

所有浏览器都支持长轮询,只有部分浏览器支持HTTP流.
17. readyState的状态码及说明:
* 0: 请求未初始化
* 1: 服务器连接已建立
* 2: 请求已接收
* 3: 请求处理中
* 4:请求已完成,且响应已就绪
18. SSE(Server-Send-Event,服务器发送事件),是围绕只读Comet交互推出的API或者模式,SSE API用于创建到服务器的单向连接,服务器通过这个连接可以发送任意数量的数据,服务器相应的MIME类型也必须是text/event-stream,而且浏览器中的Javascript API能解析格式输出,SSE能支持短轮询,长轮询和HTTP流,而且能在断开连接时自动确定何时重新连接.状态readyState,为0正在连接到服务器,为1表示打开了连接,为2表示关闭了连接.
19. WebSocket()的状态readyState,为0正在建立连接器,为1表示已经建立连接,为2表示正在关闭连接,3表示已经关闭连接.
20. 必须给WebSocket()函数传入绝对的url.

第二十二章 高级技巧

1. es6为每个函数定义了一个原生的bind()方法.然而,被绑定函数比普通函数相比有更多的开销,它们需要更多内存,同时多重函数的调用稍微慢一些,所以使用时需要注意.
2. 函数柯里化在我的理解就是来处理函数参数的.
3. 为了防止对象被篡改,我们可以把对象定义为防篡改,但是一旦这样做,就无法撤销了.
4. es6提供了一个Object.seal()方法,该方法可以将对象设置为密封对象,不能对该对象进行属性的添加和删除操作,只能修改已有属性的值. Object.isSealed()方法可以判断某个对象是否是密封对象.   因为被密封的对象不可扩展,所以使用Object.isExtensible()方法也会返回false.
5. 冻结对象
冻结的对象是密封的,也是不可扩展的.Object.freeze();  判断是否冻结是 Object.isFrozen()方法.
6. 当不传递任何参数调用某个数组的concat方法时,将返回和原来的数组中项目一样的数组,相当于是对数组的克隆.
7. 对于频繁触发的代码逻辑我们都应该采用函数节流,让他周期性地触发,这样可以一定程度地提升性能.
8. EventTarget类型有一个单独的属性handlers,用于储存事件处理程序.
9. 能拖放的元素需要时绝对定位的.
10. map操作是可以高度并行的
11. 所谓的函数柯里化就是把一个多参数的函数,转化为单参数函数.
12. navigator.online属性为true表示设备能上网,为false表示设备离线.
13. 安全标志制定后,cookie只有在使用SSL连接的时候才发送到服务器.

14. indexDB的使用方法
(1) 指定主键,创建存储空间
(2) 引用该存储空间,调用add()或者put()方法.add()一般用来插入新值,put()一般用来更新某个值.
(3) 操作的结果某存在变量里, 并调用变量的onerror()事件和onsuccess()事件可以监听操作结果.
(4) 想要查询数据,.则需要创建事务

第二十五章 新兴的API

1. requeatAnimationFrame()
这个方法告诉浏览器,有一个动画开始了.
2. 通过event.dataTransfer.files来读取被拖拽文件的相关信息.这是一个存放拖拽文件信息的数组.

3. 一段通过XMLHttpRequest实现的文件上传代码: 
`
var files = event.dataTransfer.files;
var data = new FormData();
data.append("files0", files[0]);
var xhr = new XMLHttpRequest();
xhr.open("post", "FileAPIExample06Upload.php", true);  // 第三个参数表示是否发送异步请求,默认为true,发送异步请求
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
        alert(xhr.responseText);
    }
}
xhr.send(data);
`
4. 在实际的开发中,我们可以将比较耗时的操作交给WebWorker来做,这样页面仍然可以保持正常的运行,使用close()|方法和terminate()方法可以使WebWorker停止工作.但是WebWOrker不能操作dom,不处理和页面的交互操作.
5. requestAnimationFrame():实体个着眼于优化JavaScript的动画api,能够在动画运行期间发出信号.通过这种机制,浏览器能够自动优化屏幕重绘操作.
6. pageVisibility API让开发人员知道用户什么时候正在看着页面,什么时候页面是隐藏的.
7. Web Timing:给出了页面加载和渲染过程中的很多信息,对性能优化非常有价值.

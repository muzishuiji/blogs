# javascript 正则迷你书

## 第一章 正则表达式字符匹配攻略

1. 正则表达式就是匹配模式,要么匹配字符,要么匹配位置.
2. 正则的匹配分为模糊匹配和精确匹配. 而模糊匹配,有两个方向上的"模糊": 横向模糊和纵向模糊.

- 横向模糊

横向模糊指的是,一个正则可匹配的字符串的长度不是固定的,可以是多种情况的.

- 纵向模糊匹配

纵向模糊指的是,一个正则匹配的字符串,具体到某一位字符时,它可以不是某个确定的字符,可以有多种可能.

2. 惰性匹配与贪婪匹配

惰性匹配(尽可能少的匹配), 贪婪匹配(尽可能多的匹配), 默认情况下是贪婪匹配.

| 惰性量词 | 贪婪量词 |
| -------- | -------- |
| {m, n}?  | {m, n}   |
| {m,}?    | {m,}     |
| ??       | ?        |
| +?       | +        |
| \*?      | \*       |

3. 多选分支

一个模式可以实现横向和纵向的模糊匹配.而多选分支可以支持多个子模式任选其一;注意多选分支也有短路匹配的特性,如果第一个子模式已经匹配就会直接返回,不继续匹配后面的子模式.

4. 匹配 16 进制颜色的正则:

   RegExp: /#([0-9A-Fa-f]{6}|([0-9A-Fa-f]{3})/g
   TimeRegExp: /^(0?[0-9]|[1][0-9]|[2][0-3]):(0?[0-9]|[1-5][0-9])\$/; // 0 可省略

5. 可以通过设置 [^x]\*, 表示匹配到 x 字符之前的内容


    // 当匹配到双引号之前的内容
    var regex = /id="[^"]*"/
    var string = '<div id="container" class="main"></div>';
    console.log(string.match(regex)[0]);
    // => id="container"

## 第二章 正则表达式位置匹配攻略

ES5 中,共有 6 个锚, ^、\$、\b、\B、(?=p)、(?!p) , 灵活使用这 6 个锚,可以让我们更好的写出符合需求的正则.

1. ^ 和 \$

^: 匹配开头,在多行匹配中匹配开头;
\$: 匹配结尾,在多行匹配中匹配结尾;

2. \b 和 \B

\b: 匹配单词边界;
\B: 匹配非单词边界,夹在单词的字符间的位置;

        var result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
        console.log(result);
        // => "[#JS#] #Lesson_01#.#mp4#"
        var result = "[JS] Lesson_01.mp4".replace(/\B/g, '#');
        console.log(result);
        // => "#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4"

3. (?=p) 和 (?!p) (学名: 正向先行断言,和负向先行断言)

(?=p): 其中 p 是一个子模式,即匹配 p 前面的位置,或者说,该位置后面的字符要匹配 p.

    // 例: (?=l),表示"l"字符前面的位置
    var result = 'hello'.replace(/(?=l)/g, '#');
    console.log(result);
    // => "he#l#lo

(?!p): 匹配不匹配(?=p)的位置,即子模式 p 匹配字符前面的位置之外的位置

    // 例: (?=l),表示"l"字符前面的位置
    var result = 'hello'.replace(/(?!l)/g, '#');
    console.log(result);
    // => "#h#ell#o#

ES5 之后的版本会支持 (?<=p) 和 (?<!p) , 它们 和 (?=p) 和 (?!p) 的区别就是方向不同, 后者是匹配子模式 p 前的字符,前者是匹配子模式后的字符.

4. 位置的特性:

比如 "hello" 字符串等价于如下的形式：

`"hello" == "" + "h" + "" + "e" + "" + "l" + "" + "l" + "" + "o" + "";`

字符之间的位置,可以写成多个,可以把位置理解成空字符,一个位置可以匹配多个空字符.所以下面这个复杂的匹配也是返回 true 的.

    var result = /(?=he)^^he(?=\w)llo$\b\b$/.test("hello");
    console.log(result)

> > 把位置理解成空字符,是对位置非常有效的理解方式.

5. 不匹配任何东西的正则: /.^/
6. 数字的千分位分隔符:


    var result = '12456789'.replace(/(?!^)(?=(\d{3})+$)/g, ',');
    console.log(result);  // 12,456,789

如果要把 "12345678 123456789" 替换成 "12,345,678 123,456,789",则需要将正则里面的 ^ 和 结尾 \$,修改成 \b;

    var result = '12345678 123456789'.replace(/(?!\b)(?=(\d{3})+\b)/g, ',');
    console.log(result);  // 12,345,678 123,456,789
    // (?!\b) 也就是 \B
    var result = '12345678 123456789'.replace(/\B(?=(\d{3})+\b)/g, ',');
    console.log(result);  // 12,345,678 123,456,789

我们通常会将子模式用括号括起来.

7.  验证密码: 数字,小写字符和大写字符组成,至少包含两种;

`(?=.*[0-9])` 的意思就是 任意多个字符,后面跟个数字,就是接下来的字符,必须包含数字.

        // 两种字符组合
        var regExp = /(?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])^[0-9a-zA-Z]{6,12}/
        // 不能全部都是数字/大写字母/小写字母
        var regExp = /(?!^[0-9])(?!^[a-z])|(?!^[0-9])(?!^[A-Z])|(?!^[a-z])(?!^[A-Z])^[0-9a-zA-Z]{6,12}/

## 第三章 正则表达式括号的作用

### 3.1 分组和分支结构

1. 括号的主要作用是创建分组, 和让分支结构更符合预期.


    // 分组
    var regex = /(ab)+/g;
    // 没有加括号的分支, 匹配字符串 I love JavaScrip 或 regular expression
    var regex - /^I love JavaScript|regular expression$/
    // 加了括号的分支, 匹配字符串 I love JavaScrip 或 I love regular expression
    var regex - /^I love (JavaScript|regular expression)$/

### 3.2 分组引用

1. 加了分组的正则,会多了分组编号,正则引擎在匹配的过程中,给每一个分组都开辟一个空间,用来存储每一个分组匹配到的数据.


    var regex = /\d{4}-\d{2}-\d{2}/;
    var string = "2017-06-12";
    console.log( string.match(regex) );
    // => ["2017-06-12", index: 0, input: "2017-06-12"]
    var regex = /(\d{4})-(\d{2})-(\d{2})/;
    var string = "2017-06-12";
    console.log( string.match(regex) );
    // => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"]
    // 同样也可以使用正则对象的exec方法,也可以使用构造函数的全局属性 $1 - $9 来获取
    var regex = /(\d{4})-(\d{2})-(\d{2})/;
    var string = "2017-06-12";
    regex.test(string); // 正则操作即可，例如
    //regex.exec(string);
    //string.match(regex)
    console.log(RegExp.$1);  // "2017"
    console.log(RegExp.$2);  // "06"
    console.log(RegExp.$3);  // "12"

2. 有了分组引用,我们可以很容易的实现替换操作;


    var regex = /(\d{4})-(\d{2})-(\d{2})/;
    var string = '2017-06-12';
    var result = string.replace(regex, '$2/$3/$1');
    console.log(result);  // => "06/12/2017"

3. 如果要匹配不同日期格式的正则


    var regex = /\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/;
    // 以上正则也会匹配下列的日期格式
    var string1 = "2017-06-12";
    var string2 = "2017/06/12";
    var string3 = "2017.06.12";
    var string4 = "2016-06/12";
    console.log( regex.test(string1) ); // true
    console.log( regex.test(string2) ); // true
    console.log( regex.test(string3) ); // true
    console.log( regex.test(string4) ); // false
    // 如果我们想要分隔符前后一致呢?我们可以引用之前出现的分组,即反向引用
    var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
    // \1, \2, \3, 分别指代第一个,第二个,和第三个分组.

4. 嵌套的括号


    var regex = /^((\d)(\d(\d)))\1\2\3\4$/;
    var string = "1231231233";
    console.log( regex.test(string) ); // true
    console.log( RegExp.$1 ); // 123  // 匹配从左边数第一个开括号包裹的内容
    console.log( RegExp.$2 ); // 1    // 匹配从左边数第二个开括号包裹的内容
    console.log( RegExp.$3 ); // 23   // 匹配从左边数第三个开括号包裹的内容

5. 引用不存在的分组

如果使用反向引用,引用了不存在的分组,此时正则不会报错,这是匹配反向引用的字符本身,如 \2,就匹配 "\2".

    var regex = /\2/
    var result = '1124\2'.match(regex);
    console.log(result)

6. 分组后面有量词

分组后面有量词的话,分组最终捕获到的数据是最后一次的匹配.

    var regex = /(\d)+/;
    var string = "123456";
    console.log(string.match(regex));
    // => ["12345", "5", index: 0, input: "12345"]
    regex = /(\d)+ \1/;
    console.log(regex.test("12345 1"))
    console.log(regex.test("12345 5"))

7. 前面出现的括号,都会捕获到它们匹配的数据,以便后续引用,因此也称它们是捕获型分组和捕获型分支.如果只想要括号最原始的功能,不需要再 API 里引用,也不再正则里反向引用的话,可以使用非捕获括号 (?:p) 和 (?:p1|p2|p3);

   var regex = /(?:ab)+/g;
   var string = "ababa abbb ababab";
   console.log( string.match(regex) );
   // => ["abab", "ab", "ababab"]

8. 相关案例;

- 1. 字符串 trim 方法模拟


    // 第一种
    function trim(str) {
        return str.replace(/^\s+|\s+$/g. '')
    }
    console.log(trim(" foobar ")); // => foobar
    // 第二种, 匹配整个字符串,然后用引用来提取相应的数据
    function trim(str) {
        return str.replace(/^\s*(.*?)\s*$/. '$1');
    }
    console.log( trim(" foobar ") );
    // => "foobar"
    // 这里使用了惰性匹配 *?, 不然也会匹配最后一个空格之前的所有空格的;

- 2. 将每个单词的首字母转化为大写字母


    // 非捕获匹配
    function titleize (str) {
     return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
        return c.toUpperCase();
     });
    }
    console.log( titleize('my name is epeli') );
    // => "My Name Is Epeli"
    // 捕获匹配
    function titleize (str) {
     return str.toLowerCase().replace(/(^|\s)\w/g, function (c) {
        return c.toUpperCase();
     });
    }
    console.log( titleize('my name is epeli') );
    // => "My Name Is Epeli"

- 3. 驼峰化


    function camelize(str) {
        return str.replace(/[_-\s]+(.)?/g, function (match, c) {
            return c ? c.toUpperCase() : '';
        });
    }
    console.log( camelize('-moz-transform ') );
    console.log( camelize('font-size') );
    console.log( camelize('font size') );

- 4. 字符串转义


    var regex = /\&([^;]+);/g;
    var unsapceObj = {
         nbsp: ' ',
         lt: '<',
         gt: '>',
         quot: '"',
         amp: '&',
         apos: '\''
    }
    var result = '&lt;div&gt;Blah blah blah&lt;/div&gt;'.replace(regex, function(match, key) {
        if(key in unsapceObj) {
            return unsapceObj[key]
        }
        return match;
    })

- 5. 匹配成对标签


    var startTagReg = /<[^>]+>/;
    var startTagReg = /</[^>]+>/;
    // 匹配开始标签和结束标签相同的内容,这就需要用到反向引用
    var regex = /<([^>]+)>[\d\D]*<\/\1>/;
    var string1 = "<title>regular expression</title>";
    var string2 = "<p>laoyao bye bye</p>";
    var string3 = "<title>wrong!</p>";
    console.log( regex.test(string1) ); // true
    console.log( regex.test(string2) ); // true
    console.log( regex.test(string3) ); // false

总结来说就是: 括号可以提供分组,我们可以引用括号匹配的数据.

## 第四章 正则表达式回溯法原理

1. 我目前理解的回溯就是完成一次性的精准匹配的正则就不需要回溯,如果字符串匹配的是正则的另一个分支,或者正则涵盖的别的情形就会发生回溯, 比如 b{1,3} 正常遇到三个 b 则会继续往下匹配,如果遇到一个 b 或者两个 b 则会发生回溯.回溯的匹配无疑是更影响效率的.所以为了提高正则匹配的效率,我们需要减少不必要的回溯.

### 4.3 常见的回溯形式

1.  回溯的本质就是深度优先搜索算法,其中退到之前的某一步的过程,我们成为回溯,即匹配的路走不通时,就会发生回溯.
2.  贪婪量词

比如`b{1,3}`就是贪婪的,尝试可能的顺序时从多往少的方向去尝试,首先会尝试"bbb",然后再看整个正则是否能匹配,不能匹配时,吐出一个"b",即在"bb"的基础上,再继续尝试.如果不行,再吐出一个.再不行,就匹配失败了.

3. 如果存在多个贪婪量词,则会优先匹配在前面的贪婪量词.
4. 惰性量词

惰性量词就是在贪婪量词后面加个问好,表示尽可能少的匹配.

        var string = "12345";
        var regex = /(\d{1,3}?)(\d{1,3})/;
        console.log(string.match(regex));
        // => ["1234", "1", "234", index: 0, input: "12345"]

虽然惰性量词是尽可能少的匹配,但是在正则表达式中也会存在回溯的现象:

        var string = "12345";
        var regex = /^\d{1,3}?\d{1,3}$/;
        console.log(regex.test(string));
        // 由于后面的 \d{1,3} 最多只能匹配三个数字 345, 前面 \d{1,3} 最开始只匹配数字1,整体匹配到5会发生回溯,为了让整体匹配成功,因此最后 \d{1,3}? 匹配到的字符是 "12"

5. 分支结构

分支结构也是惰性的,如果匹配到了第一个分支,就不会继续尝试了,但是如果没有匹配,尝试匹配下一个分支,则会发生回溯.

6. 总结

回溯简单来说是因为正则的匹配有多种可能,要一个一个去试,要么到某一步时,匹配成功了;要么最后都试完,匹配不成功;

**贪婪量词"试"的策略是: 我能买很多,不够,那我少买点,在不够,那我再少买点;**

**惰性量词"试"的策略是: 我不想买太多,少了?那我买拿点?还是少?那就再买点**

**分支结构"试"的策略是: 货比三家,这家不行,换一家吧,还不行,再换**

JavaScript 正则引擎是 NFA(非确定有限自动机), 存在回溯的过程,匹配效率相较于 DFA(确定型有限自动机) 低一些.

## 第五章 正则表达式的拆分

### 5.1 结构和操作符

> > `(?:p)` 非捕获分组, `?=p` 匹配子模式 p 前面的字符, `?!p` 匹配子模式 p 后面的字符.

1. JavaScript 正则表达式中,有哪些结构?

字符字面量,字符组,量词,锚,分组,选择分支,反向引用

具体含义简要回顾如下:

| 结构   | 说明                                                                                                                                                                                   |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 字面量 | 匹配一个具体字符,包括不用转义的和需要转义的.比如 a 匹配字符"a",又比如 `\n`匹配换行符,又比如 `\.`匹配小数点                                                                             |
| 字符组 | 匹配一个字符,可以是多种可能之一,比如[0-9],表示匹配一个数字,也有\d 的形式,另外还有反义字符组,表示可以是除了特定字符之外的任何一个字符,比如 [^0-9],表示一个非数字字符,也有 \D 的简写形式 |
| 量词   | 表示一个字符连续出现,比如 a{1,3},表示 "a"字符连续出现 3 次,另外还有常见的简写形式,比如 a+表示"a"字符连续出现至少一次                                                                   |
| 锚     | 匹配一个位置,而不是字符,比如^匹配字符串的开头,又比如 \b 匹配单词边界,又比如 (?=\d)表示匹配数字前面的位置                                                                               |
| 分组   | 用括号表示一个整体,比如(ab)+, 表示"ab"两个字符连续出现多次,也可以使用非捕获分组(?:ab)+                                                                                                 |
| 分支   | 多个子表达式多选一,比如 abc                                                                                                                                                            | bcd , 反向引用,比如 \2,表示引用第 2 个分组 |

其中涉及到的操作有:

| 操作描述符   | 操作符                                  | 优先级 |
| ------------ | --------------------------------------- | ------ |
| 转义符       | \|1                                     |
| 括号和方括号 | (...), (?:...), (?!...), (?!...), [...] | 2      |
| 量词限定符   | {m}, {m,n}, {m,},?,\*,+                 | 3      |
| 位置和序列   | ^,\$,\元字符,一般字符                   | 4      |
| 管道符(竖杠) |                                         |        | 5 |

### 5.2. 注意要点

1. 注意操作符的优先级会影响匹配结果;


        var rege1 = /^abc|bcd$/;  // 匹配开头是abc的或者结尾是bcd的
        var rege1 = /^(abc|bcd)$/;  // 匹配目标字符串 abc 或者 bcd

2. 量词连缀的问题;


        var regex1 = /^[abc]{3}+$/;  // 报错,前面是量词,没什么可重复的
        var regex1 = /^([abc]{3})+$/;  // 匹配每个字符abc任选其一,字符串的长度是3
        的倍数

3. 匹配字符串 "[abc]", /\[abc]/g, 匹配字符串"{3,5}", /\{3,5}/

量词有简写形式 {m, },却没有 {,n}的情况,后者不构成量词的形式,匹配的字符串是 "{,n}";

4. 简单来说,当你想要将一个符号以普通字面量的形式做匹配的时候就需要考虑做转义(这种转义有时候不需要转义全部,只需要转义部分,只要构不成字符组,正则不会引发歧义,就不需要转义),如果你只是想利用符号在正则表达式里的特殊含义,就不需要转义.

5. 身份证的正则:


        /^(\d{15}|\d{17}[\dxX])$/

6. 总结

竖线的优先级最低,即最后运算.

## 第六章 正则表达式的构建

### 6.1 平衡法则

1. 构建正则需要做到下面几点的平衡:

- 匹配预期的字符串
- 不匹配非预期的字符串
- 可读性和可维护性
- 效率

### 6.2 构建正则的前提

1. 能否使用正则?
   要看场景是否是用正则能够解决的.

2. 是否有必要使用正则?
   已有的 api 是否能够解决问题,有没有必要使用正则.

3. 是否有必要构建一个复杂的正则?
   有时候编写过于复杂的正则往往会使接手的人难以理解,所以考虑拆分成多个小的正则来处理;

4. 匹配固定电话


        055188888888
        0551-88888888
        (0551)88888888
        /^(0\d{2,3}|0\d{2,3}-|\(0\d{2,3}\))[1-9]\d{6,7}$/
        /^(0\d{2,3}-?|\(0\d{2,3}\))[1-9]\d{6,7}$/

5. 匹配浮点数


        var regex = /^[+-]?(\d+\.\d+|\d+|\.\d+)$/;  // 匹配012这类的数字会报错
        // 可以做进一步的改写
        var regex = /^[+-]?(\d+)?(\.)?\d+$/;

### 6.4 效率

1. 正则表达式运行分为如下的阶段:

- 1. 编译;
- 2. 设定起始位置;
- 3. 尝试匹配;
- 4. 匹配失败的话,从下一位开始继续第 3 步;
- 5. 最终结果: 匹配成功或者失败;

2. 关于正则的优化

- 1. 使用具体型字符组来代替通配符,来消除回溯
     例如匹配双引号包裹的字符串: `/".*"/`
     使用具体化的字符组,来代替通配符,以便消除不必要的字符,此时使用正则 `/"[^"]*"/`

* 2. 使用非捕获型分组

因为括号可以捕获分组和分支里的数据,那么就需要内存来保存它们.当我们不需要分组引用和反向引用时,就可以使用非捕获分组.

`/^[-]?(\d\.\d+|\d+|\.\d+)$/`可以修改成`/^[-]?(?:\d\.\d+|\d+|\.\d+)$/`

- 3. 独立出确定字符

`/a+/` => `/aa*/`, 这样可以加快判断是否匹配失败,进而加快移位的速度

- 4. 提取公共分支部分

`/this|that/`修改成 `/th(?:is|at)/`, 我的理解就是可以减少匹配过程中回溯的范围.

- 5. 减少分支的数量,缩小他们的范围

`/red|read/` => `/rea?d/`

## 第七章 正则表达式变成

### 7.1 正则表达式的四种操作

正则表达式的操作: 匹配,验证,切分,提取,替换.

### 7.2 相关 API 注意要点

1. search 和 match 的参数问题,search 和 match 会将传入的字符串转换为正则.


        var string = "2017.06.27";
        console.log( string.search(".") );
        // => 0
        //需要修改成下列形式之一
        console.log( string.search("\\.") );
        console.log( string.search(/\./) );
        // => 4
        // => 4
        console.log( string.match(".") );
        // => ["2", index: 0, input: "2017.06.27"]
        //需要修改成下列形式之一
        console.log( string.match("\\.") );
        console.log( string.match(/\./) );
        // => [".", index: 4, input: "2017.06.27"]
        // => [".", index: 4, input: "2017.06.27"]

2. match 返回的格式

如果是全局匹配,返回的时所有匹配的内容组成的数组,如果非全局匹配,则数组的第一个元素整体匹配的内容,接下来是分组捕获的内容,然后是整体匹配的第一个下标,然后是输入的字符串.

3. exec 会在全局匹配的模式下,返回比 match 更完整的信息,它能够接着上一次匹配后的位置继续匹配.

4. test 和 exec 在全局匹配的模式下,每一次匹配完成后都会修改 lastIndex.匹配不到,则会将 lastIndex 重置为 0. 非全局模式下,每次都是从字符串第 0 个字符处开始匹配.
5. test 整体匹配需要加上 ^ 和 \$,因为 test 一旦匹配到就会返回.
6. split 可以有第二个参数,表示结果数组的最大长度.


        var string = "html,css,javascript";
        console.log( string.split(/,/, 2) );
        // =>["html", "css"]

7. replace 是很强大的.

replace 的第二个参数可以是字符串,也可以是函数.我们可以使用 replace 实现强大的功能.

- 当第二个参数是字符串时,如下的字符有特殊的含义:

| 属性                       | 描述                         |
| -------------------------- | ---------------------------- |
| $1,$2,...,\$99             | 匹配 1-99 个分组里捕获的文本 |
| \$&                        | 匹配到的子串文本             |
| \$`|匹配到的字串的左边文本 |
| \$'                        | 匹配到的字串的右边文本       |
| \$\$                       | 美元符号                     |

        var result = "2,3,5".replace(/(\d+),(\d+),(\d+)/, "$3=$1+$2");
        console.log(result);   // => 5=2+3
        var result = "2,3,5".replace(/(\d+)/g, "$&$&$&");
        console.log(result);   // => 222,333,555
        var result = "2+3=5".replace(/=/, "$&$`$&$'$&");
        // $& 匹配 "=", $`匹配"2+3", $'匹配"5",
        console.log(result);   // => 2+3=2+3=5=5;

- 当第二个参数是函数时


        "1234 2345 3456".replace(/(\d)\d{2}(\d)/g, function (match, $1, $2, index, input) {
            console.log([match, $1, $2, index, input]);
        });
        // match匹配到的字串, $1,$2,...$n第n个分组捕获的文本,index: 匹配成功的起始索引, input 完整的输入文本;
        // => ["1234", "1", "4", 0, "1234 2345 3456"]
        // => ["2345", "2", "5", 5, "1234 2345 3456"]
        // => ["3456", "3", "6", 10, "1234 2345 3456"]

8. 推荐使用字面量的方式而不是构造函数的方式生成正则,因为用构造函数会多写很多 \ .


        var string = "2017-06-27 2017.06.27 2017/06/27";
        var regex = /\d{4}(-|\.|\/)\d{2}\1\d{2}/g;
        console.log( string.match(regex) );
        // => ["2017-06-27", "2017.06.27", "2017/06/27"]
        regex = new RegExp("\\d{4}(-|\\.|\\/)\\d{2}\\1\\d{2}", "g");
        console.log( string.match(regex) );
        // => ["2017-06-27", "2017.06.27", "2017/06/27"]

9. 正则示例的属性;

global(全局匹配)、ingnoreCase(忽略大小写)、multiline(多行匹配)、lastIndex(匹配的索引), source(构建出的正则).

        var className = "high";
        var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
        console.log( regex.source )
        // => (^|\s)high(\s|$)

10. 构造函数属性

| 静态属性            | 描述                              | 简写形式     |
| ------------------- | --------------------------------- | ------------ |
| RegExp.input        | 最近一次目标字符串                | RegExp["$_"] |
| RegExp.lastMatch    | 最近一次匹配的文本                | RegExp["$&"] |
| RegExp.lastParen    | 最近一次捕获的文本                | RegExp["$+"] |
| RegExp.leftContext  | 目标字符串中 lastMatch 之前的文本 | RegExp["$`"] |
| RegExp.rightContext | 目标字符串中 lastMatch 之后的文本 | RegExp["$'"] |

测试代码如下:

        var regex = /([abc])(\d)/g;
        var string = "a1b2c3d4e5";
        string.match(regex);
        console.log( RegExp.input );
        console.log( RegExp["$_"]);  // => a1b2c3d4e5
        console.log( RegExp.lastMatch );
        console.log( RegExp["$&"] );  // => c3
        console.log( RegExp.lastParen );
        console.log( RegExp["$+"] ); // => 3
        console.log( RegExp.leftContext );
        console.log( RegExp["$`"] ); // => a1b2
        console.log( RegExp.rightContext );
        console.log( RegExp["$'"] ); // => d4e5

### 7.3 真实案例

1. 使用构造函数生成正则表达式,当一个正则表达式是不确定的,我们可能就需要使用构造函数来动态的创建正则表达式.
2. 我们可以使用字符串来替换对象保存数据,然后使用正则匹配来做逻辑处理,
   例: `var str = "Boolean|Number|String|Function|Array|Date|RegExp|Object|Error"`;
3. 可以使用正则的分支来替代 if 或者 switch 的分支;


    var readyRE = /complete|loaded|interactive/;
    function ready (callback) {
     if (readyRE.test(document.readyState) && document.body) {
        callback()
     }
     else {
         document.addEventListener(
             'DOMContentLoaded',
             function () {
                callback()
             },
             false
        );
     }
    };
    ready(function () {
     alert("加载完毕！")
    });

4.  replace 方法很强大,不仅仅可以用来做替换,而可以利用其匹配拿到的文本信息做一些复杂的组合逻辑,从而实现一些功能.

        function compress (source) {
         var keys = {};
         source.replace(/([^=&]+)=([^&]*)/g, function (full, key, value) {
            keys[key] = (keys[key] ? keys[key] + ',' : '') + value;
         });
         var result = [];
         for (var key in keys) {
            result.push(key + '=' + keys[key]);
         }
         return result.join('&');
        }
        console.log( compress("a=1&b=2&a=3&b=4") );
        // => "a=1,3&b=2,4"

必须包含数字的正则

        /?=.*[0-9]/  // 意味着任意个字符后面跟个数字, 必须包含数字
        /?=.*[a-z]/  // 意味着任意个字符后面跟个小写字母, 必须包含小写字母
        /?=.*[A-Z]/  // 意味着任意个字符后面跟个大写字母, 必须包含大写字母
        // 数字和字母的组合的6-12位的密码
        /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9A-Za-z]{6,12}\$/

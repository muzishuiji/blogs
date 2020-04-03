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

/**
 * 问题一：实现一个去除e 连续的df字符串的函数
 * adddefff -> a  先去掉e -> adddfff -> addff -> adf -> a
 * bdefgf -> bgf  先去掉e -> bdfgf -> bgf
 * dedeff -> ''  先去掉e -> dedff -> df -> ''
 */
function deleteStr(s) {
    let reg = /d(e*)f/;
    while(s.match(reg)) {
        s = s.replace(reg, '');
    }
    return s;
}
deleteStr('adddefff');
deleteStr('bdefgf');
deleteStr('dedeff');

/**
 * 问题二：判断字符串里面的括号是否闭合
  ( 对应 ) 
  { 对应 }
  [ 对应 ]

  规则左括号必须有对应的右括号
  比如
  '()'  ->  true
  '(]'  ->  false
  '([){[}'  ->  true  因为 ([) 和 {[} 都能闭合
  '([]{[}'  ->  false {[} 可以闭合  ([] 不能闭合
 */

function isClosed(s) {
    let stack = [];
    let obj = {
        '}': '{',
        ')': '(',
        ']': '['
    }
    for(let i of s) {
        if(Object.values(obj).includes(i)) {
            stack.push(i);
        } else {
            while(stack.includes(obj[i])) {
                let index = stack.indexOf(obj[i]);
                stack = stack.slice(0, index);
            }
        }
    }
    return stack.length == 0;
}
isClosed('()')
isClosed('(]')
isClosed('([){[}')
isClosed('([]{[}')

/**
 * 问题三：实现一个LRU缓存 ,同时给数据加上过期时间 ,在x秒内没有被get或者set, 这条数据自动过期
class LRU{
  constructor(){

  }
  get(){}

  set(){}
}
 */
class ListNode {
    constructor(key = 0, value = 0) {
        this.key = key;
        this.value = value;
    }
}
class LRU {
    constructor(capacity = 10) {
        this.capacity = capacity;
        this.expires = 2000;
        this.hashMap = new Map();
    }
    get(key) {
        if(!this.hashMap.has(key)) {
            return -1;
        }
        let data = this.hashMap.get(key);
        data.time = Date.now();
    }

    set(key, value) {
       // 已存在则更新
       if(this.hashMap.has(key)) {
         let data = this.hashMap.get(key);
         data.time = Date.now();
         data.value = value;
       } 
       // 删除过期数据
       if(this.hashMap.size === this.capacity) {
          // 其实可以利用map的插入有序，来删除第一个map节点
          this.hashMap.keys().forEach((key) => {
            if(Date.now() - this.hashMap.get(key).time > this.expires) {
                this.hashMap.delete(key);
            }
          });
       }
       this.hashMap.set(key, {
         key,
         value,
         time: Date.now(),
       })
    }
}
let lru = new LRU();
lru.set('1', '3');
lru.set('2', '2');
lru.set('3', '3');
lru.set('4', '4');
lru.set('5', '5');
lru.set('6', '6');
lru.set('7', '7');
lru.set('8', '8');
lru.set('9', '89');
lru.set('10', '10');
setTimeout(() => {
    lru.set('11', '11'); 
}, 3000);

/**
 * 问题四：给定 path 列表（linux 格式，每个 path 都从根目录（/）开始，指向某个文件），还原文件树。path 里除了最后一级，前边各级表示文件夹嵌套关系，
 * 需要还原为有对应嵌套关系的 map，path 最后一级表示文件，需要还原为其所在的文件夹对应的 map 里一个 value 为 null 的 key。
输入：[
"/foo/1.txt",
"/foo/2.txt",
"/foo/bar/3.txt",
"/bar/4.txt"
]
输出: {
"foo":{
"1.txt":null,
"2.txt": null,
"bar": { "3.txt": null }
},
"bar": { "4.txt": null }
}
 */
function resolvePath(path) {
    let len = path.length, pathMap = {};
    for(i = 0; i < len; i++) {
        let pathArr = path[i].split('/');
        let n = pathArr.length;
        let j = 1, targetMap = pathMap;
        while(j < n) {
            if(!targetMap[pathArr[j]]) {
                targetMap[pathArr[j]] = j === n - 1 ? null : {};
            }
            targetMap = targetMap[pathArr[j]];
            j++;
        }
    }
    return pathMap; 
}
resolvePath([
    "/foo/1.txt",
    "/foo/2.txt",
    "/foo/bar/3.txt",
    "/bar/4.txt"
]);

/**
 * 问题五：数值升序排列且以逗号分隔的字符串（可能含重复数字），用 `~` 符号替换区间中的数字，保留区间首尾

例：

```
'1,2,3,5,7,8,10' => '1~3,5,7~8,10'

'2,3,3,4,4,9,9,10,13,15' => '2~4,9~10,13,15'
 * 
 */
// 涉及到区间问题的处理优先考虑用双指针
function compressNumbers(str) {
    let numbers = str.split(',').map(Number);
    let start = numbers[0], end = numbers[0], res = [];
    for(let i = 1, len = numbers.length; i < len; i++) {
        // 如果当前数字是前一个数字的连续或和前一个数字相等，则更新区间结束
        while(numbers[i] === end + 1 || numbers[i] === numbers[i - 1]) {
            end = numbers[i];
            i++;
        }
        // 将新的区间加入数组
        if(start === end) {
            res.push(start);
        } else {
            res.push(`${start}~${end}`)
        }
        // 更新下一个区间的开始和结束
        start = numbers[i];
        end = numbers[i];
    }
    // 处理最后一个区间
    if(start === end) {
        res.push(start);
    } else {
        res.push(`${start}~${end}`)
    }
    return res.join(',')
}

compressNumbers('2,3,3,4,4,9,9,10,13,15')
compressNumbers('1,2,3,5,7,8,10')

function compressNumbers(str) {
    // 用双指针来处理区间的合并
    let numArr = str.split(',').map(Number);
    let len = numArr.length, ans = [];
    let start = numArr[0], end = numArr[0];
    for(let i = 1; i < len; i++) {
        // 相等或者相差为1，则右指针后移，区间扩大
        while(numArr[i] === end + 1 || numArr[i] === numArr[i - 1]) {
            end = numArr[i];
            i++;
        }
        if(start === end) {
            ans.push(start);
        } else {
            ans.push(`${start}~${end}`);
        }
        start = numArr[i];
        end = numArr[i];
    } 
    // 处理最后一个区间
    if(start === end) {
        ans.push(start);
    } else {
        ans.push(`${start}~${end}`);
    }
    return ans.join(',');
}
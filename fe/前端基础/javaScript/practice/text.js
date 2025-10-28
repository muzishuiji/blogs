// 最长不重复子串
function maxUniqueString(s) {
  function isUnique(s) {
    let obj = {};
    for(let i of s) {
      if(obj[i]) {
        return false;
      } 
      obj[i] = true;
    }
    return true;
  }
  let len = s.length;
  if(len <= 1) {
    return s;
  }
  let ans = s[0];
  for(let i = 0; i < len; i++) {
    let j = i + ans.length;
    while(j < len && isUnique(s.slice(i, j))) {
      ans = j - i > ans.length ? s.slice(i, j) : ans;
      j++;
    }
  }
  return ans;
}
// 滑动窗口实现最长不重复子串
function maxUniqueString(s) {
  let len = s.length;
  if(len <= 1) {
    return len;
  }
  let strSet = new Set(), ans = 1;
  let j = 0;
  for(let i = 0; i < len; i++) {
    if(i > 0) {
      strSet.delete(s[i - 1])
    }
    while(j < len && !strSet.has(s[j])) {
      strSet.add(s[j]);
      j++;
    }
    ans = Math.max(j-i, ans);
  }
  return ans;
}




// 防抖：一段时间内不再触发，则执行  input的输入搜索
function myDebounce(cb, delay) {
  let timerId = null;
  return function(...args) {
    clearTimeout(timerId);
    let context = this;
    timerId = setTimeout(() => {
      cb.apply(context, args);
    }, delay);
  }
}

// 节流：一段时间内只触发一次 滚动、拖拽监听
function myThrottle(cb, delay) {
  let startTime = performance.now();
  return function (...args) {
    let currentTimer = performance.now();
    let context = this;
    if(currentTimer - startTime >= delay) {
      cb.apply(context, args);
      startTime = performance.now();
    }
  }
}

// 
function myNew(fn) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let args = Array.prototype.slice.call(arguments, 1);
  // 如果构造函数显式返回对象，则返回构造函数返回的对象
  // 如果构造函数没有显式返回对象，则返回我们创建的对象
  let res = fn.apply(obj, args);
  return typeof res === 'object' ? res : obj;
}

// 产生 n-m之间的随机数
// Math.random() * (m - n) + n
// 洗牌算法，从最后元素开始，每个位置产生一个随机数，然后交换
// 树形数组查找，dfs或者bfs遍历


// lastPromise：持续请求只有最后一个输出，设计callid来存当前请求的标记，lastId来存最后一个请求的标记，判断相等则完成promise。

// 解析字符串，实现eval版本的jsonparse，主要通过正则匹配，然后处理不同类型的数据，数组、对象等。

// 冒泡排序
// 冒泡排序的思路就是把小的数据冒泡到上面来

// 选择排序

// 归并排序


let n = nums.length, stack = [];
  let ans = new Array(n).fill(-1);
  for(let i = 0; i < n * 2; i++) {
      // 看起来是嵌套处理，但总的服务次数仍然与客户数量成正比
      while(stack.length && nums[i % n] > nums[stack[stack.length - 1]]) {
          let index = stack.pop();
          ans[index] = nums[i % n];
      }
      stack.push(i % n)
}
return ans;


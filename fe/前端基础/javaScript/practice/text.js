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



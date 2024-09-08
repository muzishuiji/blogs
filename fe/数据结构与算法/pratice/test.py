# 判断链表是否有环
def hasCycle(self, head)
  fast = slow = head
   while slow and fast and fase.next:
        slow = sloe.next
        fast = fast.ndext.next
        if slow is fast:
            return True
    return False

# 判断一个字符串是否是平衡字符串
def isValid(self, s):
  stack = []
  paren_map = { ')': '(', ']': '[', '}': '{'}
  for c in s:
    if c not in paren_map:
      stack.append(c)
    elif no stack or paren_map[c] != stack.pop():
      retutn False
  return no stack


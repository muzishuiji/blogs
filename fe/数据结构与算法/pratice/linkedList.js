/** 链表节点类 */
class ListNode {
    val;
    next;
    constructor(val, next)  {
        this.val = (val === undefined ? 0 : val); // 节点值
        this.next = (next === undefined ? null : next); // 指向下一个节点的引用
    }

}

/** 在链表的节点n0之后插入节点p */
function insert(n0, p) {
    const n1 = n0.next;
    p.next = n1;
    n0.next = p;
}

/** 删除链表的节点n0之后的首个节点 */
function remove(n0) {
    if(!no.next) return;
    const p = n0.next;
    const n1 = p.next;
    n0.next = n1;
}

/** 在链表中访问索引位index的节点 */
function access(head, index) {
    for(let i = 0; i < index; i++) {
        if(!head) return null;
        head = head.next;
    }
    return head;
}

/** 在链表中查找值为target的首个节点 */
function find(head, target) {
    let index = 0;
    while(head !== null) {
        if(head.val === target) {
            return index;
        }
        head = head.next;
        index += 1;
    }
    return -1;
}
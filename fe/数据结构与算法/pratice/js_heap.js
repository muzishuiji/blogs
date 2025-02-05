// js实现小顶堆
class Heap {
    constructor(compareFn) {
        this.compareFn = compareFn;
        this.queue = [];
    }
    size() {
        return this.queue.length;
    }
    // 添加
    push(item) {
        // 入栈新元素
        this.queue.push(item);
        // 一步步向上做堆化操作
        let index = this.size() - 1; // 获取推入元素坐标
        let parent = Math.floor((index - 1) / 2); // 获取父节点坐标
        while(parent >= 0 && this.compare(parent, index)) {
            [this.queue[parent], this.queue[index]] = [this.queue[index], this.queue[parent]];
            // 更新下标
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }
    // 出栈
    pop() {
        // 边界情况
        if(this.size() <= 1) {
            return this.queue.pop();
        }
        let res = this.queue[0];
        this.queue[0] = this.queue.pop();
        let index = 0;
        let left = 1;
        let searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left;
        // 堆顶元素比左右子节点大，则向下堆化
        while(this.compare(index, searchChild) > 0) {
            [this.queue[searchChild], this.queue[index]] = [this.queue[index], this.queue[searchChild]];
            // 更新下标
            index = searchChild;
            left = 2 * index + 1;
            searchChild = this.compare(left, left + 1) > 0 ? left + 1 : left;
        }
        return out;
    }
    // 比较大小
    compare(index1, index2) {
        if(this.queue[index1] === undefined) return 1;
        if(this.queue[index2] === undefined) return -1;
        return this.compareFn(this.queue[index1], this.queue[index2]);
    }
}

// this.compare(a, b) > 0 则 a < b
// this.compare(a, b) < 0 则 a > b
// 利用小顶堆解决topK问题
const topKFrequent = function(nums, k) {
    const map = new Map();
    for(let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }
    // 创建小顶堆
    const heap = new Heap((a, b) => a[1] - b[1]);
    for(let entry of map.entries()) {
        heap.push(entry);
        if(heap.size() > k) {
            heap.pop();
        }
    }
    let res = [];
    for(let i = heap.size() - 1; i >= 0; i--) {
        res.push(heap.pop()[0]);
    }
    return res;
}

/** 建堆 */
class MaxHeap {
    #maxHeap;
    /** 构造方法，建立空堆或者根据输入列表建堆 */
    constructor(nums) {
        // 将列表元素原封不动添加进堆
        this.#maxHeap = nums === undefined ? [] : [...nums];
        // 堆化除叶节点以外的其他所有节点
        for(let i = this.#parent(this.size() - 1); i >= 0; i--) {
            this.#shiftDown(i);
        }
    }
    /** 获取左子节点索引 */
    #left(i) {
        return 2 * i + 1;
    }
    /** 获取右子节点索引 */
    #right(i) {
        return 2 * i + 2;
    }

    /** 获取父节点索引 */
    #parent(i) {
        return Math.floor((i - 1) / 2);
    }

    /** 访问堆顶元素 */
    peek() {
        return this.#maxHeap[0];
    }

    /** 元素入堆 */
    push(val) {
        // 添加节点
        this.#maxHeap.push(val);
        // 从底至顶堆化
        this.#shiftUp(this.size() - 1);
    }
    /** 元素出堆 */
    pop() {
        // 判空处理
        if(this.isEmpty()) return new Error('堆为空'); 
        // 交换根节点与最右叶节点(即交换堆顶元素与堆尾元素)
        this.#swap(0, this.size() - 1);
        // 从顶至底堆化
        this.#shiftDown(0);
    }
    /** 从索引i对应的节点开始，从底至顶堆化 */
    #shiftUp(i) {
        while(true) {
            // 获取索引i对应父节点的索引
            const p = this.#parent(i);
            if(p < 0 || this.#maxHeap[p] >= this.#maxHeap[i]) {
                break;
            }
            // 交换两节点
            this.#swap(i, p);
            // 循环向上堆化
            i = p
        }
    }
    /** 从索引i对应的节点开始，从顶至底堆化 */
    #shiftDown(i) {
        while(true) {
            // 获取索引i对应父节点的索引
            const l = this.#left(i);
            const r = this.#right(i);
            let ma = i;
            if(l < this.size() && this.#maxHeap[l] > this.#maxHeap[ma]) ma = l;
            if(r < this.size() && this.#maxHeap[r] > this.#maxHeap[ma]) ma = r;
            // 节点i最大 或者索引l、r越界，则无需继续堆化，跳出
            if(ma === i) {
                break;
            }
            // 交换两节点
            this.#swap(i, ma);
            // 循环向下堆化
            i = ma;
        }
    }
    /** 交换堆中的两个元素 */
    #swap(i, p) {
        let tmp = this.#maxHeap[i];
        this.#maxHeap[i] = this.#maxHeap[p];
        this.#maxHeap[p] = tmp;
    }
    
    getMaxHeap() {
        return this.#maxHeap;
    }
}
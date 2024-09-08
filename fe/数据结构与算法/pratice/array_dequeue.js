/** 基于唤醒数组实现的队列 */
class ArrayQueue {
    #nums; // 用于存储双向队列元素的数组
    #front; // 队首指针，指向队首元素
    #queueSize = 0; // 双向队列长度

    /** 构造方法 */
    constructor(capacity) {
        this.#nums = new Array(capacity);
        this.#front = 0;
        this.#queueSize = 0
    }
    /** 获取队列的容量 */
    get capacity() {
        return this.#nums.length;
    }
    /** 获取队列的长度 */
    get size() {
        return this.#queueSize;
    }
    /** 判断队列是否为空 */
    isEmpty() {
        return this.#queueSize === 0;
    }

    /** 计算环形数组索引 */
    // 对容量取余是一个很好的重置索引的办法
    index(i) {
        // 通过取余操作实现数组首尾相连
        // 当i越过数组尾部后，回到头部
        // 当i越过数组头部后，回到尾部
        return (i + this.capacity()) % this.capacity();
    }

    /** 队首入队 */
    pushFirst(num) {
        if(this.#queueSize === this.capacity) {
            console.log('双向队列已满');
            return;
        }
        // 队首指针向左移动一位
        // 通过取余操作，实现front越过头部回到尾部
        this.#front = this.index(this.#front - 1);
        // 将num添加至队首
        this.#nums[this.#front] = num;
        this.#queueSize++;
    }
    /** 队尾入队 */
    pushLast(num) {
        if(this.#queueSize === this.capacity) {
            console.log('双向队列已满');
            return;
        }
        // 队首指针向左移动一位
        // 通过取余操作，实现front越过头部回到尾部
        const rear = this.index(this.#front + this.#queueSize);
        // 将num添加至队首
        this.#nums[rear] = num;
        this.#queueSize++;
    }
    /** 队首出队 */
    popFirst() {
        const num = this.peekFirst();
        // 队首指针向后移动一位
        this.#front = this.index(this.#front + 1);
        this.#queueSize--;
        return num;
    }
     /** 队尾出队 */
     popLast() {
        const num = this.peekLast();
        this.#queueSize--;
        return num;
    }
    /** 访问队首元素 */
    peekFirst() {
        if(this.isEmpty()) {
            throw new Error('队列为空');
        }
        return this.#nums[this.#front];
    }
    /** 访问队尾元素 */
    peekLast() {
        if(this.isEmpty()) {
            throw new Error('队列为空');
        }
        const last = this.index(this.#front + this.#queueSize);
        return this.#nums[last];
    }
    /** 返回Array */
    toArray() {
        // 仅转换有效长度范围内的列表元素
        const arr = new Array(this.#queueSize);
        for(let i = 0, j = this.#front; i < this.#queueSize; i++,j++) {
            arr[i] = this.#nums[this.index(j)];
        }
        return arr;
    }
}
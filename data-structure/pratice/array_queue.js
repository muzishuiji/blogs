/** 基于环形数组实现的队列 */
class ArrayQueue {
    #nums; // 用于存储队列元素的数组
    #front; // 队首指针，指向队首元素
    #queueSize = 0; // 队列长度

    constructor(capacity) {
        this.#nums = new Array(capacity);
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

    /** 入队 */
    queue(num) {
        if(this.size === this.capacity) {
            console.log('队列已满');
            return;
        }
        // 计算尾指针，指向队尾索引 + 1
        // 通过取余操作，实现rear越过数组尾部回到头部
        // 这样可以找到待插入元素的准确索引位置
        const rear = (this.#front + this.size) % this.capacity;
        // 将num添加至队尾
        this.#nums[rear] = num;
        this.#queueSize++;
    }
    /** 出队 */
    pop() {
        const num = this.peek();
        // 队首指针向后移动一位，若越过尾部则返回到数组头部
        // 越过尾部则返回数组头部：说明队首指针移动到队尾？队列出空了？
        this.#front = (this.#front + 1) % this.capacity;
        this.#queueSize--;
        return num;
    }
    /** 访问队首元素 */
    peek() {
        if(this.isEmpty()) {
            throw new Error('队列为空');
        }
        return this.#nums[this.#front];
    }
    /** 返回Array */
    toArray() {
        // 仅转换有效长度范围内的列表元素
        const arr = new Array(this.size);
        for(let i = 0, j = this.#front; i < this.size; i++,j++) {
            arr[i] = this.#nums[j % this.capacity];
        }
        return arr;
    }
}
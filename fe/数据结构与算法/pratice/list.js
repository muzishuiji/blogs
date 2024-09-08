/** 列表类简易实现 */
class MyList {
    #nums = new Array(); // 数组（存储列表元素）
    #capacity = 10; // 列表容量
    #size = 0; // 列表长度（当前元素数量）
    #extendRatio = 2; // 每次列表扩容的倍数

    constructor() {
        this.#nums = new Array(this.#capacity);
    }
    // 获取列表长度
    size() {
        return this.#size;
    }

    // 获取列表容量
    capacity() {
        return this.#capacity;
    }

    // 访问元素
    get(index) {
        if(index < 0 || index >= this.#size) {
            throw new Error('索引越界');
        }
        return this.#nums[index];
    }

    // 更新元素
    set(index, num) {
        if(index < 0 || index >= this.#size) {
            throw new Error('索引越界');
        }
        this.#nums[index] = num;
    }

    // 尾部添加元素
    add(num) {
        // 如果长度等于容量，则需要扩容
        if(this.#size === this.#capacity) {
            this.extendCapacity();
        }
        // 将新元素添加到列表尾部
        this.#nums[this.#size] = num;
        this.#size++;
    }
    // 中间插入元素
    insert(index, num) {
        if(index < 0 || index >= this.#size) {
            throw new Error('索引越界');
        }
        // 如果长度等于容量，则需要扩容
        if(this.#size === this.#capacity) {
            this.extendCapacity();
        }
        // 将索引index之后的元素都向后移动一位
        for(let j = this.#size - 1; j >= index; j--) {
            this.#nums[j+1] = this.#nums[j];
        }   
        // 更新元素数量
        this.#nums[index] = num;
        this.#size++;        
    }
    // 删除元素
    remove(index) {
        if (index < 0 || index >= this.#size) throw new Error('索引越界');
        // 将索引 index 之后的元素都向前移动一位
        for (let j = index; j < this.#size - 1; j++) {
            this.#nums[j] = this.#nums[j + 1];
        }
        // 更新元素数量
        this.#size--;
        // 返回被删除元素
        return num;
    }
    // 列表扩容
    extendCapacity() {
        // 创建一个长度为元素组extendRatio倍的心数组，并将元素组拷贝到新数组
        this.#nums = this.#nums.concat(
            new Array(this.capacity() * this.#extendRatio - 1)
        );
        // 更新列表容量
        this.#capacity = this.#nums.length;
    }
    // 将列表转换为数组
    toArray() {
        let size = this.size();
        // 仅转换有效长度范围内的列表元素
        const nums = new Array(size);
        for(let i = 0; i < size; i++) {
            nums[i] = this.get(i);
        }
        return nums;
    }
}
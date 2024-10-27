class Graph {
    constructor(vertices) {
        // 图的顶点数
        this.vertices = vertices;
        this.adjList = new Array(vertices).fill(null).map(() => []); // 邻接表

    }

    addEdge(u, v) {
        this.adjList[u].push(v);
    }

    isCycle() {
        const visited = new Array(this.vertices).fill(false);
        const recStack = new Array(this.vertices).fill(false);

        for(let i = 0; i < this.vertices; i++) {
            if(this.isCycleUtil(i, visited, recStack)) {
                return true;
            }
        }
        return false;
    }

    // DFS 辅助函数
    isCycleUtil(v, visited, recStack) {
        if(!visited[v]) {
            visited[v] = true;
            recStack[v] = true;
            for(const neighbor of this.adjList[v]) {
                if(!visited[neighbor] && this.isCycleUtil(neighbor, visited, recStack)) {
                    return true;
                } else if(recStack[neighbor]) {
                    return true
                }
            }
        }
        visited[v] = false;
        return false;
    }
}

// react推荐为每一个子节点提供一个唯一的key，以便更高效的识别和更新节点
// 多节点diff，对于多个节点的比较，react会使用一种称为列表diff的算法，这个算法的核心是尽量复用已有的节点，减少dom操作
/**
 * 列表diff的具体实现：
 * React使用了一种称为“双端比较”的算法，具体步骤如下：
 * 1. 初始化四个指针，分别指向新旧列表的起始位置和结束为止。
 * react的diff算法通过以下方式进行性能优化：
 * - 同层级比较：避免了跨层级比较的开销；
 * - 唯一key：通过key快速识别节点，减少了不必要的dom操作，尽可能的复用dom
 * - 双端比较：通过双端比较，减少了节点的dom操作，避免不必要的新建，最大程度的复用已有dom
 * 旧的diff算法最坏情况下是o(n^3)，巾帼优化后，能够以接近o(n)的时间复杂度完成dom diff，从而保证性能
 */
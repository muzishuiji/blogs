/** 基于邻接矩阵实现的无向图类 */
class GraphAdjMat {
    vertices; // 顶点列表，元素代表“顶点值”，索引代表“顶点索引”
    adjMat;  // 邻接矩阵，行列索引对应“顶点索引”
    /** 构造函数 */
    constructor(vertices, edges) {
        this.vertices = [];
        this.adjMat = [];
        // 添加顶点
        for(const val of vertices) {
            this.addVertex(val);
        }
        // 添加边
        for(const e of edges) {
            this.addEdge(e[0], e[1]);
        }
    }
    /** 获取顶点数量 */
    size() {
        return this.vertices.length;
    }
    /** 添加顶点 */
    addVertex(val) {
        const n = this.size();
        // 向顶点列表中添加新顶点的值
        this.vertices.push(val);
        // 在邻接矩阵中添加一行
        const newRow = [];
        for(let i = 0; i < n; i++) {
            newRow.push(0);
        }
        // 在邻接矩阵中添加一列
        for(const row of this.adjMat) {
            row.push(0);
        }
    }
    /** 删除顶点 */
    removeVertex(index) {
        if (index >= this.size()) {
            throw new RangeError('Index Out Of Bounds Exception');
        }
        // 在顶点列表中删除索引index的顶点
        this.vertices.splice(index, 1);
        // 在邻接矩阵中删除索引index的行
        this.adjMat.splice(index, 1);
        // 在邻接矩阵中删除索引index的列
        for(const row of this.adjMat) {
            row.splice(index, 1);
        }
    }
    /** 添加边 */
    addEdge(i,j) {
        // 索引越界与相等处理
        if (i < 0 || j < 0 || i >= this.size() || j >= this.size() || i === j) {
            throw new RangeError('Index Out Of Bounds Exception');
        }
        // 在无向图中，邻接矩阵沿对角线对称，即满足(i, j) === (j, i)
        this.adjMat[i][j] = 1;
        this.adjMat[j][i] = 1;
    }
    /** 删除 */
    removeEdge(i,j) {
        // 索引越界与相等处理
        if (i < 0 || j < 0 || i >= this.size() || j >= this.size() || i === j) {
            throw new RangeError('Index Out Of Bounds Exception');
        }
        // 在无向图中，邻接矩阵沿对角线对称，即满足(i, j) === (j, i)
        this.adjMat[i][j] = 0;
        this.adjMat[j][i] = 0;
    }
    /** 打印邻接矩阵 */
    print() {
        console.log('顶点列表 = ', this.vertices);
        console.log('邻接矩阵 =', this.adjMat);
    }
}
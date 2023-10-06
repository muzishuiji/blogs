/* 深度优先遍历 DFS */
// 使用邻接表来表示图，以便获取指定顶点的所有邻接顶点
function dfs(graph, visited, res, vet) {
    res.push(vet); // 记录访问节点
    visited.add(vet); // 标记该节点已被访问
    // 遍历该节点的所有邻接节点
    for(const adjVet of graph.adjList(vet)) {
        if(visited.has(adjVet)) {
            continue; // 跳过已被访问过的顶点
        }
        // 递归访问邻接顶点
        dfs(graph, visited, res, adjVet)
    }
}
/* 深度优先遍历 DFS */
// 使用邻接表来表示图，以便获取指定顶点的所有邻接顶点
function graphDFS(graph, startVet) {
    // 顶点遍历序列
    const res = [];
    // 哈希表，用于记录已被访问过的顶点
    const visited = new Set();
    dfs(graph, visited, res, startVet);
    return res;
}
// 数组转树状结构
let arr = [
    { "id": 1, "parentId": null, "name": "Root" },
    { "id": 2, "parentId": 1, "name": "Child 1" },
    { "id": 3, "parentId": 2, "name": "Grandchild 1" },
    { "id": 4, "parentId": 1, "name": "Child 2" },
    { "id": 5, "parentId": 4, "name": "Grandchild 2" },
    { "id": 6, "parentId": 5, "name": "Great-grandchild 1" }
]

// 方案一：递归实现
function arrToList(data, parentId = null) {
    return data
        .filter(item => item.parentId === parentId)
        .map(item => ({
            ...item,
            children: arrToList(data, item.id),
        }))
}
arrToList(arr);

// 方案二：迭代实现
function arrToList1(data) {
    let tree = [], nodeObj = {};
    let len = data.length;
    for(let i = 0; i < len; i++) {
        let item = data[i];
        nodeObj[item.id] = {
            ...item,
            children: []
        }
    }
    for(let i = 0; i < len; i++) {
        let item = data[i];
        if(item.parentId) {
            nodeObj[item.parentId].children.push(nodeObj[item.id]);
        } else {
            tree.push(nodeObj[item.id]);
        }
    }
    return tree;
}
arrToList1(arr);

// 数组转树结构
let arr = [
    { "id": 1, "parentId": null, "name": "Root" },
    { "id": 2, "parentId": 1, "name": "Child 1" },
    { "id": 3, "parentId": 2, "name": "Grandchild 1" },
    { "id": 4, "parentId": 1, "name": "Child 2" },
    { "id": 5, "parentId": 4, "name": "Grandchild 2" },
    { "id": 6, "parentId": 5, "name": "Great-grandchild 1" }
]
// 方案一：递归实现
function arrToTree(data, parentId = null) {
    return data
        .filter(item => item.parentId === parentId)
        .map(item => ({
            ...item,
            children: arrToTree(data, item.id);
        }))
    
}
arrToTree(arr)

// 方案二：迭代实现
function arrToTree(data) {
    let nodeObj = {}, len = data.length;
    // 第一步：构建nodeId -> nodeItem的映射
    for(let i = 0; i < len; i++) {
        let item = data[i]
        nodeObj[item.id] = {
            ...item,
            children: []
        }
    }
    // 第二步：根据item.id，收集其children
    // 将收集好children的nodeObj对象push进树
    let tree = [];
    for(let i = 0; i < len; i++) {
        let item = data[i];
        if(item.parentId) {
            nodeObj[item.parentId].children.push(nodeObj[item.id]);
        } else {
            tree.push(nodeObj[item.id]);
        }
    }
    return tree;
}
arrToTree(arr)

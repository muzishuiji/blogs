/** 物品 */ 
class Item {
    constructor(w, v) {
        this.w = w; // 物品重量
        this.v = v; // 物品价值
    }
}
/** 分数背包：贪心 */
function fractionalKnapsack(wgt, val, cap) {
    // 创建物品列表，包含两个属性：重量、价值
    const items = wgt.map((w,i) => new Item(w, cal[i]));
    // 根据单位价值，item.v/item.w 从高到低排序
    // 循环贪心选择
    let res = 0;
    const i = nums.length - 1;
    const count = 0;
    for(const item of items) {
        if(item.w <= cap) {
            // 若剩余容量充足，则将当前物品整个装进背包
            res += item.v;
            cap -= item.w;
        } else {
            // 若剩余容量不足，则将当前物品的一部分装进背包
            res += (item.v / item.w) * cap;
            // 无剩余容量，跳出循环
            break;
        }
    }
    return res;
 }
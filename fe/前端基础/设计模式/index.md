# 设计模式

## 策略模式
将不同的算法封装为独立的策略，避免复杂的条件判断。

```js
// 复杂条件判断
function calculateDiscount(type, price) {
    if(type === 'vip') {
        return price * 0.8;
    } else if(type === 'regular') {
        return price * 0.9;
    } else {
        return price;
    }
}

// 使用策略模式
const discountStrategies = {
    vip: price => price * 0.8,
    regular: price => price * 0.9,
    default: price => price,
};
const calculateDiscount(type, price) {
    const strategy = discountStrategies[type] || discountStrategies.default;
    return strategy(price);
}
```

## 观察者模式


## 工厂模式
// promise 运行顺序合集

// 第一弹
setTimeout(() => {
    console.log(7)
}, 0)
new Promise((resolve, reject) => {
    console.log(3);
    resolve();
    console.log(4);
}).then(() => {
    console.log(6)
})
console.log(5)

// 3，4，5，6，7

// 第二弹
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
})

promise.then(() => {
    console.log(3);
})

console.log(4);
// 1 2 4 3

// 第三弹

console.log('script start')
const async1 = async () => {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

const async2 = async () => {
    console.log('async2')
}
setTimeout(() => {
    console.log('settimout')
}, 0);
async1();
new Promise((resolve, reject) => {
    console.log('promise1');
    resolve();
}).then(() => {
    console.log('promise2')
})
Promise.resolve().then(() => {
    console.log('promise3')
})
console.log('script end')
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// promise3
// setTimeout

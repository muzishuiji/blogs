import "@babel/polyfill";
const arr = [
    new Promise(() => {}),
    new Promise(() => {})
]
arr.map(item => {
    console.console.log((item));
    
})
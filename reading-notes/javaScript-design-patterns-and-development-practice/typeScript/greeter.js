//相当于对传入的参数做了一个约束,只允许传入字符串
// function greeter(person: string) {
//     return "Hello, " + person;
// }
// let user = [0,1,2];
// document.body.innerHTML = greeter(user);
// interface Person {
//     firstName: string;
//     lastName: string;
// }
// function greeter(person: Person) {
//     return "Hello, " + person.firstName + " " + person.lastName;
// }
// let user = { firstName: "Jane", lastName: "User" };
// document.body.innerHTML = greeter(user);
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
console.log(user);
document.body.innerHTML = greeter(user);

let name: string = 'sdffd';
let age:number = 37;
let sentence: string = `hello, my name is ${ name }. I'll be ${ age + 1 } years old next month.`;
//使用数组字面量定义数组
let list: number[] = [1,2,3];

//使用数组泛型定义数组
let list: Array<number> = [1,2,3];

//定义数据类型各不相同的数组,元祖Tuple
let x: [string, number];
x = ['hello', 10];  //赋值的时候数据类型的顺序要和定义的时候一样,否则会报错
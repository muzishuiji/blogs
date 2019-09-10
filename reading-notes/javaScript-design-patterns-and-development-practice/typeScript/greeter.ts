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


class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let user = new Student("Jane", "M.", "User");
console.log(user);
document.body.innerHTML = greeter(user);
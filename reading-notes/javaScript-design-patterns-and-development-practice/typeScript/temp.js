
//不使用泛型的函数
function identify(arg: number): number {
    return arg;
}

function identify(arg: any):any {
    return arg;
}

//使用类型变量来保证返回值的类型与传入参数的类型是相同的
//类型变量T会帮我们捕获传入的类型
//这个版本的identify函数叫做泛型
function identify<T>: T {
    return arg;
}

//我们想操作一个T类型的数组
function loggingIdentity<T>(arg: []): T[] {
    console.log(arg.length);
    return arg;
}

interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentify: GenericIdentityFn<number> = identify

//泛型类
class GenericIdentityFn<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
}

//将数据类型传入泛型类
let stringNumeric = new GenericNumber<string>();
stringNumeric.add = function(x,y) { return x + y;};
alert(stringNumeric.add(stringNumeric.zeroValue, "test"));

//泛型约束 限制这个泛型不能使用数据类型
interface Lengthwise {
    length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

class BeeKeeper {
    hasMask: boolean;
}
class ZooKeeper {
    nametag: string;
}
class Animal {
    numLegs: number;
}
class BeeKeeper extends Animal {
    keeper: ZooKeeper;
}
class Loin extends Animal {
    keeper: ZooKeeper;
}
function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}
createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!

//默认情况下: null和undefind是所有类型的子类型,但当你指定了--strictNullChecks标记,null和undefind只能复制给void和他们各自.

//never类型表示的是那些永不存在的值的类型,例如,never类型是那些总是会抛出异常或者根本不会有返回值的函数表达式或箭头函数表达式的返回值累心.变量也可能是never类型,当他们被永不为真的类型保护所约束时.
//一些返回never类型的函数
function error(message: string): never {
    throw new Error(message);
}

function fail() {
    return error("something failed");
}


//类型断言
//在一个嵌套作用域中引入一个新名字的行为称作屏蔽.
//TypeScript不允许展开泛型函数的类型参数.

interface ClockConstructor {
    new (hour: number, minute: number);
}



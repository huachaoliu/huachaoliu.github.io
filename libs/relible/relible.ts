class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string
}

function sayHi(person: Person): string {
    return `hello, ${person.firstName} ${person.lastName}`;
}

document.body.innerHTML = sayHi(new Student('Jane', 'M.', 'User'));

interface CreateArr {
    <T>(length: number, value: T): Array<T>;
}

let createArr: CreateArr;

createArr = function <T>(length: number, value: T): Array<T> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArr(3, 'x');

//basic types

//boolean

let isDone: boolean = false;

//number

let hex: number = 0xf00d;

let ages: number = 25;

//string

let color: string = 'blue';

color = 'red';

let fullNames: string = `Bob Wear`;

let age1: number = 34;

let sentence: string = `Hello, my name is ${fullNames}.
I'll be ${age1 + 1} years old next month.`;

//array 
let list: number[] = [1, 2, 3];

let lists: Array<number> = [1, 2, 3];

//tuple 元组(多元化类型的数组)

let x: [string, number] = ['a', 1];

let y: [string, number] = ['a', 1, 2];



//enum

enum Color { Red, Green, Blue };

let b: Color = Color.Blue;

let g: string = Color[2];

console.log(g);

//any

let nows: any = 4;

nows = 'not a number';

nows = false;

let listAny: any[] = [1, '2', false];

console.log(listAny);

//void
//一般用于没有返回值的函数.
function warning(): void {
    console.log('there have a error');
}

warning();

//null and undefined

let u: undefined = undefined;
let n: null = null;

let ts: string | undefined | null;

console.log(ts);

//never
//程序出错.
function error(msg: string): never {
    throw new Error(msg);
}
//死循环.
function initloop(): never {
    while (true) {

    }
}

//type assertions(类型断言)
let someValue: any = 'this is a string';

let strLen: number = (<string>someValue).length;

let strLen1: number = (someValue as string).length;

var a = 10;

function f() {
    var message = 'hello world';

    return message;
}

function f1() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    };
}

var g1 = f1()();

console.log(g1);

function fn() {
    var a = 1;
    a = 2;
    var b = g();
    a = 3;
    return b;

    function g() {
        return a;
    }
}

console.log(fn());

function fn1(flag: boolean) {
    if (flag) {
        var x = 10;
    }
    return x;
}

fn1(true) //10;
fn1(false) //undefined

function fn2(flag: boolean) {
    if (flag) {
        var l = 10;
    }
    return l;
}

let flag1 = fn2(true) //10;
let flag2 = fn2(false)//error;

console.log(flag1);
console.log(flag2);

function expect(a, ...b) {
    let result = [];
    for (let i = 0; i < b.length; i++) {
        result[i] = b[i];
    }

    console.log(result);
}

expect('a', 1, 2, 3);

// function sumMatrix(matrix: number[][]) {
//     var sum = 0;
//     for (var i = 0; i < matrix.length; i++) {
//         var currentRow = matrix[i];
//         for (var _i = 0; _i < currentRow.length; _i++) {
//             sum += currentRow[_i];
//         }
//     }
//     console.log(sum);
// }

function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    console.log(sum);
}

sumMatrix([[1], [2], [1, 2, 3]]);

// for (let i = 0; i < 10; i++) {
//     setTimeout(function () {
//         console.log(i);
//     }, 100 * i);
// }

for (var i = 0; i < 10; i++) {
    (function (i) {
        setTimeout(function () {
            // console.log(i);
        }, 100 * i)
    })(i);
}

function alwaysGet() {
    let getCity;

    if (true) {
        let city = 'beijing';
        getCity = () => {
            console.log(city);
        }
    }

    return getCity();
}

alwaysGet();

let inputs = [1, 2];

let [a1, b1] = inputs;

console.log(a1);
console.log(b1);

function swap([one, two] = inputs) {
    console.log(one);
    console.log(two);
}

swap();

let [...d] = [1, 2, 3, 4];
console.log(d);

let [, e, , po] = [1, 2, 3, 4];

console.log(e, po);

//对象解构

let o = {
    aa: 'f',
    bb: 12,
    cc: 'bar'
};

let {aa, bb} = o;

// ({aaaa, bbbb} = {aaaa: '123', bbbb: 101});
console.log(aa, bb);

// let {1, ...add} = o;

// let total = add.b + add.cc.length;

// console.log(total);

function getTotal(to, ...bo) {
    // let total = bo.c + bo.d;
    console.log(bo);
}

getTotal(1, {c: 2, d: 3});

let arr1 = [1, 2, 3];
let arr2 = [2, 3, 4];

let arr3 = [1, ...arr1, 4, ...arr2, 5];

console.log(arr3);

class C {
    p = 12;
    m () {

    }
}

let c1 = new C();
let clone = {...c1};

console.log(clone,  C);

interface SquareConfig {
  color?: string;
  width?: number;
  [propNames: string]: any;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = Math.pow(config.width, 2);
  }
  console.log(newSquare);
  return newSquare;
}

let mySquare = createSquare({color: "black", width: 20});

interface Task {
    createTask: string;
    [propNames: string]: any;
}

class TaskView implements Task {
    name: string;
    createTask: string = '创建任务';
    public constructor (name: string) {
        this.name = name;
    }
    
}
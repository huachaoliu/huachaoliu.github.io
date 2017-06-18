var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
    }
    return Student;
}());
function sayHi(person) {
    return "hello, " + person.firstName + " " + person.lastName;
}
document.body.innerHTML = sayHi(new Student('Jane', 'M.', 'User'));
var createArr;
createArr = function (length, value) {
    var result = [];
    for (var i_1 = 0; i_1 < length; i_1++) {
        result[i_1] = value;
    }
    return result;
};
createArr(3, 'x');
//basic types
//boolean
var isDone = false;
//number
var hex = 0xf00d;
var ages = 25;
//string
var color = 'blue';
color = 'red';
var fullNames = "Bob Wear";
var age1 = 34;
var sentence = "Hello, my name is " + fullNames + ".\nI'll be " + (age1 + 1) + " years old next month.";
//array 
var list = [1, 2, 3];
var lists = [1, 2, 3];
//tuple 元组(多元化类型的数组)
var x = ['a', 1];
var y = ['a', 1, 2];
//enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var b = Color.Blue;
var g = Color[2];
console.log(g);
//any
var nows = 4;
nows = 'not a number';
nows = false;
var listAny = [1, '2', false];
console.log(listAny);
//void
//一般用于没有返回值的函数.
function warning() {
    console.log('there have a error');
}
warning();
//null and undefined
var u = undefined;
var n = null;
var ts;
console.log(ts);
//never
//程序出错.
function error(msg) {
    throw new Error(msg);
}
//死循环.
function initloop() {
    while (true) {
    }
}
//type assertions(类型断言)
var someValue = 'this is a string';
var strLen = someValue.length;
var strLen1 = someValue.length;
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
function fn1(flag) {
    if (flag) {
        var x = 10;
    }
    return x;
}
fn1(true); //10;
fn1(false); //undefined
function fn2(flag) {
    if (flag) {
        var l = 10;
    }
    return l;
}
var flag1 = fn2(true); //10;
var flag2 = fn2(false); //error;
console.log(flag1);
console.log(flag2);
function expect(a) {
    var b = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i];
    }
    var result = [];
    for (var i_2 = 0; i_2 < b.length; i_2++) {
        result[i_2] = b[i_2];
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
function sumMatrix(matrix) {
    var sum = 0;
    for (var i_3 = 0; i_3 < matrix.length; i_3++) {
        var currentRow = matrix[i_3];
        for (var i_4 = 0; i_4 < currentRow.length; i_4++) {
            sum += currentRow[i_4];
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
        }, 100 * i);
    })(i);
}
function alwaysGet() {
    var getCity;
    if (true) {
        var city_1 = 'beijing';
        getCity = function () {
            console.log(city_1);
        };
    }
    return getCity();
}
alwaysGet();
var inputs = [1, 2];
var a1 = inputs[0], b1 = inputs[1];
console.log(a1);
console.log(b1);
function swap(_a) {
    var _b = _a === void 0 ? inputs : _a, one = _b[0], two = _b[1];
    console.log(one);
    console.log(two);
}
swap();
var d = [1, 2, 3, 4].slice(0);
console.log(d);
var _a = [1, 2, 3, 4], e = _a[1], po = _a[3];
console.log(e, po);
//对象解构
var o = {
    aa: 'f',
    bb: 12,
    cc: 'bar'
};
var aa = o.aa, bb = o.bb;
// ({aaaa, bbbb} = {aaaa: '123', bbbb: 101});
console.log(aa, bb);
// let {1, ...add} = o;
// let total = add.b + add.cc.length;
// console.log(total);
function getTotal(to) {
    var bo = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        bo[_i - 1] = arguments[_i];
    }
    // let total = bo.c + bo.d;
    console.log(bo);
}
getTotal(1, { c: 2, d: 3 });
var arr1 = [1, 2, 3];
var arr2 = [2, 3, 4];
var arr3 = [1].concat(arr1, [4], arr2, [5]);
console.log(arr3);
var C = (function () {
    function C() {
        this.p = 12;
    }
    C.prototype.m = function () {
    };
    return C;
}());
var c1 = new C();
var clone = __assign({}, c1);
console.log(clone, C);
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = Math.pow(config.width, 2);
    }
    console.log(newSquare);
    return newSquare;
}
var mySquare = createSquare({ color: "black", width: 20 });
var TaskView = (function () {
    function TaskView(name) {
        this.createTask = '创建任务';
        this.name = name;
    }
    return TaskView;
}());

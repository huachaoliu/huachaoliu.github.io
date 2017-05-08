### 对象的类型接口

##### 在ts中，我们使用接口（interface）来定义对象的类型.

### 什么时接口

##### 接口就是对行为的抽象（可用于对一部分行为进行抽象，也常用于对　对象的形状进行描述）

### 简单的例子

```ts 
{
    interface Person {
        name: string;
        age: number;
    }

    let huazai: Person {
        name: 'hua zai',
        age: 26
    };
}
```

##### 接口的名称首字母一般大写，调用接口的变量不能比接口定义的属性少。

```ts
{
    interface Person {
        name: string;
        age: number;
    }

    let huazai: Person {
        name: 'hua zai'
    }
    // error property age is mission in type '{name: string}'
}
```

#### 多了属性也不可以，应该严格安装接口描述的样子进行变量声明

```ts
{
    interface Person {
        name: string;
        age: number;
    }

    let huazai: Person {
        name: 'hua zai',
        age: 25,
        weisite: 'http://www.hcliu.cn'
    }
    //error
}
```

### 可选属性

##### 当不需要完全按照接口定义的形状来声明变量时:

```ts
{
    interface Person {
        name: string;
        age?: number;
    }

    let huazai: Person {
        name: 'hua zai'
    }
    
    //or

    let hz2:Person {
        name: 'hua zai',
        age: 25
    }
}
```
##### 这时仍然不允许添加未定义的属性。

### 任意类型

##### 有时候我们希望一个接口允许有任意的属性，可以使用如下方式:

```ts
{
    interface Person {
        name: string;
        age?: number;
        [propName: string]: any;
    }
}
```

### 用 TypeScript 写 Node.js

Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：

```
{
    npm install @types/node --save-dev    
}
```
# fullPage
full page and page controll

## 顶层容器可配置。

### pageUI:

```html
    {
        <div class="page_controll">
            <div class="cicle active"></div>
            <div class="cicle"></div>
            <div class="cicle"></div>
            <div class="cicle"></div>
        </div>
        <div class="page_wrap">
            <div class="page page1"></div>
            <div class="page page2"></div>
            <div class="page page3"></div>        
        </div>
    }
```
##### PS:page_controll 需要设置controll的布尔值，才能使用

### 默认参数

```js
    {
        $('.page_wrap').fullpage({
            count: 3,
            controll: true
        });      
    }
```

### 可配置参数

```js
    {
        height: 1000,
        container: container, //容器
        count: 1,
        controll: false,
    }
```
var HomeFiles = function () {

    /**
     * @param: {type}
     * 1.log 日志
     * 2.category 分类
     * 3.tag 标签
    */

    var homeFile = [
        {
            type: "log",
            title: {
                h2: "没事整个静态的博客玩玩",
                time: "发布与 2016-04-20",
                author: "misliu",
                category: "分类于log"
            },

            tags: [
                {
                    name: "搭建环节",
                    text: [
                        "利用github的page功能搭建一个静态的博客。",
                        "页面主要是由javascript编写的ui以及signals通信技术完成各个模块之间通信"
                    ]
                },
                {
                    name: "没填完的坑",
                    text: [
                        "还有很多内容没有添加进去，未完，待续...",
                        "此处省略一万字...",
                        "ps:阅读全文功能暂时还没添加。"
                    ]
                }
            ],
            button: "阅读全文"

        },

        // {
        //     type: "log",
        //     title: {
        //         h2: "margin系列之圣杯布局",
        //         time: "发布与 2016-03-31",
        //         author: "misliu",
        //         category: "分类于css"
        //     },

        //     tags: [
        //         {
        //             name: "持续",
        //             text: [
        //                 "我回翻了一下之前的几篇文章，发现在 margin系列之布局篇 中还有些问题没说完，所以准备补全一下。",
        //                 "不过这2篇文章的时间的跨度有点，在阅读本文之前，大家可以先翻读一下3年前的那篇文章。"
        //             ]
        //         },
        //         {
        //             name: "没填完的坑",
        //             text: [
        //                 "在 margin系列之布局篇 一文结尾时，我们谈到了圣杯布局，说这个布局的实现本身存在了一些问题：“在IE6/7下报废，不过不用慌，因为它可被修复”。  ",
        //                 "我一直以为写完了，然而今天看了下发现还有坑没填。所以本文会讲讲这些问题是什么以及如何修复。"
        //             ]
        //         }
        //     ],
        //     button: "阅读全文",

        // }
    ];

    return homeFile;
};
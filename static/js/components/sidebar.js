var Sidebar = function (store) {

    var signals = store.signals;

    var sidebar = new UI.Div();

    sidebar.setClass('sidebar');

    var headTitle = new UI.Div();

    headTitle.setClass('sidetitle');

    headTitle.add(
        new UI.Image().setClass('headlogo').setSrc('./static/img/1.jpg'),
        new UI.Span().setText('我只是一只散漫的码农').setFontSize('16px')
    );

    var tags = new UI.Div();

    tags.setClass('sidetags');

    var homeFiles = new HomeFiles();

    var log = 0, category = 0, tag = 0;

    for (var j = 0, len = homeFiles.length; j < len; j++) {
        if (homeFiles[j].type === "log") {
            log += 1;
        } else if (homeFiles[j].type === "tag") {
            tag += 1;
        } else {
            category += 1;
        }
    }

    var tagStack = [
        { num: log, value: '日志' },
        { num: category, value: '分类' },
        { num: tag, value: '标签' }
    ];

    for (var i = 0; i < tagStack.length; i++) {

        var tagItem = new UI.Div().setClass('tag');

        tagItem.add(
            new UI.Span().setText(tagStack[i].num),
            new UI.Span().setText(tagStack[i].value)
        );

        //callback

        // tagItem.onClick(function () {

        // var args = Array.prototype.slice.call(arguments)[0];

        // signals.sideTagClicked.dispatch(args[1][ args[2] ]);

        // }, tagStack, i);

        //闭包
        (function (i) {

            tagItem.onClick(function () {

                signals.sideTagClicked.dispatch(tagStack[i]);

            });

        })(i);


        tags.add(tagItem);

    }

    var weixin = new UI.Div().setClass('wxpanel');

    weixin.add(
        new UI.Span().setClass('title').setText('二维码'),
        new UI.Image().setClass('qrcode').setSrc('./static/img/qrcode.jpg')
    );

    sidebar.add(
        headTitle,
        tags,
        weixin
    );

    return sidebar;

};
var Sidebar = function (container) {

    var signals = container.signals;

    var sidebar = new UI.Div();
    sidebar.setClass('sidebar');

    var headTitle = new UI.Div();

    headTitle.setClass('sidetitle');

    headTitle.add(
        new UI.Image().setClass('headlogo').setSrc('/static/img/1.jpg'),
        new UI.Span().setText('我只是一只散漫的码农').setFontSize('16px')
    );

    var tags = new UI.Div();

    tags.setClass('sidetags');

    var tagStack = [
        { num: 20, value: '日志' },
        { num: 10, value: '分类' },
        { num: 2, value: '标签' }
    ];

    for (var i = 0; i < tagStack.length; i++) {

        var tagItem = new UI.Div().setClass('tag');

        tagItem.add(
            new UI.Span().setText(tagStack[i].num),
            new UI.Span().setText(tagStack[i].value)
        );

        tagItem.onClick(function () {

            var args = Array.prototype.slice.call(arguments)[0];

            signals.sideTagClicked.dispatch(args[1][ args[2] ]);

        }, tagStack, i);

        tags.add(tagItem);

    }

    var weixin = new UI.Div().setClass('wxpanel');

    weixin.add(
        new UI.Span().setClass('title').setText('二维码'),
        new UI.Image().setClass('qrcode').setSrc('/static/img/qrcode.jpg')
    )

    sidebar.add(
        headTitle,
        tags,
        weixin
    );

    return sidebar;

};
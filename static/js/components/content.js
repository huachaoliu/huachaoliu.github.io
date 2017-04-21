var Content = function (container) {

    var signals = container.signals;

    var content = new UI.Div();

    content.setClass('content');

    var wrapper = new Wrapper();

    signals.menuItemClicked.add(function (obj) {
        switch (obj.key) {
            case 'home':
                wrapper.clear().add(home);
                break;
            case 'log':
                wrapper.clear().add(new UI.Span().setText('暂无日志'));
                break;
            case 'category':
                wrapper.clear().add(new Category(container));
                break;
            case 'help':
                wrapper.clear().add(new UI.Span().setText('这里也什么都没有'));
        }

    });

    signals.sideTagClicked.add(function (obj) {

        switch (obj.key) {
            case 'log':
                wrapper.clear().add(new UI.Span().setText('暂无日志'));
                break;
            case 'category':
                wrapper.clear().add(new Category(container));
                break;
            case 'tag':
                wrapper.clear().add(new UI.Span().setText('暂无内容'));
                break;
        }

    });

    var home = new Home(container);

    wrapper.add(home);

    content.add(wrapper);

    return content;
};
var Menubar = function (container, num) {

    var menubar = new UI.Div();

    var signals = container.signals;

    menubar.setClass('menubar');

    var ul = new UI.Ul(), i = 0;

    var menuStack = [
        { key: "home", value: "首页" },
        { key: "done", value: "日志" },
        { key: "category", value: "分类" },
        { key: "help", value: "帮助" },
        { key: "about", value: "关于" }
    ];

    while (i < num) {

        var navItem = new UI.Li().setText(menuStack[i].value);
        
        (function (i) {

            navItem.onClick(function () {
            /**
             * @param: {args}
             *  [0: event, 1: menustack, 2: i];
                */
                signals.menuItemClicked.dispatch(menuStack[i]);

            });

        })(i);

        ul.add(navItem);
        i++;
    }

    menubar.add(ul);

    return menubar;
}
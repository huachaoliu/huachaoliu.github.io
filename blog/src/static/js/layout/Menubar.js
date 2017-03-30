var Menubar = function (container, num) {
    
    var menubar = new UI.Div();

    var signals = container.signals;

    menubar.setClass('menubar');

    var ul = new UI.Ul(), i = 0;

    var menuStack = [
        {key: "home", value: "首页"}, 
        {key: "done", value: "归档"}, 
        {key: "category", value: "分类"}, 
        {key: "help", value: "帮助"}, 
        {key: "about", value: "关于"}
    ];

    while ( i < num ) {

        var navItem = new UI.Li().setText(menuStack[i].value);

        navItem.onClick(function () {
            /**
             * @param: {args}
             *  [0: event, 1: menustack, 2: i];
            */
            var args = Array.prototype.slice.call(arguments)[0];

            signals.menuItemClicked.dispatch(args[1][ args[2] ]);

        }, menuStack, i);

        ul.add( navItem );
        i++;
    } 

    menubar.add(ul);

    return menubar;
}
var Home = function (container) {

    var signals = container.signals;

    var home = new UI.Div().setClass('home');

    /**
     * @param: {home} 默认选中的值是首页
     * @param: {object} obj - 选中的目标属性对象集合
    */
    // var fileReader = new window.FileReader;

    //读取首页文档
    var homeFile = new HomeFiles();

    for (var i = 0, l = homeFile.length; i < l; i++) {

        home.add(new Article( container, homeFile[i] ));        

    }

    signals.menuItemClicked.add(function (obj) {

        // article.setText(obj.value);

        // article.add( new Home(container) );

    });

    signals.sideTagClicked.add(function (obj) {

        // article.setText(obj.value);

    });

    return home;

};
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

    function renderHome() {
        for (var i = 0, l = homeFile.length; i < l; i++) {

            home.add(new Article(container, homeFile[i]));

        }
    }

    renderHome();

    // signals.menuItemClicked.add(function (obj) {

    //     home.clear();

    //     if (obj.key === 'home') {
    //         renderHome();
    //     } else {
    //         // home.setText(obj.value);
    //     }

    // });

    return home;

};
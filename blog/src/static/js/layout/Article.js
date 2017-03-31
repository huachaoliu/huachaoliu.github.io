var Article = function (container) {

    var signals = container.signals;

    var article = new UI.Div().setClass('article');

    /**
     * @param: {article} 默认选中的值是首页
     * @param: {object} obj - 选中的目标属性对象集合
    */

    article.setText('首页');

    signals.menuItemClicked.add(function (obj) {

        article.setText(obj.value);

    });

    signals.sideTagClicked.add(function (obj) {

        article.setText(obj.value);

    });

    return article;

};
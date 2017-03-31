var Footer = function (container) {

    var footer = new UI.Div();

    footer.setClass('footer');

    footer.add(
        new UI.Div().setClass('one').setText('@ 2016 & 个人板蓝根'),
        new UI.Div().setClass('two').setText('学挖掘机技术哪家强?中国山东找南翔')
    );

    return footer;

};
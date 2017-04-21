var Footer = function (container) {

    var footer = new UI.Div();

    footer.setClass('footer');

    footer.add(
        new UI.Div().setClass('one').setText('@ 2016 & 04-20'),
        new UI.Div().setClass('two').setText('misliu')
    );

    return footer;

};
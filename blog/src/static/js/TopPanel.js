var TopPanel = function (container) {

    var signals = container.signals;

    var panel = new UI.Div().setClass('toppanel');

    var goright = new UI.Button().setClass('goright').setText('X');

    var gotop = new UI.Button().setClass('gotop').setText('T');

    goright.onClick(function () {
        signals.changeShowOrFalse.dispatch();
    });

    panel.add(
        goright,
        gotop
    );

    return panel;

};
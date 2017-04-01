var TopPanel = function (store) {

    var signals = store.signals;

    var panel = new UI.Div().setClass('toppanel');

    var goright = new UI.Button().setClass('goright');

    goright.add(
        new UI.Span(),
        new UI.Span(),
        new UI.Span()
    );

    var gotop = new UI.Button().setClass('gotop').setText('T');

    goright.onClick(function () {
        signals.changeShowOrFalse.dispatch();
    });

    gotop.onClick(function () {
        signals.goTopChanged.dispatch();
    });

    panel.add(
        goright,
        gotop
    );

    return panel;

};

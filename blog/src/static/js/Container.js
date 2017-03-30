var Container = function () {
    var Signal = signals.Signal;
    this.name = 'container';
    this.signals = {
        menuItemClicked: new Signal()
    };
};
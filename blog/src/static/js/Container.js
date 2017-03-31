var Container = function () {
    var Signal = signals.Signal;
    this.name = 'container';

    this.signals = {
        menuItemClicked: new Signal(),

        changeShowOrFalse: new Signal(),

        goTopChanged: new Signal(),

        sideTagClicked: new Signal()
    };

    this.showOrFalse = true;

};

Container.prototype = {
    setShowOrFalse: function () {
        this.showOrFalse = !this.showOrFalse;
    }
};
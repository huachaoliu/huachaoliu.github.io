var Store = function () {
    var Signal = signals.Signal;
    this.name = 'store';

    this.signals = {
        menuItemClicked: new Signal(),

        changeShowOrFalse: new Signal(),

        goTopChanged: new Signal(),

        sideTagClicked: new Signal()
    };

    this.showOrFalse = true;

};

Store.prototype = {
    setShowOrFalse: function () {
        this.showOrFalse = !this.showOrFalse;
    }
};
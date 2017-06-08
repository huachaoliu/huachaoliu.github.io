var Zue = {};

var eventHandle = {
    "getInititalState": "getInititalState",
    "componentDidMount": "componentDidMount",
    "componentWillUnmount": "componentWillUnmount",
    "render": "render",
    "setState": "setState"
};

Zue.createClass = function (params) {
    for (var key in eventHandle) {
        this.events[key] = eventHandle[key];
    }

    for (var ev in this.events) {
        if (params.hasOwnProperty(ev)) {
            this.events[ev] = params[ev];
        }
    }
    console.log(this.events);
};

function classnames() {
    //只能时纯字符串或一个纯对象，
    //TODO: 字符串和对象
    var _args;
    var _classes = '';        
    var _length = arguments.length;
    if (_length > 1) {
        _args = arguments;
        for (var i = 0; i < _length; i++) {
            if (!_args[i]) throw TypeError('error in type');             
            if (typeof _args[i] === 'string') {
                _classes += (' ' + _args[i]);
            }
        }
        return _classes;
    } else {
        _args = arguments[0];
        if (!_args) throw TypeError('error in type'); 
        if (typeof _args === 'string') return _args;
        for (var prop in _args) {
            if (_args[prop]) {
                _classes += (' ' + prop);
            }
        }
        return _classes;
    }   
}
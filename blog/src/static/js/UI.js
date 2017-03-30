/**
 * @author: misliu
 * @desc ui - a build ui component;
*/

(function () {
    /**
     * @param: {UI} UI - 顶层对象,继承多个对象的属性;
    */
    var UI = {};
    /**
     * @param: {UI-Element} UI-Element UI DOM public method 
    */
    UI.Element = function (dom) {
        this.dom = dom;
    };

    UI.Element.prototype = {

        add: function () {

            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                if (arg instanceof UI.Element) {
                    this.dom.appendChild(arg.dom);
                } else {
                    console.error("error");
                }
            }
            return this;
        },

        remove: function () {
            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                if (arg instanceof UI.Element) {
                    this.dom.removeChild(arg.dom);
                } else {
                    console.error("error");
                }
            }
            return this;
        },

        clear: function () {
            while (this.dom.children.length) {
                this.dom.removeChild(this.dom.lastChild);
            }
        },

        setStyle: function (style, array) {

            for (var i = 0; i < array.length; i++) {
                this.dom.style[style] = array[i];
            }
            return this;

        },

        setText: function (value) {

            this.dom.textContent = value;
            return this;

        },

        getText: function () {
            return this.dom.textContent;
        },

        setClass: function (name) {

            this.dom.className = name;

            return this;

        },

        addClass: function (name) {

            this.dom.className += this.dom.className.length > 0 ? ' ' + name : name;

            return this;
        },

        removeClass: function (name) {

            var classList = this.dom.className.split(" ");

            for (var i = 0; i < classList.length; i++) {

                if (classList[i] === name) {
                    classList.splice(i, 1);
                }

            }
            this.dom.className = classList.join(" ");

            return this;
        },

        setId: function (id) {

            this.dom.id = id;

            return this;

        }
    };

    //style
    var styles = ['position', 'left', 'top', 'right', 'bottom', 'width', 'height', 'border',
        'borderLeft', 'borderTop', 'borderRight', 'borderBottom', 'borderColor', 'display', 'overflow',
        'margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'padding', 'paddingLeft',
        'paddingTop', 'paddingRight', 'paddingBottom', 'background', 'backgroundColor', 'opacity', 'fontSize',
        'fontWeight', 'textAlgin', 'textDecoration', 'textTransform', 'cursor', 'zIndex'];

    styles.forEach(function (style) {
        var method = 'set' + style.substr(0, 1).toUpperCase() + style.substr(1, style.length);
        UI.Element.prototype[method] = function () {
            this.setStyle(style, arguments);
            return this;
        }
    });

    //events
    var events = ['KeyUp', 'KeyDown', 'MouseOver', 'MouseOut', 'Click', 'DbClick', 'Change'];

    events.forEach(function (event) {
        var method = 'on' + event;

        UI.Element.prototype[method] = function (callback) {
            this.dom.addEventListener(event.toLowerCase(), callback.bind(this, arguments), false);
            return this;
        }
    });

    UI.Div = function () {

        UI.Element.call(this);

        this.dom = document.createElement('div');

        return this;

    };

    UI.Div.prototype = Object.create(UI.Element.prototype);
    UI.Div.prototype.constructor = UI.Div;

    UI.Span = function () {
        UI.Element.call(this);

        this.dom = document.createElement('span');

        return this;
    };

    UI.Span.prototype = Object.create(UI.Element.prototype);
    UI.Span.prototype.constructor = UI.Span;

    UI.Ul = function () {
        UI.Element.call(this);

        this.dom = document.createElement('ul');

        return this;

    };

    UI.Ul.prototype = Object.create(UI.Element.prototype);

    UI.Ul.prototype.contructor = UI.Ul;

    UI.Li = function () {
        UI.Element.call(this);

        this.dom = document.createElement('li');

        return this;

    };

    UI.Li.prototype = Object.create(UI.Element.prototype);

    UI.Li.prototype.contructor = UI.Li;

    UI.Hr = function () {

        UI.Element.call(this);

        this.dom = document.createElement('hr');

        return this;

    };

    UI.Hr.prototype = Object.create(UI.Element.prototype);

    UI.Hr.prototype.contructor = UI.Hr;

    window.UI = UI;

})();
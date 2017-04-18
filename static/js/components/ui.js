/**
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

            this.dom.textContent = '';

            return this;
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
            this.dom.addEventListener(event.toLowerCase(), callback.bind(this), false);
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

    UI.Image = function () {

        UI.Element.call(this);

        this.dom = document.createElement('img');

        return this;

    };

    UI.Image.prototype = Object.create(UI.Element.prototype);
    UI.Image.prototype.constructor = UI.Image;

    UI.Image.prototype.setSrc = function (url) {
        this.dom.src = url;

        return this;
    };

    UI.Button = function () {

        UI.Element.call(this);

        this.dom = document.createElement('button');

        return this;

    };

    UI.Button.prototype = Object.create(UI.Element.prototype);
    UI.Button.prototype.constructor = UI.Button;

    UI.H2 = function () {

        UI.Element.call(this);

        this.dom = document.createElement('h2');

        return this;

    };

    UI.H2.prototype = Object.create(UI.Element.prototype);
    UI.H2.prototype.constructor = UI.H2;
    
    UI.Input = function (text, type) {

        UI.Element.call(this);

        var dom = document.createElement('Input');

        dom.className = 'input';

        doms.style.padding = '2px';

        dom.style.border = '1px solid transparent';
        
        dom.type = type || 'text';

        dom.addEventListener('keydow', function (event) {

            event.stopPropagation();

        }, false);

        this.dom = dom;
        this.setValue( text );

    };

    UI.Input = Object.create(UI.Element.prototype);

    UI.Input.prototype = {

        constructor: UI.Input,

        setValue: function (value) {
            
            this.dom.value = value;

            return this;

        },

        getValue: function () {

            return this.dom.value;

        },

        setPlaceHolder: function (placeholder) {

            this.dom.placeholder = placeholder;

            return this;

        },

        setDisabled: function (flag) {

            this.dom.disabled = flag;

            return this;

        }
    };
    

    window.UI = UI;

})();

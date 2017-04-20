/**
 * @libary {color-picker}
 * @author: misliu
 * @time: 2017-04-20 
 */

(function () {
    "use strict";
    /**
     * Class constructor for colorpicker plugin.
     * see demo at:http://github.com/misliu/misliu.github.io/plugins/colorpicker
     * @constructor
     * @param {target, options} dom and config
     */
    var ColorPicker = function (target, options) {

        this.dom = target;
        this.cssPreFix = 'colorpicker-';

        var defaults = {
            h: 26,
            dragMove: false,
            customBg: 'b',
            showRgbProps: false,
            showTargetBg: false,
            position: 'defaults',
            targetBg: '#ffffff',
            initColor: {
                r: 255,
                g: 0,
                b: 0,
                a: 1
            },
            scale: 1,
            callbackHex: null,
            callbackRgb: null,
            customClassName: null
        };
        var params = colorExtend(defaults, options);

        this.bgType = {
            w: '#ffffff',
            b: '#444444',
            g: '#888888'
        };
        this.id = this.cssPreFix + this.dom.id;
        this.r = 255;
        this.g = 255;
        this.b = 255;
        this.alpha = 1;
        this.hue = 0;
        this.scale = params.scale;
        this.size = 256 / this.scale;
        this.wheelOffset = 8 / this.scale;
        this.hueOffset = 3;
        this.rgba = 'rgbah';
        this.rgbaDomList = [];

        this.x = 0;
        this.y = 0;
        this.left = 0;
        this.top = 0;

        this.ui = this.renderColorPickerUI(params);

        this.initColorPicker(params);
    }
    window["ColorPicker"] = ColorPicker;

    ColorPicker.prototype.constructor = ColorPicker;

    /**
     * @method to2 {function}
     */

    // ColorPicker.to2 = to2;
    // ColorPicker.hex2 = hex2;
    // ColorPicker.extend = colorExtend;
    // ColorPicker.getDom = getDom;
    // ColorPicker.add = add;
    // ColorPicker.remove = remove;
    // ColorPicker.addEvent = addEvent;
    // ColorPicker.removeEvent = removeEvent;

    /**
     * init colorpioker ui className
     * @enum {string}
     * @private
     */

    ColorPicker.prototype.cssClasses = {
        WRAPPER: "wrapper",
        TITLE: "title",
        CLOSED: "closed",
        BOARD_PARENT: "board-parent",
        BOARD: "board",
        MASK: "mask",
        WHEEL: "wheel",
        BAR: "bar",
        SELECTOR: "selector",
        PANEL: "panel",
        BG: "bg",
        ROW: "row",
        KEY: "key",
        // BOX: "box",
        VALUE: "value",
        HEX: "hex"
    };

    ColorPicker.prototype.renderColorPickerUI = function (params) {

        if (params.customClassName) {
            params.customClassName(this.cssClasses);
        }

        var colorPickerWrapper = getDom("div", this.cssPreFix + this.cssClasses.WRAPPER),
            colorPickerTitle = getDom("div", this.cssPreFix + this.cssClasses.TITLE),
            colorPickerClosed = getDom("span", this.cssPreFix + this.cssClasses.CLOSED),
            colorPickerBoardParent = getDom("div", this.cssPreFix + this.cssClasses.BOARD_PARENT),
            colorPickerBoard = getDom("div", this.cssPreFix + this.cssClasses.BOARD),
            colorPickerMask = getDom("div", this.cssPreFix + this.cssClasses.MASK),
            colorPickerWheel = getDom("div", this.cssPreFix + this.cssClasses.WHEEL),
            colorPickerBar = getDom("div", this.cssPreFix + this.cssClasses.BAR),
            colorPickerSelector = getDom("div", this.cssPreFix + this.cssClasses.SELECTOR),
            colorPickerPanel = null,
            r, g, b;

        colorPickerWrapper.id = this.id;
        colorPickerTitle.textContent = "color picker";
        colorPickerTitle.appendChild(colorPickerClosed);
        colorPickerBar.appendChild(colorPickerSelector);
        r = params.initColor.r;
        g = params.initColor.g;
        b = params.initColor.b;

        setStyle(colorPickerMask, 'background', 'rgb(' + r + ',' + g + ',' + b + ')');

        if (params.showRgbProps) {

            colorPickerPanel = getDom('div', this.cssPreFix + this.cssClasses.PANEL);

            var colorPickerBg = getDom('div', this.cssPreFix + this.cssClasses.BG);
            var rgba = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.alpha + ')';
            setStyle(colorPickerBg, 'background', rgba);
            colorPickerPanel.appendChild(colorPickerBg);

            for (var i = 0; i < this.rgba.length; i++) {
                var colorPickerRow = getDom('div', this.cssPreFix + this.cssClasses.ROW),
                    colorPickerKey = getDom('span', this.cssPreFix + this.cssClasses.KEY),
                    colorPickerValue = getDom('input', this.cssPreFix + this.cssClasses.VALUE);

                colorPickerKey.textContent = this.rgba[i] + ':';
                colorPickerValue.className += ' ' + this.rgba[i] + this.cssClasses.HEX;
                colorPickerValue.type = 'text';

                if (this.rgba[i] === 'a') {
                    colorPickerValue.maxLength = 3;
                }

                this.rgbaDomList.push(colorPickerValue);
                add(colorPickerRow, [colorPickerKey, colorPickerValue]);
                colorPickerPanel.appendChild(colorPickerRow);
                this.setRgbaPanelStyle(colorPickerPanel, colorPickerBg, colorPickerRow, colorPickerValue);
            }

            this.rgbaDomList[0].value = this.r;
            this.rgbaDomList[1].value = this.g;
            this.rgbaDomList[2].value = this.b;
            this.rgbaDomList[3].value = this.alpha;
            this.rgbaDomList[4].value = this.rgbToHex(this.r, this.g, this.b);

            this.rgbaDomList[0].style.backgroundPositionX = - (255 - this.r) / 5 + 'px';
            this.rgbaDomList[1].style.backgroundPositionX = - (255 - this.g) / 5 + 'px';
            this.rgbaDomList[2].style.backgroundPositionX = - (255 - this.b) / 5 + 'px';
            this.rgbaDomList[3].style.backgroundPositionX = - (1 - this.alpha) * 51 + 'px';
        }

        this.setPosition(colorPickerWrapper, params);

        add(colorPickerBoardParent, [colorPickerBoard, colorPickerMask, colorPickerWheel]);
        add(colorPickerWrapper, [colorPickerTitle, colorPickerBoardParent, colorPickerBar, colorPickerPanel]);

        var colorPickerDomStack = {
            wrapper: colorPickerWrapper,
            title: colorPickerTitle,
            closed: colorPickerClosed,
            boardParent: colorPickerBoardParent,
            board: colorPickerBoard,
            mask: colorPickerMask,
            wheel: colorPickerWheel,
            bar: colorPickerBar,
            bg: colorPickerBg,
            selector: colorPickerSelector,
            panel: colorPickerPanel,
            row: colorPickerRow,
            key: colorPickerKey,
            value: colorPickerValue
        };
        this.setColorPickerStyle(colorPickerDomStack, params);
        return colorPickerDomStack;
    };

    ColorPicker.prototype.setColorPickerStyle = function (colorpicker, params) {
        colorpicker.wrapper.style.background = this.bgType[params.customBg];
        colorpicker.wrapper.style.height = (45 + this.size - 10) + 'px';
        colorpicker.boardParent.style.width = this.size + 'px';
        colorpicker.boardParent.style.height = this.size + 'px';
        if (this.scale > 1) {
            colorpicker.title.style.height = '24px';
            colorpicker.title.style.lineHeight = '24px';
            colorpicker.title.style.textIndent = '7px';

            colorpicker.closed.style.margin = '2px 5px 0 0';

            colorpicker.wheel.style.left = - this.wheelOffset * 2 + 'px';
            colorpicker.wheel.style.top = - this.wheelOffset * 2 + 'px';

            colorpicker.bar.style.width = '12px';
            colorpicker.bar.style.height = this.size + 'px';
            colorpicker.bar.style.backgroundSize = '100% 1500%';

            colorpicker.selector.style.width = '12px';
        } else {
            colorpicker.wheel.style.left = - this.wheelOffset + 'px';
            colorpicker.wheel.style.top = - this.wheelOffset + 'px';
        }
    };

    ColorPicker.prototype.setRgbaPanelStyle = function (panel, bg, row, value) {
        if (this.scale > 1) {
            panel.style.height = '108px';
            bg.style.height = '12px';
            row.style.height = '18px';
            row.style.lineHeight = '18px';
            value.style.fontSize = '12px';
            value.style.lineHeight = '16px';
        }
    };


    ColorPicker.prototype.initColorPicker = function (params) {
        var self = this;
        if (params.showTargetBg) {
            setStyle(this.dom, 'background', params.targetBg);
        }

        var hasWrapper = document.getElementById(this.id);

        if (!hasWrapper) {
            addEvent(this.dom, 'focus', showWrapper);

            addEvent(this.ui.closed, 'click', hideWrapper);

            addEvent(document, 'mousedown', clearWrapper);
        }

        function showWrapper() {
            document.body.appendChild(self.ui.wrapper);
        }

        function hideWrapper() {
            var hasWrapper = document.getElementById(self.id);
            if (!!hasWrapper) {
                document.body.removeChild(self.ui.wrapper);
            }
        }

        function clearWrapper(e) {
           var hasWrapper = document.getElementById(self.id);
            if (
                !!hasWrapper && 
                e.target !== self.dom &&
                e.target !== self.ui.wrapper &&
                e.target !== self.ui.title &&
                e.target !== self.ui.closed &&
                e.target !== self.ui.board &&
                e.target !== self.ui.wheel &&
                e.target !== self.ui.bar &&
                e.target !== self.ui.selector &&
                e.target !== self.ui.panel &&
                e.target !== self.ui.bg &&
                e.target !== self.ui.row) {

                document.body.removeChild(self.ui.wrapper);    
            }
        }
    };

    ColorPicker.prototype.setPosition = function (wrapper, params) {
        switch (params.position) {
            case 'r b':
                break;
            case 'l t':
                break;
            case 'r t':
                break;
            case 'l b':
            default:
                this.left = this.dom.offsetLeft;
                this.top = this.dom.offsetTop + params.h;
                wrapper.style.left = (this.left - 1) + 'px';
                wrapper.style.top = this.top + 'px';
                break;
        }
    };

    ColorPicker.prototype.rgbToHex = function (r, g, b) {
        return '#' + hex2(r) + hex2(g) + hex2(b);
    };

    function setStyle(obj, type, attr) {
        obj.style[type] = attr;
    }

    function to2(n) {
        /**
         * 转化的数字必须是整型
         */
        n = n | 0;
        return n > 9 ? '0' + 9 : n;
    }

    function hex2(hex) {
        return (hex < 16 ? '0' : '') + hex.toString(16);
    }

    function colorExtend(target, options) {
        for (var prop in target) {
            if (options.hasOwnProperty(prop)) {
                target[prop] = options[prop];
            }
        }
        return target;
    }

    function getDom(dom, className) {
        var domEle = document.createElement(dom);
        domEle.className = className;
        return domEle;
    }

    function add(parent, doms) {
        var i = 0, l = doms.length;
        for (; i < l; i++) {
            if (doms[i]) {
                parent.appendChild(doms[i]);
            }
        }
    }

    function remove(parent, doms) {
        var i = 0, l = doms.length;
        for (; i < l; i++) {
            if (doms[i]) {
                parent.removeChild(doms[i]);
            }
        }
    }

    function addEvent(dom, type, method) {
        if (Array.isArray(dom)) {
            for (var i = 0, l = dom.length; i < l; i++) {
                if (dom[i]) {
                    dom[i].addEventListener(type, method, false);
                }
            }
        } else {
            dom.addEventListener(type, method, false);
        }
    }

    function removeEvent(dom, type, method) {
        if (Array.isArray(dom)) {
            for (var i = 0, l = dom.length; i < l; i++) {
                if (dom[i]) {
                    dom[i].removeEventListener(type, method, false);
                }
            }
        } else {
            dom.removeEventListener(type, method, false);
        }
    }

})();
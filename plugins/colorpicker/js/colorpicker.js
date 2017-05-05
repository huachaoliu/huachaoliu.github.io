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
    var ColorPicker = (function () {
        function ColorPicker(target, options) {
            this.dom = target;
            this.options = options;
            var defaults = {
                h: 26,
                dragMove: false,
                customBg: 'b',
                showRgbProps: false,
                showTargetBg: false,
                changeTargetValue: false,
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
            var params = extend(defaults, options);
            this.isMobile = isMobileChecked();
            if (this.isMobile)
                params.showRgbProps = false;
            this.bgType = {
                w: '#ffffff',
                b: '#444444',
                g: '#888888'
            };
            this.domId = this.cssPreFix + this.dom.id;
            this.r = this.g = this.b = 255;
            this.alpha = 1;
            this.hue = 0;
            this.scale = params.scale;
            this.size = 256 / this.scale;
            this.wheeOffset = 8 / this.scale;
            this.hueOffset = 3;
            this.rgba = 'rgbah';
            this.rgbaDomList = [];
            this.x = this.y = this.left = this.top = 0;
            this.ui = this.renderColorPickerUI(params);
        }
        ;
        ColorPicker.prototype.renderColorPickerUI = function (params) {
            if (params.customClassName) {
                params.customClassName(this.cssClasses);
            }
            var cssClassNames = this.cssClasses();
            var colorpickerWrapper = buildDOm('div', this.cssPreFix + cssClassNames.WRPPAER);
        };
        ColorPicker.prototype.cssClasses = function () {
            return {
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
                VALUE: "value",
                HEX: "hex"
            };
        };
        return ColorPicker;
    }());
    window['ColorPicker'] = ColorPicker;
    function buildDOm(dom, className) {
    }
    function extend(target, options) {
        for (var key in Object.keys(target)) {
            if (options.hasOwnProperty(key)) {
                target[key] = options[key];
            }
        }
        return target;
    }
    function isMobileChecked() {
        var ua = window.navigator.userAgent;
        if (ua.match(/(Android|iPhone|iPad)/)) {
            return true;
        }
        return false;
    }
})();

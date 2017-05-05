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

    class ColorPicker {
        dom: any;
        options: any;
        cssPreFix: string;
        isMobile: boolean;
        bgType: any;
        domId: string;
        r: number;
        g: number;
        b: number;
        alpha: number;
        hue: number;
        scale: number;
        size: number;
        wheeOffset: number;
        hueOffset: number;
        rgba: string;
        rgbaDomList: Array<any>;
        x: number;
        y: number;
        left: number;
        top: number;
        ui: any;
        static defaults: any;
        constructor(target: any, options: any) {
            this.dom = target;
            this.options = options;
            let defaults = {
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
            let params = extend(defaults, options);
            this.isMobile = isMobileChecked();
            if (this.isMobile) params.showRgbProps = false;
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
        };

        renderColorPickerUI(params: any) {
            if (params.customClassName) {
                params.customClassName(this.cssClasses);
            }
            const cssClassNames = this.cssClasses();
            const colorpickerWrapper = buildDOm('div', this.cssPreFix + cssClassNames.WRPPAER);
        }

        cssClasses() {
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
        }
    }

    interface classNames {
        WRAPPER: string,
        TITLE: string,
        CLOSED: string,
        BOARD_PARENT: string,
        BOARD: string,
        MASK: string,
        WHEEL: string,
        BAR: string,
        SELECTOR: string,
        PANEL: string,
        BG: string,
        ROW: string,
        KEY: string,
        VALUE: string,
        HEX: string
    }

    window['ColorPicker'] = ColorPicker;

    function buildDOm(dom: string, className: string) {

    }

    function extend(target: any, options: any) {
        for (const key in Object.keys(target)) {
            if (options.hasOwnProperty(key)) {
                target[key] = options[key];
            }
        }
        return target;
    }

    function isMobileChecked() {
        const ua = window.navigator.userAgent;
        if (ua.match(/(Android|iPhone|iPad)/)) {
            return true;
        }
        return false;
    }

})();
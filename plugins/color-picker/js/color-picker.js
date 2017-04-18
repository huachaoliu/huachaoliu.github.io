/**
 * @libary {color-picker}
 * 
*/

(function () {

    var ColorPicker = function (target, options) {

        this.dom = document.getElementById(target);

        var defaults = {
            h: 26,
            dragMove: false,
            showRgbProps: false,
            showTargetBg: false,
            position: 'default',
            wrapperW: 300,
            wrapperH: 300,
            scale: 1
        };

        this.colorMap = {
            r: 255,
            g: 0,
            b: 0,
            a: 1
        };

        this.r = 255;
        this.g = 255;
        this.b = 255;

        this.alpha = 1;
        this.hue = 0;

        this.size = 256;
        this.wheelOffset = 8;
        this.selectOffset = 3;
        this.rgba = 'rgba#';
        this.rgbaDomList = [];

        var params = colorExtend(defaults, options);

        this.position = params.position;

        this.x = 0;
        this.y = 0;

        this.left = this.dom.offsetLeft;
        this.top = this.dom.offsetTop + params.h;

        this.ui = this.initColorPickerUI(params);

        this.renderColorPicker(params);
    };  

    ColorPicker.prototype = {

        constructor: ColorPicker,

        initColorPickerUI: function (params) {

            var colorWrapper = getDom('div', 'color-wrapper'),
                colorTitle = getDom('div', 'color-title'),
                colorClosed = getDom('span', 'color-closed'),
                colorMaskParent = getDom('div', 'color-mask-parent'),
                colorBoard = getDom('div', 'color-board'),
                colorMask = getDom('div', 'color-mask'),
                colorWheel = getDom('div', 'color-wheel'),
                colorbar = getDom('div', 'color-bar'),
                colorSelector = getDom('div', 'color-bar-selected'),
                colorPanel = null;

            colorTitle.textContent = 'color picker';
            colorTitle.appendChild(colorClosed);
            colorbar.appendChild(colorSelector);

            var rgb = this.colorMap.r + ',' + this.colorMap.g + ',' + this.colorMap.b;
            colorMask.style.background = 'rgb(' + rgb + ')';

            if (params.showRgbProps) {
                colorPanel = getDom('div', 'color-hex-panel');
                var colorbg = getDom('div', 'color-hex-bg');

                colorbg.style.background = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
                colorPanel.appendChild(colorbg);
                for (var i = 0; i < this.rgba.length; i++) {

                    var colorRow = getDom('div', 'color-hex-row'),
                        colorKey = getDom('span', 'color-hex-key'),
                        colorValue = getDom('input', 'color-hex-value');

                    colorKey.textContent = this.rgba[i] + ':';
                    colorValue.className += ' ' + this.rgba[i] + 'hex';
                    colorValue.type = 'text';

                    this.rgbaDomList.push(colorValue);
                    add(colorRow, [colorKey, colorValue]);

                    colorPanel.appendChild(colorRow);
                }

                this.rgbaDomList[0].value = this.r;
                this.rgbaDomList[1].value = this.g;
                this.rgbaDomList[2].value = this.b;
                this.rgbaDomList[3].value = this.alpha;
                this.rgbaDomList[4].value = this.torgb(this.r, this.g, this.b);
            }

            colorWheel.style.left = - this.wheelOffset + 'px';
            colorWheel.style.top = - this.wheelOffset + 'px';

            add(colorMaskParent, [colorBoard, colorMask, colorWheel]);

            add(colorWrapper, [colorTitle, colorMaskParent, colorbar, colorPanel]);
            return {
                wrapper: colorWrapper,
                title: colorTitle,
                closed: colorClosed,
                colorMaskParent: colorMaskParent,
                board: colorBoard,
                mask: colorMask,
                wheel: colorWheel,
                bar: colorbar,
                bg: colorbg,
                selector: colorSelector,
                panel: colorPanel,
                row: colorRow,
                key: colorKey,
                value: colorValue
            };
        },

        renderColorPicker: function (params) {

            var self = this;
            if (params.showTargetBg) {
                this.dom.value = '';                                
            } else {
                this.dom.style.background = '#ffffff';
                this.dom.style.border = '1px solid #000';
                this.dom.style.cursor = 'default';
            }

            document.body.oncontextmenu = function (e) {
                e.preventDefault();
            };

            this.setPosition(params);

            if (!(this.ui.wrapper in document.body)) { 
                self.dom.onfocus = function () { 
                    document.body.appendChild(self.ui.wrapper);
                    // document.removeEventListener('mousedown', clearWrapper);
                    // document.addEventListener('mousedown', clearWrapper, false);


                    // function clearWrapper(e) {
                    //     if (
                    //         // self.ui.wrapper in document.body && 
                    //         e.target !== self.dom &&
                    //         e.target !== self.ui.wrapper &&
                    //         e.target !== self.ui.title &&
                    //         e.target !== self.ui.closed &&
                    //         e.target !== self.ui.board &&
                    //         e.target !== self.ui.bar &&
                    //         e.target !== self.ui.selector) {

                    //         document.body.removeChild(self.ui.wrapper);    
                    //         document.removeEventListener('mousedown', clearWrapper);                            
                    //     }
                    // }
                    if (params.dragMove) {
                        // self.addEvent([self.ui.title], 'mousedown', self.dragMove.bind(self));
                        self.wrapperDragMove(self.ui.title, self.ui.wrapper);
                    }
                     self.wheelDragMove(self.ui.board, self.ui.wheel, params);
                }

                self.selectDragMove(self.ui.bar, self.ui.selector, params);
            }
        },

        setPosition: function (params) {
            switch (params.position) {
                case 'l b':
                    this.ui.wrapper.style.left = (this.left - 1) + 'px';
                    this.ui.wrapper.style.top = this.top + 'px';
                    break;
                case 'r b':
                    this.left = this.left - window.outerWidth * .1;
                    this.ui.wrapper.style.left = this.left + 'px';
                    this.ui.wrapper.style.top = this.top + 'px';
                    break;
                case 'l t':
                    this.top = this.top - params.wrapperH - 40;
                    this.ui.wrapper.style.left = (this.left - 1) + 'px';
                    this.ui.wrapper.style.top = this.top + 'px';
                    break;
                case 'r t':
                    this.top = this.top - params.wrapperH - 40;
                    this.left = this.left - window.outerWidth * .1;
                    this.ui.wrapper.style.left = (this.left - 1) + 'px';
                    this.ui.wrapper.style.top = this.top + 'px';
                    break;
                default:
                    var w = this.ui.wrapper.clientWidth;
                    var h = this.ui.wrapper.clientHeight;
                    var ww = window.outerWidth/2;
                    var wh = window.outerHeight/2;
                    this.ui.wrapper.left = (ww - w) + 'px';
                    this.ui.wrapper.top = (wh - h) + 'px';
                    break;
            }
        },

        wrapperDragMove: function (clickTarget, moveTarget) {

            var self = this;
            clickTarget.addEventListener('mousedown', onMouseDown, false);

            function onMouseDown(e) {

                disX = e.pageX - self.left;
                disY = e.pageY - self.top;

                document.addEventListener('mousemove', onMouseMoveInWrapper, false);
                document.addEventListener('mouseup', onMouseUpInWrapper, false);

                function onMouseMoveInWrapper(e) {
                    var left = e.pageX - disX;
                    var top = e.pageY - disY;
                    var maxL = document.documentElement.clientWidth - moveTarget.clientWidth - 2;
                    var maxT = document.documentElement.clientHeight - moveTarget.clientHeight - 2;

                    if (left < 0) {
                        left = 0;
                    } else if (left > maxL) {
                        left = maxL
                    }

                    if (top < 0) {
                        top = 0;
                    } else if (top > maxT) {
                        top = maxT;
                    }


                    self.left = left;
                    self.top = top;

                    moveTarget.style.left = left + 'px';
                    moveTarget.style.top = top + 'px';

                    return false;
                }

                function onMouseUpInWrapper() {
                    document.removeEventListener('mousemove', onMouseMoveInWrapper);
                    document.removeEventListener('mouseup', onMouseUpInWrapper);
                }

            }
        },

        wheelDragMove: function (clickTarget, moveTarget, params) {
            var self = this;
            clickTarget.addEventListener('mousedown', onMouseDown, false);
            moveTarget.addEventListener('mousedown', onMouseDown, false);

            function onMouseDown(e) {

                var disX = e.pageX - self.left - 6 - self.wheelOffset;

                var disY = e.pageY - self.top - 47 - self.wheelOffset;

                self.x = disX;
                self.y = disY;
                moveTarget.style.left = disX + 'px';
                moveTarget.style.top = disY + 'px';

                self.update(disX, disY, params);

                document.addEventListener('mousemove', onMouseMove, false);
                document.addEventListener('mouseup', onMouseUp, false);

                function onMouseMove(e) {

                    disX = e.pageX - self.left - 6 - self.wheelOffset;
                    disY = e.pageY - self.top - 47 - self.wheelOffset;
                    if (disX < - self.wheelOffset) {
                        disX = - self.wheelOffset
                    } else if (disX > self.size - self.wheelOffset) {
                        disX = self.size - self.wheelOffset
                    }

                    if (disY < - self.wheelOffset) {
                        disY = - self.wheelOffset
                    } else if (disY > self.size - self.wheelOffset) {
                        disY = self.size - self.wheelOffset
                    }

                    // self.update(disX, disY, self.hue, self.size / 6 | 0);

                    // x = limitValue(disX / 255, 0, 1);
                    // y = 1 - limitValue(disY / 255, 0, 1);
                    // z = 1 - limitValue((e.pageY - disY) / 255, 0, 1);
                    self.update(disX, disY, params);

                    moveTarget.style.left = disX + 'px';
                    moveTarget.style.top = disY + 'px';
                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

            }            
        },

        selectDragMove: function (clickTarget, moveTarget, params) {

            var self = this;
            clickTarget.addEventListener('mousedown', onMouseDown, false);

            function onMouseDown(e) {

                var top = self.ui.bar.offsetTop;
                var t = self.top + top;
                var scope = self.size / 6 | 0; //分区                

                var disX = self.ui.wheel.offsetLeft + self.wheelSize;
                var disY = self.ui.wheel.offsetTop + self.wheelSize;

                var y = e.pageY - t - self.selectOffset;

                var h = 360 / 256;  

                self.hue =  360 - Math.round((y + self.selectOffset) * h);  
               
                self.sethue(disX, disY, y, scope);

                self.update(self.x, self.y, params);

                moveTarget.style.top = y + 'px';

                

                document.addEventListener('mousemove', onMouseMove, false);
                document.addEventListener('mouseup', onMouseUp, false);

                function onMouseMove(e) {

                    disX = self.ui.wheel.offsetLeft + self.wheelSize;
                    disY = self.ui.wheel.offsetTop + self.wheelSize;

                    y = e.pageY - t - self.selectOffset;

                    if (y < - self.selectOffset) {
                        y = - self.selectOffset;
                    } else if (y > self.size - self.selectOffset) {
                        y = self.size - self.selectOffset;
                    }

                    self.hue =  360 - Math.round((y + self.selectOffset) * h); 
                    self.sethue(disX, disY, y, scope);
                    self.update(self.x, self.y, y, scope);

                    var rgb = self.r + ',' + self.g + ',' + self.b;

                    self.ui.bg.style.background = 'rgb('+rgb+')';

                    moveTarget.style.top = y + 'px';

                }

                function onMouseUp() {

                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);

                }

            }

        },
        
        update: function (disX, disY, params) {
            var self = this;
            var r = self.r,
                g = self.g,
                b = self.b;
            /**                   
             *   |-----------------| y(0-256)  | z (2-360) 
             *   |                 |明度        | 色相
             *   |                 |           |
             *   |      o----------|           |
             *   |      |          |           |
             *   |      |          |           |
             *   |______|__________|           |
             *  x(0-256)饱和        (0, 0)   (原点)
             */
            var h = self.hue;
            var v = (100 - 1 / self.size * (disY + self.wheelOffset) * 100 | 0);
            var _s = (disX + self.wheelOffset)/self.size * 100;                    
            var s =  _s | 0;

            var colorRgb = self.hsv2rgb(h,s,v);
            // r = Math.abs(self.limitValue(colorRgb.r, 1, 0) * 255) | 0;
            // g = Math.abs(self.limitValue(colorRgb.g, 1, 0) * 255) | 0;
            // b = Math.abs(self.limitValue(colorRgb.b, 1, 0) * 255) | 0;
            r = Math.round(Math.abs(self.limitValue(colorRgb.r, 1, 0) * 255));
            g = Math.floor(Math.abs(self.limitValue(colorRgb.g, 1, 0) * 255));
            b = Math.floor(Math.abs(self.limitValue(colorRgb.b, 1, 0) * 255));

            self.r = r;
            self.g = g;
            self.b = b;

            var color = self.torgb(r, g, b);

            if (params.showRgbProps) {  
                var rgb = r + ',' + g + ',' + b;                        
                var rhex = self.rgbaDomList[0];
                var ghex = self.rgbaDomList[1];
                var bhex = self.rgbaDomList[2];
                var hex = self.rgbaDomList[4];
                rhex.value = r;
                ghex.value = g;
                bhex.value = b;
                hex.value = color.substring(1);
                self.ui.bg.style.background = 'rgb(' + rgb + ')';
            }
            if (params.showTargetBg) {
                self.dom.style.background = color;
            } else {
                self.dom.value = color;                               
            }
        },

        sethue: function (x, y, t, scope) {
            /**
             * [0-6]    this.B++ rgb[255, 0, 0~255];
             * [6-12]   this.R-- rgb[255~0, 0, 255];
             * [12-18]  this.G++ rgb[0, 0~255, 255];
             * [18-24]  this.B-- rgb[0, 255~0, 255];
             * [24-36]  this.R++ rgb[0~255, 0, 255];
             * [36-0]   this.G--, this.B-- rgb[255, 255~0, 255~0];
             * */
            var self = this;
            var min, max, rgb = '';
            if (t <= -3) {
                self.r = 255;
                self.g = 0;
                self.b = 0;

            } else if (t > -3 && t <= scope) {
                //[0-6]    this.B++ rgb[255, 0, 0~255];
                self.r = 255;
                self.g = 0;
                self.b = Math.abs(t * 6) + 3;

            } else if (t > scope && t <= 2 * scope) {
                //[6-12]   this.R-- rgb[255~0, 0, 255];
                self.r = 255 - ((t - scope) * 6 + 3);
                self.g = 0;
                self.b = 255;

            } else if (t > 2 * scope && t <= 3 * scope) {
                //[12-18]  this.G++ rgb[0, 0~255, 255];
                self.r = 0;
                self.g = Math.abs((t - scope * 2) * 6 + 3);
                self.b = 255;

            } else if (t > 3 * scope && t <= 4 * scope) {
                //[18-24]  this.B-- rgb[0, 255~0, 255];
                self.r = 0;
                self.g = 255;
                self.b = 255 - ((t - 3 * scope) * 6 + 3);

            } else if (t > 4 * scope && t <= 5 * scope) {
                //[24-36]  this.R++ rgb[0~255, 0, 255];
                self.r = Math.abs((t - 4 * scope) * 6) + 3;

                // if (self.R <= x) self.R = x;

                self.g = 255;
                self.b = 0;

            } else if (t > 5 * scope && t <= 6 * scope) {
                //[36-0]   this.G--, this.B-- rgb[255, 255~0, 255~0];
                self.r = 255;
                self.g = 255 - ((t - 5 * scope) * 6 + 3);
                self.b = 0;

            } else if (t >= 6 * scope) {
                self.r = 255;
                self.g = 0;
                self.b = 0;
            }
            
            rgb = self.r + ',' + self.g + ',' + self.b;

            // console.log(rgb);

            self.ui.mask.style.background = 'rgb(' + rgb + ')';

            // console.log(self.r, self.g, self.b);

            // bar 改变,this.dom 不变,受wheel选择控制
            // self.colorMap update;

            // self.dom.value = '#' + initHex(self.r) +
            //     initHex(self.g) +
            //     initHex(self.b);
        },

        hsv2rgb: function (h, s, v) {
            var h = h / 360 * 6,
                s = s / 100,
                v = v / 100,
                i = ~~h,
                f = h - i,
                p = v * (1 - s),
                q = v * (1 - f * s),
                t = v * (1 - (1 - f) * s),
                mod = i % 6;
            return {
                r: [v, q, p, p, t, v][mod],
                g: [t, v, v, q, p, p][mod],
                b: [p, p, t, v, v, q][mod]
            };
        },

        limitValue: function (value, max, min) {
            return (value > max ? max : value < min ? min : value);
        },

        hex2: function (hex) {
            return (hex.length < 2 ? '0' : '') + hex.toString(16);
        },

        torgb: function (r, g, b) {
            return '#' + this.hex2(r) + this.hex2(g) + this.hex2(b);
        }
        

    };

    function to2 (n) {
        return (parent(n) > 9) ? n : '0' + n;
    }

    function colorExtend (target, options) {
        for (var prop in target) {
            if (options.hasOwnProperty(prop)) {
                target[prop] = options[prop];
            }
        }
        return target;
    }

    function getDom (dom, className) {
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

    window.ColorPicker = ColorPicker;
})();
(function () {

    var Color = function (val) {



    };

    var ColorPicker = function (target, options) {

        // var root = 'color-root';
        this.dom = document.getElementById(target);
        // this.type = this.dom.getAttribute(root);
        // var position = ['left', 'top', 'right','bottom'];
        var defaults = {
            h: 26, //目标高度
            dragMove: false, //是否可拖拽
            showRgbProps: true, //是否显示属性面板
            changeTargetBg: true,
            position: 'left bottom',
            wrapperW: 300,
            wrapperH: 300,
            scale: 1 //比例缩放
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

        this.h = 1;
        this.s = 1;
        this.l = 1;
        this.alpha = 1;

        this.hue = 0;

        this.rgba = 'rgbah';
        this.rgbaDomStack = [];

        this.size = 256;
        this.wheelSize = 8;
        this.selectSize = 3;

        var params = colorExtend(defaults, options);

        this.scale = params.scale;

        this.left = this.dom.offsetLeft;
        this.top = this.dom.offsetTop + params.h;

        this.ui = this.buildColorPicker(params);
        this.initColorPicker(params);
    };

    ColorPicker.prototype = {

        constructor: ColorPicker,

        changeXYValue: function (e) {

            var e = e || window.event,

                scale = self.scale,

                page = {
                    X: e.pageX,
                    Y: e.pageY
                },
                x = (page.X - self.left - 6 - self.wheelSize) * scale,
                y = (page.Y - self.top - 47 - self.wheelSize) * scale;

            var color = {
                x: self.limitValue(x / 255, 0, 1),
                y: 1 - self.limitValue(y / 255, 0, 1)
            };

        },

        buildColorPicker: function (params) {

            var self = this,
                colorWrapper = getDom('div', 'color-wrapper'),
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

            var rgb = self.colorMap.r + ',' + self.colorMap.g + ',' + self.colorMap.b;
            colorMask.style.background = 'rgb(' + rgb + ')';

            if (params.showRgbProps) {
                colorPanel = getDom('div', 'color-hex-panel');
                var colorbg = getDom('div', 'color-hex-bg');

                colorbg.style.background = 'rgb(' + self.r + ',' + self.g + ',' + self.b + ')';
                colorPanel.appendChild(colorbg);
                for (var i = 0; i < self.rgba.length; i++) {

                    var colorRow = getDom('div', 'color-hex-row'),
                        colorKey = getDom('span', 'color-hex-key'),
                        colorValue = getDom('input', 'color-hex-value');

                    colorKey.textContent = self.rgba[i] + ':';
                    colorValue.className += ' ' + self.rgba[i] + 'hex';
                    colorValue.type = 'text';

                    self.rgbaDomStack.push(colorValue);
                    add(colorRow, [colorKey, colorValue]);

                    colorPanel.appendChild(colorRow);
                }

                self.rgbaDomStack[0].value = self.r;
                self.rgbaDomStack[1].value = self.g;
                self.rgbaDomStack[2].value = self.b;
                self.rgbaDomStack[3].value = self.alpha;
                self.rgbaDomStack[4].value = torgb(self.r, self.g, self.b);
            }

            colorWheel.style.left = - this.wheelSize + 'px';
            colorWheel.style.top = - this.wheelSize + 'px';

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
        initColorPicker: function (params) {

            var self = this;

            if (params.changeTargetBg) {
                self.dom.style.background = '#ffffff';
                self.dom.style.border = '1px solid #000';
                self.dom.style.cursor = 'default';
            } else {

                self.dom.value = '#ffffff';
            }

            document.body.oncontextmenu = function (e) {
                e.preventDefault();
            }

            self.setPosition(params);

            // self.removeEvent([self.ui.title, self.ui.wheel, self.ui.board], 'mousedown', self.dragMove.bind(self)); 

            if (!(self.ui.wrapper in document.body)) {

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
                    // self.addEvent([self.ui.wheel, self.ui.board], 'mousedown', self.dragMove.bind(self));
                };

                self.selectDragMove(self.ui.bar, self.ui.selector, params.showRgbProps);

                self.ui.closed.onclick = function () {
                    self.dom.blur();
                    document.body.removeChild(self.ui.wrapper);
                    self.left = self.dom.offsetLeft;
                    self.top = self.dom.offsetTop + params.h;

                    self.ui.wrapper.style.left = self.left + 'px';
                    self.ui.wrapper.style.top = self.top + 'px';
                };
            }

        },

        setPosition: function (params) {
            var self = this;
            switch (params.position) {
                case 'left bottom':
                    self.ui.wrapper.style.left = (self.left - 1) + 'px';
                    self.ui.wrapper.style.top = self.top + 'px';
                    break;
                case 'right bottom':
                    self.left = self.left - window.outerWidth * .1;
                    self.ui.wrapper.style.left = self.left + 'px';
                    self.ui.wrapper.style.top = self.top + 'px';
                    break;
                case 'left top':
                    self.top = self.top - params.wrapperH - 40;
                    self.ui.wrapper.style.left = (self.left - 1) + 'px';
                    self.ui.wrapper.style.top = self.top + 'px';
                    break;
                case 'right top':
                    self.top = self.top - params.wrapperH - 40;
                    self.left = self.left - window.outerWidth * .1;
                    self.ui.wrapper.style.left = (self.left - 1) + 'px';
                    self.ui.wrapper.style.top = self.top + 'px';
                    break;
            }

        },

        wrapperDragMove: function (clickTarget, moveTarget) {
            var self = this;

            var disX = 0, disY = 0;

            clickTarget.addEventListener('mousedown', onMouseDown, false);;

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

                var disX = e.pageX - self.left - 6 - self.wheelSize;

                var disY = e.pageY - self.top - 47 - self.wheelSize;


                moveTarget.style.left = disX + 'px';
                moveTarget.style.top = disY + 'px';


                if (params.showRgbProps) {
                    //rgbPanels如果显示了,计算rgb值 ...                    
                }

                var l = 255 - (disX + self.wheelSize) >= 255 ? 255 : disX + self.wheelSize >= 0 ? 0 : disX + self.wheelSize;
                var s = 255 - (disY + self.wheelSize) >= 255 ? 255 : disY + self.wheelSize >= 0 ? 0 : disY + self.wheelSize;
                var h = (360 / 256) * self.hue

                changeRgb();
                function changeRgb() {
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
                    // var h = 360/255, s = 100/256, l = 100/256;

                    // var xyX = disX + self.wheelSize;
                    // var xyY = disY + self.wheelSize;

                    // xyX = xyX <= 0 ? 0 : xyX > 255 ? 255 : xyX;
                    // xyY = xyY <= 0 ? 0 : xyY > 255 ? 255 : xyY;

                    // var hs = h * 0;
                    // var ss = s * xyX / 100;
                    // var ls = l * xyY / 100;

                    // var rgba = self.HSLtoRGB(hs, ss, ls, 1);

                    // var scope = 256/6 | 0;
                    // if (self.hue <= scope) {
                    //     r = 255 - (disY + self.wheelSize) + 1;
                    //     g = (255 - 1/256 * (disX+disY) * 2 * 100 | 0);
                    //     g = r - Math.abs(g - r);
                    //     b = g - self.hue;
                    //  } else if (self.hue <= scope * 2) {
                    //     b = 255 - (disY + self.wheelSize) + 1 - self.hue;
                    //     r = (255 - 1/256 * (disX+disY) * 2 * 100 | 0);
                    //     r = b - Math.abs(r - b);
                    //     g = b;
                    //  }

                    // var h = 1 / 256 * (disY + 8 + 1) * 2 * 360;
                    var h = self.hue;
                    var v = (100 - 1 / 256 * (disY + 8) * 100 | 0);

                    var _s = (disX + 8)/256 * 100;                    
                    var s =  _s | 0;

                    function torgb(h, s, v){
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
                    }   
                    var colorRgb = torgb(h,s,v);
                    r = Math.abs(limitValue(colorRgb.r, 0, 1) * 255) | 0;
                    g = Math.abs(limitValue(colorRgb.g, 0, 1) * 255) | 0;
                    b = Math.abs(limitValue(colorRgb.b, 0, 1) * 255) | 0;

                    self.r = r;
                    self.g = g;
                    self.b = b;


                    if (params.showRgbProps) {  

                        var rgb = r + ',' + g + ',' + b;                        

                        var rhex = self.rgbaDomStack[0];
                        var ghex = self.rgbaDomStack[1];
                        var bhex = self.rgbaDomStack[2];
                                                
                        rhex.value = r;

                        ghex.value = g;

                        bhex.value = b;

                        self.ui.bg.style.background = 'rgb(' + rgb + ')';

                    }



                }

                document.addEventListener('mousemove', onMouseMove, false);
                document.addEventListener('mouseup', onMouseUp, false);

                function onMouseMove(e) {

                    disX = e.pageX - self.left - 6 - self.wheelSize;

                    disY = e.pageY - self.top - 47 - self.wheelSize;

                    if (disX < - self.wheelSize) {

                        disX = - self.wheelSize

                    } else if (disX > self.size - self.wheelSize) {

                        disX = self.size - self.wheelSize

                    }

                    if (disY < - self.wheelSize) {

                        disY = - self.wheelSize

                    } else if (disY > self.size - self.wheelSize) {

                        disY = self.size - self.wheelSize

                    }

                    self.update(disX, disY, self.hue, self.size / 6 | 0);

                    x = limitValue(disX / 255, 0, 1);
                    y = 1 - limitValue(disY / 255, 0, 1);
                    z = 1 - limitValue((e.pageY - disY) / 255, 0, 1);
                    changeRgb(x, y, z);

                    moveTarget.style.left = disX + 'px';

                    moveTarget.style.top = disY + 'px';

                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

            }

        },

        selectDragMove: function (clickTarget, moveTarget, rgbPanels) {

            var self = this;
            clickTarget.addEventListener('mousedown', onMouseDown, false);

            function onMouseDown(e) {

                var top = self.ui.bar.offsetTop;

                var t = self.top + top;

                var scope = self.size / 6 | 0; //分区                

                //计算rgb
                // var disX = 0, disY = 0;

                var disX = self.ui.wheel.offsetLeft + self.wheelSize;
                var disY = self.ui.wheel.offsetTop + self.wheelSize;

                var y = e.pageY - t - self.selectSize;

                var h = 360 / 256;  
                self.hue =  360 - Math.round((y + self.selectSize) * h);  
                console.log(self.r)
                self.toRgbColor(disX, disY, y, scope);

                self.update(disX, disY, y, scope);

                if (rgbPanels) {
                    //...
                }

                moveTarget.style.top = y + 'px';

                document.addEventListener('mousemove', onMouseMove, false);
                document.addEventListener('mouseup', onMouseUp, false);

                function onMouseMove(e) {

                    disX = self.ui.wheel.offsetLeft + self.wheelSize;
                    disY = self.ui.wheel.offsetTop + self.wheelSize;

                    y = e.pageY - t - self.selectSize;

                    if (y < - self.selectSize) {
                        y = - self.selectSize;
                    } else if (y > self.size - self.selectSize) {
                        y = self.size - self.selectSize;
                    }

                    self.hue =  360 - Math.round((y + self.selectSize) * h); 
                    self.toRgbColor(disX, disY, y, scope);
                    self.update(disX, disY, y, scope);

                    var rgb = self.r + ',' + self.g + ',' + self.b;

                    self.ui.bg.style.background = 'rgb('+rgb+')';

                    if (rgbPanels) {
                        //...
                    }

                    moveTarget.style.top = y + 'px';

                }

                function onMouseUp() {

                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);

                }

            }

        },

        update: function (x, y, h, scope) {

            // console.log(x, y, h, scope);
            var h = h,
                s = x / 100,
                l = y / 100;

            var r, g, b;
            // console.log(h, s, l);
            if (h <= 0) {

                r = 255 - l * y;
                g = 255 - x * 100;
                b = 255 - y * 100;
            }
            return {
                r: r,
                g: g,
                b: b
            };
        },

        toRgbColor: function (x, y, t, scope) {

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

        HueToRGB: function (p, q, h) {
            if (h < 0)
                h += 1;
            else if (h > 1)
                h -= 1;

            if ((h * 6) < 1)
                return p + (q - p) * h * 6;
            else if ((h * 2) < 1)
                return q;
            else if ((h * 3) < 2)
                return p + (q - p) * ((2 / 3) - h) * 6;
            else
                return p;
        },

        HSLtoRGB: function (h, s, l, a) {

            if (s < 0)
                s = 0;

            if (l <= 0.5)
                var q = l * (1 + s);
            else
                var q = l + s - (l * s);

            var p = 2 * l - q;

            var tr = h + (1 / 3);
            var tg = h;
            var tb = h - (1 / 3);

            r = Math.round(this.HueToRGB(p, q, tr) * 255);
            g = Math.round(this.HueToRGB(p, q, tg) * 255);
            b = Math.round(this.HueToRGB(p, q, tb) * 255);
            return [r, g, b, a || 1];
        },
        addEvent: function (doms, event, fn) {

            for (var i = 0, l = doms.length; i < l; i++) {
                if (doms[i]) {
                    doms[i].addEventListener(event, fn, false);
                }
            }

        },

        removeEvent: function (doms, eventm, fn) {
            for (var i = 0, l = doms.length; i < l; i++) {
                if (doms[i]) {
                    doms[i].removeEventListener(event, fn);
                }
            }
        }

    };

    function limitValue(value, min, max) {
        return (value > max ? max : value < min ? min : value);
    }

    function to2(n) {
        return (parseInt(n) > 9) ? n : '0' + n;
    }

    function hex2(hex) {
        return (hex.length < 2 ? '0' : '') + hex.toString(16);
    }

    function torgb(r, g, b) {
        return '#' + hex2(r) + hex2(g) + hex2(b);
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

    window.ColorPicker = ColorPicker;

})();
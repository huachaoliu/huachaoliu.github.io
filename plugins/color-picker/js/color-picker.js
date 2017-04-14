/**
 * @libary {color-picker}
 * 
 * autor: misliu
 * 
 * time: 2017-04-10
 * 
*/
//修改逻辑，ui,行为分离,dom全局，响应式colorpicker的坐标

(function () {

    //工具函数

    function toDouble(num) {

        return (parseInt(num) > 9) ? num : '0' + num;

    }

    function initHex(color) {

        //rgb转16进制．

        return color.length < 2 ? '0' + color.toString(16) : color.toString(16);

    }

    function colorExtends(target, options) {

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

            if (doms[i] !== null) {

                parent.appendChild(doms[i]);                

            }

        }
    }

    var ColorPicker = function (target, options) {
        //target dom type div : background | input : value 
        var root = 'color-root';

        var targetType = target.charAt(0);

        switch (targetType) {
            case '.':
                var domEles = document.getElementsByClassName(target.substring(1));

                for (var i = 0; i < domEles.length; i++) {

                    if (domEles[i].getAttribute(root)) {

                        this.type = domEles[i].getAttribute(root);

                        this.dom = domEles[i];

                    } else {

                        console.log('className:' + target.substring(1) + ' is not found');

                    }

                }

                break;
            case '#':

                this.dom = document.getElementById(target.substring(1));

                this.type = this.dom.getAttribute(root);

                break;

        }

        var defaults = {
            targetHeight: 26,
            dragMoveWrapper: false,
            rgbPanels: true
        };

        this.count = 0;

        // UI className
        this.color_wrapper = 'color-wrapper';
        //关闭按钮所在层
        this.color_title = 'color-title';
        this.color_closed = 'color-closed';
        //颜色面板
        this.color_mask_parent = 'color-mask-parent';
        this.color_board = 'color-board';
        this.color_mask = 'color-mask';
        this.color_wheel = 'color-wheel';
        //色彩选择条
        this.color_bar = 'color-bar';
        this.color_selected = 'color-bar-selected';
        //颜色属性
        this.color_hex_panel = 'color-hex-panel';
        this.color_hex_bg = 'color-hex-bg';
        this.color_hex_row = 'color-hex-row';
        this.color_hex_key = 'color-hex-key';
        this.color_hex_value = 'color-hex-value';
        this.color_hex_strhex = 'strhex';

        //rgb
        this.r = 255;
        this.g = 255;
        this.b = 255;

        this.colorMap = {
            r: 255,
            g: 0,
            b: 0,
            a: 1
        };
        this.color = '#ffffff';
        this.rgbPanelRow = 'rgbah';
        this.wheelSize = 8;
        this.selectSize = 3;
        this.COLOR_BOARD_SIZE = 256;
        this.panelRowKeyStack = [];                   

        //生产dom

        var params = colorExtends(defaults, options);


        this.wrapper = null;
        this.title = null;
        this.closed = null;
        this.board_content = null;
        this.board = null;
        this.mask = null;
        this.wheel = null;
        this.bar = null;
        this.selected = null;
        this.hex_panel = null;
        this.hex_bg = null;
        this.hex_row = null;
        this.hex_key = null;
        this.hex_value = null;
        this.hex_strhex = null;

        this.left = parseInt(this.dom.offsetLeft);

        this.top = parseInt(this.dom.offsetTop) + params.targetHeight;

        this.colorPickerUI = this.buildColorPickerHtml(params);

        this.initColorPicker(params);
    };

    ColorPicker.prototype = {

        constructor: ColorPicker,

        buildColorPickerHtml: function (params) {

            var self = this;

            var colorWrapper = getDom('div', this.color_wrapper);

            var colorTitle = getDom('div', this.color_title);

            colorTitle.textContent = 'color picker';

            var colorClosed = getDom('span', this.color_closed);
            
            this.closed = colorClosed;

            colorTitle.appendChild(colorClosed);

            if (params.dragMoveWrapper) {

                this.wrapperDragMove(colorTitle, colorWrapper);

            }
            //色板
            var colorMaskParent = getDom('div', this.color_mask_parent);

            var colorBoard = getDom('div', this.color_board);

            var colorMask = getDom('div', this.color_mask);

            var rgb = self.colorMap.r + ',' + self.colorMap.g + ',' + self.colorMap.b;

            colorMask.style.background = 'rgb(' + rgb + ')';

            this.mask = colorMask;

            var colorWheel = getDom('div', this.color_wheel);

            this.wheel = colorWheel;

            colorWheel.style.left = - self.wheelSize + 'px';
            colorWheel.style.top = - self.wheelSize + 'px';

            //色板中的选择器位移
            this.wheelDragMove(colorBoard, colorWheel, params.rgbPanels);
            this.wheelDragMove(colorWheel, colorWheel, params.rgbPanels);

            add(colorMaskParent, [colorBoard, colorMask, colorWheel]);

            //色彩选择条
            var colorbar = getDom('div', this.color_bar);

            this.bar = colorbar;

            var colorSelected = getDom('div', this.color_selected);

            this.selectDragMove(colorbar, colorSelected, params.rgbPanels);

            colorbar.appendChild(colorSelected);

            // var colorPanel = params.rgbPanels ? getDom('div', this.color_hex_panel) : null;
            var colorPanel = null;

            if (params.rgbPanels) {

                colorPanel = getDom('div', this.color_hex_panel);
                
                var colorbg = getDom('div', this.color_hex_bg);

                colorbg.style.background = 'rgb('+this.r+','+this.g+','+this.b+')';

                colorPanel.appendChild(colorbg);     

                for (var i = 0; i < this.rgbPanelRow.length; i++) {

                    var colorRow = getDom('div', this.color_hex_row);

                    var colorKey = getDom('span', this.color_hex_key);

                    colorKey.textContent = this.rgbPanelRow[i] + ':';

                    var colorValue = getDom('input', this.color_hex_value);

                    colorValue.className += ' '  + this.rgbPanelRow[i] + 'hex';

                    self.panelRowKeyStack.push(colorValue);

                    colorValue.type = 'text';

                    add(colorRow, [colorKey, colorValue]);

                    colorPanel.appendChild(colorRow);

                }
                
                //差值
                // var rhex = document.getElementsByClassName('rhex')[0];
                self.panelRowKeyStack[0].value = this.r;
                self.panelRowKeyStack[1].value = this.g;
                self.panelRowKeyStack[2].value = this.b;
                self.panelRowKeyStack[3].value = 1;
                self.panelRowKeyStack[4].value = '#' + initHex(this.r) + 
                    initHex(this.g) +
                    initHex(this.b);

            }

            //边界限定

            var w = document.documentElement.clientWidth;
            var h = document.documentElement.clientHeight;

            colorWrapper.style.left = (self.left - 1) + 'px';
            colorWrapper.style.top = self.top + 'px';

            // if (h - parseInt(colorWrapper.style.top) > parseInt(colorWrapper.offsetWidth)) {
            //         console.log(h);
            // }

            add(colorWrapper, [colorTitle, colorMaskParent, colorbar, colorPanel]);

            return colorWrapper;

        },

        initColorPicker: function (params) {

            var self = this;

            if (this.type === 'input') {

                this.dom.onfocus = function () {

                    document.body.appendChild(self.colorPickerUI);

                }

            } else {

                this.dom.onclick = function () {

                    self.count++;

                    if (self.count % 2 !== 0) {

                        document.body.appendChild(self.colorPickerUI);

                    }

                };

            }

            this.closed.onclick = function () {

                document.body.removeChild(self.colorPickerUI);

                self.wheel.style.left = - self.wheelSize + 'px';
                self.wheel.style.top = - self.wheelSize + 'px';

                self.left = parseInt(self.dom.offsetLeft);
                self.top = parseInt(self.dom.offsetTop) + params.targetHeight;

                self.colorPickerUI.style.left = self.left + 'px';
                self.colorPickerUI.style.top = self.top + 'px';

                self.r = 255;
                self.g = 255;
                self.b = 255;

                self.colorMap = {
                    r: 255,
                    g: 0,
                    b: 0,
                    a: 1
                };

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
                    } else
                        if (top > maxT) {
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

        wheelDragMove: function (clickTarget, moveTarget, rgbPanels) {

            var self = this;

            clickTarget.addEventListener('mousedown', onMouseDown, false);

            function onMouseDown(e) {

                var disX = e.pageX - self.left - 6 - self.wheelSize;

                var disY = e.pageY - self.top - 47 - self.wheelSize;

                moveTarget.style.left = disX + 'px';
                moveTarget.style.top = disY + 'px';

                if (rgbPanels) {
                    //rgbPanels如果显示了,计算rgb值 ...                    
                }

                changeRgb();
                
                function changeRgb () {

                    var r = self.colorMap.r,
                        g = self.colorMap.g,
                        b = self.colorMap.b;
                    
                    var hexL = parseInt(self.wheel.style.left) + self.wheelSize;
                    var hexT = parseInt(self.wheel.style.top) + self.wheelSize;

                    // console.log(self.panelRowKeyStack);
                    if (hexL === 256) hexL = self.r;
                    if (hexT === 256) hexT = self.r;

                    r = Math.abs(self.r - hexT);

                    var rhex = self.panelRowKeyStack[0];
                    var ghex = self.panelRowKeyStack[1];
                    var bhex = self.panelRowKeyStack[2];
                    
                    rhex.value = r;

                    console.log(r);

                }

                document.addEventListener('mousemove', onMouseMove, false);
                document.addEventListener('mouseup', onMouseUp, false);

                function onMouseMove(e) {

                    disX = e.pageX - self.left - 6 - self.wheelSize;

                    disY = e.pageY - self.top - 47 - self.wheelSize;

                    if (disX < - self.wheelSize) {

                        disX = - self.wheelSize

                    } else if (disX > self.COLOR_BOARD_SIZE - self.wheelSize) {

                        disX = self.COLOR_BOARD_SIZE - self.wheelSize

                    }

                    if (disY < - self.wheelSize) {

                        disY = - self.wheelSize

                    } else if (disY > self.COLOR_BOARD_SIZE - self.wheelSize) {

                        disY = self.COLOR_BOARD_SIZE - self.wheelSize

                    }

                    changeRgb();

                    moveTarget.style.left = disX + 'px';

                    moveTarget.style.top = disY + 'px';

                    if (rgbPanels) {
                        //rgbPanels如果显示了,计算rgb值 ...                    
                    }

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

                var top = self.bar.offsetTop;

                var t = self.top + top;

                var scope = self.COLOR_BOARD_SIZE / 6 | 0; //分区                

                //计算rgb
                // var disX = 0, disY = 0;

                var disX = self.wheel.offsetLeft + self.wheelSize;
                var disY = self.wheel.offsetTop + self.wheelSize;

                var y = e.pageY - t - self.selectSize;

                self.toRgbColor(disX, disY, y, scope);                                

                if (rgbPanels) {
                    //...
                }

                moveTarget.style.top = y + 'px';

                document.addEventListener('mousemove', onMouseMove, false);
                document.addEventListener('mouseup', onMouseUp, false);

                function onMouseMove(e) {

                    disX = self.wheel.offsetLeft + self.wheelSize;
                    disY = self.wheel.offsetTop + self.wheelSize;

                    y = e.pageY - t - self.selectSize;

                    if (y < - self.selectSize) {
                        y = - self.selectSize;
                    } else if (y > self.COLOR_BOARD_SIZE - self.selectSize) {
                        y = self.COLOR_BOARD_SIZE - self.selectSize;
                    }

                    self.toRgbColor(disX, disY, y, scope);                    

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

            var minR, maxR, rgb = '';

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

            self.mask.style.background = 'rgb(' + rgb + ')';

            console.log(self.r, self.g, self.b);

            // bar 改变,this.dom 不变,受wheel选择控制
            // self.colorMap update;

            // self.dom.value = '#' + initHex(self.r) +
            //     initHex(self.g) +
            //     initHex(self.b);

        }

    };


    window.ColorPicker = ColorPicker;

})();
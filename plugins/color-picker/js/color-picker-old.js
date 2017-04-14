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
    var ColorPicker = function (container, options) {

        this.type = 'color-root';

        var defaults = {
            wrapperWidth: 492,
            wrapperHeight: 300,
            targetHeight: 26,
            dragMoveWrapper: false
        };
        //color picker　容器
        this.color_wrapper = 'color-wrapper';
        //色板
        this.color_mask_parant = 'color-mask-parent';
        this.color_board = 'color-board';
        this.color_mask = 'color-mask';
        this.color_wheel = 'color-wheel';
        //进度条
        this.color_bar = 'color-bar';
        this.color_selected = 'color-bar-selected';
        //title
        this.color_title = 'color-title';
        //关闭按钮
        this.color_closed = 'color-closed';
        // color-box
        //var color_box = 'color-box';
        //hex-panel
        this.color_hex_panel = 'color-hex-panel';
        this.color_hex_bg = 'color-hex-bg';
        //rgba
        this.rgba = 'RGBA';
        // rgba row
        this.color_hex_row = 'color-hex-row';
        //hex type  
        this.color_hex_key = 'color-hex-key';
        this.color_string_hex = 'strhex';
        this.color_hex_type = 'color-hex-type';
        //hex value
        this.color_hex_value = 'color-hex-value';

        //this.dom 调用插件的dom元素 inpit | div
        var targets = document.getElementsByClassName(container);

        for (var i = 0; i < targets.length; i++) {

            if (targets[i].getAttribute(this.type)) {

                this.dom = targets[i];

            } else {

                console.log('dom is not found!');

            }

        }

        this.COLOR_BOARD_SIZE = 256;

        this.R = 255;
        this.G = 0;
        this.B = 0;

        this.rgbMap = {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        }; //起点色值;

        var params = colorExtends(defaults, options);

        this.left = parseInt(this.dom.offsetLeft);
        this.top = parseInt(this.dom.offsetTop) + params.targetHeight;
        //指针宽度的一半
        this.pointerSize = 8;
        //构建ui
        this.colorPickerUI = this.buildColorPickerHtml(params);

        // 初始化方法
        this.initColorPicker(params);
    };


    //method
    ColorPicker.prototype = {

        constructor: ColorPicker,

        // build color picker ui
        buildColorPickerHtml: function (params) {

            var self = this;

            //外部容器
            var colorWrapper = buildDOM('div');
            colorWrapper.className = this.color_wrapper;

            //title
            var colorTitle = buildDOM('div');
            colorTitle.className = this.color_title;
            colorTitle.textContent = 'color picker';

            //关闭按钮
            var colorClosed = buildDOM('span');
            colorClosed.className = this.color_closed;

            colorClosed.onclick = function () {
                document.body.removeChild(colorWrapper);
                colorWheel.style.left = -self.pointerSize + 'px';
                colorWheel.style.top = -self.pointerSize + 'px';

                self.left = parseInt(self.dom.offsetLeft);
                self.top = parseInt(self.dom.offsetTop) + params.targetHeight;

                colorWrapper.style.left = self.left + 'px';
                colorWrapper.style.top = self.top + 'px';

                self.R = 255;
                self.G = 0;
                self.B = 0;

                self.rgbMap = {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 1
                };
            };


            colorTitle.appendChild(colorClosed);

            if (params.dragMoveWrapper) {
                wrapperDragMove();
            }

            function wrapperDragMove() {

                var disX = 0;
                var disY = 0;

                colorTitle.onmousedown = function (e) {

                    disX = e.pageX - self.left;
                    disY = e.pageY - self.top;

                    document.addEventListener('mousemove', onMouseMoveInWrapper, false);
                    document.addEventListener('mouseup', onMouseUpInWrapper, false);


                    function onMouseMoveInWrapper(e) {
                        var left = e.pageX - disX;
                        var top = e.pageY - disY;
                        var maxL = document.documentElement.clientWidth - colorWrapper.clientWidth - 2;
                        var maxT = document.documentElement.clientHeight - colorWrapper.clientHeight - 2;
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

                        colorWrapper.style.left = left + 'px';
                        colorWrapper.style.top = top + 'px';

                        return false;
                    }

                    function onMouseUpInWrapper() {
                        document.removeEventListener('mousemove', onMouseMoveInWrapper);
                        document.removeEventListener('mouseup', onMouseUpInWrapper);
                    }

                };

            }

            //色板遮罩层父级盒子
            var colorMaskParent = buildDOM('div');
            colorMaskParent.className = this.color_mask_parant;


            //透明层
            var colorBoard = buildDOM('div');
            colorBoard.className = this.color_board;

            //色彩层
            var colorMask = buildDOM('div');
            colorMask.className = this.color_mask;
            //default bgcolor #ff0000 rgba(255, 0, 0, 1);
            colorMask.style.background = 'rgb(255, 0, 0)';

            //鼠标滚动层
            var colorWheel = buildDOM('div');
            colorWheel.className = this.color_wheel;

            colorWheel.style.left = - this.pointerSize + 'px';
            colorWheel.style.top = - this.pointerSize + 'px';

            // var w = parseInt(colorWheel.style.offsetWidth);

            var colorbar = buildDOM('div');
            colorbar.className = this.color_bar;

            var colorSelectPointer = buildDOM('div');
            colorSelectPointer.className = this.color_selected;

            colorbar.appendChild(colorSelectPointer);

            colorbar.onmousedown = function (e) {

                var colorbarTop = self.top + colorbar.offsetTop;

                var disX = colorWheel.offsetLeft + self.pointerSize;
                var disY = colorWheel.offsetTop + self.pointerSize;

                var y = e.pageY - colorbarTop - 4;

                //更新指针为止，更新色板颜色，更新rgba                

                var rHex = document.getElementsByClassName(self.rgba[0].toLowerCase() + 'hex')[0];
                var gHex = document.getElementsByClassName(self.rgba[1].toLowerCase() + 'hex')[0];
                var bHex = document.getElementsByClassName(self.rgba[2].toLowerCase() + 'hex')[0];
                var hexHex = document.getElementsByClassName(self.color_string_hex)[0];

                colorSelectPointer.style.top = y + 'px';

                var scope = 256 / 6 | 0; //分区            

                /**
                 * [0-6]    this.B++ rgb[255, 0, 0~255];
                 * [6-12]   this.R-- rgb[255~0, 0, 255];
                 * [12-18]  this.G++ rgb[0, 0~255, 255];
                 * [18-24]  this.B-- rgb[0, 255~0, 255];
                 * [24-36]  this.R++ rgb[0~255, 0, 255];
                 * [36-0]   this.G--, this.B-- rgb[255, 255~0, 255~0];
                 * */

                var bgRgb = self.R + ',' + self.G + ',' + self.B;

                getRgb(y, disX, disY, scope);

                document.addEventListener('mousemove', onMouseMoveSelect, false);
                document.addEventListener('mouseup', onMouseUpSelect, false);

                function onMouseMoveSelect(e) {

                    disX = colorWheel.offsetLeft + self.pointerSize;
                    disY = colorWheel.offsetTop + self.pointerSize;

                    y = e.pageY - self.top - colorbar.offsetTop - 4;

                    if (y < -3) {
                        y = -3;
                    } else if (y > (self.COLOR_BOARD_SIZE - 3)) {
                        y = self.COLOR_BOARD_SIZE - 3;
                    }


                    colorSelectPointer.style.top = y + 'px';

                    getRgb(y, disX, disY, scope);

                }

                function getRgb(y, x, t, scope) {

                    //当选择颜色后

                    var minR, maxR;



                    if (y <= -3) {
                        self.R = 255;
                        self.G = 0;
                        self.B = 0;

                    } else if (y > -3 && y <= scope) {
                        //[0-6]    this.B++ rgb[255, 0, 0~255];
                        self.R = 255;
                        self.G = 0;
                        self.B = Math.abs(y * 6) + 3;

                    } else if (y > scope && y <= 2 * scope) {
                        //[6-12]   this.R-- rgb[255~0, 0, 255];
                        self.R = 255 - ((y - scope) * 6 + 3);
                        self.G = 0;
                        self.B = 255;

                    } else if (y > 2 * scope && y <= 3 * scope) {
                        //[12-18]  this.G++ rgb[0, 0~255, 255];
                        self.R = 0;
                        self.G = Math.abs((y - scope * 2) * 6 + 3);
                        self.B = 255;

                    } else if (y > 3 * scope && y <= 4 * scope) {
                        //[18-24]  this.B-- rgb[0, 255~0, 255];
                        self.R = 0;
                        self.G = 255;
                        self.B = 255 - ((y - 3 * scope) * 6 + 3);

                    } else if (y > 4 * scope && y <= 5 * scope) {
                        //[24-36]  this.R++ rgb[0~255, 0, 255];
                        self.R = Math.abs((y - 4 * scope) * 6) + 3;

                        if (self.R <= x) self.R = x;

                        self.G = 255;
                        self.B = 0;

                    } else if (y > 5 * scope && y <= 6 * scope) {
                        //[36-0]   this.G--, this.B-- rgb[255, 255~0, 255~0];
                        self.R = 255;
                        self.G = 255 - ((y - 5 * scope) * 6 + 3);
                        self.B = 0;

                    } else if (y >= 6 * scope) {
                        self.R = 255;
                        self.G = 0;
                        self.B = 0;
                    }

                    bgRgb = self.R + ',' + self.G + ',' + self.B;

                    colorMask.style.background = 'rgb(' + bgRgb + ')';
                    colorBg.style.background = 'rgb(' + bgRgb + ')';

                    console.log(x, t);

                    // rHex.value = Math.abs(self.R - x);
                    // gHex.value = Math.abs(self.G - x);
                    // bHex.value = Math.abs(self.B - x);
                    rHex.value = self.R;
                    gHex.value = self.G;
                    bHex.value = self.B;

                    var colorStr = '#' + toRgbHex(self.R.toString(16)) +
                        toRgbHex(self.G.toString(16)) +
                        toRgbHex(self.B.toString(16));

                    hexHex.value = colorStr;

                    if (self.dom.getAttribute(self.type) === 'input') {
                        self.dom.value = colorStr;
                    } else {
                        self.dom.style.background = colorStr;
                    }

                }

                function onMouseUpSelect() {
                    document.removeEventListener('mousemove', onMouseMoveSelect);
                    document.removeEventListener('mouseup', onMouseUpSelect);
                }

            };



            var colorPanel = buildDOM('div');
            colorPanel.className = this.color_hex_panel;

            var colorBg = buildDOM('div');
            colorBg.className = this.color_hex_bg;
            colorBg.style.background = 'rgb(255,255,255)';

            colorPanel.appendChild(colorBg);

            for (var i = 0; i < this.rgba.length; i++) {

                var colorRgbRow = buildDOM('div');
                colorRgbRow.className = this.color_hex_row;

                var colorRgbKey = buildDOM('span');
                colorRgbKey.className = this.color_hex_key;
                colorRgbKey.textContent = this.rgba[i].toUpperCase() + ':';

                var colorRgbValue = buildDOM('input');
                colorRgbValue.className = this.color_hex_value + ' ' + this.rgba[i].toLowerCase() + 'hex';
                colorRgbValue.type = 'text';
                console.log(this.rgbMap);
                colorRgbValue.value = this.rgbMap[this.rgba[i].toLowerCase()];

                colorRgbRow.appendChild(colorRgbKey);
                colorRgbRow.appendChild(colorRgbValue);

                colorPanel.appendChild(colorRgbRow);

            }

            // 16进制

            var colorRgbRow = buildDOM('div');
            colorRgbRow.className = this.color_hex_row;
            var colorRgbKey = buildDOM('span');
            colorRgbKey.className = this.color_hex_key;
            colorRgbKey.textContent = 'val:';
            var colorRgbValue = buildDOM('input');
            colorRgbValue.className = this.color_hex_value + ' ' + this.color_string_hex;
            colorRgbValue.type = 'text';

            var hexValue = toRgbHex(this.rgbMap.r.toString(16)) +
                toRgbHex(this.rgbMap.g.toString(16)) +
                toRgbHex(this.rgbMap.b.toString(16));
            colorRgbValue.value = '#' + hexValue;
            colorRgbRow.appendChild(colorRgbKey);
            colorRgbRow.appendChild(colorRgbValue);
            colorPanel.appendChild(colorRgbRow);
            //默认起点 [255, 0, 0]


            // var map = [-8, -8]; //起点
            // var mapColor = [255, 0, 0];

            colorBoard.onmousedown = wheelDragMove;
            colorWheel.onmousedown = wheelDragMove;

            function wheelDragMove(e) {

                var disX = e.pageX - self.left - 6 - self.pointerSize; //滚轮至色板左边的距离
                var disY = e.pageY - self.top - 47 - self.pointerSize;

                colorWheel.style.left = disX + 'px';
                colorWheel.style.top = disY + 'px';

                // var map = self.rgbMap;

                var r = self.rgbMap.r,
                    g = self.rgbMap.g,
                    b = self.rgbMap.b;

                //如果disx <= -8;起点, r = 0;
                //如果disx >= 256;终点

                var hexL = parseInt(colorWheel.style.left) + self.pointerSize;
                var hexT = parseInt(colorWheel.style.top) + self.pointerSize;

                if (hexL === 256) hexL = self.R;
                if (hexT === 256) hexT = self.R;

                r = Math.abs(self.R - hexT);
                if (hexL > hexT) {
                    g = Math.abs(self.R - hexL);
                    b = Math.abs(self.R - hexL);
                } else {
                    g = Math.abs(self.R - hexT);
                    b = Math.abs(self.R - hexT);
                }

                var rgb = r + ',' + g + ',' + b;

                colorBg.style.background = 'rgb(' + rgb + ')';

                var rHex = document.getElementsByClassName(self.rgba[0].toLowerCase() + 'hex')[0];
                var gHex = document.getElementsByClassName(self.rgba[1].toLowerCase() + 'hex')[0];
                var bHex = document.getElementsByClassName(self.rgba[2].toLowerCase() + 'hex')[0];

                rHex.value = r;
                gHex.value = g;
                bHex.value = b;


                document.onmousemove = function (e) {

                    disX = e.pageX - self.left - 6 - self.pointerSize;
                    disY = e.pageY - self.top - 47 - self.pointerSize;

                    console.log(disX, disY);

                    if (disX < -self.pointerSize) {
                        disX = -self.pointerSize;
                    } else if (disX > self.COLOR_BOARD_SIZE - self.pointerSize) {
                        disX = self.COLOR_BOARD_SIZE - self.pointerSize;
                    }

                    if (disY < -self.pointerSize) {
                        disY = -self.pointerSize;
                    } else if (disY > self.COLOR_BOARD_SIZE - self.pointerSize) {
                        disY = self.COLOR_BOARD_SIZE - self.pointerSize;
                    }

                    colorWheel.style.left = disX + 'px';
                    colorWheel.style.top = disY + 'px';

                    hexL = parseInt(colorWheel.style.left) + self.pointerSize;
                    hexT = parseInt(colorWheel.style.top) + self.pointerSize;

                    if (hexL === 256) hexL = self.R;
                    if (hexT === 256) hexT = self.R;

                    r = Math.abs(self.R - hexT);

                    if (hexL > hexT) {
                        g = Math.abs(self.R - hexL);
                        b = Math.abs(self.R - hexL);
                    } else {
                        g = Math.abs(self.R - hexT);
                        b = Math.abs(self.R - hexT);
                    }


                    rgb = r + ',' + g + ',' + b;

                    colorBg.style.background = 'rgb(' + rgb + ')';

                    rHex.value = r;
                    gHex.value = g;
                    bHex.value = b;

                    var hexHex = document.getElementsByClassName(self.color_string_hex)[0];

                    var colorStr = '#' + toRgbHex(r.toString(16)) +
                        toRgbHex(g.toString(16)) +
                        toRgbHex(b.toString(16));

                    hexHex.value = colorStr;

                    return false;

                };

                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            }

            colorMaskParent.appendChild(colorBoard);
            colorMaskParent.appendChild(colorMask);
            colorMaskParent.appendChild(colorWheel);

            colorWrapper.appendChild(colorTitle);
            colorWrapper.appendChild(colorMaskParent);
            colorWrapper.appendChild(colorbar);
            colorWrapper.appendChild(colorPanel);

            // colorWrapper.style.width = params.wrapperWidth + 'px';
            colorWrapper.style.left = this.left + 'px';
            colorWrapper.style.top = this.top + 'px';

            return colorWrapper;

        },

        initColorPicker: function (options) {

            //show color picker ui;
                var self = this;

                this.dom.onfocus = function () {

                    document.body.appendChild(self.colorPickerUI);

                };
        }

    };


    function toRgbHex(color) {

        if (color.length < 2) {
            return '0' + color.toString(16);
        }

        return color.toString(16);
    }


    // 辅助函数
    function colorExtends(target, defaults) {

        for (var prop in target) {

            if (defaults.hasOwnProperty(prop)) {

                target[prop] = defaults[prop];

            }

        }

        return target;

    }

    function buildDOM(dom) {

        return document.createElement(dom);

    }

    function toDouble(num) {

        return (parseInt(num) > 9) ? num : '0' + num;

    }


















    window.ColorPicker = ColorPicker;

})();
(function () {

    var ColorPicker = function (target, options) {

        // var root = 'color-root';
        this.dom = document.getElementById(target);
        // this.type = this.dom.getAttribute(root);

        var defaults = {
            h:  26, //目标高度
            dragMove: false, //是否可拖拽
            showRgbProps: true //是否显示属性面板
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

        this.rgba = 'rgbah';
        this.rgbaDomStack = [];

        this.size = 256;
        this.wheelSize = 8;
        this.selectSize = 3;

        var params = colorExtend(defaults, options);

        this.left = this.dom.offsetLeft;
        this.top = this.dom.offsetTop + params.h;

        this.ui = this.buildColorPicker(params);
        this.initColorPicker(params);
    };

    ColorPicker.prototype = {

        constructor: ColorPicker,

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
            
            colorWrapper.style.left = (self.left - 1) + 'px';
            colorWrapper.style.top = self.top + 'px';

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
                selector: colorSelector
            };
        },
        initColorPicker: function (params) {

            var self = this;

            // self.removeEvent([self.ui.title, self.ui.wheel, self.ui.board], 'mousedown', self.dragMove.bind(self));

            self.dom.onfocus = function () {
                document.body.appendChild(self.ui.wrapper);

                if (params.dragMove) {

                    // self.dragMove();
                    // self.addEvent([self.ui.title], 'mousedown', self.dragMove.bind(self));
                    self.wrapperDragMove(self.ui.title, self.ui.wrapper);
                }
                self.wheelDragMove(self.ui.board, self.ui.wheel, params.showRgbProps);
                // self.addEvent([self.ui.wheel, self.ui.board], 'mousedown', self.dragMove.bind(self));
            };



            self.ui.closed.onclick = function () {
                self.dom.blur();
                document.body.removeChild(self.ui.wrapper);
                self.left = self.dom.offsetLeft;
                self.top = self.dom.offsetTop + params.h;

                self.ui.wrapper.style.left = self.left + 'px';
                self.ui.wrapper.style.top = self.top + 'px';
            };

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

        wheelDragMove: function (clickTarget, moveTarget, showRgbProps) {

            var self = this;

            clickTarget.addEventListener('mousedown', onMouseDown, false);

            moveTarget.addEventListener('mousedown', onMouseDown, false);

            function onMouseDown(e) {

                var disX = e.pageX - self.left - 6 - self.wheelSize;

                var disY = e.pageY - self.top - 47 - self.wheelSize;

                console.log(disX);

                moveTarget.style.left = disX + 'px';
                moveTarget.style.top = disY + 'px';
                
                var hsl2Rgb = self.HSLtoRGB(0, disX/100, disY/100, 1);
                console.log(hsl2Rgb);
                // self.range.hsl.s = disX;
                // self.range.hsl.l = disY;

                if (showRgbProps) {
                    //rgbPanels如果显示了,计算rgb值 ...                    
                }

                changeRgb();

                function changeRgb() {

                    // var r = self.colorMap.r,
                    //     g = self.colorMap.g,
                    //     b = self.colorMap.b;
                    var r = self.r,
                        g = self.g,
                        b = self.b;
                

                    var hexL = parseInt(self.ui.wheel.style.left) + self.wheelSize;
                    var hexT = parseInt(self.ui.wheel.style.top) + self.wheelSize;

                    if (hexL === 256) hexL = self.r;
                    if (hexT === 256) hexT = self.r;
                    //l明度，s饱和度,h色相
                    // var h = 1/256, s = 360/256, l = 1/256;


                    r = 255 - disY;

                    g = b = 255 - 1/256*disX*360/2 + 8 | 0;

                    document.body.style.background = 'rgb('+ r + ',' + g +','+ b+ ')';

                    // self.range.hsl.h = self.hue;
                    // self.range.hsl.s = disX;
                    // self.range.hsl.l = disY;

                    // r = disX * self.range.hsl.h / 255;

                    // console.log(self.range.hsl);

                    if (showRgbProps) {

                        var rhex = self.rgbaDomStack[0];
                        var ghex = self.rgbaDomStack[1];
                        var bhex = self.rgbaDomStack[2];

                        rhex.value = self.colorMap.r;

                        ghex.value = self.colorMap.g;

                        bhex.value = self.colorMap.b;

                        var bg = self.colorMap.r + ',' + self.colorMap.g + ',' + self.colorMap.b;

                        // console.log(bg);

                        self.ui.bg.style.background = 'rgb(' + bg + ')';

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

                    changeRgb();

                    moveTarget.style.left = disX + 'px';

                    moveTarget.style.top = disY + 'px';

                }

                function onMouseUp() {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

            }

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
	
		HSLtoRGB: function (h, s, l, a)
		{

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

			var r = Math.round(this.HueToRGB(p, q, tr) * 255);
			var g = Math.round(this.HueToRGB(p, q, tg) * 255);
			var b = Math.round(this.HueToRGB(p, q, tb) * 255);
			return [r, g, b, a||1];
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

    function to2 (n) {
        return (parseInt(n) > 9) ? n : '0' + n;
    }

    function hex2 (hex) {
        return (hex.length < 2 ? '0' : '') + hex.toString(16);
    }

    function torgb (r, g, b) {
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
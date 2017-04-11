/**
 * @libary {color-picker}
 * 
 * autor: misliu
 * 
 * time: 2017-04-10
*/
(function () {
    var ColorPicker = function (container, options) {

        var type = 'color-root';

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
        //title
        this.color_title = 'color-title';
        //关闭按钮
        this.color_closed = 'color-closed';
        // color-box
        //var color_box = 'color-box';
        //hex-panel
        this.color_hex_panel = 'color-hex-panel';
        //rgba
        this.rgba = 'RGBA';
        // rgba row
        this.color_hex_row = 'color-hex-row';
        //hex type  
        this.color_hex_type = 'color-hex-type';
        //hex value
        this.color_hex_value = 'color-hex-value';

        //this.dom 调用插件的dom元素 inpit | div
        var targets = document.getElementsByClassName(container);

        for (var i = 0; i < targets.length; i++) {

            if (targets[i].getAttribute(type)) {

                this.dom = targets[i];

            } else {

                console.log('dom is not found!');

            }

        }

        this.COLOR_BOARD_SIZE = 256;

        var params = colorExtends(defaults, options);

        this.left = parseInt(this.dom.offsetLeft); 
        this.top = parseInt(this.dom.offsetTop) + params.targetHeight;
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

            //外部容器
            var colorWrapper = buildDOM('div');
            colorWrapper.className = this.color_wrapper;

            //title
            var colorTitle = buildDOM('div');
            colorTitle.className = this.color_title;

            //关闭按钮
            var colorClosed = buildDOM('span');
            colorClosed.className = this.color_closed;

            colorClosed.onclick = function () {
                document.body.removeChild(colorWrapper);
            };


            colorTitle.appendChild(colorClosed);
            this.dragMove(colorTitle, colorWrapper, 492, 0, 0);


            //色板遮召层父级盒子
            var colorMaskParent = buildDOM('div');
            colorMaskParent.className = this.color_mask_parant;


            //透明层
            var colorBoard = buildDOM('div');
            colorBoard.className = this.color_board;

            //色彩层
            var colorMask = buildDOM('div');
            colorMask.className = this.color_mask;
            //鼠标滚动层
            var colorWheel = buildDOM('div');
            colorWheel.className = this.color_wheel;

            colorWheel.style.left = 0;
            colorWheel.style.top = 0;

            var w = parseInt(colorWheel.style.offsetWidth);
            this.dragMove(colorWheel, colorWheel, this.COLOR_BOARD_SIZE, 5, 45);



            colorMaskParent.appendChild(colorBoard);
            colorMaskParent.appendChild(colorMask);
            colorMaskParent.appendChild(colorWheel);

            colorWrapper.appendChild(colorTitle);
            colorWrapper.appendChild(colorMaskParent);

            colorWrapper.style.width = params.wrapperWidth + 'px';
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
        },



        dragMove: function (dragTarget, moveTarget, scope, x, y) {
            // dragTarget: 触发事件目标
            // moveTarget: 移动目标
            // scope: 拖拽边界

            var disx = 0,
                disy = 0;
                
            var self = this;
            
            dragTarget.addEventListener('mousedown', onMouseDown, false);

            function onMouseDown(e) {
                disx = e.pageX - self.left + x;
                disy = e.pageY - self.top + y;

                document.addEventListener('mousemove', onMouseMove, false);
                document.addEventListener('mouseup', onMouseUp, false);

            }

            function onMouseMove(e) {

                var left = e.pageX - disx - self.left + x;
                var top = e.pageY - disy - self.top + y;

                var maxL = scope - disx + self.pointerSize/2 + x;
                var maxT = scope - disy + self.pointerSize/2  + y;
                console.log(disy);
                if (left < - self.pointerSize) {
                    left = - self.pointerSize;
                } else if (left > maxL) {
                   left = maxL; 
                }
                if (top < - self.pointerSize) {
                    top = - self.pointerSize;
                } else if (top > maxT) {
                    top = maxT;
                }

                moveTarget.style.left = left + 'px';
                moveTarget.style.top = top + 'px';

                return false;

            }

            function onMouseUp() {

                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);

            }

        }

    };



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

        // this.dom = document.createElement(dom);
    }

    // BuildDOM.prototype = {

    //     setV  

    // };

    function toDouble(num) {

        return (parseInt(num) > 9) ? num : '0' + num;

    }


















    window.ColorPicker = ColorPicker;

})();
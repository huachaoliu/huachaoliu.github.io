(function () {

    var ColorPicker = function (container, options) {

        var type = 'color-root';

        var colorPickers = {

            // container: container || 'color-picker',       
            dragMove: false    

        };

        var params = colorExtends(colorPickers, options);

        var colorPicker = document.getElementsByClassName(container);

        for (var i = 0; i < colorPicker.length; i++) {

            if (colorPicker[i].getAttribute(type)) {

                this.dom = colorPicker[i];

            } else {

                console.log('dom is not found!');

            }

        }


        this.init(params);

    };

    ColorPicker.prototype = {

        constructor: ColorPicker,

        init: function (options) {

            //render ui
            this.renderColorPickerUI();

            if (options.dragMove) {

                var self = this;

                setTimeout(function() {
                    
                    self.dragMove();

                }, 20);

            }

        },

        dragMove: function () {

           var moveTarget = document.getElementsByClassName('color-title')[0];

           var wrapper = document.getElementsByClassName('color-wrapper')[0];

           wrapper.style.position = 'absolute';

           moveTarget.onmousedown = function (e) {

               console.log(e.pageX);

           }

        },

        renderColorPickerUI: function () {

            var colorWrapper = document.createElement('div');

            colorWrapper.className = 'color-wrapper';

            document.body.appendChild(colorWrapper);

            var title = document.createElement('div');

            title.className = 'color-title';

            colorWrapper.appendChild(title);

            var colorBox = document.createElement('div');

            colorBox.className = 'color-box';

            // color

            var colorStack = [], r = [], g = [], b = [];

            for (var i = 0; i < 256; i++) {

                r.push(i);
                g.push(i);
                b.push(i);

            }

            for (var i = 0; i < 256; i++) {

                var randR = Math.random() * 256 | 0;
                var randG = Math.random() * 256 | 0;
                var randB = Math.random() * 256 | 0;

                colorStack.push(r[randR] + "," + g[randG] + "," + b[randB]);

            }

            colorBox.style.width = '256px';
            colorBox.style.height = '256px';
            colorBox.style.border = '1px solid #000';

            //rgba 

            var hexPannel = document.createElement('div');
            hexPannel.className = 'hex-pannel';

            var rgba = 'RGBA';

            var rgbValus = [];

            for (var i = 0; i < 4; i++) {

                var rgbaRow = document.createElement('div');

                rgbaRow.className = 'hex-row';

                var rgbaName = document.createElement('span');

                rgbaName.textContent = rgba[i] + ':';

                var rgbaValue = document.createElement('input');

                rgbaValue.className = rgba[i].toLowerCase() + 'hex';

                rgbaValue.type = 'text';

                rgbaValue.disabled = true;

                rgbaValue.value = 0;

                if (rgba[i] !== 'A') {
                    rgbValus.push(rgbaValue);                    
                }

                rgbaRow.appendChild(rgbaName);
                rgbaRow.appendChild(rgbaValue);

                hexPannel.appendChild(rgbaRow);

            }

            colorWrapper.appendChild(colorBox);
            
            for (var i = 0; i < 256; i++) {
                //填充小方块
                var rgbBox = document.createElement('div');
                rgbBox.className = 'color-rgb';
                rgbBox.style.width = '16px';
                rgbBox.style.height = '16px';
                rgbBox.style.backgroundColor = 'rgb(' + colorStack[i] + ')';
                rgbBox.setAttribute('color-data', colorStack[i]);
                rgbBox.style.cursor = 'pointer';


                var self = this;
                rgbBox.onclick = function (e) {

                    var colorData = this.getAttribute('color-data');

                    var colors = colorData.split(',');

                    var r = (toDouble(+colors[0])).toString(16),
                        g = (toDouble(+colors[1])).toString(16),
                        b = (toDouble(+colors[2])).toString(16);

                    rgbValus[0].value = colors[0];

                    rgbValus[1].value = colors[1];

                    rgbValus[2].value = colors[2];
                    
                    r = r.length > 1 ? r : '0' + r;
                    g = g.length > 1 ? g : '0' + g;
                    b = b.length > 1 ? b : '0' + b;

                    self.dom.value = '#' + r + g + b;

                    document.body.style.backgroundColor = '#' + r + g + b;

                    // dom.style.display = 'none';

                };

                colorBox.appendChild(rgbBox);

            }

            colorWrapper.appendChild(hexPannel);

        }

    };

    function colorExtends(target, defaults) {

        for (var prop in target) {

            if (defaults.hasOwnProperty(prop)) {

                target[prop] = defaults[prop];

            }

        }

        return target;

    }

    function toDouble(num) {

        return (parseInt(num) > 9) ? num : '0' + num;

    }

    window.ColorPicker = ColorPicker;

})();
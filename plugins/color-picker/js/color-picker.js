(function () {

    var ColorPicker = function (container, options) {

        var type = 'color-root';

        var colorPickers = {

            // container: container || 'color-picker',           

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


        this.init(container, params);

    };

    ColorPicker.prototype = {

        constructor: ColorPicker,

        init: function (options) {

            //render ui
            this.renderColorPickerUI();


        },

        renderColorPickerUI: function () {

            var colorWrapper = document.createElement('div');

            colorWrapper.className = 'color-wrapper';

            document.body.appendChild(colorWrapper);

            var colorBox = document.createElement('div');

            colorBox.className = 'color-box';

            

            colorWrapper.appendChild(colorBox);

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
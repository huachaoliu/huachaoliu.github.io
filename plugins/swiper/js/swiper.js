(function () {
    'use strict';
    var UI = {};

    UI.Element = function (dom) {
        this.dom = dom;
    };

    UI.prototype = {

        add: function () {

            for (var i = 0; i < arguments.length; i++) {

                var arg = arguments[i];

                if (arg instanceof UI.Element) {

                    this.dom.appendChild(arg.dom);

                } else {

                    console.log( arg + 'is not instanceof of UI.Element')

                }

            }

            return this;

        },

        remove: function () {

            for (var i = 0; i < arguments.length; i++) {

                var arg = arguments[i];

                if (arg instanceof UI.Element) {

                    this.dom.removeChild(arg.dom);

                } else {

                    console.log( arg + 'is not instanceof of UI.Element')

                }

            }

            return this; 

        },

        getId: function () {

            return this.dom.id;

        },

        getClass: function () {
            
            return this.dom.className;

        },

        setId: function (id) {

            this.dom.id = id;

            return this;

        },

        setClass: function (className) {

            this.dom.className = className;

            return this;

        },

        addClass: function (name) {

            this.dom.className += this.dom.className.length > 0 ? ' ' + name : name;

            return this;
        },

        removeClass: function (name) {

            var classList = this.dom.className.split(" ");

            for (var i = 0; i < classList.length; i++) {

                if (classList[i] === name) {

                    classList.splice(i, 1);
                
                }

            }
            this.dom.className = classList.join(" ");

            return this;
        },


    };

    UI.Div = function () {

        UI.Element.call(this);

        var dom = document.createElement('div');

        this.dom = dom;

        return this;

    };

    UI.Div.prototype = Object.create(UI.Element.prototype);
    UI.Div.prototype.constructor = UI.Div;

    UI.Text = function () {

        UI.Element.call(this);

        var dom = document.createElement('p');

        this.dom = dom;

        return this;

    };

    UI.Text.prototype = Object.create(UI.Element.prototype);
    UI.Text.prototype.constructor = UI.Text;

    UI.Text.prototype.setText = function (text) {

        this.dom.textContent = text;

        return this;

    };

    UI.Tag = function () {

        UI.Element.call(this);

        var dom = document.createElement('a');

        this.dom = dom;

        return this;

    };

    UI.Tag.prototype = Object.create(UI.Element.prototype);
    UI.Tag.prototype.constructor = UI.Tag;

    UI.Tag.prototype.constructor.setTarget = function (target) {

        this.dom.href = target;

        return this;

    };


    var Swiper = function (container, params) {
        /**
         * @param: {defaults} 配置参数
         *  width: 可配置宽
         *  height: 可配置高
         *  loop: 动画循环
         *  autoPlay: 自动播放
         *  prevBtn: 左箭头
         *  nextBtn: 右箭头
         *  pagination: 底部圆点控制器
        */
        var defaults = {
            width: '100vw',
            // height: '100vh',

            //图片宽高比
            SCALE: ((8 / 10 * 100) | 0) / 100,

            timer: null,
            index: 0,

            size: 3, //轮播图个数

            loop: false,
            autoPlay: false,
            autoPlayDelay: '1000',

            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,

            src: [],

            //文字覆盖
            mask: false,

            initMask: false,

            //className
            containerClass: 'swiper',
            slideClass: 'swiper-slide',
            slideItemClass: 'swiper-slide-item',
            slideActiveClasS: 'swiper-slide-active',
            slidePrevClass: 'swiper-slide-prev',
            slideNextClass: 'swiper-slide-next'

        };

        this.options = this.extend(defaults, params);

        this.init(container);

    };

    Swiper.prototype = {
        
        constructor: Swiper,

        extend: function (target, options) {

            for (var prop in target) {

                if (options.hasOwnProperty(prop)) {

                    target[prop] = options[prop];

                }

            }

            return target;

        },

        init: function (container) {


            var opts = this.options;

            var dom = document.getElementById(container);

            var swiperSlide = new UI.Div();

            swiperSlide.dom.className = opts.slideClass;

            console.log(opts);

            dom.appendChild(swiperSlide.dom);

        }

    };

    window.Swiper = Swiper;

})();
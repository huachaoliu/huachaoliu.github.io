(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery)
    }
})(function ($) {
    var FullPage = function (container, options) {
        var defaults = {
            height: $(window).height(),
            container: container,
            child: $('.page'),
            count: 1,
            index: 0,
            controll: false,
            flag: true
        };
        var opt = $.extend(defaults, options);
        this.init(opt);
    };
    FullPage.prototype = {
        init: function (opt) {
            var _this = this;
            opt.container.css({
                height: opt.height*opt.count
            });
            this.resize(opt);
            if (opt.count > 1) {
                this.wheelEvent(opt);
                if (opt.controll) {
                    this.pageControll(opt);                    
                }
            }
        },
        resize: function (opt) {
            $(window).resize(function () {
                var hh = $(this).height();
                opt.height = hh;
                opt.child.height(hh);
                opt.container.css({
                    height: hh*opt.count
                });
            });
        },
        wheelEvent: function (opt) {           
            var ua = window.navigator.userAgent;
            var chrome = ua.match(/Chrome/g);
            var frifox = ua.match(/Firefox/g);
            if (chrome != null) {
                this.mouseWheelChrome(opt);
            } else {
                this.domMouseScrollFrifox(opt);
            }
        },
        mouseWheelChrome: function (opt) {
            var _this_ = this;
            $(window).on('mousewheel', function (e) {
                var delta = e.originalEvent.deltaY;
                _this_.pageMove(opt, delta);
                var cicle = $('.cicle');
            });
        },
        domMouseScrollFrifox: function (opt) {
            var _this_ = this;
            $(window).on('DOMMouseScroll', function (e) {
                var delta = e.originalEvent.detail;
                _this_.pageMove(opt, delta);
            });
        },
        pageMove: function (opt, delta) {
            if (opt.flag) {
                if (delta > 0) {
                    if (Math.abs(opt.index) + 1 < opt.count) {
                        opt.index -= 1;
                        opt.flag = false;
                        this.changeFullPage(opt);
                        opt.controll && this.cicleMove(-(opt.index-1));
                    }
                } else {
                    if (opt.index < 0) {
                        opt.index += 1;
                        opt.flag = false;
                        this.changeFullPage(opt);
                        opt.controll && this.cicleMove(-(opt.index-1));
                    }
                }           
            }
        },
        changeFullPage: function (opt) {
            opt.container.stop().animate({
                top: opt.index*opt.height
            }, function () {
                opt.flag = true;
            });
        },
        pageControll: function (opt) {
            var _this = this;
            var cicle = $('.cicle');
            var active = $('.cicle.active');
            var controll = $('.page_controll');
            controll.css({
                height: cicle.length * 35,
                marginTop: -35*cicle.length/2,
            });
            active.css({
                zIndex: 10100
            });
            for (var i = 0; i < cicle.length; i++) {
                cicle.eq(i+1).css({
                    top: 25+i*35
                });
            }
            cicle.on('click', function () {
                var n = $(this).index();
                if (n !== 0) {
                    _this.cicleMove(n);
                    opt.index = -(n-1);
                    _this.changeFullPage(opt);
                }
            });
        },
        cicleMove: function (n) {
            var active = $('.cicle.active');            
            active.stop().animate({
                top: 25+(n-1)*35
            });
        }
    };
    $.fn.fullpage = function (options) {
        var _this = this;
        return new FullPage(_this, options);
    };
});
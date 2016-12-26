(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery)
    }
})(function ($) {
    var Swiper = function (options) {
        //plugins style
        var stype = ['slider', 'gradient'];
        var defaults = {
            n: 0,
            timer: null,
            speed: 3000,
            style: stype,
            swp: $('.swiper'),
            swpW: $(window).width(),            
            swpList: $('.swiper-list'),
            swpNode: $('.swiper-list-node'),
            arrow: $('.swiper-btn'),
            prev: $('.swiper-btn-prev'),
            next: $('.swiper-btn-next'),
            btn: $('.swiper-index-child'),
            nodeW: $(window).width(),
            height: $(window).height(),
            len: 3
        };
        var opt = $.extend(defaults, options);
        this.init(opt);
    }
    Swiper.prototype = {
        init: function (opt) {
            var ua = this.useAgent();
            this.layout(opt);
            switch(ua) {
                case 'ios':
                    this.mobileStart(opt);
                    break;
                case 'android':
                     this.mobileStart(opt);
                    break;
                case 'pc':
                     this.PcStart(opt);
                    break;
                default:                   
                    break;
            }
        },
        useAgent: function () {
            var ua = window.navigator.userAgent;
            var ipad = ua.match(/iPad/g);
            var iphone = ua.match(/iPhone/g);
            var ipod = ua.match(/iPod/g);            
            var android = ua.match(/Android/g);            
            if (ipad != null || iphone != null || ipod != null) {
                return 'ios';
            } else if (android != null) {
                return 'android';
            } else {
                return 'pc';
            }
        },
        layout: function (opt) {
            opt.swp.width(opt.swpW);
            opt.swp.height(opt.height);
            opt.swpNode.width(opt.nodeW);
            opt.arrow.css('lineHeight', opt.height+'px');
            opt.swpList.width(opt.nodeW * opt.len);
        },
        PcStart: function (opt) {
            var self = this;
            opt.btn.on('click', function () {
                var _this = $(this);
                var index = _this.index();
                if (_this.hasClass('swiper-active')) {
                    return false;
                } else {
                    opt.btn.removeClass('swiper-active');
                    _this.addClass('swiper-active');
                    var _left = parseInt(opt.swpNode.width()) * index;
                    opt.swpList.animate({
                        left: -_left
                    });
                }
            });
            opt.prev.on('click', function () {
                opt.n++;
                if (opt.n > opt.len - 1) opt.n = 0;
                self.move(opt);
            });

            opt.next.on('click', function () {
                opt.n--;
                if (opt.n < 0) opt.n = opt.len-1;
                self.move(opt);
            });

            function autoPlay () {
                opt.n++;
                if (opt.n > opt.len - 1) opt.n = 0;
                opt.btn.eq(opt.n).trigger('click');
            }
            opt.timer = setInterval(autoPlay, opt.speed);
            opt.swp.hover(function () {
                clearInterval(opt.timer);
            }, function () {
                opt.timer = setInterval(autoPlay, opt.speed);
            });
        },
        mobileStart: function (opt) {
            var self = this;
            opt.arrow.css('display', 'none');
            var startX;
            var touchX;
            opt.swp.on('touchstart', function (e) {
                clearInterval(opt.timer);
                e.preventDefault();
                startX = e.originalEvent.changedTouches[0].pageX;
                return false;
            });
            opt.swp.on('touchmove', function (e) {
                e.preventDefault();
                touchX = e.originalEvent.changedTouches[0].pageX;
            });
            opt.swp.on('touchend', function (e) {
                e.preventDefault();
                if (touchX - startX > 0) {
                     opt.n++;
                    if (opt.n > opt.len - 1) {
                        opt.n = 0;
                        self.move(opt);
                    } else {
                        return false;
                    }
                } else {
                    opt.n--;
                    if (opt.n < 0) {
                        opt.n = opt.len-1;
                        self.move(opt);
                    } else {
                        return false;
                    }
                }
                opt.timer = setInterval(autoPlay, opt.speed);
            });
            function autoPlay () {
                opt.n++
                if (opt.n > opt.len - 1) opt.n = 0;
                self.move(opt);
            }
            opt.timer = setInterval(autoPlay, opt.speed);
        },
        move: function (opt) {
            opt.btn.removeClass('swiper-active');
            opt.btn.eq(opt.n).addClass('swiper-active');
            opt.swpList.animate({
                left: -parseInt(opt.swpNode.width()) * opt.n
            });
        }
    }
    $.fn.swiper = function (options) {
        var _this = $(this);
        return new Swiper(options);
    };
});

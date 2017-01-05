/**
 * @param: 依赖page full.
 * */ 

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery)
    }
})(function ($) {
    var PageControll = function (container, options) {
        var defaults = {
            container: container,
            len: 2,
            position: 'left'
        };
        var opt = $.extend(defaults, options);
        this.init(opt);
    };
    PageControll.prototype = {
        init: function (opt) {
            this.updateUI(opt);
            var acicle = $('.cicle');
            if (acicle.hasClass('active')) {
                acicle.eq(acicle.index()).css({
                    borderColor: '#0742ff'
                })
            }
        },  
        updateUI: function (opt) {
            var style = {
                position: 'fixed',
                right: '20px',
                width: 0,
                height: '100px',
                borderLeft: '2px dotted #aaa',
                top: '50%',
                zIndex: 10000
            };
            var cicleStyle = {
                width: 0,
                height: 0,
                border: '7px double #aaa',
                background: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                left: '-8px',
                zIndex: 10001,
                cursor: 'pointer'
            }
            opt.container.css(style);
            for (var i = 0; i < opt.len; i++) {
                var cicle;
                if (i === 0) {
                    cicle = $('<div className="cicle active"></div>');                    
                } else {
                    cicle = $('<div className="cicle"></div>');                    
                }
                cicle.css(cicleStyle).css({
                    top: 25 + i*35
                });
                opt.container.append(cicle);
            }
            this.setStyle(opt);
        },

        generateChild: function (opt) {
            var cicles = [];
            for (var i = 0; i < opt.len; i++) {
                var node = $('<div class="cicle"></div>');
                node.index(i);
                cicles.push(node);
            }
            return cicles;
        },

        setStyle: function (opt) {
            opt.container.css({
                height: 35*(opt.len+1),
                marginTop: -35*(opt.len+1)/2
            });    
        },

        getIndex: function () {

        },
        changePageFull: function () {
            var ua = window.navigator.userAgent;
            var chrome = ua.match(/Chrome/g);
            var frifox = ua.match(/Firefox/g);
        }
    };
    $.fn.pageControll = function (options) {
        var _this = this;
        return new PageControll(_this, options);
    }
});
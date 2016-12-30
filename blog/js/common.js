$(function () {
    var toolCicle = $('.cicle');
    toolCicle.on('click', function () {
        var index = $(this).index();
        toolCicle.removeClass('active');
        $(this).addClass('active');
        pageChange(index);
    });
    
    var ua = window.navigator.userAgent;
    var chrome = ua.match(/Chrome/g);
    var frifox = ua.match(/Firefox/g);
    if (chrome != null) {
        $(window).on('mousewheel', function (e) {
            var n = 0;
            var delta = e.originalEvent.deltaY;
            toolCicle.removeClass('active');
            if (delta > 0) {
                toolCicle.eq(1).addClass('active');
                pageChange(1);
            } else {
                toolCicle.eq(0).addClass('active');            
                pageChange(0);
            }
        });
    } else {
        $(window).on('DOMMouseScroll', function (e) {
            var n = 0;
            var delta = e.originalEvent.detail;
            toolCicle.removeClass('active');
            if (delta > 0) {
                toolCicle.eq(1).addClass('active');
                pageChange(1);
            } else {
                toolCicle.eq(0).addClass('active');            
                pageChange(0);
            }
        });
    }

    function pageChange(n) {
        var wh = $(window).height();
        $('.wrap').stop().animate({
            top: -n*wh + 80
        });
    }

});
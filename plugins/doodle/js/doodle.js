(function (factory) {

    'use strict';

    var hasModuleObject = null;

    if (typeof exports === 'object') {

        hasModuleObject = module;

        factory(require('jquery'), require('fabric'), hasModuleObject);

    } else {

        factory(window.jQuery, window.fabric, hasModuleObject);

    }

})(function ($, fabric, hasModuleObject) {

    'use strict';

    /**
     * @param {object} markIcons 
     * @desc mark button icons url aggregate
    */

    var markIcons = {};

    //收缩展开按钮
    markIcons.toggle = '#555 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozNzNjMmU0NS1hZWZjLTJmNDktOTA3ZC02Y2UyYjM1MWM4MGYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkU5QUVGRUYxMkM5MTFFN0JCOENEMUY1QzAxMjNFN0MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkU5QUVGRUUxMkM5MTFFN0JCOENEMUY1QzAxMjNFN0MiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM3M2MyZTQ1LWFlZmMtMmY0OS05MDdkLTZjZTJiMzUxYzgwZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNzNjMmU0NS1hZWZjLTJmNDktOTA3ZC02Y2UyYjM1MWM4MGYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4mmae7AAACEklEQVR42ryXyytEURzHDyMpJDZsZG9nQx5lY8PaQhb+BW/FDINRDKNEFCWPpZ1YShmJGCslZUMi7wVNKLm+p34np9O9M/fOnOPUZ+6953fu/Xxn7mPOZZZlMUPUgx0QB48gArLVcabk3eAHHINeMAO+wLYawoScC3mbAhlSf6NdCFPyCYe6CLElQpiQ34K8BOOa5BC65D0kXwdvYN9liIhOeZi2aylENEkIflc86JI/gSKp300Ifsri6d5qvC2DZ3CqhKiTQuQq+/pADOymK5+k7QqPIaboOdGgQ848hgjR/n2p3IZOcsEC1e1CvINrqvtTeRB1SU84u3qA6ovSL1Eo1VdVuZcAbuUj0ul4kUKM2sndBvAqZ0qIOye5mwCdtHPEo1ywRPWAkyMduZ/qow71kWTyRAH+Re4UQMin05QPurnA1Y4Ol/KQQ33Yi1wN0EY7rzgMHtAtVwPsJfj2Qj6mUy4HyKLZ6ye4VOZyxuRygEo6iJC1Un9/EnmQ6kOp/q2LlXaaIuWATZrHh03L5QAb4IjWi8ENHXzWpFwOcKNcfOXUx3+JZuWaEPKgjgkt/yijAzYrxRJ6ieDtDIyDeZ1yEaCFDlpiM8BHk5AP668Fdb7MZDHGasEVuAcFoJqoAVUgH3yDU7AG5pjGxs9tDMtS8AjKQSZ4BYfEATgBcWag8QDnWPpIFqXlBbDYP7RfAQYAQ8mgZ/lBEqUAAAAASUVORK5CYII=")';
    //收缩展开按钮
    markIcons.toggleActive = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjg3RThEQTgzNDYyMTFFN0IyRjZBM0Q1OTY3Q0EyRkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjg3RThEQTkzNDYyMTFFN0IyRjZBM0Q1OTY3Q0EyRkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGODdFOERBNjM0NjIxMUU3QjJGNkEzRDU5NjdDQTJGQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGODdFOERBNzM0NjIxMUU3QjJGNkEzRDU5NjdDQTJGQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmJ01YEAAAFASURBVHja7NdBSwJBFAdwt5ugF7MOad6TDApMSTAROvcRPPgBBemQhEWIXvLkQdQlJbKNEOkjjP+BFbfH6M7K8Dzkgx/sQZm/M7tvn5YQIrTLOgjtuPYBdANUwIEOnBtNIG9CDZ9iVX240PyeL90dsD3XZ1CHDOcOnMKb+Fu2iZ0I8uEEdEmIAVxzBZBS0CIhvuCKK4B0DC8kxBRyXAGkQ2iTEGMocAVY7sQzCeFAkSuAFIcHEmIOt1wBpCg0FDdmmSuAFIYaCTE02Ql9+5nLW5bJTrhJBB7Jr/+GO44jiEGdLP6re/4mHsMmWfwHShyPYUzRkidBe8C2AY7WNKAbjlachFfF4lmOl9GJYiYYQZ7jdZxQLP4Ol1wDyRNZ/MPUXKjbCdOe6wHcQ49zJqzCzD0GYxOxZO3/G/77AAsBBgB91+XIAXirdwAAAABJRU5ErkJggg==")';
    //移动canvas
    markIcons.move = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0NGRTNENDQzNDkxMTFFN0E1NjZDMDc2QTJBNDlDRUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0NGRTNENDUzNDkxMTFFN0E1NjZDMDc2QTJBNDlDRUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3Q0ZFM0Q0MjM0OTExMUU3QTU2NkMwNzZBMkE0OUNFRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3Q0ZFM0Q0MzM0OTExMUU3QTU2NkMwNzZBMkE0OUNFRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi0nh0IAAAHuSURBVHja7JfPK0RRFMdnxiwkJTs1ftsoNYUiUQgh2UpZmLLR/AeytMXCSinlR1ETGws2kiwkssKCaAwlGz9SlGh8bp3heobHdGce5dRn3v0193zveee9d6/LlaBFo9Eq2IJNKHSl0nBYDTfRNwtDkVPOY3YKxU45j1kESpLl3G9xfqaVre2+ZAiY0JzMQp9WD8KqVh/87ryeH2iYhyMYhV541vruoRNmYB+WUpGMAW3FgUTn8bgctt8ngHAWwBBUGrxd7TBjOycDSuFC7uuBqRyg/0jG3UFd3Ago51zWIEeaNg1GelGumbBsFWFdubIVSDcYAQ9MauNfI+GNs/JbWAHl4Kt5a7Ryo51gbAdaIFeLRJubn10q5Q49BNsqBx4cfAofVQTU6lchWxrPYQCebP5cD/1SHod1m/Eq7MOQJfVjaIglSQVcaUkSAq/BJMyEDW38MeRZB1lFjBkUMKeNPYH8D+8Bt9utkrEZrqWp1eC9LpNrWD0x+IrEOt6FWYlAXS3FIIQMCuiCDpjFx+X/5/hvCpBN6R5MQ0ac/jQYgUNo+u683h+I7ZRsVqhd74LWlwZT0CP1bnm5Gd0D+my24nq7P1kb0RI5fHxmynl1snfDxXIMS71zTUSRHEhT71wTUShHc3VEr0p0nhcBBgBoDrxF0FS1zAAAAABJRU5ErkJggg==")';
    //自由线
    markIcons.line = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACGklEQVRYR+VW7VEUQRTsjkCIAIkAiECMQIxAiECNQI1AiECNQIhAjIC7CIAIhAja6qvZrcfuzscedXU/eL933uvt7tczxJaLW56PlwNA0jGANwD+krzumN84A5I+AfgCYKcfSvZzNwpA0jmAj2nwEsACwCXJy40zIOkEwO806DNJgxnVRhiQZLpvE+1nJH/mti0LIDX5kA7+IvnQurKSvibdbTibL1uTACQdAvgTjGPt3raCkHQHYC+d6R3fLEFocAXgNYADAN9I+s+KlcDfALgn6bPFGjEQzLNqkPbXbNyR3K81DPRfkPQKzgZgw1j73rmSrP8rAPskTW+2JJlyB44lK9LvJlMMjIZJ8t6+A1B0tBtK0qpxCJtmE+b0S2n2HUCR1iDXkqSNXK0nDAT9r0g6SFYVGhfXKgD12p5Wpw8lCAZ64viUCf8APJDczTUO0ZtNvuHZIQOd1u9jXicWOm/s5vJgrgFHJiw1aGketiULssZAt0JHJJ1+fdXoDTI9kuyv3poPhhJkV6hmsFaj1hgoAfBaOWIXJI+GjeYmYHe+mYGBEUeJOCesIvgpAFkNS0PmxHUJgMPHuz6Z4ZIcLj+GF1MIsOYEnJSg5tgkQ3fX9/dCWNHmAHoOgPjW883pO9+vnnsAh62PlrUBJBYshR+ZvqJdjwYxzI4WRtd+lEryn3c33vXcP38WAy1/1vrN2gy0Dqh9t3UA/wHMsCQw5Zu0CgAAAABJRU5ErkJggg==)';
    //矩形
    markIcons.rect = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA30lEQVRYR+2W0RHBUBBFz62AEpRABzpABaiADtCBVCAdiA50QAlKoII1GwnGDH8r+XhbwN6b8zKzRzQ8ajifVKA9BMxsCYyAYfB/cQQKSZnnlATMbAssgoM/128krWVmfeAE3ICxJG8YNmbmhAugAwy8wAzYAZkkf4bweSM+9wJrYAWUSMLTH0/+ykwFEoFEIBFIBBKBNhAYA/s/n+McmAITP8c94FwJgrvBQdI14iybWbfSPi/gAtSvlayWkojcbzvnkvKnFVeq5EWcSORcgLxWv/ZoeeQn/9qdCDRO4A73oMLroo9DdAAAAABJRU5ErkJggg==")';
    //圆
    markIcons.circle = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACV0lEQVRYR8WX8VnUQBDF36tAO1ArECoQKlAqECoQKxArUCsQKgAqECoQKhA60ArG73ff7LkJyWVzB978l2Sz82bm7cxba8vmLfvXLAARsSPpraQ9Sc8l8YzdSPot6UrSpW2em6wJQEQcSvok6WXTrtKdpI+2L6bWrwQQETj8nhGz170kNiXSuxJpZoa1ZOadpBfpmHVHtgE0aKMActMfmWocn9g+nYqI75mxkwRCafbHyjIIIJ3/TGeXkg5ts1GzRQQcATCcwXaHQDwAkGnHORuc2ab+a1tEAOJ9khQQnXIMAaBub5LN1HNjiwh4QyaubO/XG3YAZO0gHTXfmZv2MaRZDiJ/JumgPh19ACyCwTC3iXCt6amC4/S8Kv8tAVTEu7fdet5b/S/WRUQJcEnIGgDHhmbzzfbxrJ0bF0fEV0kfJH22jb9/rTgiCvk6NWrcu2lZREDqc0nXtmlaHQD079dj57XJw8Siqsw3tnf7AGLxwm6aD+sCioiOn5oDWwfwP0twa3sxyusMbJ2E5Yhs7RiSEoZQp1OtS7ah/1Y2ol6nespW3Om0Y8OIlkm7nKUBJobRrxzx48Mos1DIeGH74DFKUI3jZQd8MIzKixQkHElG56nto01AVILkT4741YIks1AIySNiAk7MKkdqALRFETVtkqzKBCAoB5kANaL0rCUbOfu/ZM2JfG+WKO2VA2GCRMMAUmQ5bF5cQHLIIGSKLC964joF7XxZXkeaY5RGVfT+VCKQdMcbX0z6XjJSalquZoxv7La6mnF6HvdqNhXuJt+fdPa3APsLx6caMERcC/8AAAAASUVORK5CYII=")';
    //箭头
    markIcons.arrow = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA7ElEQVRYR+2W4Q2CQAyF39vATdQJZARHcBQ30xFwEtngmTNgDB70DugRE/hLL99H22shVn64Mh+bwP9mQFINYJ/RQzXJYz9+cgYk3QGcMgRA8oc3WcACSzoAuAHYdbHFBHrwR1eqIgIReAXgGbLgLhCDk2wkyV1gCB7A7gJjcHcBC+4qkAJ3E0iFuwjkwBcXyIW3AmFsNyTPs3bBFLg1spN3gQf8PZwswzaF34slzPYqTLiUs1aMKeD15Z8NOWboDR8tQQn4oEAp+JhA97+3aMPFyh1tQklXAKHzL0t1+1CvmbfAukZz328CWwZeqqKeITBMFEMAAAAASUVORK5CYII=")';
    //文字
    markIcons.text = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplODEyMmY3Ni01NDA4LTZlNGYtODk4Ny02MjllN2QwMTQwM2QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzIwRkE0RTIxMkM3MTFFNzk4RUY5MjM5RTVBM0E3RkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzIwRkE0RTExMkM3MTFFNzk4RUY5MjM5RTVBM0E3RkYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ZTgxMjJmNzYtNTQwOC02ZTRmLTg5ODctNjI5ZTdkMDE0MDNkIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmU4MTIyZjc2LTU0MDgtNmU0Zi04OTg3LTYyOWU3ZDAxNDAzZCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvtNZFEAAACSSURBVHjaYvwPBAwDCJgYBhgMuANY0PheQHyTSL1NQBwNZS8F4joi9UkB8WFcDngCxPeINOgTGptYfX9G08CgS4Tvkfh/6WDnP2Q7QQ4QorOnnyDbOZoGRh0w6oBRB4w6YNQBow4YdcCoA1iIUMMDxGJYxPnQ2EpY1LwC4i94TQf1TQngqP/kgyhC5o+mAYAAAwBUgoMpjITKgAAAAABJRU5ErkJggg==")';
    //橡皮擦
    markIcons.eraser = 'url("data:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABzElEQVRYR8WX/zGEMRCG362ADtABHVABHXAVoAKnAlTAVYAKXAk6oANUsObNJN/kyI9N8hmZuX8y9+V5ssluEsE/N5mDr6pnAI4BvANYicirddxhAVV9AHAK4AvAlgcvRIT91TYkEMGPRGStqocAnryISaJbIIJvgFR1H8DaKtElkIOHeLdINAvU4AkJBcAlSm7MJgErvEXCLNAKt0qYBHrhFomqwCi8JlEUmAteksgKzA1PSHwAOEgK/BU8kuDZcQ9g8Usggt+JyEW1mHf8wZfsFwCXGwIRnMN+lgpIB3f6RFV5XvD03JsEIvgKwK2v58Uq1iMRca5FZOkEVHUJ4MqFRIRw9oVDZTaJeJIiwn0AUdVdAG8AnFE8qzklUvAg4GYvIrmMGI5EDh4EuNNvXE5mTqyRSJTgQWDb3+WKa90jUYM7Ab/hTgA81lKvRcICnwS8RKhOxfy3SKgqM+nc35Ddbs+1n4VoWMJf0VlmeT0vwjcikKjTzZFohScFBpaDYWdKm2YeJlw6jluXg4+SJng2AtblUFWmMEs4a0kzvCoQpSifWZwhHxz8sbFC8iVEiS64ScBLEMI1JnAnSqln9vNZVko1cxr2DjLy3Tcub2QkpLlltgAAAABJRU5ErkJggg==")';
    markIcons.eraserImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDE5MEYwNTIxMkM4MTFFN0JDNjQ5MEZGRUI5MkUzOUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDE5MEYwNTMxMkM4MTFFN0JDNjQ5MEZGRUI5MkUzOUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0MTkwRjA1MDEyQzgxMUU3QkM2NDkwRkZFQjkyRTM5RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MTkwRjA1MTEyQzgxMUU3QkM2NDkwRkZFQjkyRTM5RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjGVcNEAAAXiSURBVHjaxJdrbBRVFMf/M7NL2W53t13aSl8pUB4pfSCgqNCCQAOGly1LSw1fhKAVYlAkSBENXwy2COXVhvCQDyC0PERTMJGqoGKCQqQmUkKhgoDQdvtm6T5md2Y8d9gttXbLbsGwyaSZudP7+91zzz1zL6coCp7mT1NYWPjYnfA84PaguLkdyzwyhCgTKnQhWCHJ6HykwJOA37fjR9GNybMncggdCFT9qixptWGq2YAJJNH8vwkwuM2ObztsmLwil8NzWRwgACnDgI/3KUOb2nEhKgJjJAn3/PbxmCM/RfCsFfkEn0bwBmq4BSSmc/jwDR5aHkNoWqoFHoOeqACDdzpwovUeZixnI59C8EZq8NDFcppEEtOAwqX0ooxhFInfSSLiiQjwxLI7UNnagTlvE/zFqfTASg0SXVy36y6QMAr4YCkHDY/45g6c702CDxruwjFrG+YWzCf4dHrQ5B051+Nldk9RSUzlsI6mg0DDKRKXSCKqXwIM7nChvKUdloIcDhlZfcC7S9QDcRSJNUs4lp+xFIlzJBEetIDowWGqWfnLLBymzKSeW+ihuw94dwnKiSEpHD56i2fTkUSRqCGJmIAEOMo4WZY/u3mrKS8mwoWJr9DKdVCDKwB4D4lYisTqxZQTHGLbbPiJug4VMjIy/P8fx0F0ufY77PbXs2ZMR83VFjRea8fYF/QP0l0MUsIGhA/lkBwLVF+G2SP1IaDCRXGP1dq4eE6OBXmWHCQMSUDJ7rNwNIkYn0kSSj8kqDhHjOTQSAl6pY7NiH/4vmZr41JL/iJkz5kNm1tGevJIFH2yEsd+cGF3WStgoLRiwZADFGDvUamGk4pYG5VhLTr43uBut7ussb5+8bwFeQSfBZsowel0ooXW4LjU0SguWoWjZ0Ts3UkS4QFKsHYdXUbg+BcKLtYqMBtRzveEewhubWhYnp23EJZX5+G+m+CiSNWPhyLLqsTY1GQUUySOnHZib2kAkWDPQ+kyAZUEP3pGQYQBpYTb15UDPnj93TvL51pykZuTTXCZ1j7BOa7rHbZ/cNI3d1h8DEanjsC2PT9DbHFj3GQykHvJCR/cAHx5TMGR7xXERWGLVoN3WQqpAirc49nU2FD/zuzs+Vi4wIJOD4O7uuDdo+STSCKJlLQkbN97Fu5mN8Zm9EhMX9ip7Hx1VMFhBo/GDh+c/YTMzExIkrSZRr5qFsFfy12gwu1U9nie87tCmITDK5GcOlxdHW4WiUxvJCjR1GkxeuGnFcRHPxy57ydMmjQpt72trWTajJlYlL8QnZLSJ9xfJFLThtN0kEQrSbxEZJ2ijp6FnY08IRpbCf5ezx2gkJ6WVpQ0ctSogoI34aLGTrvzkXB/kUghiS27zkK6R9MxUY+Tx2VUfEcjf0aFr+xt+8l7JE+YQR+q1mQnFXwuyM+zKuFdHePTU1CyeQ1+u27C+vU2fHNOTbiNWqF3uCpgMpqqLtfU4PzFaoSHaNTaH+xGmUnIbAfqeVCs0tNGoPZGJ9sfspGv6as/XjtgQBF1cGF3WSmq/7iEQaEhJMEhGAuZkk5PND0V1gOHKnDx/C9ITDBvoLGsfFQ3PH3poA8zTA0JCandVboDl6/WqRIKxwUFDxU4HDx8BKdOVsJgNJZQ4VoX0D7jQSdSZ3hExLMCz1/atmkjamqvIlI/EEoA8DC9ToXvP1SOUycqERMXt0Gj0awK9MDTVYqpFjjDzeaXaQXcLtu2FX/evN2nhAqnkeuoh8/LK1BF8MExMZsIvi6Y09a/vgUk0WIeFDlGkaTrWz4txrUbf6kSGq0W2m6Xhj5jJoMOOu/Iq74+gdj4+CJBo1kd7FHvP19DkmgzR0ZmuEWXdUfJZtTdvgP9AIHtirougfZTLEMOeMM+ODaOwdf255zZ68mIJOojo6Kf72hvv7Br+9ZoAsAtig+rlyCon+eGu38jLiGhmO7X9veQ6/doRhK3jCbTBIfD8X5d7RUDZbXT10YwuuUNYQZjJf09+DgnbO5pH8//EWAALc+fGfJOtNgAAAAASUVORK5CYII=';

    /**
     * @param {htmlElement} menuHtml
     * @desc mark button html
    */
    var menuHtml = '<button class="markupButton markupToggle" id="markupToggle"></button>' +
        '<button id="drawMover" class="markupButton markupHidden DrawMover"></button>' +
        '<button id="drawFreeLine" class="markupButton markupHidden DrawFreeLine"></button>' +
        '<button id="drawRectangle" class="markupButton markupHidden DrawRectangle"></button>' +
        '<button id="drawCircle" class="markupButton markupHidden DrawCircle"></button>' +
        '<button id="drawArrow" class="markupButton markupHidden DrawArrow"></button>' +
        '<button id="drawText" class="markupButton markupHidden DrawText"></button>' +
        '<button id="drawEraser" class="markupButton markupHidden DrawEraser"></button>' +
        '<input type="text"  class="markupButton markupHidden" value="#ff0000" id="drawingColor">';

    var canvas,
        startX,
        startY,
        offsetX,
        text,
        toolbarh = 0,
        fill = '#ff0000',
        drawType = '',
        drawArray = [],
        btnFlag = false,
        MouseStatus = false,
        eraser = null,
        textLeft = null,
        textTop = null,
        canvasMenuBar = null,
        markupCanvasAnchor = null,
        writeTextHtml = null,
        transparentCircle = null,
        transparentRect = null,
        transparentArrow = null,
        _target = null,
        _type = '',
        _css,
        isFirefox = /FireFox/i.test(navigator.userAgent),
        activeColor = '#15bbec',
        outColor = '#555';

    /**
     * @param {object} Doodle
     * @desc 基于fabricjs封装canvas的涂鸦功能。
    */

    var handleString = {
        doodleContainer: "doodleContainer",
        markupToolbar: "markupToolbar",
        markupCanvasAnchor: "markupCanvasAnchor",
        drawFreeLine: "drawFreeLine",
        drawMover: "drawMover",
        drawCircle: "drawCircle",
        drawRectangle: "drawRectangle",
        drawArrow: "drawArrow",
        drawText: "drawText",
        drawEraser: "drawEraser",
        drawingColor: "drawingColor",
        textcn: "请输入文字",
        texttw: "請輸入文字",
        textus: "Please enter text",
    };

    var Doodle = function (ele, options) {

        _target = ele;

        this.dom = document.createElement('div');

        this.dom.id = handleString.doodleContainer;

        this.outControl = false;

        var defaults = {
            showMarkToggle: true,
            type: 'model',
            width: '100vw',
            height: '100vh',
            language: 'zh-cn',
            position: {
                left: 0,
                top: 0
            },
            setIcon: null
        };

        var params = $.extend({}, defaults, options);

        _type = params.type;

        if (typeof params.setIcon === 'function') {
            params.setIcon(function (icons) {
                markIcons = $.extend({}, markIcons, icons);
            });
        }

        setIcons(markIcons);

        canvasMenuBar = document.createElement('div');
        markupCanvasAnchor = document.createElement('div');
        writeTextHtml = document.createElement('div');
        canvasMenuBar.className = handleString.markupToolbar;
        canvasMenuBar.innerHTML = menuHtml;
        markupCanvasAnchor.id = handleString.markupCanvasAnchor;
        markupCanvasAnchor.innerHTML = '<canvas id="canvas" height="' + params.height + '" width="' + params.width + '"></canvas>';

        this.dom.appendChild(canvasMenuBar);
        this.dom.appendChild(markupCanvasAnchor);

        ele.appendChild(this.dom);

        canvas = this.__canvas = new fabric.Canvas('canvas', { selection: false });
        fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
        canvas.freeDrawingBrush.color = fill;
        canvas.freeDrawingBrush.width = 3;

        //render mark button
        text = handleString.textcn;
        if (params.language.toLowerCase() === 'zh-tw') {
            text = handleString.texttw;
        } else if (params.language.toLowerCase() === 'en-us') {
            text = handleString.textus;
        }

        writeTextHtml.innerHTML = '<input type="text" id="writeText" placeholder=' + text + '>';
        this.dom.appendChild(writeTextHtml);
        var markupToggle = $('#markupToggle')
        var drawMover = $('#drawMover');
        var drawRectangle = $('#drawRectangle');
        var drawCircle = $('#drawCircle');
        var drawFreeLine = $('#drawFreeLine');
        var drawText = $('#drawText');
        var drawEraser = $('#drawEraser');
        var drawingColor = $('#drawingColor');
        var drawArrow = $('#drawArrow');
        var writeText = $('#writeText');
        drawArray = [drawMover, drawFreeLine, drawRectangle, drawCircle, drawArrow, drawText, drawEraser, drawingColor];

        //colorpicker
        drawingColor.colorPicker({
            renderCallback: function () {
                var rgb = this.color.colors.RND.rgb;
                fill = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + this.color.colors.alpha + ')';
            }
        });

        if (params.showMarkToggle) {
            markupToggle.click(function () {
                btnFlag = !btnFlag;
                changeBtnState(btnFlag);
            });
        } else {
            markupToggle.css({ display: 'none' });
        }

        drawArray.map(function (drawBtn, i) {
            drawBtn.click(function () {
                if (this.id === handleString.drawingColor) {
                    return false;
                }

                if (this.id === drawType) {
                    drawType = '';
                    selectedButtonStatus(this.id, false);
                    if (this.id === handleString.drawEraser) {
                        canvas.remove(eraser);
                        eraser = null;
                    }
                    if (this.id === handleString.drawText) {
                        writeText.val('').css({ display: 'none' });
                    }
                } else {
                    if (this.id !== handleString.drawEraser) {
                        canvas.remove(eraser);
                        eraser = null;
                    }
                    if (this.id !== handleString.drawText) {
                        writeText.css({ display: 'none' });
                    }

                    drawType = this.id;
                    canvas.isDrawingMode = false;
                    selectedButtonStatus(this.id, true);
                    lockOrUnlockAll(false);

                    if (this.id === handleString.drawMover) {
                        lockOrUnlockAll(true);
                    }

                }

                if (this.id === handleString.drawFreeLine) {
                    canvas.freeDrawingBrush.color = fill;
                    canvas.freeDrawingBrush.width = 3;
                    canvas.isDrawingMode = !canvas.isDrawingMode;
                }
            });


        });

        canvasMouseDown();

        canvasMouseMove();

        canvasMouseUp();

        documentKeydom();

    };

    function canvasMouseDown() {
        canvas.on('mouse:down', function (options) {
            offsetX = canvas._offset.left;
            startX = options.e.offsetX;
            startY = options.e.offsetY;
            if (options.e.changedTouches) {
                startX = options.e.changedTouches[0].pageX;
                startY = options.e.changedTouches[0].pageY;
            }
            MouseStatus = true;
            if (drawType != "") {
                switch (drawType) {
                    case handleString.drawCircle:
                        drawCircle(options);
                        break;
                    case handleString.drawText:
                        drawText(options);
                        break;
                    case handleString.drawRectangle:
                        drawRectangle(options);
                        break;
                    case handleString.drawEraser:
                        generateEraser(options);
                        break;
                    case handleString.drawFreeLine:
                        drawFreeLine(options);
                        break;
                    default:
                        // console.log("not action");
                        break;
                }
            }
        });
    }

    function canvasMouseMove() {
        canvas.on('mouse:move', function (options) {
            if (drawType != "") {
                switch (drawType) {
                    case handleString.drawFreeLine:
                        drawFreeLine(options);
                        break;
                    case handleString.drawCircle:
                        drawCircle(options);
                        break;
                    case handleString.drawEraser:
                        drawEraser(options);
                        break;
                    case handleString.drawRectangle:
                        drawRectangle(options);
                        break;
                    case handleString.drawArrow:
                        drawArrow(options);
                        break;
                    default:
                        // console.log("not action");
                        break;
                }
            }
        });
    }

    function canvasMouseUp() {
        canvas.on('mouse:up', function () {
            MouseStatus = false;
            canvas.remove(eraser);
            eraser = null;
            transparentCircle = null;
            transparentRect = null;
            transparentArrow = null;
        });
    }

    function documentKeydom() {
        //选中删除元素
        var entity = null;
        canvas.on('object:selected', function (e) {
            entity = e.target;
        });
        document.onkeydown = function (e) {
            if (entity != null && e.keyCode == 46) {
                canvas.remove(entity)
            }
            var writeTxt = $('#writeText').val();
            if (writeTxt !== "" && e.keyCode === 13) {
                text = new fabric.Text(writeTxt, {
                    fontSize: 22,
                    left: textLeft,
                    top: textTop + 16,
                    fill: fill,
                    originX: 'left',
                    cornerSize: 5,
                    transparentCorners: false
                });
                canvas.add(text);
                writeText.value = ""
            }
        }
    }

    function drawFreeLine() {
        if (fabric.PatternBrush) {
            var vLinePatternBrush = new fabric.PatternBrush(canvas);
            vLinePatternBrush.getPatternSrc = function () {
                var patternCanvas = fabric.document.createElement('canvas');
                patternCanvas.width = patternCanvas.height = 10;
                var ctx = patternCanvas.getContext('2d');
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(0, 5);
                ctx.lineTo(10, 5);
                ctx.closePath();
                ctx.stroke();
                return patternCanvas;
            };
        }
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = fill;
            canvas.freeDrawingBrush.width = 3;
            canvas.freeDrawingBrush.shadowBlur = 0;
        }
        lockOrUnlockAll(false);
    }

    function drawRectangle(options) {
        if (transparentRect) {
            canvas.remove(transparentRect)
        }
        if (MouseStatus) {
            var x = options.e.pageX - offsetX,
                y = options.e.pageY - toolbarh;
            if (options.e.changedTouches) {
                x = options.e.changedTouches[0].pageX - offsetX;
                y = options.e.changedTouches[0].pageY;
            }
            var disX = x - startX,
                disY = y - startY,
                l = getPlace(x, y, disX, disY).l,
                t = getPlace(x, y, disX, disY).t;
            if (options.e.changedTouches) {
                t -= toolbarh;
            }
            transparentRect = new fabric.Rect({
                left: l,
                top: t,
                fill: false,
                stroke: fill,
                strokeWidth: 3,
                width: Math.abs(disX),
                height: Math.abs(disY),
                cornerSize: 5,
                transparentCorners: false
            });
            lockOrUnlockAll(false);
            canvas.add(transparentRect);
        }
    };

    function drawCircle(options) {
        if (transparentCircle) {
            canvas.remove(transparentCircle)
        }
        if (MouseStatus) {
            var x = options.e.pageX - offsetX,
                y = options.e.pageY - toolbarh;
            if (options.e.changedTouches) {
                x = options.e.changedTouches[0].pageX;
                y = options.e.changedTouches[0].pageY;
            }
            var disX = x - startX,
                disY = y - startY,
                radius = Math.sqrt(disX * disX + disY * disY) / 2 | 0, //半径
                l = getPlace(x, y, disX, disY).l,
                t = getPlace(x, y, disX, disY).t;
            if (options.e.changedTouches) {
                t -= toolbarh;
            }
            transparentCircle = new fabric.Circle({
                radius: radius,
                left: l,
                top: t,
                fill: false,
                stroke: fill,
                strokeWidth: 3,
                hasRotatingPoint: false,
                cornerSize: 5,
                transparentCorners: false
            });
            lockOrUnlockAll(false);
            canvas.add(transparentCircle)
        }
    };

    function drawArrow(options) {
        if (transparentArrow) {
            canvas.remove(transparentArrow);
        }
        if (MouseStatus) {
            var x = options.e.pageX - offsetX,
                y = options.e.pageY - toolbarh;
            if (options.e.changedTouches) {
                x = options.e.changedTouches[0].pageX;
                y = options.e.changedTouches[0].pageY;
            }
            var disX = x - startX,
                disY = y - startY,
                l = getPlace(x, y, disX, disY).l,
                t = getPlace(x, y, disX, disY).t,
                angle = (Math.atan2(disY, disX) * 180 / Math.PI - 30) | 0;
            if (options.e.changedTouches) {
                t -= toolbarh;
            }
            function makeLine(coords) {
                return new fabric.Line(coords, {
                    fill: fill,
                    stroke: fill,
                    strokeWidth: 3,
                    selectable: false
                });
            }
            var arrowL, arrowT = y;
            if (disX >= 0 && disY > 0) {
                arrowL = x + 2;
            } else if (disX <= 0 && disY > 0) {
                arrowL = x + 2;
                arrowT = y + 2;
            } else if (disX <= 0 && disY < 0) {
                arrowL = x - 2;
                arrowT = y + 2;
            } else {
                arrowL = x - 2;
            }
            var drawArrow = new fabric.Triangle({
                width: 16,
                height: Math.sqrt(192),
                fill: fill,
                angle: angle,
                left: arrowL,
                top: arrowT
            });
            var arrowLine = makeLine([startX, startY, x, y]);
            transparentArrow = new fabric.Group([arrowLine, drawArrow], {
                left: l,
                top: t,
                strokeWidth: 3,
                cornerSize: 5,
                transparentCorners: false
            });
            canvas.add(transparentArrow);
            lockOrUnlockAll(false);
        }
    };

    function drawText(options) {
        writeText.style.color = fill;
        var x = options.e.pageX;
        var y = options.e.pageY - toolbarh;
        if (options.e.changedTouches) {
            x = options.e.changedTouches[0].pageX;
            y = options.e.changedTouches[0].pageY;
        }
        writeText.style.background = 'transparent';
        writeText.style.top = y + "px";
        writeText.style.left = x + "px";
        writeText.style.display = 'block';
        dragMove(writeText);
        lockOrUnlockAll(false);
        var txt = $('#writeText').val();
        if (txt != "" && textLeft != null) {
            text = new fabric.Text(txt, {
                fontSize: 22,
                left: textLeft,
                top: textTop + 16,
                fill: fill,
                originX: 'left',
                cornerSize: 5,
                transparentCorners: false
            });
            canvas.add(text);
            writeText.value = ""
        }
        textLeft = x;
        textTop = y
    };

    function drawEraser(options) {
        var x = options.e.pageX - offsetX;
        var y = options.e.pageY - toolbarh;
        if (options.e.changedTouches) {
            x = options.e.changedTouches[0].pageX;
            y = options.e.changedTouches[0].pageY - toolbarh;
        }
        if (eraser) {
            eraser.setLeft(parseInt(x)).setCoords();
            eraser.setTop(parseInt(y)).setCoords();
            canvas.renderAll();
        }
        if (MouseStatus) {
            if (eraser != null && drawType == "drawEraser") {
                canvas.forEachObject(function (obj) {
                    if (obj === eraser) return;
                    if (!obj) {
                        return;
                    }
                    if (eraser.intersectsWithObject(obj)) {
                        canvas.remove(obj)
                    }
                });
            }
        }
    };

    function generateEraser(options) {
        var x = options.e.pageX - offsetX;
        var y = options.e.pageY - toolbarh;
        if (options.e.changedTouches) {
            x = options.e.changedTouches[0].pageX;
            y = options.e.changedTouches[0].pageY - toolbarh;
        }
        if (!eraser) {
            canvas.remove(eraser);
            fabric.Image.fromURL(markIcons.eraserImg, function (img) {
                canvas.add(img.set({ left: x, top: y, angle: 30, hasRotatingPoint: false, cornerSize: 5, transparentCorners: false }));
                eraser = img;
                lockOrUnlockAll(false);
            })
        }
    };

    Doodle.prototype.generateImage = function (parent, callback) {
        $('.markupToolbar').css('display', 'none');
        html2canvas(parent, {
            allowTaint: true
        }).then(function (canvasEntity) {
            var canvasData = canvas.toDatalessJSON();
            var data = {
                img: canvasEntity.toDataURL(),
                canvas: canvasData,
                width: canvas.width,
                height: canvas.height
            };
            $('.markupToolbar').css('display', 'block');
            callback(data);
        });
    };

    var startOpenCanvasPosition;

    function canvasLoadFromJSON(serialized) {
        canvas.clear();
        startOpenCanvasPosition = {
            left: [],
            top: []
        };
        var oldW = serialized.width;
        var oldH = serialized.height;
        canvas.loadFromJSON(serialized.canvas, canvas.renderAll.bind(canvas));
        canvas.forEachObject(function (obj) {
            startOpenCanvasPosition.left.push(obj.left);
            startOpenCanvasPosition.top.push(obj.top);
        });
        changeResizeCanvasState(oldW, oldH);
        window.addEventListener('resize', function () {
            changeResizeCanvasState(oldW, oldH);
        });
        btnFlag = true;
        changeBtnState(getId('markupToggle'), btnFlag);
        if (typeof disablePanzoom === 'function') {
            disablePanzoom();
        }
    };

    function changeResizeCanvasState(oldW, oldH) {
        var device = getDevice();
        var scale;
        if (_type === 'pdf') {
            scale = canvas.width / oldW;
            var scaleX = (device === 'pc' ? canvas.width : (canvas.width - 32)) / oldW;
            var scaleY = canvas.height / oldH;
            canvas.forEachObject(function (obj, i) {
                obj.setScaleX(scaleX);
                obj.setScaleY(scaleX);
                obj.setLeft(startOpenCanvasPosition.left[i] * scaleX);
                var top = device !== 'pc'
                    ? (startOpenCanvasPosition.top[i] - 12) * scaleX
                    : startOpenCanvasPosition.top[i] * scaleX;
                obj.setTop(top);
            });
        } else if (_type === 'model') {
            scale = canvas.height / oldH;
            var scaleX = canvas.width / oldW;
            canvas.forEachObject(function (obj, i) {
                if (scale !== 1) {
                    obj.setScaleX(scale);
                    obj.setScaleY(scale);
                    obj.setTop(startOpenCanvasPosition.top[i] * scale);
                }
                if (scaleX !== 1) {
                    obj.setLeft(startOpenCanvasPosition.left[i] * scale);
                }
            });
        } else {
        }
        canvas.renderAll();
    }

    function getDevice() {
        var ua = window.navigator.userAgent;
        if (ua.match(/(Android|iPhone)/)) {
            return 'mobile';
        } else if (ua.match(/(iPad)/)) {
            return 'ipad';
        } else {
            return 'pc';
        }
    }

    function getPlace(x, y, disX, disY) {
        return {
            l: disX > 0 ? (x - disX / 2) : (x + Math.abs(disX) / 2),
            t: disY > 0 ? (y - disY / 2) : (y + Math.abs(disY) / 2)
        };
    }

    function dragMove(target) {
        target.onmousedown = function (e) {
            var disX = e.pageX - target.offsetLeft;
            var disY = e.pageY - target.offsetTop;
            document.onmousemove = function (e) {
                e.preventDefault();
                var l = e.pageX - disX,
                    t = e.pageY - disY;
                textLeft = l - offsetX;
                textTop = t;
                target.style.left = l + 'px';
                target.style.top = t + 'px';
                return false;
            };
            document.onmouseup = function (e) {
                e.preventDefault();
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }

    Doodle.prototype.resize = function (w, h) {
        canvas.setWidth(w);
        canvas.setHeight(h);
    };

    Doodle.prototype.setBtnToolState = function (flag) {
        btnFlag = flag;
        changeBtnState(btnFlag);
    }

    Doodle.prototype.clear = function (w, h) {
        canvas.clear();
    };

    function setIcons(markIcons) {
        var style = document.createElement('style');
        _css = 'canvas {margin:0;padding:0};.focal#viewerContainer{position: relative;width: 100%;height:100%;}'
            + '#doodleContainer{position:absolute;z-index:100;width:100%;height:100%;left:0;bottom:0;}#markupCanvasAnchor{position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: -1;}'
            + '.markupOn {z-index: 1;} .markupOff{z-index: -1;}.markupHidden {display: none;}'
            + '.markupToolbar {position: fixed;top: 40px;right: 34px;z-index: 102;height: 40px;}'
            + '.markupButton {width: 32px;height: 32px;border-radius: 5px;margin-right: 5px;float:left;margin-bottom: 5px;border: 1px solid black;text-indent: -999px;}'
            + '#writeText{position:fixed;display: none;height:32px;line-height: 32px;z-index: 2;border: 1px #000 dashed;font-size: 16px;padding:0 5px;cursor: move;}'
            + '#drawingColor{width: 32px;height: 32px;background: #555;position: relative;float:left;}'
            + '.markupType {color: red;overflow: hidden;}@-moz-document url-prefix() /*Firefox*/{#drawingColor{width: 30px;height: 30px;}}'
            + '.markupToggle{background: ' + markIcons.toggle + ' no-repeat center;background-size:83%}'
            + '.markupToggle.active{background-image: ' + markIcons.toggleActive + ';}'
            + '.DrawMover{background: #555 ' + markIcons.move + ' no-repeat center;background-size:83%}'
            + '.DrawFreeLine{background: #555 ' + markIcons.line + ' no-repeat center;background-size:98%}'
            + '.DrawRectangle{background: #555 ' + markIcons.rect + ' no-repeat center;background-size:98%}'
            + '.DrawCircle{background: #555 ' + markIcons.circle + ' no-repeat center;background-size:98%}'
            + '.DrawArrow{background: #555 ' + markIcons.arrow + ' no-repeat center;background-size:98%}'
            + '.DrawText{background: #555 ' + markIcons.text + ' no-repeat center;background-size:80%}'
            + '.DrawEraser{background: #555 ' + markIcons.eraser + ' no-repeat center;background-size:97%}'
            + '@media screen and (max-width: 1024px) {.markupToolbar {right:4%;}}'
            + '@media screen and (max-width: 768px) {.markupToolbar {right: 4%;} .markupButton{width:30px;height:30px;margin-right:3px;} #drawingColor{width:28px;height:28px;}}';
        style.innerHTML = _css;
        document.head.appendChild(style);
    }

    function changeBtnState(btnFlag) {
        var mousewheelEvt = "on" + (isFirefox ? "DOMMouseScroll" : "mousewheel");
        if (btnFlag) {
            markupCanvasAnchor.style.zIndex = 1;
            markupCanvasAnchor.style.display = "block";
            markupCanvasAnchor.style.position = 'fixed';
            $('.markupToggle').addClass('active');
            if (typeof disablePanzoom === 'function') disablePanzoom();
            drawType = 'drawFreeLine';
            canvas.isDrawingMode = btnFlag;
            selectedButtonStatus(handleString.drawFreeLine, true);
            _target[mousewheelEvt] = function () {
                return false
            }
        } else {
            canvas.clear();
            drawType = '';
            markupCanvasAnchor.style.zIndex = -1;
            markupCanvasAnchor.style.display = "none";
            $('.markupToggle').removeClass('active');
            $('.writeText').css({ display: 'none' });
            if (typeof enablePanzoom === 'function') enablePanzoom();
            _target[mousewheelEvt] = function () {
                return true
            }
        }
        for (var i = 0; i < drawArray.length; i++) {
            if (btnFlag) {
                drawArray[i].css({ display: 'block' });
            } else {
                drawArray[i].css({ display: 'none' });
            }
        }
    }

    function selectedButtonStatus(type, flag) {
        drawArray.map(function (drawItem, i) {
            if (flag && type === drawItem.selector.substr(1)) {
                drawItem.css({ backgroundColor: activeColor });
            } else {
                if (drawItem.selector.substr(1) !== handleString.drawingColor) {
                    drawItem.css({ backgroundColor: outColor });
                }
            }
        });
    }

    function lockOrUnlockAll(value) {
        for (var i = 0; i < canvas._objects.length; i++) {
            canvas.item(i)["hasControls"] = value;
            canvas.item(i)["hasBorders"] = value;
            canvas.item(i)["lockMovementY"] = !value;
            canvas.item(i)["lockMovementX"] = !value;
        }
        canvas.renderAll();
    }

    if (hasModuleObject) {
        hasModuleObject.exports = Doodle;
    } else {
        window['Doodle'] = Doodle;
    }
}); 
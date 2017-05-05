var doodle = doodle || { version: '0.0.1' };

doodle.isMobile = 'ontouchstart' in document.documentElement;

(function () {

    doodle.Canvas = function (canvasId, options) {
        this._canvas = document.getElementById(canvasId);
        this._objects = [];
        this._defualts = {
            // width: 
        };
        this.add.call(this._canvas);
        this.contextContainer = this._canvas.getContext('2d');
    };

    doodle.Canvas.prototype = {
        constructor: doodle.canvas,
        add: function () {
            this._objects.push.apply(this._objects, arguments);
        },
        remove: function (elem) {
            for (var i = 0, l = this._canvas._objects.length; i < l; i++) {
                if (elem === this._canvas._objects[i]) {
                    this._canvas._objects.splice(i, 1);
                }
            }
        },
        renderAll: function () {
            var canvasToDrawOn = this.contextContainer;
            this.renderCanvas(canvasToDrawOn, this._objects);
            return this;
        },
        renderCanvas: function (ctx, objects) {
            this.calcViewportBoundaries();
            this.clearContext(ctx);
            this.fire('before:render');
            if (this.clipTo) {
                fabric.util.clipContext(this, ctx);
            }
            this._renderBackground(ctx);

            ctx.save();
            //apply viewport transform once for all rendering process
            ctx.transform.apply(ctx, this.viewportTransform);
            this._renderObjects(ctx, objects);
            ctx.restore();
            if (!this.controlsAboveOverlay && this.interactive) {
                this.drawControls(ctx);
            }
            if (this.clipTo) {
                ctx.restore();
            }
            this._renderOverlay(ctx);
            if (this.controlsAboveOverlay && this.interactive) {
                this.drawControls(ctx);
            }
            this.fire('after:render');
        },
    };

    doodle.Rect = function (container, options) {
        this.ctx = container.getContext('2d');
        this.defaults = {
            left: 0,
            top: 0,
            width: 25,
            height: 15,
            scaleX: 1,
            scaleY: 1
        };

        for (var key in this.defaults) {
            if (options.hasOwnProperty(key)) {
                this.defaults[key] = options[key];
            }
        }

        this.drawRect();
    }

    doodle.Rect.prototype = {
        constructor: doodle.Rect,

        drawRect: function () {
            var ctx = this.ctx;
            var config = this.defaults;
            ctx.strokeRect(config.left, config.top, config.width, config.height);
            ctx.scale(config.scaleX, config.scaleY);
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#FF0000';
            ctx.fillRect(config.left, config.top, config.width, config.height);
        }
    };

    doodle.Trangle = function (container, options) {
        this.ctx = container.getContext('2d');
        this._defualts = {
            left: 0,
            top: 0
        };
        this.drawTrangle();
    };

    doodle.Trangle.prototype = {
        constructor: doodle.Trangle,

        drawTrangle: function () {
            var ctx = this.ctx;
            var config = this.defaults;
            // ctx.beginPath();
            // ctx.moveTo(75, 50);
            // ctx.lineTo(100, 75);
            // ctx.lineTo(100, 25);
            // ctx.fill();
            // console.log(ctx.translate);
            ctx.beginPath();
            ctx.moveTo(125, 125);
            ctx.lineTo(125, 45);
            ctx.lineTo(45, 125);
            ctx.closePath();
            ctx.stroke();
        }
    };
})();



































// var Canvas = {};

// Canvas.Rect = function (container, options) {
//     this.ctx = container.getContext('2d');
//     this.defaults = {
//         left: 0,
//         top: 0,
//         width: 25,
//         height: 15,
//         scaleX: 1,
//         scaleY: 1
//     };

//     for (var key in this.defaults) {
//         if (options.hasOwnProperty(key)) {
//             this.defaults[key] = options[key];
//         }
//     }

//     this.drawRect();
// };

// Canvas.Rect.prototype = {
//     constructor: Canvas.Rect,

//     drawRect: function () {
//         var ctx = this.ctx;
//         var config = this.defaults;
//         ctx.strokeRect(config.left, config.top, config.width, config.height);
//         ctx.scale(config.scaleX, config.scaleY);        
//         ctx.fillStyle="#FF0000";
//     }
// };

// Canvas.Circle = function (container, options) {
//     this.ctx = container.getContext('2d');
//     this.defaults = {
//         left: 0,
//         top: 0,
//         radius: 5,
//         angle: 0,
//         scaleX: 1,
//         scaleY: 1,
//         stepClear: 1
//     };

//     for (var key in this.defaults) {
//         if (options.hasOwnProperty(key)) {
//             this.defaults[key] = options[key];
//         }
//     }

//     this.drawCircle();
// };

// Canvas.Circle.prototype = {
//     constructor:　Canvas.Circle,
//     drawCircle: function () {
//         var ctx = this.ctx;
//         var config = this.defaults;
//         ctx.beginPath();
//         var left = config.left - config.radius / 2,
//             top = config.top - config.radius /2;
//         ctx.arc(left, top, config.radius, config.angle, 2 * Math.PI);
//         ctx.stroke();
//     },
//     clearArc: function () {

//         var calcW = config.radius - config.stepClear;
//         var calcH = Math.sqrt(radius*radius - calcW * calcW);

//         var posx = config.x + config.disX - calcW;
//         var posy = config.y + config.disY - calcH;

//         var wx = 2 * calcW;
//         var hy = 2 * calcH;

//         if (config.stepClear <= radius) {
//             ctx.clearRect(posx, posy, wx, wy);
//             stepClear += 1;
//             this.clearArc();
//         }
//     }
// };
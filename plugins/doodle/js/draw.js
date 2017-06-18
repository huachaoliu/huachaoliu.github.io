window.onload = function () {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        // ctx.fillStyle = 'rgb(200, 0, 0)';
        // ctx.fillRect(10, 10, 55, 50);

        // ctx.fillStyle = 'rgba(0, 0, 200, .5)';
        // ctx.fillRect(30, 30, 55, 50);

        //ctx.fillRect(x(顶点横坐标), y(顶点纵坐标), w(宽度), h(高度));
        //绘制一个填充的矩形.

        //strokeRect(x, y, w, h);
        //绘制一个矩形边框.

        //clearRect(x, y, w, h);
        //清除指定矩形区域，让清除部分完全透明.

        // ctx.fillRect(25, 25, 100,100);
        // ctx.clearRect(35, 35, 80, 80);
        // ctx.strokeRect(50, 50, 50, 50);

        // ctx.beginPath();
        // ctx.moveTo(40, 40); //(x1, y1);
        // ctx.lineTo(15, 80); //(x2, y2);
        // ctx.lineTo(65, 80); //(x3, y3);
        // ctx.fill();

        // ctx.beginPath();

        // ctx.arc(75, 75, 50, 0, Math.PI*2, true);
        // ctx.moveTo(110, 75);

        // ctx.arc(75, 75, 35, 0, Math.PI, false);
        // ctx.moveTo(65, 65);

        // ctx.arc(60, 65, 5, 0, Math.PI*2, true);
        // ctx.moveTo(95, 65);

        // ctx.arc(90, 65, 5, 0, Math.PI*2, true);
        // ctx.moveTo(90, 65);

        // ctx.stroke();

        ctx.fillRect(0, 0, 150, 150);   // 使用默认设置绘制一个矩形
        ctx.save();                  // 保存默认状态

        ctx.fillStyle = '#09F'       // 在原有配置基础上对颜色做改变
        ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形

        ctx.save();                  // 保存当前状态
        ctx.fillStyle = '#FFF'       // 再次改变颜色配置
        ctx.globalAlpha = 0.5;
        ctx.fillRect(30, 30, 90, 90);   // 使用新的配置绘制一个矩形

        ctx.restore();               // 重新加载之前的颜色状态
        ctx.fillRect(45, 45, 60, 60);   // 使用上一次的配置绘制一个矩形

        ctx.restore();               // 加载默认颜色配置
        ctx.fillRect(60, 60, 30, 30);   // 使用加载的配置绘制一个矩形
    }
};
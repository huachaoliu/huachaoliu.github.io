var Grid = Grid || (function () {
	//初始化游戏画布，定义一些共有方法
	var Grid = function (size){
		//size 单个方块的尺寸
		return this.init(size);
	};
	
	Grid.prototype.init = function (size) {
		var grid = Grid.factory("grid");
		Grid.update(grid, size);
		return grid;
	}
	
	Grid.update = function (grid, size) {
		var point = getXY(size);
		Grid.setStyle(grid, {
			width: point.x,
			height: point.y
		});
	}
	
	Grid.factory = function (className, type){
		type = type || "div";
		var dom = document.createElement(type);
		if (className) {
			dom.classList.add(className);
		}
		return dom;
	}
	
	Grid.add = function (source, domList) {
		for (var i = 0; i < domList.length; i++) {
			if (domList[i]) {
				source.appendChild(domList[i])
			}
		}
		return source;
	}
	
	Grid.suffixPx = ["left", "top", "width", "height"];
	
	Grid.setStyle = function (source, json) {
		for (var p in json) {
			if (Grid.suffixPx.indexOf(p) > -1) {
				source.style[p] = json[p] + "px";
			} else {
				source.style[p] = json[p];
			}
		}
		return source;
	}
	
	function getXY (size){
		var winw = window.innerWidth;
		var winh = window.innerHeight;
		var x = Math.floor(winw / size);
		var y = Math.floor(winh / size);
		var w = x * size;
		var h = y * size;
		var point = {
			x: checkPoint(w, winw, size),
			y: checkPoint(h, winh, size)
		}
		return point;
	}
	
	function checkPoint(source, target, size){
		if (source >= target) {
			source -= size;
			checkPoint(source, target, size);
		}
		return source;
	}
	
	return Grid;
}())
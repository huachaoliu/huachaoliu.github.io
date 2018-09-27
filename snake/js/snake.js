var Snake = Snake || (function () {

	var D_LEFT = "left";
	var D_RIGTH = "right";
	var D_UP = "up";
	var D_DOWN = "down";
	var DEFAULT_COLOR = "default";
	var SINGLE_COLOR = "single";
	var MULTIPLE_COLOR = "multiple"
	var winW = window.innerWidth;
	var winH = window.innerHeight;
	var colors = '0123456789abcdef';
	var cl = colors.length;
	var Snake = function (board, options) {
		//basic configuration
		var configuration = {
			speed: 200,
			size: 15,
			length: 3,
			color: DEFAULT_COLOR
		}
		this.color;
		this.score = 0;
		this.timer = null;
		this.moved = false;
		this.turned = false;
		this.direction;
		this.prevDirection;
		this.board = board;
		this.snake = [];
		this.food;
		this.position;
		this.message;
		this.scopeCache;
		this.config = Snake.extend(configuration, options);
		this.scope = Snake.getScope(this.config.length);
		this.grid = new Grid(this.config.size);
		this.board.appendChild(this.grid);
		this.init(this.config);
	}

	Snake.extend = function (source, options) {
		for (var p in options) {
			if (source.hasOwnProperty(p)) {
				source[p] = options[p];
			}
		}
		return source;
	}

	Snake.getScope = function (length) {
		var scope = [];
		for (var i = 0; i < length; i++) {
			scope.push([i, 0]);
		}
		return scope;
	}

	Snake.getColor = function () {
		var rgb = '';
		for (var i = 0; i < 6; i++) {
			var str = colors[Math.floor(Math.random() * cl)];
			rgb += str;
		}
		return '#' + rgb;
	}

	Snake.on = function (source, type, handle, capture) {
		if (window.addEventListener) {
			source.addEventListener(type, handle, capture);
		} else if (window.attachEvent) {
			source.attachEvent("on" + type, handle);
		}
	}

	Snake.off = function (source, type, handle) {
		if (window.removeEventListener) {
			source.removeAttribute(type, handle);
		} else if (window.detachEvent) {
			source.detachEvent("on" + type, handle);
		}
	}

	Snake.getXY = function (size, scope) {
		var maxX = Math.floor(winW / size);
		var maxY = Math.floor(winH / size);
		var x = Math.floor(Math.random() * maxX);
		var y = Math.floor(Math.random() * maxY);
		var checked = false;
		for (var i = 0, l = scope.length; i < l; i++) {
			if (x === scope[i][0] && y === scope[i][1]) {
				checked = true;
				break;
			}
		}
		if (checked) {
			Snake.getXY(size, scope);
		} else {
			return {
				x: x * size,
				y: y * size
			}
		}
	}

	Snake.prototype.init = function (params) {
		var self = this;
		this.layout();
		window.onresize = function () {
			Grid.update(self.grid, params.size);
			self.updateFoodPlace();
		}
	}

	Snake.prototype.loadSnake = function (info) {
		this.scope = info.scope;
		this.length = info.length;
	}

	Snake.prototype.layout = function () {
		this.message = Grid.factory("message");
		this.food = Grid.factory("food");
		this.updateFoodPlace();
		var config = this.config;
		this.color = config.color === DEFAULT_COLOR ? "#fff" : Snake.getColor();
		Grid.add(this.grid, [this.message, this.food]);
		for (var i = 0, l = this.scope.length; i < l; i++) {
			var box = Grid.factory("box");
			if (config.color === MULTIPLE_COLOR) {
				this.color = Snake.getColor();
			}
			Grid.setStyle(box, {
				background: this.color,
				width: config.size,
				height: config.size,
				left: this.scope[i][0] * config.size,
				top: this.scope[i][1] * config.size
			});

			this.snake.push(box);
			this.grid.appendChild(box);
		}
	}

	Snake.prototype.updateFoodPlace = function () {
		var position = Snake.getXY(this.config.size, this.scope);
		if (!position) {
			position = Snake.getXY(this.config.size, this.scope);
		}
		this.position = position;
		Grid.setStyle(this.food, {
			width: this.config.size,
			height: this.config.size,
			left: this.position.x,
			top: this.position.y
		});
	}

	Snake.prototype.start = function () {
		var self = this;
		this.direction = D_RIGTH;
		this.message.textContent = "";
		this.keyEventHandler();
		this.timer = setInterval(function () {
			self.scopeCache = JSON.parse(JSON.stringify(self.scope));
			self.render();
		}, this.config.speed)
	}

	Snake.prototype.stop = function () {
		window.clearInterval(this.timer);
		this.turned = false;
		if (!this.moved) {
			this.message.textContent = this.score;
		}
		Snake.off(document.body, "keydown");
	}

	Snake.prototype.render = function () {
		var len = this.scope.length;
		var turnedPoint = this.scope[len - 1];
		var nextPoint;
		var eatFood = true;
		for (var i = 0; i < len; i++) {
			switch (this.direction) {
				case D_RIGTH:
					nextPoint = [turnedPoint[0] + 1, turnedPoint[1]];
					break;
				case D_DOWN:
					nextPoint = [turnedPoint[0], turnedPoint[1] + 1];
					break;
				case D_LEFT:
					nextPoint = [turnedPoint[0] - 1, turnedPoint[1]];
					break;
				case D_UP:
					nextPoint = [turnedPoint[0], turnedPoint[1] - 1];
					break;
				default:
					nextPoint = [turnedPoint[0] + 1, turnedPoint[1]];
			}

			var checkedFood = this.checkPoint({
				x: nextPoint[0] * this.config.size,
				y: nextPoint[1] * this.config.size
			}, [[this.position.x, this.position.y]])

			if (checkedFood) {
				this.turned = false;
				var box = Grid.factory("box");
				if (this.config.color === MULTIPLE_COLOR) {
					this.color = Snake.getColor();
				}
				Grid.setStyle(box, {
					background: this.color,
					width: this.config.size,
					height: this.config.size,
					left: this.position.x,
					top: this.position.y
				});
				this.score += 1;
				this.grid.appendChild(box);
				this.scope.unshift(nextPoint);
				this.updateFoodPlace();
				this.snake.push(box);
			}
			if (this.scope[i + 1]) {
				this.turned = false;
				this.scope[i] = this.scope[i + 1];
				this.scope[i + 1] = nextPoint;
				this.checkBound(nextPoint)
				this.config.speed -= 20;
			}
			Grid.setStyle(this.snake[i], {
				left: this.scope[i][0] * this.config.size,
				top: this.scope[i][1] * this.config.size
			})
		}
		var checkedSelf = this.checkPoint({
			x: nextPoint[0],
			y: nextPoint[1]
		}, this.scopeCache);
		if (checkedSelf) {
			this.stop();
		}
	}

	Snake.prototype.checkPoint = function (point, scope) {
		var checked = false;
		for (var i = 0, l = scope.length; i < l; i++) {
			if (point.x === scope[i][0] && point.y === scope[i][1]) {
				checked = true;
				break;
			}
		}
		return checked;
	}

	Snake.prototype.checkBound = function (point) {
		var hited = false;
		var maxX = Math.floor(winW / this.config.size);
		var maxY = Math.floor(winH / this.config.size);
		switch (this.direction) {
			case D_RIGTH:
				if (point[0] > maxX - 1) hited = true;
				break;
			case D_DOWN:
				if (point[1] > maxY - 1) hited = true;
				break;
			case D_LEFT:
				if (point[0] < 0) hited = true;
				break;
			case D_UP:
				if (point[1] < 0) hited = true;
				break;
		}
		if (hited) {
			this.stop();
		}
	}

	Snake.prototype.keyEventHandler = function () {
		Snake.on(document.body, "keydown", e => {
			if (this.turned) return;
			this.prevDirection = this.direction;
			switch (e.keyCode) {
				case 37:
					this.prevDirection !== D_RIGTH && (this.direction = D_LEFT);
					break;
				case 38:
					this.prevDirection !== D_DOWN && (this.direction = D_UP);
					break;
				case 39:
					this.prevDirection !== D_LEFT && (this.direction = D_RIGTH);
					break;
				case 40:
					this.prevDirection !== D_UP && (this.direction = D_DOWN);
					break;
				default:
					this.direction = D_RIGTH;
			}
			this.turned = true;
		})
	}

	return Snake;
} ())
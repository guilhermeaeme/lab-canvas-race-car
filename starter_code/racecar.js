function RaceCar() {
	this.canvas = document.getElementById('game-board-canvas'),
	this.ctx = this.canvas.getContext('2d'),
	this.linesStart = -45,
	this.frames = 0,
	this.score = 0;

	this.startGame = function() {
		this.stopGame();

		this.drawRoad();
		this.drawCar();

		raceCarInterval = setInterval(function(){
			raceCar.update();
		}, 20);
	},

	this.stopGame = function() {
		clearInterval(raceCarInterval);
	},

	this.update = function() {
		this.frames += 1;

		raceCar.clear();
		raceCar.drawRoad();
		raceCar.drawCar();

		if(this.frames % 100 == 0) {
			var minWidth = 40;
			var maxWidth = 200;
			var width = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
			var minGap = 100;
			var maxGap = 250;
			var gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);

			var x2 = width + gap;
			var width2 = width + gap;
			if(x2 + width2 < this.canvas.width) {
				width2 = width2 + (this.canvas.width - width2);
			}

			obstacles.push(new Obstacle(0, width));
  			obstacles.push(new Obstacle(x2, width2));
		}

		for (i = 0; i < obstacles.length; i++) {
			obstacles[i].y += 1;
			obstacles[i].update();
		}

		var obstaclesLength = obstacles.length;

		obstacles = obstacles.filter(function(obstacle){
			return obstacle.y < raceCar.canvas.height;
		});

		var crashed = obstacles.some(function(obstacle) {
			return car.crashWith(obstacle);
		});

		if (obstaclesLength > obstacles.length) {
			this.score += 20;
		}

		this.drawScore();

		if (crashed) {
			raceCar.stopGame();
		}
	},

	this.clear = function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	this.drawRoad = function() {
		this.ctx.fillStyle = "green";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "#808080";
		this.ctx.fillRect(30, 0, this.canvas.width-60, this.canvas.height);

		this.ctx.lineWidth = 6;
		this.ctx.strokeStyle = "#FFFFFF";

		this.ctx.beginPath();

		this.ctx.moveTo(40, 0);
		this.ctx.lineTo(40, this.canvas.height);

		this.ctx.moveTo(this.canvas.width - 40, 0);
		this.ctx.lineTo(this.canvas.width - 40, this.canvas.height);

		this.ctx.stroke();
		this.ctx.closePath();

		this.drawLines();
	},

	this.drawLines = function() {
		var middle = this.canvas.width/2 - 3;
		this.ctx.beginPath();

		for(i=this.linesStart; i<this.canvas.height; i+=60) {
			this.ctx.moveTo(middle, i);
			this.ctx.lineTo(middle, i+30);
		}

		this.ctx.stroke();
		this.ctx.closePath();

		this.linesStart += 5;

		if(this.linesStart > 15) this.linesStart = -45;
	},

	this.drawCar = function() {
		car.update();
	},

	this.drawScore = function() {
		this.ctx.fillStyle = "#FFFF00";
		this.ctx.font = '16px sans';
		this.ctx.fillText("SCORE: " + this.score, 50, 20);
	},

	this.checkCommand = function(keycode) {
		if(keycode == 37) {
			car.x -= 10;

			if(car.x < 40) {
				car.x = 40;
			}
		}

		if(keycode == 39) {
			car.x += 10;

			if(car.x > ((this.canvas.width - 40) - car.width)) {
				car.x = ((this.canvas.width - 40) - car.width);
			}
		}
	}
};

function Car() {
	this.img = new Image();

	this.width = 80,
	this.height = 160,

	this.x = (raceCar.canvas.width/2) - (this.width/2),
	this.y = (raceCar.canvas.height) - (this.height+20),

	this.left   = function() { return this.x                 },
	this.right  = function() { return (this.x + this.width)  },
	this.top    = function() { return this.y                 },
	this.bottom = function() { return this.y + (this.height) },

	this.crashWith = function(obstacle) {
		return !((this.bottom() < obstacle.top())    ||
			(this.top()    > obstacle.bottom()) ||
			(this.right()  < obstacle.left())   ||
			(this.left()   > obstacle.right()))
	},

	this.update = function() {
		var that = this;

		this.img.src = 'images/car.png';
		// this.img.onload = function(){
			raceCar.ctx.drawImage(that.img, that.x, that.y, that.width, that.height);
		// };
	}
};

function Obstacle(x, width) {
	this.x = x,
	this.y = 0,
	this.height = 10,
	this.width = width,

	this.left   = function() { return this.x                 },
	this.right  = function() { return (this.x + this.width)  },
	this.top    = function() { return this.y                 },
	this.bottom = function() { return this.y + (this.height) },

	this.update = function() {
		this.y += 5;

		raceCar.ctx.beginPath();
		raceCar.ctx.fillStyle = "#FF0000";
		raceCar.ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};

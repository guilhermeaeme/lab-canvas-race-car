function RaceCar() {
	this.canvas = document.getElementById('game-board-canvas'),
	this.ctx = this.canvas.getContext('2d'),
	this.intervalId = null,
	this.linesStart = -45;

	this.startGame = function() {
		clearInterval(this.intervalId);

		this.drawRoad();
		this.drawCar();

		this.intervalId = setInterval(function(){
			raceCar.update();
		}, 20);
	},

	this.update = function() {
		raceCar.clear();
		raceCar.drawRoad();
		raceCar.drawCar();
	},

	this.clear = function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

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

	this.update = function() {
		var that = this;

		this.img.src = 'images/car.png';
		// this.img.onload = function(){
			raceCar.ctx.drawImage(that.img, that.x, that.y, that.width, that.height);
		// };

	}
};

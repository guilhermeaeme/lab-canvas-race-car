function RaceCar() {
	this.canvas = document.getElementById('game-board-canvas'),
	this.ctx = this.canvas.getContext('2d'),

	this.startGame = function() {
		this.drawRoad();
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

		var middle = this.canvas.width/2 - 3;

		for(i=15; i<this.canvas.height; i+=60) {
			this.ctx.moveTo(middle, i);
			this.ctx.lineTo(middle, i+30);
		}

		this.ctx.stroke();
		this.ctx.closePath();
	}
};

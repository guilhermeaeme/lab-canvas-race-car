var raceCar;
var raceCarInterval = null;
var car;
var obstacles = [];

window.onload = function() {
	document.getElementById("start-button").onclick = function() {
		startGame();
	};

	function startGame() {
		var gameBoard = document.getElementById('game-board');

		var canvas = document.createElement('canvas');
		canvas.id = 'game-board-canvas';
		canvas.width = 500;
		canvas.height = 600;

		gameBoard.innerHTML = '';
		gameBoard.appendChild(canvas);

		raceCar = new RaceCar();
		car = new Car();

		raceCar.startGame();
	}

	// startGame();
};

document.onkeydown = function (e) {
	if(raceCar && raceCar.checkCommand(e.keyCode)) {
		
	}
};

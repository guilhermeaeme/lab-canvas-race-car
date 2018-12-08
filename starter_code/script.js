var raceCar;
var car;
var obstacles = [];

window.onload = function() {
	document.getElementById("start-button").onclick = function() {
		startGame();
	};

	function startGame() {
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

var raceCar;

window.onload = function() {
	document.getElementById("start-button").onclick = function() {
		startGame();
	};

	function startGame() {
		raceCar = new RaceCar();

		raceCar.startGame();
	}

	startGame();
};

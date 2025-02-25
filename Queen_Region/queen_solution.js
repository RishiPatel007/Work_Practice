// -------------------- Utility Functions --------------------

function removeOneFromArray(arr, value) {
	// Removes first occurrence of value from array
	let index = arr.indexOf(value);
	if (index !== -1) {
		arr.splice(index, 1);
	}
	return arr;
}

function makeNullMatrix() {
	// Creates a gridSize x gridSize matrix initialized with null values
	let matrix = [];
	for (let i = 0; i < gridSize; i++) {
		let arr = [];
		for (let j = 0; j < gridSize; j++) {
			arr.push(null);
		}
		matrix.push(arr);
	}
	return matrix;
}

function indexFromPosition(num) {
	// Converts linear position to 2D grid coordinates
	return [Math.floor(num / gridSize), num % gridSize];
}

// -------------------- Game State Variables --------------------

let regionOccupied = new Set();
let rowOccupied = new Set();
let columnOccupied = new Set();
let edgeOccupied = [];
let map;
let gridSize;
let copyArray;
let totalQueen = 0;
let hintArray = [];
let timeInSeconds = 0;
let time = { seconds: 0, minutes: 0, hours: 0 };
let intervalId = 0

// -------------------- Game Logic: Validation Functions --------------------

function checkValidityOfCell(obj, loc, region, row, column, edge) {
	// Checks if a queen can be placed at the given location
	return (
		region.has(obj.color) ||
		row.has(loc[0]) ||
		column.has(loc[2]) ||
		edge.includes(loc)
	);
}

function checkEdgeValidity(edges, loc) {
	// Checks if the location is in the diagonal attack range of any queen
	return edges.includes(loc);
}

function updateValidity(obj, loc, region, row, column, edge) {
	// Updates the game state after placing a queen
	region.add(obj.color);
	row.add(loc[0]);
	column.add(loc[2]);

	let arr = [
		[loc[0] - 1, loc[2] - 1],
		[loc[0] - 1, parseInt(loc[2]) + 1],
		[parseInt(loc[0]) + 1, loc[2] - 1],
		[parseInt(loc[0]) + 1, parseInt(loc[2]) + 1],
	];

	for ([x, y] of arr) {
		if (x != -1 && x != gridSize && y != -1 && y != gridSize) {
			edge.push(`${x},${y}`);
		}
	}
}

function updateEdgeValidity(markedEdges, row, col) {
	// Updates diagonal attack positions for solution generation
	let arr = [
		[row + 1, col + 1],
		[row - 1, col + 1],
	];

	for (let [x, y] of arr) {
		if (x != -1 && x != gridSize && y != -1 && y != gridSize) {
			markedEdges.push(`${x},${y}`);
		}
	}
}

// -------------------- Game Logic: Board Generation --------------------

function addColorFromBoundry(matrix, cell) {
	// Assigns color to a cell based on neighboring cells
	let [row, col] = indexFromPosition(cell, gridSize);
	let boundries = [
		[row - 1, col],
		[row, col + 1],
		[row + 1, col],
		[row, col - 1],
	];

	let tempColor = new Set();
	for ([x, y] of boundries) {
		if (
			x >= 0 &&
			x < gridSize &&
			y >= 0 &&
			y < gridSize &&
			matrix[x][y] != null
		) {
			tempColor.add(matrix[x][y]);
		}
	}
	let uniqueColor = [...tempColor];
	if (uniqueColor.length != 0) {
		matrix[row][col] =
			uniqueColor[Math.floor(Math.random() * uniqueColor.length)];
		return true;
	} else {
		return false;
	}
}

function generateRandomSolutionWithoutRegions(
	matrix,
	availableRows,
	markedEdges,
	colors
) {
	// Generates initial queen positions without considering regions
	for (let col = 0; col < gridSize; col++) {
		let row;
		let attempts = 0;
		while (true) {
			if (attempts == 10) {
				return false;
			}
			index = Math.floor(Math.random() * availableRows.length);
			row = availableRows[index];
			loc = `${row},${col}`;
			if (!checkEdgeValidity(markedEdges, loc)) {
				availableRows.splice(index, 1);
				updateEdgeValidity(markedEdges, row, col);
				break;
			}
			attempts++;
		}
		matrix[row][col] = colors.pop();
	}
	return true;
}

function insertRegions(matrix, availablePosition) {
	// Fills remaining cells with colors to create regions
	while (availablePosition.length > 0) {
		let cellIndex = Math.floor(Math.random() * availablePosition.length);
		let cell = availablePosition[cellIndex];
		let [cellRow, cellCol] = indexFromPosition(cell);
		if (matrix[cellRow][cellCol] != null) {
			availablePosition.splice(cellIndex, 1);
			continue;
		}
		if (addColorFromBoundry(matrix, cell)) {
			availablePosition.splice(cellIndex, 1);
		}
	}
}

function getRandomBoard() {
	// Generates a complete random board with solution
	let matrix;
	let availablePosition;
	while (true) {
		matrix = makeNullMatrix();
		let availableRows = [];
		for (let i = 0; i < gridSize; i++) {
			availableRows.push(i);
		}

		let markedEdges = [];
		availablePosition = [];
		let colors = [
			"orange",
			"purple",
			"teal",
			"cyan",
			"lavender",
			"blue",
			"red",
			"yellow",
			"green",
		];
		for (let i = 0; i < gridSize * gridSize; i++) {
			availablePosition.push(i);
		}
		if (
			generateRandomSolutionWithoutRegions(
				matrix,
				availableRows,
				markedEdges,
				colors
			)
		) {
			break;
		}
	}
	copyArray = JSON.parse(JSON.stringify(matrix));
	insertRegions(matrix, availablePosition);
	return matrix;
}

function makeBoard() {
	// Creates the game board with initial state
	const map = new Map();
	let colors = getRandomBoard();

	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			map.set(`${i},${j}`, { color: colors[i][j], haveQueen: false });
		}
	}
	return map;
}

// -------------------- Game Logic: Gameplay Functions --------------------

function removeCell(cell, map, region, row, column, edges) {
	// Removes a queen from the board and updates game state
	let r = parseInt(cell[0]);
	let c = parseInt(cell[1]);
	let x = map.get(`${r},${c}`);
	x.haveQueen = false;
	totalQueen--;
	row.delete(`${r}`);
	column.delete(`${c}`);
	region.delete(x.color);
	let removeEdges = [
		`${r - 1},${c - 1}`,
		`${r + 1},${c + 1}`,
		`${r - 1},${c + 1}`,
		`${r + 1},${c - 1}`,
	];
	for (let edge of removeEdges) {
		removeOneFromArray(edges, edge);
	}
}

function askQuestionsTillTrue(map, region, row, column, edge, id) {
	// Validates queen placement attempt
	let obj;
	let loc = id;
	let queenPlaced = false;

	obj = map.get(loc);
	if (!checkValidityOfCell(obj, loc, region, row, column, edge)) {
		queenPlaced = true;
	}

	return { obj, loc, queenPlaced };
}

function getHint() {
	let removeArray = [];
	let hintCol;
	for (let col = 0; col < gridSize; col++) {
		let isColEmpty = true; // checks if this column is empty or not (in both cases removed and not removed)
		for (let row = 0; row < gridSize; row++) {
			let x = map.get(`${row},${col}`);
			if (hintArray.length < gridSize && copyArray[row][col] != null) {
				hintArray.push([row, col]);
			}
			if (x.haveQueen) {
				if (copyArray[row][col] == null) {
					removeArray.push([row, col]);
					isColEmpty = true; // if removed , that column is empty
				} else {
					isColEmpty = false; // if not removed and this column have queen than column is not empty
				}
			}
		}
		if (hintCol === undefined && isColEmpty) {
			hintCol = col;
		}
	}
	return [removeArray, hintCol];
}

// -------------------- UI Event Handlers --------------------

function handleCellClick(event) {
	// Handles cell clicks for queen placement/removal
	if (event.target.className == "cell") {
		let id = event.target.id;
		if (map.get(id).haveQueen) {
			removeCell(
				[id[0], id[2]],
				map,
				regionOccupied,
				rowOccupied,
				columnOccupied,
				edgeOccupied
			);
			event.target.innerHTML = "";
			return;
		}
		let { obj, loc, queenPlaced } = askQuestionsTillTrue(
			map,
			regionOccupied,
			rowOccupied,
			columnOccupied,
			edgeOccupied,
			id
		);
		if (queenPlaced) {
			updateValidity(
				obj,
				loc,
				regionOccupied,
				rowOccupied,
				columnOccupied,
				edgeOccupied
			);
			map.set(loc, { ...obj, haveQueen: true });
			totalQueen++;
			event.target.textContent = "👑";
			messageBox.textContent = "";
		} else {
			messageBox.style.color = "red";
			messageBox.textContent = "! You cannot place a queen there !";
		}
	}
	if (totalQueen == gridSize) {
		messageBox.textContent = `! Congratulation You Solved it in ${timer.textContent}!`;
		timer.textContent = ""
		messageBox.style.color = "green";
		board.removeEventListener("click", handleCellClick);
		hintButton.removeEventListener("click", handleHint);
		clearInterval(intervalId)
	}
}

function handleHint() {
	// Handles hint button clicks
	let [deleteCells, hintCol] = getHint();
	for (cell of deleteCells) {
		removeCell(
			cell,
			map,
			regionOccupied,
			rowOccupied,
			columnOccupied,
			edgeOccupied
		);
	}
	updateBoard();
	let hint = hintArray[hintCol];

	messageBox.textContent = `You were right upto this point ,
Try adding : ${hint}`;
	messageBox.style.color = "purple";
}

function handleUserInput() {
	// Validates and handles user input for grid size
	if (inputBox.value >= 5 && inputBox.value <= 9) {
		startGame();
	} else {
		messageBox.textContent = "Please enter number between 5 and 9";
		messageBox.style.color = "red";
	}
}

// -------------------- Game Management Functions --------------------

function startGame() {
	// Initializes a new game
	resetBoard();
	
	startTime()
	messageBox.textContent = "";
	gridSize = inputBox.value;
	board.style.height = gridSize * 65 + "px";
	board.style.width = gridSize * 65 + "px";
	map = makeBoard();
	board.addEventListener("click", handleCellClick);
	hintButton.addEventListener("click", handleHint);
	updateBoard();
}

function resetBoard() {
	// Resets all game state variables
	map = undefined;
	gridSize = undefined;
	copyArray = undefined;
	totalQueen = 0;
	hintArray = [];
	board.innerHTML = "";
	regionOccupied = new Set();
	rowOccupied = new Set();
	columnOccupied = new Set();
	edgeOccupied = [];
	time = { seconds: 0, minutes: 0, hours: 0 };
	clearInterval(intervalId)
}

function updateBoard() {
	// Updates the visual representation of the board
	board.innerHTML = "";
	for (let i = 0; i < gridSize; i++) {
		let row = document.createElement("div");
		row.className = "row";
		for (let j = 0; j < gridSize; j++) {
			let obj = map.get(`${i},${j}`);

			let cell = document.createElement("div");
			cell.classList.add("cell");
			cell.style.background = obj.color;
			cell.id = `${i},${j}`;
			if (obj.haveQueen) {
				cell.textContent = "👑";
			}
			row.appendChild(cell);
		}
		board.appendChild(row);
	}
}

// -------------------- Timer Functions --------------------
function fixTwoDigitTime(num) {
	if (num < 10) {
		return `0${num}`;
	}
	return `${num}`;
}

function updateTime() {
	timer.textContent = `${fixTwoDigitTime(time.hours)}:${fixTwoDigitTime(
		time.minutes
	)}:${fixTwoDigitTime(time.seconds)}`;
}

function startTime() {
	intervalId = setInterval(() => {
		time.seconds++;
		if (time.seconds == 60) {
			time.seconds = 0;
			time.minutes++;
		}
		if (time.minutes == 60) {
			time.minutes = 0;
			time.hours++;
		}
		updateTime();
	}, 1000 * 1);
}
// -------------------- DOM Elements and Event Listeners --------------------

let inputBox = document.querySelector("#gridSizeInput");
let gameButton = document.querySelector("#gameGenerateButton");
let hintButton = document.querySelector("#hintButton");
let board = document.querySelector("#board");
let messageBox = document.querySelector("#message");
let timer = document.querySelector("#timer");

gameButton.addEventListener("click", handleUserInput);

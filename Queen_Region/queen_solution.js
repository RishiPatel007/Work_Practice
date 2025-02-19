function removeOneFromArray(arr, value) {
	let index = arr.indexOf(value);
	if (index !== -1) {
		arr.splice(index, 1);
	}
	return arr;
}

function checkValidityOfCell(obj, loc, region, row, column, edge) {
	return (
		region.has(obj.color) ||
		row.has(loc[0]) ||
		column.has(loc[2]) ||
		edge.includes(loc)
	);
}

function checkEdgeValidity(edges, loc) {
	return edges.includes(loc);
}

function updateValidity(obj, loc, region, row, column, edge) {
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

function removeCell(cell, map, region, row, column, edges) {
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
	let obj;
	let loc = id;
	let queenPlaced = false;

	obj = map.get(loc);
	if (!checkValidityOfCell(obj, loc, region, row, column, edge)) {
		queenPlaced = true;
	}

	return { obj, loc, queenPlaced };
}

function makeNullMatrix() {
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
	return [Math.floor(num / gridSize), num % gridSize];
}

function addColorFromBoundry(matrix, cell) {
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
	const map = new Map();
	let colors = getRandomBoard();

	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			map.set(`${i},${j}`, { color: colors[i][j], haveQueen: false });
		}
	}
	return map;
}

function getHint() {
	let bool = false;
	let removeArray = [];
	for (let col = 0; col < gridSize; col++) {
		for (let row = 0; row < gridSize; row++) {
			let x = map.get(`${row},${col}`);
			if (copyArray[row][col] != null) {
				hintArray.push([row, col]);
			}
			if (x.haveQueen) {
				if (copyArray[row][col] == null && !bool) {
					bool = true;
					x;
				}
				if (bool) {
					removeArray.push([row, col]);
				}
			}
		}
	}
	return removeArray;
}

function handleCellClick(event) {
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
		// This function is checking until user entered proper queen
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
		messageBox.textContent = "! Congratulation You Win !";
		messageBox.style.color = "green";
		board.removeEventListener("click", handleCellClick);
		hintButton.removeEventListener("click", handleHint);
	}
}

function startGame() {
	resetBoard();
	messageBox.textContent = "";
	board.style.height = inputBox.value * 65 + "px";
	board.style.width = inputBox.value * 65 + "px";
	gridSize = inputBox.value;
	map = makeBoard();
	board.addEventListener("click", handleCellClick);
	hintButton.addEventListener("click" , handleHint);
	updateBoard();
}
let regionOccupied = new Set();
let rowOccupied = new Set();
let columnOccupied = new Set();
let edgeOccupied = [];
let map;
let gridSize;
let copyArray;
let totalQueen = 0;
let hintArray = [];

// Taking input from the user :

function updateBoard() {
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
			if(obj.haveQueen){
				cell.textContent = "👑"
			}
			row.appendChild(cell);
		}
		board.appendChild(row);
	}
}

function resetBoard() {
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
}

function handleUserInput() {
	if (inputBox.value >= 5 && inputBox.value <= 9) {
		startGame();
	} else {
		messageBox.textContent = "Please enter number between 5 and 9";
		messageBox.style.color = "red";
	}
}

function handleHint() {
	let deleteCells = getHint();
	for (cell of deleteCells) {
		removeCell(cell, map, regionOccupied, rowOccupied, columnOccupied, edgeOccupied);
	}
	updateBoard();
	messageBox.textContent = `You were right upto this point ,
Try adding :, ${hintArray[totalQueen]}`;
	messageBox.style.color = "purple"
}

let inputBox = document.querySelector("#gridSizeInput");
let gameButton = document.querySelector("#gameGenerateButton");
let hintButton = document.querySelector("#hintButton");
let board = document.querySelector("#board");
let messageBox = document.querySelector("#message");
gameButton.addEventListener("click", handleUserInput);
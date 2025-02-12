const readline = require("readline-sync");

function printMatrix(map) {
	for (let i = 0; i < 5; i++) {
		let line = "";
		for (let j = 0; j < 5; j++) {
			let obj = map.get(`${i},${j}`);
			line += obj.color.toUpperCase()[0];
			if (obj.haveQueen) {
				line += "#";
			} else {
				line += " ";
			}
			line += " ";
		}
		console.log("______________");
		console.log(line);
	}
	console.log("______________");
}

function checkValidityOfCell(obj, loc, region, row, column, edge) {
	return (
		region.includes(obj.color) ||
		row.includes(loc[0]) ||
		column.includes(loc[2]) ||
		edge.includes(loc)
	);
}


function checkEdgeValidity(edges, loc) {
	return edges.includes(loc);
}

function updateValidity(obj, loc, region, row, column, edge) {
	region.push(obj.color);
	row.push(loc[0]);
	column.push(loc[2]);

	let arr = [
		[loc[0] - 1, loc[2] - 1],
		[loc[0] - 1, parseInt(loc[2]) + 1],
		[parseInt(loc[0]) + 1, loc[2] - 1],
		[parseInt(loc[0]) + 1, parseInt(loc[2]) + 1],
	];

	for ([x, y] of arr) {
		if (x != -1 && x != 5 && y != -1 && y != 5) {
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
		if (x != -1 && x != 5 && y != -1 && y != 5) {
			markedEdges.push(`${x},${y}`);
		}
	}
}

function askQuestionsTillTrue(map, region, row, column, edge) {
	let obj;
	let loc;
	while (true) {
		if (!loc) {
			loc = readline.question("Enter location in form of i,j : ");
		} else {
			loc = readline.question("Wrong !!! Try Again : ");
		}
		obj = map.get(loc);
		if (!checkValidityOfCell(obj, loc, region, row, column, edge)) {
			break;
		}
	}
	return { obj, loc };
}

function makeNullMatrix() {
	let matrix = [];
	for (let i = 0; i < 5; i++) {
		let arr = [];
		for (let j = 0; j < 5; j++) {
			arr.push(null);
		}
		matrix.push(arr);
	}
	return matrix;
}

function indexFromPosition(num) {
	return [Math.floor(num / 5), num % 5];
}

function addColorFromBoundry(matrix, cell) {
	let [row, col] = indexFromPosition(cell);
	let boundries = [
		[row - 1, col],
		[row, col + 1],
		[row + 1, col],
		[row, col - 1],
	];

	let tempColor = [];
	for ([x, y] of boundries) {
		if (x >= 0 && x < 5 && y >= 0 && y < 5 && matrix[x][y] != null) {
			tempColor.push(matrix[x][y]);
		}
	}
	if (tempColor.length != 0) {
		matrix[row][col] =
			tempColor[Math.floor(Math.random() * tempColor.length)];
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
	for (let col = 0; col < 5; col++) {
		let row;
		while (true) {
			index = Math.floor(Math.random() * availableRows.length);
			row = availableRows[index];
			loc = `${row},${col}`;
			if (!checkEdgeValidity(markedEdges, loc)) {
				availableRows.splice(index, 1);
				updateEdgeValidity(markedEdges, row, col);
				break;
			}
		}
		matrix[row][col] = colors.pop();
	}
}

function insertRegions(matrix , availablePosition) {
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
	let matrix = makeNullMatrix();
	let availableRows = [0, 1, 2, 3, 4];
	let markedEdges = [];
	let availablePosition = [];
	let colors = ["green", "blue", "red", "white", "yellow"];
	for (let i = 0; i < 25; i++) {
		availablePosition.push(i);
	}

	generateRandomSolutionWithoutRegions(
		matrix,
		availableRows,
		markedEdges,
		colors
	);
	console.log("SOLUTION FOR THIS RANDOM PUZZLE")
	console.log(matrix);

	insertRegions(matrix , availablePosition);
	return matrix;
}


function makeBoard() {
	const map = new Map();
	let colors = getRandomBoard();

	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			map.set(`${i},${j}`, { color: colors[i][j], haveQueen: false });
		}
	}
	return map;
}

function startGame() {
	let regionOccupied = [];
	let rowOccupied = [];
	let columnOccupied = [];
	let edgeOccupied = [];

	const map = makeBoard();

	printMatrix(map);
	for (let i = 0; i < 5; i++) {
		let { obj, loc } = askQuestionsTillTrue(
			map,
			regionOccupied,
			rowOccupied,
			columnOccupied,
			edgeOccupied
		);
		updateValidity(
			obj,
			loc,
			regionOccupied,
			rowOccupied,
			columnOccupied,
			edgeOccupied
		);
		map.set(loc, { ...obj, haveQueen: true });

		printMatrix(map);
	}
	console.log("You are correct");
}

startGame();
// findSolution();
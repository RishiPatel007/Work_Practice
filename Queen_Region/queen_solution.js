const readline = require("readline-sync");
function printMatrix(map) {
	let line = "     ";
	for (let i = 0; i < gridSize; i++) {
		line += i + "      ";
	}
	console.log(line);

	for (let i = 0; i < gridSize; i++) {
		let line = "";
		line += i + " | ";
		for (let j = 0; j < gridSize; j++) {
			let obj = map.get(`${i},${j}`);
			line += obj.color;
			if (obj.haveQueen) {
				line += "👑";
			} else {
				line += "  ";
			}
			line += "   ";
		}
		console.log();
		console.log(line);
	}
	console.log();
}

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

function printSolutionMatrix(matrix) {
	const cellWidth = 12;
	const emptyCell = " ".repeat(cellWidth);
	const numRows = matrix.length;
	const numCols = matrix[0].length;

	const colIndices = Array.from({ length: numCols }, (_, i) =>
		i.toString().padStart(cellWidth)
	);
	console.log(" ".repeat(6) + colIndices.join(" | "));

	const rowSeparator = "-".repeat(numCols * (cellWidth + 3));
	console.log(rowSeparator);

	for (let i = 0; i < numRows; i++) {
		const rowLabel = i.toString().padEnd(6);
		console.log(
			rowLabel +
				matrix[i]
					.map((cell, j) =>
						cell === null
							? emptyCell
							: `(${i},${j}) ${cell}`.padStart(cellWidth)
					)
					.join(" | ")
		);
		console.log(rowSeparator);
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


function removeCell(cell , map , region , row , column , edge){
	let r = cell[0]
	let c = cell[1]
	let x = map.get(`${r},${c}`)
	x.haveQueen = false
	totalQueen--
	row.delete(`${r}`)
	column.delete(`${c}`)
	region.delete(x.color)

	let edge1 = `${r-1},${c-1}`
	let edge2 = `${r+1},${c+1}`
	let edge3 = `${r-1},${c+1}`
	let edge4 = `${r+1},${c-1}`

	removeOneFromArray(edge , edge1)
	removeOneFromArray(edge , edge2)
	removeOneFromArray(edge , edge3)
	removeOneFromArray(edge , edge4)
}


function askQuestionsTillTrue(map, region, row, column, edge) {
	let obj;
	let loc;
	while (true) {
		if (!loc) {
			loc = readline.question(
				"Enter location in form of i,j (or type hint to get a hint!!!): "
			);
			if (loc == "hint") {
				let deleteCells = getHint();
				for(cell of deleteCells){
					removeCell(cell , map , region , row , column , edge)
				}
				console.log("You were right upto this point");
				printMatrix(map);
				console.log("Try adding :",hintArray[totalQueen])
				loc = "";
				continue;
			}
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
		let colors = ["⬛", "🟧", "🟪", "🟫", "⬜", "🟦", "🟥", "🟨", "🟩"];
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

	console.log("SOLUTION FOR THIS RANDOM PUZZLE");
	printSolutionMatrix(matrix);
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
				hintArray.push([row , col])
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
	return removeArray
}

function startGame() {
	let regionOccupied = new Set();
	let rowOccupied = new Set();
	let columnOccupied = new Set();
	let edgeOccupied = [];
	while (true) {
		gridSize = parseInt(
			readline.question("Please enter grid size between 5 to 9 : ")
		);
		if (gridSize >= 5 && gridSize <= 9) {
			break;
		}
	}
	map = makeBoard();

	printMatrix(map);
	while(totalQueen <gridSize) {
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
		totalQueen++
		printMatrix(map);
	}
	console.log(
		"👑👑👑👑👑👑👑👑👑👑👑👑👑 CONGRATULATIONS YOU ARE CORRECT 👑👑👑👑👑👑👑👑👑👑👑👑"
	);
}
let map;
let gridSize;
let copyArray;
let totalQueen = 0;
let hintArray = []
startGame();


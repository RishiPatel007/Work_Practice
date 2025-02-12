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

function makeBoard() {
	const map = new Map();
	let colors = [
		["green", "green", "red", "red", "purple"],
		["green", "green", "red", "red", "purple"],
		["green", "blue", "blue", "red", "purple"],
		["green", "blue", "yellow", "yellow", "yellow"],
		["blue", "blue", "yellow", "yellow", "yellow"],
	];

	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			map.set(`${i},${j}`, { color: colors[i][j], haveQueen: false });
		}
	}
	return map;
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

function askQuestionsTillTrue(map , region, row, column, edge) {
	let obj;
	let loc;
	while (true) {
		if (!loc) {
			loc = readline.question("Enter location in form of i,j : ");
		} else {
			loc = readline.question("Wrong !!! Try Again : ");
		}
		obj = map.get(loc);
		if (
			!checkValidityOfCell(
				obj,
				loc,
				region,
				row,
				column,
				edge
			)
		) {
			break;
		}
	}
	return {obj , loc}
}

function startGame() {
	let regionOccupied = [];
	let rowOccupied = [];
	let columnOccupied = [];
	let edgeOccupied = [];

	const map = makeBoard();

	printMatrix(map);
	for (let i = 0; i < 5; i++) {
		let {obj , loc} = askQuestionsTillTrue(map , regionOccupied , rowOccupied , columnOccupied , edgeOccupied)
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
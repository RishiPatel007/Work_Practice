const readline = require("readline-sync");

function printMatrix(map) {
	console.log("   0   1   2   3   4 ");
	console.log("  -----------------");
	for (let i = 0; i < 5; i++) {
		let line = `${i}|`;
		for (let j = 0; j < 5; j++) {
			let obj = map.get(`${i},${j}`);
			line += ` ${obj.color.toUpperCase()[0]}${
				obj.haveQueen ? "#" : " "
			} `;
		}
		console.log(line);
	}
	console.log("  -----------------");
}

const map = new Map();
const regionOccupied = [];
const rowOccupied = [];
const columnOccupied = [];
const edgeOccupied = [];

const gridData = [
	["green", "green", "red", "red", "purple"],
	["green", "green", "red", "red", "purple"],
	["green", "blue", "blue", "red", "purple"],
	["green", "blue", "yellow", "yellow", "yellow"],
	["blue", "blue", "yellow", "yellow", "yellow"],
];

for (let i = 0; i < 5; i++) {
	for (let j = 0; j < 5; j++) {
		map.set(`${i},${j}`, { color: gridData[i][j], haveQueen: false });
	}
}

printMatrix(map);

for (let i = 0; i < 5; i++) {
	let loc = readline.question("Enter location in form of i,j : ");
	let obj = map.get(loc);

	while (
		regionOccupied.includes(obj.color) ||
		rowOccupied.includes(loc[0]) ||
		columnOccupied.includes(loc[2]) ||
		edgeOccupied.includes(loc)
	) {
		loc = readline.question(
			"Wrong! Enter location in form of i,j AGAIN!!! : "
		);
		obj = map.get(loc);
	}

	regionOccupied.push(obj.color);
	rowOccupied.push(loc[0]);
	columnOccupied.push(loc[2]);

	let adjacentPositions = [
		[loc[0] - 1, loc[2] - 1],
		[loc[0] - 1, parseInt(loc[2]) + 1],
		[parseInt(loc[0]) + 1, loc[2] - 1],
		[parseInt(loc[0]) + 1, parseInt(loc[2]) + 1],
	];

	for (let [x, y] of adjacentPositions) {
		if (x >= 0 && x < 5 && y >= 0 && y < 5) {
			edgeOccupied.push(`${x},${y}`);
		}
	}

	map.set(loc, { ...obj, haveQueen: true });
	printMatrix(map);
}

console.log("You are correct");

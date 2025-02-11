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

const map = new Map();
let regionOccupied = [];
let rowOccupied = [];
let columnOccupied = [];
let edgeOccupied = [];

map.set(`0,0`, { color: "green", haveQueen: false });
map.set(`0,1`, { color: "green", haveQueen: false });
map.set(`0,2`, { color: "red", haveQueen: false });
map.set(`0,3`, { color: "red", haveQueen: false });
map.set(`0,4`, { color: "purple", haveQueen: false });

map.set(`1,0`, { color: "green", haveQueen: false });
map.set(`1,1`, { color: "green", haveQueen: false });
map.set(`1,2`, { color: "red", haveQueen: false });
map.set(`1,3`, { color: "red", haveQueen: false });
map.set(`1,4`, { color: "purple", haveQueen: false });

map.set(`2,0`, { color: "green", haveQueen: false });
map.set(`2,1`, { color: "blue", haveQueen: false });
map.set(`2,2`, { color: "blue", haveQueen: false });
map.set(`2,3`, { color: "red", haveQueen: false });
map.set(`2,4`, { color: "purple", haveQueen: false });

map.set(`3,0`, { color: "green", haveQueen: false });
map.set(`3,1`, { color: "blue", haveQueen: false });
map.set(`3,2`, { color: "yellow", haveQueen: false });
map.set(`3,3`, { color: "yellow", haveQueen: false });
map.set(`3,4`, { color: "yellow", haveQueen: false });

map.set(`4,0`, { color: "blue", haveQueen: false });
map.set(`4,1`, { color: "blue", haveQueen: false });
map.set(`4,2`, { color: "yellow", haveQueen: false });
map.set(`4,3`, { color: "yellow", haveQueen: false });
map.set(`4,4`, { color: "yellow", haveQueen: false });

printMatrix(map);

let bool = true;
for (let i = 0; i < 5; i++) {
	let loc = readline.question("Enter location in form of i,j : ");
	let obj = map.get(loc);
	while (true) {
		if (
			regionOccupied.includes(obj.color) ||
			rowOccupied.includes(loc[0]) ||
			columnOccupied.includes(loc[2]) ||
			edgeOccupied.includes(loc)
		) {
			loc = readline.question(
				"Wrong Enter location in form of i,j AGAIN!!! : "
			);
		} else {
			break;
		}
	}
	let arr = [];
	regionOccupied.push(obj.color);
	rowOccupied.push(loc[0]);
	columnOccupied.push(loc[2]);
	arr.push([loc[0] - 1, loc[2] - 1]);
	arr.push([loc[0] - 1, parseInt(loc[2]) + 1]);
	arr.push([parseInt(loc[0]) + 1, loc[2] - 1]);
	arr.push([parseInt(loc[0]) + 1, parseInt(loc[2]) + 1]);
	for (x of arr) {
		if (x[0] != -1 && x[0] != 5 && x[1] != -1 && x[1] != 5) {
			edgeOccupied.push(`${x[0]},${x[1]}`);
		}
	}
	map.set(loc, { ...obj, haveQueen: true });

	printMatrix(map);
}
if (bool) {
	console.log("You are correct");
} else {
	console.log("Wrong");
}

// Create and delete new folders using fs methods.

const fs = require("fs");

function makeFolder(folder) {
	try {
		fs.mkdirSync(`./${folder}`);
        console.log("Folder created");

	} catch (err) {
		if (err.code === "EEXIST") {
			console.log("Folder already exists");
		}
	}
}

function removeFolder(folder) {
	try {
		fs.rmdirSync(`./${folder}`);
        console.log("Folder deleted");
        
	} catch (err) {
		if (err.code === "ENOENT") {
			console.log("Folder with this name doesn't exist");
		}
	}
}

let folder = "task2_folder";

makeFolder(folder)
// removeFolder(folder)
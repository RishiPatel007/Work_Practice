// Write some content in the file

const fs = require("fs");
const path = ".";
const fileName = "task5.txt";
try {
	let data = "This is some new data"
    fs.writeFileSync(`${path}/${fileName}` , data , 'utf8');
    console.log("Successfuly wrote data")
} catch (err) {
	if (err.code === "ENOENT") {
		console.log("No such file exist");
	}
}

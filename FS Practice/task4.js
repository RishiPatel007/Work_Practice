// Print the content of a particular file.

const fs = require("fs");
const path = ".";
const fileName = "task4.txt";
try {
	let data = fs.readFileSync(`${path}/${fileName}`);
	console.log(data.toString());
} catch (err) {
    if(err.code === "ENOENT"){
        console.log("No such file exist")
    }
}
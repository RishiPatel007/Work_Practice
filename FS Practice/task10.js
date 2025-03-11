// Using ReadStream to read the file content

const fs = require("fs");

const folderPath = ".";
const fileName = "task10.txt";

const reader = fs.createReadStream(`${folderPath}/${fileName}`);

reader
	.on("data", (chunk) => {
		console.log(chunk.toString());
	})
	.on("error", (err) => {
		err.code === "ENOENT"
			? console.log("No such file or directory")
			: console.log("Other error");
	});

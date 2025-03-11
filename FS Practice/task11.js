// Using the write steam to write the content into the file


const fs = require("fs");

const folderPath = ".";
const fileName = "task11.txt";

const writer = fs.createWriteStream(`${folderPath}/${fileName}`);

writer.write("This is file 11 data")
writer.write("This is file 11 data")
writer.end()
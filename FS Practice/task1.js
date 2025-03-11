//List down all the files in a particular folder.

const fs = require("fs");
const {syncListFiles} = require("./helper")

let folderPath = "./task1_folder"
syncListFiles({folderPath})

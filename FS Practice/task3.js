// List down all the files that have a particular extension.
const fs = require("fs");
const {syncListFiles} = require("./helper")

let folderPath = "./task1_folder";
let ext = '.txt'

syncListFiles({folderPath , ext})
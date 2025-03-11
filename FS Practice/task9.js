// Delete all files inside a folder with a particular extension
const {syncDeleteFiles} = require("./helper")

let folderPath = "./task9_folder";
let ext = ".js"
syncDeleteFiles({folderPath , ext})

// Rename a file
const {renameOrMoveFile} = require("./helper")

const originalPath = "."
const originalFileName = "task6.txt"
const newFileName = "task6NewFile.txt"

renameOrMoveFile({originalPath , originalFileName , newFileName})
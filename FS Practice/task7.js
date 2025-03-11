// Move a file
const {renameOrMoveFile} = require("./helper")

const originalPath = "."
const fileName = "task7.txt"
const newPath = "task7_folder"

renameOrMoveFile({originalPath , fileName , newPath})
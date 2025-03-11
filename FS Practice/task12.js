const fs = require("fs")

const folderPath = ".";
const fileName = "task12.txt";

fs.chmod(`${folderPath}/${fileName}` ,0o765 , (err)=>{
    if(err) {
        console.log('The permissions for file have been changed!')
    }
})
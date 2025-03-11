const fs = require("fs")
const path = require("path")

function filterFilesSync({folderPath, files , ext}) {
    try{
        if(ext){
            return files.filter((file) => {
                return fs.statSync(`${folderPath}/${file}`).isFile() && path.extname(`${folderPath}/${file}`) === ext;
            });
        }else{
            return files.filter((file) => {
                return fs.statSync(`${folderPath}/${file}`).isFile();
            });
        }
        
    }catch(err){
        if(err.code === "ENOENT"){
            console.log("A file doesn't exist")
            return null
        }
    }
}

function syncDeleteFiles({folderPath , ext}){
    try {
        const files = fs.readdirSync(folderPath);
        let deleteFiles;
        if(ext){
            deleteFiles  = filterFilesSync({folderPath, files , ext});
        }else{
            deleteFiles  = filterFilesSync({folderPath, files});

        }
        deleteFiles.map((file)=>{
            deletePath(`${folderPath}/${file}`)
        })
    } catch (err) {
        if (err.code === "ENOENT") {
            console.log("No such directory");
        }
    }
}

function deletePath(path){
    fs.unlinkSync(path)
}


function renameOrMoveFile({originalPath , originalFileName , newPath=originalPath , newFileName = originalFileName}){
    
    try {
        fs.renameSync(`${originalPath}/${originalFileName}`,`${newPath}/${newFileName}`);
        console.log("Successfuly moved file")
    } catch (err) {
        console.log(err);
        
        if (err.code === "ENOENT") {
            console.log("No such file exist");
        }
    }
}

function syncListFiles({folderPath , ext}){
    try {
        const files = fs.readdirSync(folderPath);
        if(ext){
            console.log(filterFilesSync({folderPath, files , ext}));
        }else{
            console.log(filterFilesSync({folderPath, files}));
        }
    } catch (err) {
        if (err.code === "ENOENT") {
            console.log("No such directory");
        }
    }
}


module.exports = {syncListFiles , syncDeleteFiles , renameOrMoveFile}
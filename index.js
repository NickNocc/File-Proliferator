const fs = require("fs")

const saveLocation = "../../testy/saveSpot";
const exportFolders = "../../testy/";

function fileListener() {
    fs.watch(saveLocation, (eventType, filename) => {
      if (eventType == "rename") {
        bunnyProtocol(filename);
      }
    });
}


function bunnyProtocol(newFile) {
    fs.readdir(exportFolders, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(folder => {

            if (folder == "saveSpot") {
                return;
            }


            fs.copyFile(saveLocation + "/" + newFile, exportFolders + folder + "/" + newFile, (err) => {
                if (err) throw err;
                console.log('exported');
            })
        })
    })
}



module.exports = fileListener
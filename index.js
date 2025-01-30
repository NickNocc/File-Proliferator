const fs = require("fs");

const saveLocation = "../../testy/saveSpot";
const exportFolders = "../../testy/";

function fileListener() {
  try {
    fs.watch(saveLocation, (eventType, filename) => {
      if (eventType == "rename") {
        bunnyProtocol(filename);
      }
    });
  } catch (err) {
    throw err;
  }
}

function bunnyProtocol(newFile) {
  fs.readdir(exportFolders, (err, files) => {
    if (err) {
      console.log("file deleted");
      return;
    }
    files.forEach((folder) => {
      if (folder == "saveSpot") {
        return;
      }

      fs.copyFile(
        saveLocation + "/" + newFile,
        exportFolders + folder + "/" + newFile,
        (err) => {
          if (err) {
            if (err.errno == "-2") {
              return;
            }
            console.log(err);
          }
          console.log("exported");
        }
      );
    });
  });
}

module.exports = fileListener;

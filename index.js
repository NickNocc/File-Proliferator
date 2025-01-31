// const fs = require("fs");
import fs from "fs";
import Watcher from "watcher";

const saveLocation = "C:/boosShare/saveSpot";
const exportFolders = "C:/boosShare/embroideryTown/";
const watcher = new Watcher(saveLocation);

export function fileListener() {
  try {
    // fs.watch(saveLocation, (eventType, newFileName) => {
    //   if (eventType == "rename") {
    //     bunnyProtocol(newFileName);
    //   }
    // });

    watcher.on("all", (event, targetPath, targetPathNext) => {
      // console.log("event: ", event);
      // console.log("targetPath: ", targetPath);
      // console.log("targetPathNext: ", targetPathNext);

      if (event == "add") {
        // console.log("File Added");
        bunnyProtocol(targetPath)
      }
    });
  } catch (err) {
    throw err;
  }
}

export function bunnyProtocol(newFile) {
  fs.readdir(exportFolders, (err, files) => {
    let newFileName = newFile.split("\\");

    newFileName = newFileName.pop();
    if (err) {
      console.log(err);
      return;
    }

    files.forEach((folder) => {
      if (folder == "saveSpot") {
        return;
      }
      fs.copyFile(
        newFile,
        exportFolders + folder + "/" + newFileName,
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

// module.exports = fileListener;
// export { fileListener, bunnyProtocol };

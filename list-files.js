var glob = require("glob");

function listFiles(directory) {
    var options = {
        nodir: true,
        ignore: ""
    }
    return glob.sync(`${directory}/**/*`, options);
}

module.exports = listFiles;

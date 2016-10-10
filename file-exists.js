var fs = require('fs')

function checkIfExist(filePath) {
    return fs.existsSync(filePath);
}

module.exports = checkIfExist;

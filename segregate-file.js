var fs = require('fs');

var config = require('./config')
var fileName = require('./file-name');
var fileExtension = require('./file-extension');
var createDirectory = require('./create-directory');
var fileExists = require('./file-exists');

function nameAndCopyFile(source, targetDirectory, targetName, targetExtension) {

    var target;
    var i = 0;
    do {
        target = composeTargetFilePath(targetDirectory, targetName, targetExtension, i);
        i++;
    } while (fileExists(target));

    copyFile(source, target);
}

function composeTargetFilePath(targetDirectory, targetName, targetExtension, i) {
    var result = `${targetDirectory}/${targetName}`;
    if (i) {
        var iWithLeadingZeros = addLeadingZeros(i, 3);
        result += `_${iWithLeadingZeros}`
    }
    return `${result}.${targetExtension}`;
}

function copyFile(source, target) {
    console.log(`${source} ==> ${target}`);

    var inputStream = fs.createReadStream(source);
    inputStream.on("error", function(err) {
        console.error(err);
    });
    var outputStream = fs.createWriteStream(target);
    outputStream.on("error", function(err) {
        console.error(err);
    });

    inputStream.pipe(outputStream);
}

function addLeadingZeros(number, totalLength) {
    var s = "00000000000" + number;
    return s.substr(s.length - totalLength);
}

function segragateFile(filePath, date) {
    if (date && date.isValid()) {
        console.log(`File date: ${date.format()}`)

        var fileTargetDirectory = createDirectory.forDate(config.outputDirectory, date);
        var fileTargetName = fileName.forDate(filePath, date);
        var fileTargetExtension = fileExtension.fromFilePath(filePath);

        nameAndCopyFile(filePath, fileTargetDirectory, fileTargetName, fileTargetExtension);

    } else {
        console.warn(`Unable to compute date for: ${filePath}. File will be copied to ${config.unknownFileDirectory} directory`)

        createDirectory.withName(config.unknownFileDirectory);

        var fileTargetDirectory = config.unknownFileDirectory;
        var fileTargetName = fileName.fromFilePath(filePath);
        var fileTargetExtension = fileExtension.fromFilePath(filePath);

        nameAndCopyFile(filePath, fileTargetDirectory, fileTargetName, fileTargetExtension)
    }
}

module.exports = segragateFile;
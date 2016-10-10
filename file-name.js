function removeFileExtension(filename) {
	return filename.substr(0, filename.lastIndexOf('.'));
}

function forDate(filePath, date) {
    var year = date.format('YYYY');
    var monthNumber = date.format('MM');

    var fileName = date.format('YYYY-MM-DD_HH-mm-ss');
    console.log(fileName);

    return fileName;
}

function fromFilePath(filePath) {
    var splited = filePath.split("/");
    var fileNameWithExt = splited.pop().toLowerCase();
    var fileNameNoExt = removeFileExtension(fileNameWithExt);

    console.log(`Filename: ${fileNameNoExt}`);

    return fileNameNoExt;
}

module.exports = {
    forDate: forDate,
    fromFilePath: fromFilePath
}

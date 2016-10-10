function fromFilePath(filePath) {
	var splited = filePath.split("."); 
	var extension = splited.pop().toLowerCase();
	console.log(`Extension: ${extension}`);

	return extension.toLowerCase();
}

module.exports = {
    fromFilePath: fromFilePath
}

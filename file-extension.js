function fromFilePath(filePath) {
	var splited = filePath.split("."); 
	if (splited.length < 2) {
		return '';
	}
	var extension = splited.pop().toLowerCase();
	console.log(`Extension: ${extension}`);

	return extension.toLowerCase();
}

module.exports = {
    fromFilePath: fromFilePath
}

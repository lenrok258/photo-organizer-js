var fs = require('fs');

var config = require('./config');

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function escapeDiacritics(string) {
    return string
        .replace(/ą/g, 'a').replace(/Ą/g, 'A')
        .replace(/ć/g, 'c').replace(/Ć/g, 'C')
        .replace(/ę/g, 'e').replace(/Ę/g, 'E')
        .replace(/ł/g, 'l').replace(/Ł/g, 'L')
        .replace(/ń/g, 'n').replace(/Ń/g, 'N')
        .replace(/ó/g, 'o').replace(/Ó/g, 'O')
        .replace(/ś/g, 's').replace(/Ś/g, 'S')
        .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
        .replace(/ź/g, 'z').replace(/Ź/g, 'Z');
}

function forDate(parentDirectory, date) {
    var year = date.format('YYYY');
    var monthNumber = date.format('MM');
    var monthName = capitalizeFirstLetter(escapeDiacritics(date.locale(config.locale).format('MMMM')));

    var directoryName = `${year}_${monthNumber}${monthName}`;
    var directoryNameWithParent = `${parentDirectory}/${directoryName}`
    console.log(directoryNameWithParent);

    withName(directoryNameWithParent);

    return directoryNameWithParent;
}

function withName(directoryName) {
    if (!fs.existsSync(directoryName)) {
        console.log(`Creating directory: ${directoryName}`);
        fs.mkdirSync(directoryName);
    }
}

module.exports = {
    withName: withName,
    forDate: forDate
}

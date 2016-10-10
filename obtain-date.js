var Promise = require('bluebird');
var fs = require('fs');
var moment = require('moment');
var ExifImage = require('exif').ExifImage;

function getExifData(filePath) {
    var exif = new ExifImage({ /* Options */ });
    var loadImageAsync = Promise.promisify(exif.loadImage, { context: exif });
    return loadImageAsync(filePath);
}

function getDateFromExifData(exifData) {
    var dateString = exifData.exif.DateTimeOriginal;
    date = moment(dateString, "YYYY:MM:DD HH:mm:ss");
    if (date.isValid()) {
        return Promise.resolve(date);
    } else {
        return Promise.reject('Cannot read data from EXIF');
    }
}

function getFileModificationDate(filePath) {
    var statsAsync = Promise.promisify(fs.stat, { context: fs });
    return statsAsync(filePath)
        .then(function(stats) {
            console.log(`File stats: ${JSON.stringify(stats)}`);
            return moment(stats['mtime']); // Modified Time
        })
}

function getDateFromFile(filePath) {
    return getExifData(filePath)
        .then(getDateFromExifData)
        .catch(function(error) {
            console.log(`Unable to get date from EXIF for file ${filePath}. Fallback to file create date`);
            return getFileModificationDate(filePath);
        });
}

module.exports = getDateFromFile;

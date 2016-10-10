var Promise = require('bluebird');
var minimist = require('minimist');

var config = require('./config')
var listFiles = require('./list-files');
var obtainDateFromFile = require('./obtain-date');
var createDirectory = require('./create-directory');
var segragateFile = require('./segregate-file');

// Input params
var params = minimist(process.argv.slice(1))._;
if (params.length < 2) {
    console.log('Missing required argument');
    console.log('Usage: node run-me.js {directory-with-photos-to-process}');
    process.exit(1);
}
var inputDirectory = params[1];

// Create output directory
createDirectory.withName(config.outputDirectory);

// Segragate files
var files = listFiles(inputDirectory);
Promise.mapSeries(files, function(filePath, index) {
    console.log(`\nProcessing file = ${filePath}`);

    return obtainDateFromFile(filePath)
        .then(function(date) {
            segragateFile(filePath, date);
        })
});

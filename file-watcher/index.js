var Watcher = require('./watcher');
var fs = require('fs');
var watchDir = './watch';
var processedDir = './done';

var watcher = new Watcher(watchDir, processedDir);

watcher.on('process', function (file) {
    var watchFile       = this.watchDir + '/' + file;
    var processedFile   = this.processedDir + '/' + file.toLowerCase();

    fs.rename(watchFile, processedFile, function (err) {
        if (err) throw err;
    });
});

watcher.start();

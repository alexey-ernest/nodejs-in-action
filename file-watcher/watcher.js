var events = require('events');
var util = require('util');
var fs = require('fs');

var Watcher = function (watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

util.inherits(Watcher, events.EventEmitter);

Watcher.prototype.watch = function () {
    var watcher = this;
    fs.readdir(this.watchDir, function (err, files) {
        if (err) throw err;
        for (var index in files) {
            watcher.emit('process', files[index]);
        }
    });
};

Watcher.prototype.start = function() {
    var watcher = this;
    fs.watchFile(this.watchDir, function () {
        watcher.watch();
    });
};

module.exports = Watcher;

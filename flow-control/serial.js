var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';

function checkForRSSFile() {
    fs.exists(configFilename, function (exists) {
        if (!exists) return next(new Error('Missing RSS file: ' + configFilename));
        next(null, configFilename);
    });
}

function readRSSFile(configFilename) {
    fs.readFile(configFilename, function (err, data) {
        if (err) return next(err);

        data = data
                .toString()
                .replace(/^\s+|\s+$/g, '')
                .split('\n');
        var random = Math.floor(Math.random()*data.length);
        next(null, data[random]);
    });
}

function downloadRSSFeed(feedUrl) {
    request({uri: feedUrl}, function (err, res, body) {
        if (err) return next(err);
        if (200 != res.statusCode) 
            return next(new Error('Abnormal response status code'));
        next(null, body);
    });
}

function parseRSSFeed(rss) {
    var handler = new htmlparser.RssHandler();
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);

    if (!handler.dom.items.length) 
        return next(new Error('No RSS items found'));

    var item = handler.dom.items.shift();
    console.log(item.title);
    console.log(item.link);
}

var tasks = [ checkForRSSFile, 
              readRSSFile, 
              downloadRSSFeed, 
              parseRSSFeed ];

function next(err, result) {
    if (err) throw err;
    
    var currentTask = tasks.shift();
    if (currentTask) {
        currentTask(result);
    }
}

next();

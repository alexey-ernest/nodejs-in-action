var connect = require('connect');
var url = require('url');

var logger = require('morgan');
logger.token('query-string', function (req, res) {
    return url.parse(req.url).query;
});

var app = connect()
    .use(logger(':method :url :query-string :status :response-time ms'))
    .use(function (req, res, next) {
        res.end('hello\n');
    })
    .listen(3000);

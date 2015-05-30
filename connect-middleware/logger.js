var connect = require('connect');
var logger = require('morgan');

var app = connect()
    .use(logger('dev'))
    .use(function (req, res, next) {
        res.end('hello\n');
    })
    .listen(3000);

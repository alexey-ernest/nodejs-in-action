var connect = require('connect');
var static = require('serve-static');

var app = connect()
    .use(static(__dirname + '/public'))
    .use(function (req, res, next) {
        res.end('hello\n');
    })
    .listen(3000);

var connect = require('connect');
var static = require('serve-static');
var compression = require('compression');

function filter(req, res) {
    var type = res.getHeader('Content-Type') || '';
    console.log(type);
    return type.match(/json|text|javascript|css/);
}

var app = connect()
    .use(compression({ threshold: 0, filter: filter }))
    .use(static(__dirname + '/public'))
    .use(function (req, res, next) {
        res.end('hello\n');
    })
    .listen(3000);

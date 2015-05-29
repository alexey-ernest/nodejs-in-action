var connect = require('connect');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({
    limit: '5kb'
});

var app = connect()
    .use(jsonParser)
    .use(function (req, res) {
        res.end('hello\n');
    }).listen(3000);

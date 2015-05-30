var connect = require('connect');
var favicon = require('serve-favicon');

var app = connect()
    .use(favicon(__dirname + '/public/favicon.ico'))
    .listen(3000);


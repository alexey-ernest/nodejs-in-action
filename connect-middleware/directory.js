var connect = require('connect');
var directory = require('serve-index');
var static = require('serve-static');

var app = connect()
    .use('/files', directory(__dirname + '/public', { icons: true, hidden: true }))
    .use('/files', static(__dirname + '/public', { hidden: true }))
    .listen(3000);

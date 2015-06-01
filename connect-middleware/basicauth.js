var connect = require('connect');
var basicAuth = require('basic-auth-connect');

var users = {
    tobi: 'foo',
    loki: 'bar',
    jane: 'baz'
};

var app = connect()
    .use(basicAuth(function (user, pass) {
        return users[user] === pass;  
    }))
    .use(function (req, res, next) {
        res.end('hello\n');
    })
    .listen(3000);

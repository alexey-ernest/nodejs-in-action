var connect = require('connect');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var hour = 3600000;
var sessionOpts = {
    key: 'myapp_sid',
    cookie: { maxAge: hour * 24 }
};

var app = connect()
    .use(cookieParser('keyboard cat'))
    .use(session(sessionOpts))
    .use(function (req, res, next) {
        var sess = req.session;
        if (sess.views) {
            res.setHeader('Content-Type', 'text/html');
            res.write('<p>Views: ' + sess.views + '</p>');
            sess.views++;
            res.end();
        } else {
            sess.views = 1;
            res.end('Welcome to the session demo. Refresh!');
        }
    })
    .listen(3000);

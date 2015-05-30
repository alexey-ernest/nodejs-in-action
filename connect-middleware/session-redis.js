var connect = require('connect');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = connect()
    .use(cookieParser('keyboard cat'))
    .use(session({ 
        store: new RedisStore({ prefix: 'sid' })
        //secrect: 'keyboard cat' 
    }))
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

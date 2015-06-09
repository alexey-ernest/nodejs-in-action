var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var messages = require('./lib/messages');
var user = require('./lib/middleware/user');

var register = require('./routes/register');
var login = require('./routes/login');
var logout = require('./routes/logout');
var entries = require('./routes/entries');
var api = require('./routes/api');
var routes = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret code'));
app.use(session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(user);
app.use(messages);

app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/api', api);
app.use('/', entries);

// error handlers
app.use(routes.notfound);
app.use(routes.error);

module.exports = app;

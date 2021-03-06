var connect = require('connect');

var api = connect()
    .use(users)
    .use(pets)
    .use(errorHandler);

var app = connect()
    .use(hello)
    .use('/api', api)
    .use(errorPage)
    .listen(3000);

function hello(req, res, next) {
    if (req.url.match(/^\/hello/)) {
        res.end('Hello World\n');
    } else if (req.url.match(/^\/error/)) {
        next(new Error('An error occured!'));
    } else {
        next();
    }
}

var db = {
    users: [
        { name: 'tobi' },
        { name: 'loki' },
        { name: 'jane' }
    ]
};

function users(req, res, next) {
    var match = req.url.match(/^\/user\/(.+)/);
    if (match) {
        var user = db.users[match[1]];
        if (user) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(user));
        } else {
            var err = new Error('User not found');
            err.notFound = true;
            next(err);
        }
    } else {
        next();
    }
}

function pets(req, res, next) {
    if (req.url.match(/^\/pet\/(.+)/)) {
        foo();
    } else {
        next();
    }
}

function errorHandler(err, req, res, next) {
    console.log(err.stack);
    res.setHeader('Content-Type', 'application/json');
    if (err.notFound) {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: err.message }));
    } else {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}

function errorPage(err, req, res, next) {
    console.log(err.stack);
    res.setHeader('Content-Type', 'text/html');
    if (err.notFound) {
        res.statusCode = 404;
        res.end('<html>' + 
            '<head><title>Page Not Found</title></head>' +
            '<body><h1>Page Not Found</h1></body>' + 
            '</html>');
    } else {
        res.statusCode = 500;
        res.end('<html>' + 
            '<head><title>Internal Server Error</title></head>' +
            '<body><h1>Internal Server Error</h1></body>' + 
            '</html>');
    }
}

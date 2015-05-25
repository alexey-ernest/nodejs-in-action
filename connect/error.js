var connect = require('connect');
var app = connect()
    .use(function (req, res, next) {
        foo();
        res.end('Hello world!');
    })
    .use(errorHandler())
    .listen(3000);

function errorHandler() {    
    var env = process.env.NODE_ENV || 'development';
    return function (err, req, res, next) {
        
        res.statusCode = 500;
        switch (env) {
            case 'development':
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({name: err.name, message: err.message}));
                break;
            default:
                res.end('Server Error');
        }
    }
}

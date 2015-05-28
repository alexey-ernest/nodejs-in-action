var connect = require('connect');
var Cookies = require('cookies');
var keys = ['tobi is a cool ferret'];

var app = connect()
    .use(function (req, res) {       
        var cookies = new Cookies(req, res, keys);
        
        if ( req.url == "/set" ) {
            var cookieValue = 'cookieValue';
            cookies.set('cookieName', cookieValue, { signed: true });

            res.writeHead( 302, { "Location": "/" } );
            return res.end("Now let's check.");
        }

        var cookie = cookies.get('cookieName', { signed: true });
        
        res.writeHead( 200, { "Content-Type": "text/plain" } );
        res.end(cookie);

    }).listen(3000);

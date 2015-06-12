var app = require('http').createServer(handler);

// upgrade regular HTTP server to Socket.IO server
var io = require('socket.io').listen(app);

// read html
var fs = require('fs');
var html = fs.readFileSync(__dirname + '/index.html', 'utf8');

function handler(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html, 'utf8'));
    res.end(html);
}

function tick () {
    var now = new Date().toUTCString();
    io.sockets.send(now);
}

setInterval(tick, 1000);

app.listen(8080);

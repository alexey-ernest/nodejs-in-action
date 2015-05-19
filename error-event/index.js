var events = require('events');
var myEmitter = new events.EventEmitter();

myEmitter.on('error1', function (err) {
    console.log('ERROR: ' + err.message);
});

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    process.exit();
});

//myEmitter.emit('error', new Error('Something is wrong.'));
myEmitter.emit('error');

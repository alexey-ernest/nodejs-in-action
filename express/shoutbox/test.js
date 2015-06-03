// var User = require('./lib/user');

// var tobi = new User({
//     name: 'Tobi',
//     pass: 'im a ferret',
//     age: '2'
// });

// tobi.save(function(err) {
//     if (err) throw err;
//     console.log('user id %d', tobi.id);
// });

var redis = require('redis');
var db = redis.createClient(6379, 'clickubuntu.cloudapp.net');

db.hgetall('user:2', function (err, user) {
    console.log(user);
});

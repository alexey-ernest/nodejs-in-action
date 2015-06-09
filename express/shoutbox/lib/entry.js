var redis = require('redis');
var db = redis.createClient(6379, 'clickubuntu.cloudapp.net');

function Entry(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}

Entry.prototype.save = function (fn) {
    var entryJson = JSON.stringify(this);

    db.lpush(
        'entries',
        entryJson,
        function (err) {
            if (err) return fn(err);
            fn();
        }
    );
};

Entry.getRange = function (from, to, fn) {
    db.lrange('entries', from, to, function (err, items) {
        if (err) return fn(err);
        var entries = [];

        items.forEach(function (item) {
            entries.push(JSON.parse(item));
        });

        fn(null, entries);
    });
};

Entry.count = function (fn) {
    db.llen('entries', fn);
};

module.exports = Entry;
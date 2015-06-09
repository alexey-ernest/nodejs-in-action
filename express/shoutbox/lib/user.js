var bcrypt = require('bcrypt-nodejs');
var redis = require('redis');
var db = redis.createClient(6379, 'clickubuntu.cloudapp.net');

function User(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }
}

User.prototype.save = function (fn) {
    if (this.id) {
        this.update(fn);
    } else {
        var user = this;
        db.incr('user:ids', function (err, id) {
            if (err) return fn(err);
            user.id = id;
            user.hashPassword(function (err) {
                if (err) return fn(err);
                user.update(fn);
            });
        });
    }
};

User.prototype.update = function (fn) {
    var user = this;
    var id = user.id;
    // index user id by name
    db.set('user:id:' + user.name, id, function (err) {
        if (err) return fn(err);
        // update user data
        db.hmset('user:' + id, user, function (err) {
            fn(err);
        });
    });
};

User.prototype.hashPassword = function (fn) {
    var user = this;
    bcrypt.genSalt(12, function (err, salt) {
        if (err) return fn(err);
        user.salt = salt;
        bcrypt.hash(user.pass, salt, null, function (err, hash) {
            if (err) return fn(err);
            user.pass = hash;
            fn();
        });
    });
};

User.getByName = function (name, fn) {
    User.getId(name, function (err, id) {
        if (err) return fn(err);
        User.get(id, fn);
    });
};

User.getId = function (name, fn) {
    db.get('user:id:' + name, fn);
};

User.get = function (id, fn) {
    db.hgetall('user:' + id, function (err, user) {
        if (err) return fn(err);
        fn(null, new User(user));
    });
};

User.authenticate = function (name, pass, fn) {
    User.getByName(name, function (err, user) {
        if (err) return fn(err);
        if (!user.id) return fn();
        bcrypt.hash(pass, user.salt, null, function (err, hash) {
            if (err) return fn(err);
            if (hash == user.pass)  return fn(null, user);
            fn();
        });
    });
};

User.prototype.toJSON = function () {
    return {
        id: this.id,
        name: this.name
    }
};

module.exports = User;

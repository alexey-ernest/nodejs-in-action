var express = require('express');
var router = express.Router();
var User = require('../lib/user');

router.get('/', function (req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/', function (req, res, next) {
    var data = req.body.user;
    User.getByName(data.name, function (err, user) {
        if (err) return next(err);
        if (user.id) {
            res.error('Username already taken!');
            res.redirect('back');
        } else {
            var user = new User({
                name: data.name,
                pass: data.pass
            });
            user.save(function (err) {
                if (err) return next(err);
                req.session.uid = user.id;
                res.redirect('/');
            });
        }
    });
});

module.exports = router;

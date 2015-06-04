var express = require('express');
var router = express.Router();
var User = require('../lib/user');

router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login' });
});

router.post('/', function (req, res, next) {
    var data = req.body.user;
    User.authenticate(data.name, data.pass, function (err, user) {
        if (err) return next(err);
        if (user) {
            req.session.uid = user.id;
            res.redirect('/');
        } else {
            res.error('Sorry! Invalid credentials.');
            res.redirect('back');
        }
    });
});

module.exports = router;

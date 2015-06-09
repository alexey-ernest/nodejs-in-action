var express = require('express');
var basicAuth = require('basic-auth-connect');
var entries = require('../lib/middleware/entries');
var router = express.Router();
var user = require('../lib/middleware/user');
var page = require('../lib/middleware/page');

var User = require('../lib/user');
var Entry = require('../lib/entry');

// authenticate
router.use(basicAuth(User.authenticate));

// user loading
router.use(user);

// routes
router.get('/user/:id', function (req, res, next) {
    User.get(req.params.id, function (err, user) {
        if (err) return next(err);
        if (!user.id) {
            var err = new Error('Not Found');
            err.status = 404;
            return next(err);
        }
        res.json(user);
    });
});

router.post('/entry', entries.submit);

router.get('/entries/:page?', 
    page(Entry.count), 
    function (req, res, next) {
        var page = req.page;
        Entry.getRange(page.from, page.to, function (err, entries) {
            if (err) return next(err);
            res.json(entries);
        });
    }
);

module.exports = router;

var express = require('express');
var router = express.Router();
var Entry = require('../lib/entry');
var validate = require('../lib/middleware/validate');

router.get('/', function(req, res, next) {
    Entry.getRange(0, -1, function (err, entries) {
        if (err) return next(err);
        res.render('entries', {
            title: 'Entries',
            entries: entries
        });
    });
});

router.get('/post', function (req, res) {
    res.render('post', { title: 'Post' });
});

router.post('/post', 
    validate.required('entry[title]'),
    validate.lengthAbove('entry[title]', 4),
    function (req, res, next) {
        var data = req.body.entry;

        var entry = new Entry({
            "username": res.locals.user.name,
            "title": data.title,
            "body": data.body
        });

        entry.save(function (err) {
            if (err) return next(err);
            res.redirect('/');
        });
    }
);

module.exports = router;

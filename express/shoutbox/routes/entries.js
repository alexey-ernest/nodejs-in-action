var express = require('express');
var router = express.Router();
var validate = require('../lib/middleware/validate');
var page = require('../lib/middleware/page');
var Entry = require('../lib/entry');
var entries = require('../lib/middleware/entries');

router.get('/post', entries.form);

router.post('/post', 
    validate.required('entry[title]'),
    validate.lengthAbove('entry[title]', 4),
    entries.submit
);

router.get('/:page?', 
    page(Entry.count, 5), 
    entries.list
);

module.exports = router;

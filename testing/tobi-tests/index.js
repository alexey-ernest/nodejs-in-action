var tobi = require('tobi');
var app = require('../../express/shoutbox/app');
var browser = tobi.createBrowser(app);

browser.get('/', function (res, $) {
    res.should.have.status(200);
    console.log(res);
    $('head').should.have.one('title', 'Entries');
    app.close();
});

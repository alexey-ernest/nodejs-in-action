var jade = require('jade');
var template = 'a(href = url) link';
var context = { url: 'http://nodejs.org' };

var fn = jade.compile(template);
console.log(fn(context));

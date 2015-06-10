var jade = require('jade');
var fs = require('fs');

var template = fs.readFileSync('./templates/jade-arrays.jade');
var context = { messages: [
    'You have logged in successfully',
    'Welcome back!'
]};

var fn = jade.compile(template);
console.log(fn(context));

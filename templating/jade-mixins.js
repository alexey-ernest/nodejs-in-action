var jade = require('jade');
var fs = require('fs');
var templateFile = './templates/page-mixins.jade';
var iterTemplate = fs.readFileSync(templateFile);
var context = { students: [
    { name: 'Rick LaRue', age: 23 },
    { name: 'Sarah Cathands', age: 25 },
    { name: 'Bob Dobbs', age: 37 }
]};

var iterFn = jade.compile(iterTemplate, { filename: templateFile });
console.log(iterFn(context));

var hogan = require('hogan');
var template = '{{#students}}' +
                '   <p>Name: {{name}}, Age: {{age}} years old</p>' +
                '{{/students}}' +
                '{{^students}}' + 
                '   <p>No students found.</p>' +
                '{{/students}}';
var context = { 
    students: [
        { name: 'Jane Narwhal', age: 21 },
        { name: 'Rick LaRue', age: 26 }
    ]
};

var templ = hogan.compile(template);
console.log(templ.render(context));

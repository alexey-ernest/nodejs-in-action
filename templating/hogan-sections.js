var hogan = require('hogan');
var md = require('github-flavored-markdown');

var template = '{{#markdown}}' +
               '**Name**: {{name}}' +
               '{{/markdown}}';

var context = {
    name: 'Rick LaRue',
    markdown: function () {
        return function (text) {
            return md.parse(text);
        };
    }
};

var templ = hogan.compile(template);
console.log(templ.render(context));

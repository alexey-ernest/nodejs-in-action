var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/tasks');

var Schema = mongoose.Schema;
var Tasks = new Schema( {
    project: String,
    description: String
});
mongoose.model('Task', Tasks);

// working with model
var Task = mongoose.model('Task');

// create
var task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';
task.save(function (err) {
    if (err) throw err;
    console.log('Task saved.');
});

// find
Task.find({'project': 'Bikeshed'}, function (err, tasks) {
    if (err) throw err;
    tasks.forEach(function (task, i) {
        console.log('ID: ' + task._id);
        console.log(task.description);
    });
});

// update
Task.update(
    {_id: '5561aa973e1c66483a96af34'},
    {description: 'Paint the bikeshed green.'},
    {multi: false},
    function (err, rows_updated) {
        if (err) throw err;
        console.log('Updated.');
        console.log(rows_updated);
    }
);

// delete
Task.find({'description': 'Paint the bikeshed green.'}, function (err, tasks) {
    if (err) throw err;
    console.log('Found ' + tasks.length + ' tasks');
    tasks.forEach(function (task) {
        task.remove(function (err) {
            if (err) throw err;
            console.log('Removed.');
        });
    });
});

var mongodb = require('mongodb');

var server = new mongodb.Server('127.0.0.1', 27017, {});
var client = new mongodb.Db('mydatabase', server, {w: 1});

client.open(function (err) {
    if (err) throw err;
    client.collection('test_insert', function (err, collection) {
        if (err) throw err;
        
        // collection.insert(
        //     {
        //         "title": "I like cake",
        //         "body": "It is quite good."
        //     },
        //     {safe: true},
        //     function (err, result) {
        //         if (err) throw err;
        //         console.log('Document ID is: ' + result.ops[0]._id);
        //     }
        // );

        //var _id = new client.bson_serializer.ObjectID('5561a3bc5ad09964380d46cc');
        // collection.update(
        //     {_id: '5561a3bc5ad09964380d46cc'},
        //     {$set: {"title": "I ate too much cake."}},
        //     {safe: true},
        //     function (err) {
        //         if (err) throw err;
        //         console.log('Updated.');
        //     }
        // );

        collection.find({"title": "I like cake"}).toArray(
            function (err, results) {
                if (err) throw err;
                console.log(results);
            })
        });
});



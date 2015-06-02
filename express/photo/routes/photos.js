var express = require('express');
var router = express.Router();
var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;
var defaultPath = path.join(__dirname, '../public/photos');

router.get('/', function (req, res, next) {
    Photo.find({}, function (err, photos) {
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        });
    });
    
});

router.get('/upload', function (req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    });
});

router.post('/upload', function (req, res, next) {    
    var dir = req.app.get('photos') || defaultPath;
    var img = req.files.image;
    var name = req.body.name || img.name;
    var path = join(dir, img.name);

    fs.rename(img.path, path, function (err) {
        if (err) return next(err);
        Photo.create({
            name: name,
            path: img.name
        }, function (err) {
            if (err) return next(err);
            res.redirect('/');
        });
    });
});

router.get('/photo/:id/download', function (req, res, next) {
    var dir = req.app.get('photos') || defaultPath;
    var id = req.params.id;

    Photo.findById(id, function (err, photo) {
        if (err) return next(err);
        var path = join(dir, photo.path);
        res.sendfile(path);
    });
});

module.exports = router;

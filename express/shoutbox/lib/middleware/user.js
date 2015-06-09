var User = require('../user');

module.exports = function (req, res, next) {

    // for basic auth
    if (req.remoteUser) {
        req.user = res.locals.user = req.remoteUser;
        return next();
    }

    // for form auth
    var uid = req.session.uid;
    if (!uid) return next();
    User.get(uid, function (err, user) {
        if (err) return next(err);
        req.user = res.locals.user = user;
        next();
    });
};

const express = require('express');
const router = express.Router();

const { logout } = require('../controllers');

module.exports = passport => {
    router.post('/signup', (req, res, next) => {
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                return res.status(401).json(err);
            }
            if (user) {
                return res.status(200).json(user);
            } else {
                res.status(401).json(info);
            }
        })(req, res, next)
    });

    router.post('/signin', (req, res, next) => {
        passport.authenticate('local-signin', function (err, user, info) {
            if (err) {
                return res.status(401).json(err);
            }
            if (!user) {
                return res.status(401);
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.status(200).json(user);
            });
        })(req, res, next)
    });

    router.get('/logout', logout);

    return router;
};
const express = require('express');
const router = express.Router();

const { logout } = require('../controllers');

module.exports = passport => {
    router.post('/signup', (req, res, next) => {
        console.log(req.body);
        passport.authenticate('local-signup', function (err, user, info) {
            if (err) {
                return res.status(401).send(err.message);
            }
            if (user) {
                return res.status(200).json(user);
            } else {
                res.status(401).send(info.message);
            }
        })(req, res, next)
    });

    router.post('/signin', (req, res, next) => {
        passport.authenticate('local-signin', function (err, user, info) {
            if (err) {
                return res.status(401).send(err.message);
            }
            if (!user) {
                return res.status(401).send(info.message);
            }
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.status(200).json(user.password);
            });
        })(req, res, next)
    });

    router.get('/logout', logout);

    return router;
};
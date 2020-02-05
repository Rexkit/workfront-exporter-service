const express = require('express');
const router = express.Router();

module.exports = passport => {
    router.post('/signup', (req, res, next) => {
            passport.authenticate('local-signup', {
                failureRedirect: '/signup'
            }, (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect('/login');
                }

                req.login(user, next);
            });
        }
    );

    return router;
};
const bcrypt = require('bcrypt');

module.exports = (passport, user) => {

    const User = user;
    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
    }, (req, email, password, done) => {
        const generateHash = password => {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };

        User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
            if (user) {
                return done(null, false, {
                    message: 'This email exists'
                });
            } else {
                const userPassword = generateHash(password);
                const data = {
                    email: email,
                    password: userPassword,
                };

                User.create(data).then(function(newUser, created) {
                    if (!newUser) {
                        return done(null, false);
                    }

                    if (newUser) {
                        return done(null, newUser);
                    }
                });
            }
        });
    }));

    passport.use('local-signin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, (req, email, password, done) => {
            const User = user;

            const isValidPassword = function(userpass, password) {
                return bcrypt.compareSync(password, userpass);
            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }

                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }

                const userinfo = user.get();
                return done(null, userinfo);
            }).catch(function(err) {
                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));
};
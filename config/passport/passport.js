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
};
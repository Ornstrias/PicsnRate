/**
 * Created by Vincent on 11/08/2015.
 */
var User = require('../models/user.js');
var LocalStrategy = require('passport-local').Strategy;

var strategyOptions = {
    usernameField: 'email'
};

exports.login = new LocalStrategy(strategyOptions,
    function (email, password, done) {

        var searchUser = {
            email: email
        };
        User.findOne(searchUser, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: "Wrong email/password"
                });
            }

            user.comparePasswords(password, function (err, isMatch) {
                if (err) {
                    return done(err);
                }

                if (!isMatch) {
                    return done(null, false, {
                        message: "Wrong email/password"
                    });
                }
                return done(null, user);
            });

        })
    });

exports.register = new LocalStrategy(strategyOptions,
    function (email, password, done) {
        var searchUser = {
            email: email
        };
        User.findOne(searchUser, function (err, user) {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, false, {
                    message: "Email already exists"
                });
            }

            var newUser = new User({
                email: email,
                password: password
            });

            newUser.save(function (err) {
                done(null, newUser);
            })
        });
    });

exports.setUserName = function (req, res, next) {
    var searchUser = {
        email: req.user.email
    };
    var searchUserName = {
        displayName: req.body.firstName
    };

    User.findOne(searchUserName, function (err, user) {
        if (err) {
            return done(err);
        }

        if (user) {
            return done(null, false, {
                message: " Username already taken"
            });
        }
    });

    User.findOne(searchUser, function (err, user) {
        if (err) {
            return done(err);
        }

        if (user) {
            user.displayName = req.body.firstName;
            user.km = 20;
            user.save(function (err) {});
        }
    });
    next();
}
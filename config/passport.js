/**
 * Created by tvshevchuk on 1/21/2015.
 */

var VkontakteStrategy = require('passport-vkontakte').Strategy;
var User = require('../models/User.js');

var VK_APP_ID = "4730054";
var VK_APP_SECRET = "c4Qd5CraNXjM9DzvPwQp";

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new VkontakteStrategy({
            clientID: VK_APP_ID,
            clientSecret: VK_APP_SECRET,
            callbackURL: 'https://facemafia.herokuapp.com/auth/vkontakte/callback'
        },
        function(token, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({'_id': profile.id}, function(err, user) {
                    if (err) {
                        return done(err);
                    };
                    if (user) {
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        newUser._id = profile.id;
                        newUser.token = token;
                        newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.url = profile.profileUrl;
                        newUser.save(function(err) {
                            if (err) {
                                throw  err;
                            };
                            return done(null, newUser);
                        });
                    };
                });
            });
        }
    ));

};
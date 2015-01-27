/**
 * Created by tvshevchuk on 1/21/2015.
 */

var VkontakteStrategy = require('passport-vkontakte').Strategy;
var User = require('../models/User.js');
var Player = require('../models/Player.js');
var UserPlayer = require('../models/UserPlayer.js');

//var VK_APP_ID = "4730054";
//var VK_APP_SECRET = "c4Qd5CraNXjM9DzvPwQp";
//var VK_CALLBACK_URL = 'https://facemafia.herokuapp.com/auth/vkontakte/callback';

//Local
var VK_APP_ID = "4733214";
var VK_APP_SECRET = "8qD3StnIBkL2mzrIFRGl";
var VK_CALLBACK_URL = '/auth/vkontakte/callback';

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
            callbackURL: VK_CALLBACK_URL
        },
        function(token, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({'_id': profile.id}, function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        Player.find({}, function(err, players) {
                            if (err) {
                                throw err;
                            }
                            console.log(players.length);
                            for (var i = 0; i < players.length; i++) {
                                var player = players[i];
                                UserPlayer.find({'userId': user._id, 'playerId': player._id},
                                    function(err, userPlayer) {
                                        console.log(userPlayer);
                                        if (err) {
                                            throw err;
                                        }
                                        if (!userPlayer.length) {
                                            var newUserPlayer = new UserPlayer();
                                            newUserPlayer.userId = user._id;
                                            newUserPlayer.playerId = player._id;
                                            newUserPlayer.rating = 1600;
                                            newUserPlayer.red_rating = 1600;
                                            newUserPlayer.black_rating = 1600;
                                            newUserPlayer.save();
                                        }
                                    });
                            }
                        });
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
                            }
                            Player.find({}, function(err, player) {
                                if (err) {
                                    throw err;
                                }
                                for (var i = 0; i < player.length; i++) {
                                    var newUserPlayer = new UserPlayer();
                                    newUserPlayer.userId = newUser._id;
                                    newUserPlayer.playerId = player[i]._id;
                                    newUserPlayer.rating = 1600;
                                    newUserPlayer.red_rating = 1600;
                                    newUserPlayer.black_rating = 1600;
                                    newUserPlayer.save();
                                }
                            });

                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

};
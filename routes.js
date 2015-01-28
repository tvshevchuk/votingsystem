/**
 * Created by tvshevchuk on 1/21/2015.
 */

var Player = require('./models/Player.js');
var UserPlayer = require('./models/UserPlayer.js');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('login.ejs');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        Player.find({}, function(err, players) {
            for (var i = 0; i < players.length; i++) {
                (function(){
                    var player = players[i];
                    UserPlayer.find()
                        .and([{'userId': req.user._id}, {'playerId': player._id}])
                        .exec(function (err, userPlayer) {
                            if (!userPlayer.length) {
                                var newUserPlayer = new UserPlayer();
                                newUserPlayer.userId = req.user._id;
                                newUserPlayer.playerId = player._id;
                                newUserPlayer.rating = 1600;
                                newUserPlayer.red_rating = 1600;
                                newUserPlayer.black_rating = 1600;
                                newUserPlayer.save();
                            }
                        });
                })(players);
            }
        });
        res.sendfile('./public/main.html');
    });

    app.get('/getout', isLoggedIn, function(req, res) {
        res.render('getout.ejs');
    });

    app.get('/api/user', isLoggedIn, function(req, res) {
        res.send(req.user);
    });

    app.get('/api/players', isLoggedIn, function(req, res) {
        Player.find({}, function(err, players) {
            var myPlayers = [];
            for (var i = 0; i < players.length; i++) {
                (function() {
                    var player = players[i];
                    UserPlayer.findOne()
                        .and([{'userId': req.user._id}, {'playerId': players[i]._id}])
                        .exec(function (err, userPlayer) {
                            var temp = {};
                            temp.myRating = userPlayer.rating;
                            temp.myRedRating = userPlayer.red_rating;
                            temp.myBlackRating = userPlayer.black_rating;
                            myPlayers.push({player: player, myRatings: temp});
                        });
                })(players);
            }
            setTimeout(function() {
                res.send(myPlayers);
            }, 500);
         //  res.send(myPlayers);
        });
    });

    app.post('/api/player/:id', function(req, res) {
       Player.findOne({'_id': req.params.id}, function(err, player) {
           if (err) {
               throw err;
           }
           if (req.body.rating) { player.rating = req.body.rating; }
           if (req.body.red_rating) { player.red_rating = req.body.red_rating; }
           if (req.body.black_rating) { player.black_rating = req.body.black_rating; }

           if (req.body.myRating) {
               UserPlayer.findOne().and([{'userId': req.user._id}, {'playerId': player._id}])
                   .exec(function(err, userPlayer) {
                       if (err) {throw err;}
                       userPlayer.rating = req.body.myRating;
                       userPlayer.save();
                   });
           }

           if (req.body.myRedRating) {
               UserPlayer.findOne().and([{'userId': req.user._id}, {'playerId': player._id}])
                   .exec(function(err, userPlayer) {
                       if (err) {throw err;}
                       userPlayer.red_rating = req.body.myRedRating;
                       userPlayer.save();
                   });
           }

           if (req.body.myBlackRating) {
               UserPlayer.findOne().and([{'userId': req.user._id}, {'playerId': player._id}])
                   .exec(function(err, userPlayer) {
                       if (err) {throw err;}
                       userPlayer.black_rating = req.body.myBlackRating;
                       userPlayer.save();
                   });
           }

           player.save(function(err) {
               if (err) { throw err; }
           });
           res.json(player);
       });
    });

    app.get('/auth/vkontakte', passport.authenticate('vkontakte'));

    app.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {failureRedirect: '/'}),
    function(req, res) {
        Player.findOne({'url': req.user.url}, function(err, player) {
            if (err) {
                throw err;
            };
            if (player) {
                res.redirect('/profile');
            } else {
                res.redirect('/getout');
            }
        })
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        };
        res.redirect('/');
    };
};
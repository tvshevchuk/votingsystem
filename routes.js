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
        UserPlayer.find({'userId': req.user._id}, function(err, userplayers) {
            if (err) { throw err; }
            Player.find({}, function(err, players) {
                if (err) {throw err;}
                for (var i = 0; i < players.length; i++) {
                    var absent = true;
                    for (var j = 0; j < userplayers.length; j++) {
                        if (userplayers[j].playerId == players[i]._id) {
                            absent = false;
                        }
                    }
                    if (absent) {
                        var newUserPlayer = new UserPlayer();
                        newUserPlayer.userId = req.user._id;
                        newUserPlayer.playerId = players[i]._id;
                        newUserPlayer.rating = 1600;
                        newUserPlayer.red_rating = 1600;
                        newUserPlayer.black_rating = 1600;
                        newUserPlayer.save();
                    }
                }
                res.sendfile('./public/main.html');
            })
        });
    });

    app.get('/getout', isLoggedIn, function(req, res) {
        res.render('getout.ejs');
    });

    app.get('/api/user', isLoggedIn, function(req, res) {
        res.send(req.user);
    });

    app.get('/api/players', isLoggedIn, function(req, res) {
        UserPlayer.find({'userId': req.user._id}, function(err, userplayers) {
            if (err) { throw err; }
            Player.find({}, function(err, players) {
                if (err) {throw err;}

                var myPlayers = [], player, userplayer, temp;
                for (var i = 0; i < players.length; i++) {
                    for (var j = 0; j < userplayers.length; j++) {
                        if (userplayers[j].playerId == players[i]._id) {
                            player = players[i];
                            userplayer = userplayers[j];
                        }
                    }
                    temp = {};
                    temp.myRating = userplayer.rating;
                    temp.myRedRating = userplayer.red_rating;
                    temp.myBlackRating = userplayer.black_rating;
                    myPlayers.push({player: player, myRatings: temp});
                }

                res.send(myPlayers);
            })
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
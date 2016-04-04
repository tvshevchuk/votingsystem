
var express = require('express');
var passport = require('passport');
var _ = require('lodash');

var Player = require('./models/Player.js');
var UserPlayer = require('./models/UserPlayer.js');
var User = require('./models/User.js');

var router = express.Router();

router.use(function (req, res, next) {
    if (process.env.NODE_ENV === 'production' && req.headers["x-forwarded-proto"] !== "https") {
        res.redirect('https://' + req.headers.host + req.url);
    } else {
        next();
    }
});

router.get('/', function(req, res) {
    res.sendfile('./public/main.html');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function isAdmin(req, res, next) {
    if (req.user.isAdmin) {
        next();
    } else {
        res.status(401).send("You haven't permission");
    }
}

router.get('/getout', isLoggedIn, function(req, res) {
    res.render('getout.ejs');
});

router.get('/api/users', isAdmin, function(req, res) {
    User.find({}, function(err, users) {
        if (err) { throw err; }
        res.send(users);
    });
});

router.get('/api/players', function(req, res) {
    Player.find({}, function(err, players) {
        if (err) { throw err; }
        res.send(players);
    })
});

router.get('/api/players/:playerId', function(req, res) {
   Player.findOne({'_id': req.params.playerId}, function(err, player) {
        if (err) { throw err; }
        res.send(player);
    });
});

router.get('/api/players/users/:userId', isLoggedIn, function(req, res) {
    UserPlayer.find({'userId': req.params.userId}, function(err, userplayers) {
        if (err) { throw err; }
        res.send(userplayers);
    });
});

router.put('/api/players/:playerId', function(req, res) {
    Player.findOne({'_id': req.params.playerId}, function(err, player) {
        if (err) { throw err; };
        if (req.body.rating) {
            player.rating = req.body.rating;
            player.save();
            res.json(player);
        }
    });
});

router.put('/api/users/:userId/players/:playerId', function(req, res) {
    UserPlayer.findOne({'userId': req.params.userId, 'playerId': req.params.playerId}, function(err, userplayer) {
        if (err) { throw err; };
        if (req.body.myRating) {
            userplayer.rating = req.body.myRating;
            userplayer.save();
            res.json(userplayer);
        }
    })
});

router.get('/auth/vkontakte', passport.authenticate('vkontakte'));

router.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {failureRedirect: '/'}),
    function(req, res) {
        Player.find({}, function(err, players) {
            if (err) { throw err; }
            var ownPlayer;
            for (var i = 0; i < players.length; i++) {
                if (players[i]._id == req.user._id) {
                    ownPlayer = players[i];
                }
            }
            if (ownPlayer) {
                UserPlayer.find({'userId': req.user._id}, function(err, userplayers) {
                    if (err) {throw err;}
                    for (var i = 0; i < players.length; i++) {
                        if (players[i]._id != ownPlayer._id) {
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
                                newUserPlayer.save();
                            }
                        }
                    }
                    res.render('after-auth.ejs', {user: req.user});
                });
            } else {
                res.render('getout.ejs');
            }
        });
    });

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

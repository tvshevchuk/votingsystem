
var express = require('express');
var passport = require('passport');

var Player = require('./models/Player.js');
var UserPlayer = require('./models/UserPlayer.js');
var User = require('./models/User.js');

var router = express.Router();

router.use(function (req, res, next) {
    console.log(process.env.NODE_ENV);
    if (req.headers["x-forwarded-proto"] !== "https") {
        res.redirect('https://' + req.headers.host + req.url);
    } else {
        next();
    }
});

router.get('/', function(req, res) {
    res.sendfile('./public/main.html');
});

router.get('/getout', isLoggedIn, function(req, res) {
    res.render('getout.ejs');
});

router.get('/api/user', isLoggedIn, function(req, res) {
    res.send(req.user);
});

router.get('/api/users', function(req, res) {
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

router.get('/api/players/:id', isLoggedIn, function(req, res) {
    UserPlayer.find({'userId': req.params.id}, function(err, userplayers) {
        if (err) { throw err; }
        if (userplayers.length) {
            Player.find({}, function(err, players) {
                if (err) {throw err;}

                var myPlayers = [];
                for (var i = 0; i < players.length; i++) {
                    var player = null,
                        userplayer = null;
                    for (var j = 0; j < userplayers.length; j++) {
                        if (userplayers[j].playerId == players[i]._id) {
                            player = players[i];
                            userplayer = userplayers[j];
                        }
                    }
                    if (player) {
                        myPlayers.push({
                            _id: player._id,
                            nickname: player.nickname,
                            image: player.image,
                            rating: player.rating,
                            myRating: userplayer.rating
                        });
                    }
                }

                res.send(myPlayers);
            })}
        else {
            res.send([]);
        }
    });
});

router.post('/api/player/:id', function(req, res) {
    Player.findOne({'_id': req.params.id}, function(err, player) {
        if (err) {
            throw err;
        }
        if (req.body.rating) { player.rating = req.body.rating; }

        if (req.body.myRating) {
            UserPlayer.findOne().and([{'userId': req.user._id}, {'playerId': player._id}])
                .exec(function(err, userPlayer) {
                    if (err) {throw err;}
                    userPlayer.rating = req.body.myRating;
                    userPlayer.save();
                });
        }

        player.save(function(err) {
            if (err) { throw err; }
        });
        res.json(player);
    });
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

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;
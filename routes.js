/**
 * Created by tvshevchuk on 1/21/2015.
 */

var Player = require('./models/Player.js');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('login.ejs');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.sendfile('./public/home.html');
    });

    app.get('/getout', isLoggedIn, function(req, res) {
        res.render('getout.ejs');
    });

    app.get('/api/user', isLoggedIn, function(req, res) {
        res.send(req.user);
    });

    app.get('/api/players', isLoggedIn, function(req, res) {
        Player.find({}, function(err, players) {
           res.send(players);
        });
    });

    app.post('/api/player/:id', function(req, res) {
       Player.findOne({'_id': req.params.id}, function(err, player) {
           if (err) {
               throw err;
           };
           if (req.body.rating) { player.rating = req.body.rating; }
           if (req.body.red_rating) { player.red_rating = req.body.red_rating; }
           if (req.body.black_rating) { player.black_rating = req.body.black_rating; }
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
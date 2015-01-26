/**
 * Created by tvshevchuk on 1/21/2015.
 */

var Player = require('./models/Player.js');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        console.log('get login.ejs');
        res.render('login.ejs');
    });
/*
    app.get('/profile', isLoggedIn, function(req, res) {
        res.sendfile('login.ejs');
    });
*/
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
           player.rating = req.body.rating;
           player.save(function(err) {
               if (err) {
                   throw err;
               };
           });
           res.json(player);
       });
    });

    app.get('/auth/vkontakte', passport.authenticate('vkontakte'));

    app.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {
        console.log('is authenticated', req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next();
        };
        res.redirect('/');
    };
};
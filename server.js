/**
 * Created by tvshevchuk on 1/13/2015.
 */

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var VKStrategy = require('passport-vkontakte').Strategy;

var connection_string = "mongodb://heroku_app33213068:49c3g24b8kk9a264nc9mvn0q6p@ds031591.mongolab.com:31591/heroku_app33213068";
mongoose.connect(connection_string);

var userSchema = new mongoose.Schema({
    id: String,
    token: String,
    email: String,
    name: String
});

var User = mongoose.model('user', userSchema);

var playerSchema = new mongoose.Schema({
    nickname: String,
    rating: Number
});

var Player = mongoose.model('Player', playerSchema);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new VKStrategy({
    clientID: '4730054',
    clientSecret: 'c4Qd5CraNXjM9DzvPwQp',
    callbackURL: 'https://facemafia.herokuapp.com/auth/vkontakte/callback'
}, function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        return done();
    }
));

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/auth/vkontakte', passport.authenticate('vkontakte'));

app.get('/auth/vkontakte/callback', passport.authenticate('vkontakte', {failureRedirect: '#/home'}),
    function(req, res) {
        console.log('asd');
        res.redirect('#/home');
    });

app.get('*', function(req, res) {
   res.sendfile('./public/index.html');
    console.log('send index.html');
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log('Node app is running at localhost:' + port);
});
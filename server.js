
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var favicon = require('serve-favicon');

var connection_string = process.env.NODE_ENV === 'production'
        ? "mongodb://heroku_7tgdb3bv:dq3f6pvsebkfrhk26ejujb6t94@ds047075.mongolab.com:47075/heroku_7tgdb3bv"
        : "mongodb://tvshevchuk:nfhfc1993@ds059145.mongolab.com:59145/testmafiadb";
mongoose.connect(connection_string);

require('./config/passport.js')(passport);

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(session({secret: 'secret', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));

var router = require('./routes.js');
app.use('/', router);

var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log('Node app is running at localhost:' + port);
});

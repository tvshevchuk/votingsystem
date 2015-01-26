/**
 * Created by tvshevchuk on 1/13/2015.
 */

var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var connection_string = "mongodb://heroku_app33213068:49c3g24b8kk9a264nc9mvn0q6p@ds031591.mongolab.com:31591/heroku_app33213068";
mongoose.connect(connection_string);

require('./config/passport.js')(passport);

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.set('view engine', 'ejs');

app.use(session({secret: 'secret', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

require('./routes.js')(app, passport);

var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log('Node app is running at localhost:' + port);
});

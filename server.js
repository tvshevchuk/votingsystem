/**
 * Created by tvshevchuk on 1/13/2015.
 */

var express = require('express');
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');

var connection_string = "mongodb://heroku_app33213068:49c3g24b8kk9a264nc9mvn0q6p@ds031591.mongolab.com:31591/heroku_app33213068";
mongoose.connect(connection_string);

cloudinary.config({
    cloud_name: 'dikpnirpb',
    api_key: '911283725616916',
    api_secret: 'a676b67565c6767a6767d6767f676fe1'
});

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
   res.sendfile('./public/index.html');
    console.log('send index.html');
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log('Node app is running at localhost:' + port);
});
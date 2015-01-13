/**
 * Created by tvshevchuk on 1/13/2015.
 */

var express = require('express');
var mongoose = require('mongoose');

var app = express();
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log('Node app is running at localhost:' + port);
});
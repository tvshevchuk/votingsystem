/**
 * Created by tvshevchuk on 1/21/2015.
 */

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: String,
    token: String,
    url: String,
    name: String
});

module.exports = mongoose.model('User', userSchema);

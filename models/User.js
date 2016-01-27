
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: String,
    token: String,
    name: String
});

module.exports = mongoose.model('User', userSchema);

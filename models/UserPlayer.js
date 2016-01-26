/**
 * Created by tvshevchuk on 1/27/2015.
 */

var mongoose = require('mongoose');

var userPlayerSchema = mongoose.Schema({
    userId: String,
    playerId: String,
    rating: Number
});

module.exports = mongoose.model('UserPlayer', userPlayerSchema);
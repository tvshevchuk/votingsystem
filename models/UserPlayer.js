/**
 * Created by tvshevchuk on 1/27/2015.
 */

var mongoose = require('mongoose');

var userPlayerSchema = mongoose.Schema({
    userId: String,
    playerId: String,
    rating: Number,
    red_rating: Number,
    black_rating: Number
});

module.exports = mongoose.model('UserPlayer', userPlayerSchema);
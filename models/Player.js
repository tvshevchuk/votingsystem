/**
 * Created by tvshevchuk on 1/22/2015.
 */

var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    _id: String,
    rating: Number,
    nickname: String,
    url: String
});

module.exports = mongoose.model('Player', playerSchema);
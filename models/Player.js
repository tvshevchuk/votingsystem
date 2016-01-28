
var mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    _id: String,
    rating: Number,
    nickname: String,
    image: String
});

module.exports = mongoose.model('Player', playerSchema);
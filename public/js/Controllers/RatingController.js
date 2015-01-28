/**
 * Created by tvshevchuk on 1/22/2015.
 */

app.controller('RatingController', function($http, DataService) {

    var _this = this;
    _this.type = DataService.ratingType;

    $http.get('/api/players').success(function(result) {
        console.log(result);
        var players = [];
        for (var i = 0; i < result.length; i++) {
            var player = angular.copy(result[i].player);
            player.myRating = result[i].myRatings.myRating;
            player.myRedRating = result[i].myRatings.myRedRating;
            player.myBlackRating = result[i].myRatings.myBlackRating;
            players.push(player);
        }
        _this.players = _.sortBy(players, function(player) {
            switch (_this.type) {
                case 0:
                    return -player.rating;
                    break;
                case 1:
                    return -player.red_rating;
                    break;
                case 2:
                    return -player.black_rating;
                    break;
                case 3:
                    return -player.myRating;
                    break;
                case 4:
                    return -player.myRedRating;
                    break;
                case 5:
                    return -player.myBlackRating;
                    break;
            }
        });
    });

});
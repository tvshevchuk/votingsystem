/**
 * Created by tvshevchuk on 1/22/2015.
 */

app.controller('RatingController', function($http, allPlayers, DataService) {

    var _this = this;
    _this.type = DataService.ratingType;

    console.log(allPlayers);

   // $http.get('/api/players/' + DataService.user._id).success(function(result) {

        var result = allPlayers;
        var players = [];
        for (var i = 0; i < result.length; i++) {
            var player = angular.copy(result[i].player);
            player.myRating = result[i].myRatings.myRating;
            player.myRedRating = result[i].myRatings.myRedRating;
            player.myBlackRating = result[i].myRatings.myBlackRating;
            players.push(player);
        }

        _.remove(players, function(player) {
            return player.url == "http://vk.com/tourist_petya";
        });

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

   // });

});
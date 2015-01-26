/**
 * Created by tvshevchuk on 1/22/2015.
 */

app.controller('RatingController', function($scope, $http) {

    var _this = this;
    $http.get('/api/players').success(function(result) {
        _this.players = _.sortBy(result, function(player) {
            return -player.rating;
        });
    });

});
/**
 * Created by tvshevchuk on 1/30/2015.
 */

app.controller('AdminController', function($http, $state, $stateParams) {

    var self = this;
    $http.get('/api/user').success(function(user) {
        if (user.url == "http://vk.com/tourist_petya") {
            $http.get('/api/users').success(function(users) {
                self.users = users;
            });
        } else {
            $state.go('/', $stateParams, {reload: true});
        }
    });

    this.getRating = function(id) {
        $http.get('/api/players/' + id).success(function(result) {
           console.log(player);

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

            self.bestplayers = _.sortBy(players, function(player) {
                return -player.myRating;
            });

            self.redplayers = _.sortBy(players, function(player) {
                return -player.myRedRating;
            });

            self.blackplayers = _.sortBy(players, function(player) {
                return -player.myBlackRating;
            });

        });
    };

});
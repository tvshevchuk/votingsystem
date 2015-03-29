/**
 * Created by Taras on 18.03.2015.
 */

app.factory('MyPlayersFactory', ['$http', '$q', 'UserFactory',
    function($http, $q, UserFactory) {

        var factory = {};

        factory.players = [];
        factory.viewPlayers = [];
        factory.votingType = 0;

        factory.getMyPlayersForVoting = function() {

            var defer = $q.defer();
            var user = UserFactory.user;

            $http.get('/api/players/' + user._id)
                .success(function (result) {
                    var players = [];
                    for (var i = 0; i < result.length; i++) {
                        var player = result[i].player;
                        if (player.url != 'http://vk.com/tourist_petya' && player.url != user.url) {
                            player.myRating = result[i].myRatings.myRating;
                            player.myRedRating = result[i].myRatings.myRedRating;
                            player.myBlackRating = result[i].myRatings.myBlackRating;
                            players.push(player);
                        }
                    }
                    defer.resolve(players);
                });

            return defer.promise;
        };

        factory.getMyPlayers = function(type) {

            var defer = $q.defer();
            var user = UserFactory.user;

            $http.get('/api/players/' + user._id)
                .success(function (result) {
                    console.log(result);
                    var players = [];
                    for (var i = 0; i < result.length; i++) {
                        var player = result[i].player;
                        if (player._id != '17783420' && player._id != user._id) {
                            player.myRating = result[i].myRatings.myRating;
                            player.myRedRating = result[i].myRatings.myRedRating;
                            player.myBlackRating = result[i].myRatings.myBlackRating;
                            players.push(player);
                        }
                    }

                    players = _.sortBy(players, function(player) {
                        switch (type) {
                            case 0:
                                return -player.myRating;
                                break;
                            case 1:
                                return -player.myRedRating;
                                break;
                            case 2:
                                return -player.myBlackRating;
                                break;
                        }
                    });

                    factory.viewPlayers.splice(0, factory.viewPlayers.length);
                    for (var i = 0; i < players.length; i++) {
                        var rating;
                        switch (type) {
                            case 0:
                                rating = players[i].myRating;
                                break;
                            case 1:
                                rating = players[i].myRedRating;
                                break;
                            case 2:
                                rating = players[i].myBlackRating;
                                break;
                        }
                        factory.viewPlayers.push({
                            nickname: players[i].nickname,
                            image: players[i].image,
                            rating: rating
                        });
                    }

                    console.log(factory.viewPlayers);

                    defer.resolve(factory.viewPlayers);
                });

            return defer.promise;
        };

        return factory;

}]);
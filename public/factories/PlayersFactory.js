/**
 * Created by Taras on 09.03.2015.
 */

app.factory('PlayersFactory', ['$http', '$q', function($http, $q) {

    var factory = {};

    factory.players = [];
    factory.viewPlayers = [];

    factory.getAllPlayers = function(type) {

        var defer = $q.defer();

        $http.get('/api/players')
            .success(function (result) {
                factory.players = _.filter(result, function(player) {
                    return player._id != "17783420"
                });

                var players = _.sortBy(factory.players, function(player) {
                   switch (type) {
                       case 0:
                            return -player.rating;
                            break;
                       case 1:
                            return -player.red_rating;
                            break;
                       case 2:
                            return -player.black_rating;
                            break;
                   }
                });

                factory.viewPlayers.splice(0, factory.viewPlayers.length);
                for (var i = 0; i < players.length; i++) {
                    var rating;
                    switch (type) {
                        case 0:
                            rating = players[i].rating;
                            break;
                        case 1:
                            rating = players[i].red_rating;
                            break;
                        case 2:
                            rating = players[i].black_rating;
                            break;
                    }
                    factory.viewPlayers.push({
                        nickname: players[i].nickname,
                        image: players[i].image,
                        rating: rating
                    });
                }

                defer.resolve(factory.viewPlayers);
            });

        return defer.promise;
    };

    return factory;

}]);
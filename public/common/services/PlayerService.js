(function(angular, _) {
    'use strict';

    angular.module('mafia').service('PlayerService', service);

    service.$inject = ['$http', '$q', 'UserValue'];

    function service($http, $q, UserValue) {

        var service = this;

        service.loadPlayersInfo = loadPlayersInfo;
        service.updatePlayerRating = updatePlayerRating;
        service.getMyPlayers = getMyPlayers;
        service.voteForPlayer = voteForPlayer;

        init();

        function init() {
          service.players = [];
          service.userPlayers = {};
          service.myRatingIsLoaded = false;
        }

        function getAllPlayers() {
            return $http.get('/api/players').then(function(result) {
                result.data.forEach(function(elem) {
                    var sameElem = _.find(service.players, {'_id': elem._id});
                    if (sameElem) {
                        angular.extend(sameElem, elem);
                    } else {
                        service.players.push(elem);
                    }
                });
            });
        }

        function getMyPlayers(myId) {
            return $http.get('/api/players/users/' + myId)
                .then(function (result) {
                    service.userPlayers[myId] = [];
                    result.data.forEach(function(elem) {
                        var sameElem = angular.copy(_.find(service.players, {'_id': elem.playerId}));
                        if (sameElem && elem.playerId !== myId) {
                            sameElem.myRating = elem.rating;
                            service.userPlayers[myId].push(sameElem);
                        }
                    });
                });
        }

        function loadPlayersInfo() {
            getAllPlayers().then(function() {
                if (UserValue._id && !service.myRatingIsLoaded) {
                    getMyPlayers(UserValue._id);
                    service.myRatingIsLoaded = true;
                }
            });
        }

        function updatePlayerRating(player) {
            return $http.get('/api/players/' + player._id).then(function(result) {
                player.rating = result.data.rating;
            });
        }

        function voteForPlayer(id, data) {
            return $q.all([
                $http.put('/api/players/' + id, {rating: data.rating}),
                $http.put('/api/users/' + UserValue._id + '/players/' + id, {myRating: data.myRating})
                  .then(function() {
                      var player = _.find(service.userPlayers[UserValue._id], function(elem) {
                          return elem._id === id;
                      });
                      player.myRating = data.myRating;
                  })
            ]);
        }

    }

})(angular, _);

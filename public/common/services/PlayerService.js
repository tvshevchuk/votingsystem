(function(angular, _) {
    'use strict';

    angular.module('mafia').service('PlayerService', service);

    service.$inject = ['$http', 'UserValue'];

    function service($http, UserValue) {

        var service = this;

        service.getAllPlayers = getAllPlayers;
        service.getMyPlayers = getMyPlayers;
        service.voteForPlayer = voteForPlayer;

        function getAllPlayers() {
            return $http.get('/api/players').then(function(result) {return result.data; });
        }

        function getMyPlayers(id) {
            var myId = id ? id : UserValue._id;
            return $http.get('/api/players/' + myId)
                .then(function (result) {
                    return _.filter(result.data, function(player) {
                        return player._id != myId;
                    });
                });
        }

        function voteForPlayer(id, data) {
            return $http.post('/api/player/' + id, data);
        }

    }

})(angular, _);
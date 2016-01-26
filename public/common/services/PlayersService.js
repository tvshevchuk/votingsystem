(function() {
    'use strict';

    angular.module('mafia').service('PlayersService', service);

    service.$inject = ['$http'];

    function service($http) {

        var service = this;

        service.getAllPlayers = getAllPlayers;

        function getAllPlayers() {
            return $http.get('/api/players').then(function(result) {return result.data; });
        }
    }

})();

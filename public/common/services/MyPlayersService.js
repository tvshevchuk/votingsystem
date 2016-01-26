(function() {
    'use strict';

    angular.module('mafia').service('MyPlayersService', service);

    service.$inject = ['$http', 'UserValue'];

    function service($http, UserValue) {

        var service = this;

        service.getMyPlayers = getMyPlayers;

        init();

        function init() {
            service.players = [];
            service.viewPlayers = [];
        }

        function getMyPlayers() {

            return $http.get('/api/players/' + UserValue._id)
                        .then(function (result) {

                                return _.filter(result.data, function(player) {
                                    return player._id != UserValue._id;
                                });

                        });
        }
    }

})();
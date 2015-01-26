/**
 * Created by tvshevchuk on 1/22/2015.
 */

app.factory('PlayerService', function($http) {

    var service = {};

    service.players = [];

    service.getPlayers = function() {
        $http.get('/api/players')
            .success(function (result) {
                service.players = result;
            });
    };

    return service;
});
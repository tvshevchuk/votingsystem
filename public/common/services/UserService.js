(function(angular) {
    'use strict';

    angular.module('mafia').service('UserService', service);

    service.$inject = ['$http'];

    function service($http) {

        var service = this;

        service.getAllUsers = getAllUsers;

        function getAllUsers() {
            return $http.get('/api/users').then(function(result) { return result.data; });
        }

    }

})(angular);
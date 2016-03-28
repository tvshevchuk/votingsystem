(function(angular) {
    'use strict';

    angular.module('mafia').controller('AdminController', controller);

    controller.$inject = ['UserService', 'PlayerService'];

    function controller(UserService, PlayerService) {

        var vm = this;

        vm.getRating = getRating;

        init();

        function init() {
            UserService.getAllUsers().then(function(result) {
                vm.users = result;
            });
        }

        function getRating(id) {
            PlayerService.getMyPlayers(id);
            vm.players = PlayerService.userPlayers[id];
        }

    }

})(angular);

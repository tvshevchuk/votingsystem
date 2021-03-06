(function() {
    'use strict';

    angular.module('mafia').controller('RatingController', controller);

    controller.$inject = ['PlayerService'];

    function controller(PlayerService) {

        var vm = this;

        init();

        function init() {
            PlayerService.loadPlayersInfo();
            vm.players = PlayerService.players;
        }

    }

})();

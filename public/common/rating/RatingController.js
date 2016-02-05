(function() {
    'use strict';

    angular.module('mafia').controller('RatingController', controller);

    controller.$inject = ['PlayersService'];

    function controller(PlayersService) {

        var vm = this;

        init();

        function init() {
            PlayersService.getAllPlayers().then(function(result) {
                vm.players = result;
            });
        }

    }

})();
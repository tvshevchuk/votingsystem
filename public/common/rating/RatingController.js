(function() {
    'use strict';

    angular.module('mafia').controller('RatingController', controller);

    controller.$inject = ['$state', 'UserValue', 'PlayersService'];

    function controller($state, UserValue, PlayersService) {

        var vm = this;

        init();

        function init() {

            if (!UserValue._id && $state.current.name != 'start') {
                $state.go('start');
            }

            PlayersService.getAllPlayers().then(function(result) {
                vm.players = result;
            });
        }

    }

})();
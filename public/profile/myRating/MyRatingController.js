(function() {
    'use strict';

    angular.module('mafia').controller('MyRatingController', controller);

    controller.$inject = ['PlayerService'];

    function controller(PlayerService) {

        var vm = this;

        init();

        function init() {
            PlayerService.getMyPlayers().then(function(result) {
                vm.players = result;
            });
        }
    }

})();

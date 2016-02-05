(function() {
    'use strict';

    angular.module('mafia').controller('MyRatingController', controller);

    controller.$inject = ['MyPlayersService'];

    function controller(MyPlayersFactory) {

        var vm = this;

        init();

        function init() {
            MyPlayersFactory.getMyPlayers().then(function(result) {
                vm.players = result;
            });
        }
    }

})();

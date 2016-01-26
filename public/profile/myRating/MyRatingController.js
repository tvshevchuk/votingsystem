(function() {
    'use strict';

    angular.module('mafia').controller('MyRatingController', controller);

    controller.$inject = ['$state', 'UserValue', 'MyPlayersService'];

    function controller($state, UserValue, MyPlayersFactory) {

        var vm = this;

        init();

        function init() {

            if (!UserValue._id && $state.current.name != 'start') {
                $state.go('start');
            }

            MyPlayersFactory.getMyPlayers().then(function(result) {
                vm.players = result;
            });
        }
    }

})();

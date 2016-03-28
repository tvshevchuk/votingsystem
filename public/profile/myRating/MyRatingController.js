(function(angular, _) {
    'use strict';

    angular.module('mafia').controller('MyRatingController', controller);

    controller.$inject = ['PlayerService', 'UserValue'];

    function controller(PlayerService, UserValue) {

        var vm = this;

        init();

        function init() {
            vm.players = PlayerService.userPlayers[UserValue._id];
        }
    }

})(angular, _);

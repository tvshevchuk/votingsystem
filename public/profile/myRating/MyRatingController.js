(function(angular, _) {
    'use strict';

    angular.module('mafia').controller('MyRatingController', controller);

    controller.$inject = ['PlayerService'];

    function controller(PlayerService) {

        var vm = this;

        init();

        function init() {
            vm.players = _.filter(PlayerService.players, function(player) {
                return player.myRating;
            });
        }
    }

})(angular, _);

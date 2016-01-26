(function() {
    'use strict';

    angular.module('mafia').controller('MainHeaderController', controller);

    controller.$inject = ['$state', '$stateParams'];

    function controller($state, $stateParams) {

        var vm = this;

        vm.goVoting = goVoting;
        vm.bestPlayer = bestPlayer;
        vm.myBestPlayer = myBestPlayer;

        function goVoting() {
            $state.go('profile.voting', $stateParams, {reload: true});
        }

        function bestPlayer() {
            $state.go('profile.rating');
        }

        function myBestPlayer() {
            $state.go('profile.myrating');
        }
    }
})();

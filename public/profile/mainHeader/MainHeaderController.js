(function() {
    'use strict';

    angular.module('mafia').controller('MainHeaderController', controller);

    controller.$inject = ['$state', '$stateParams', 'UserValue'];

    function controller($state, $stateParams, UserValue) {

        var vm = this;

        vm.goVoting = goVoting;
        vm.bestPlayer = bestPlayer;
        vm.myBestPlayer = myBestPlayer;

        init();

        function init() {
            vm.user = UserValue;
        }

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

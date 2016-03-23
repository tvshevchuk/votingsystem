(function() {
    'use strict';

    angular.module('mafia', ['ui.router'])
    .value('UserValue', {})
    .run(['$window', '$rootScope', '$state', 'UserValue',
    function($window, $rootScope, $state, UserValue) {

        $window.app = function(user) {
            $rootScope.$apply(function() {
                angular.extend(UserValue, user);
                $rootScope.$emit('successLogin');
            })
        };

        $rootScope.$on('$stateChangeSuccess', function() {
            if (!UserValue._id && $state.current.name != 'start') {
                $state.go('start');
            }
        });

        $rootScope.$on('successLogin', function() {
            $state.go('profile.rating');
        });

}]);
})();

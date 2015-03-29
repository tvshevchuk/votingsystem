/**
 * Created by tvshevchuk on 1/14/2015.
 */

var app = angular.module('myApp', ['ui.router'])
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
        function($locationProvider, $stateProvider, $urlRouterProvider) {

            /*$locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
*/
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('start', {
                    url: '/',
                    views: {
                        'header': {
                            templateUrl: 'header/templates/startHeader.tpl.html',
                            controller: 'StartHeaderController',
                            controllerAs: 'ctrl'
                        },
                        'content': {
                            templateUrl: 'content/templates/ratingContent.tpl.html',
                            controller: 'RatingController',
                            controllerAs: 'ctrl'
                        }
                    }
                })
                .state('profile', {
                    abstract: true,
                    url: '/profile',
                    views: {
                        'header': {
                            templateUrl: 'header/templates/mainHeader.tpl.html',
                            controller: 'MainHeaderController',
                            controllerAs: 'ctrl'
                        }
                    }
                })
                .state('profile.voting', {
                    url: '/voting',
                    views: {
                        'content@': {
                            templateUrl: 'content/templates/votingContent.tpl.html',
                            controller: 'VotingController',
                            controllerAs: 'ctrl'
                        }
                    }
                })
                .state('profile.rating', {
                    url: '/rating',
                    views: {
                        'content@': {
                            templateUrl: 'content/templates/ratingContent.tpl.html',
                            controller: 'RatingController',
                            controllerAs: 'ctrl'
                        }
                    }
                })
                .state('profile.myrating', {
                    url: '/myrating',
                    views: {
                        'content@': {
                            templateUrl: 'content/templates/ratingContent.tpl.html',
                            controller: 'MyRatingController',
                            controllerAs: 'ctrl'
                        }
                    }
                })
                .state('admin', {
                    url: '/admin',
                    views: {
                        'content': {
                            templateUrl: 'admin/admin.html',
                            controller: 'AdminController'
                        }
                    }
                })
    }]);

app.run(['$window', '$rootScope', '$state', 'UserFactory',
    function($window, $rootScope, $state, UserFactory) {

    $window.app = function(user) {
        $rootScope.$apply(function() {
            console.log(user);
            UserFactory.user = user;
            $rootScope.$emit('successLogin');
        })
    }

    $rootScope.$on('successLogin', function() {
        $state.go('profile.rating');
    });

}]);
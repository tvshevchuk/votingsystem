
angular.module('mafia', ['ui.router'])
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
                            templateUrl: 'start/startHeader/startHeader.tpl.html',
                            controller: 'StartHeaderController',
                            controllerAs: 'startHeaderCtrl'
                        },
                        'content': {
                            templateUrl: 'common/rating/ratingContent.tpl.html',
                            controller: 'RatingController',
                            controllerAs: 'ratingCtrl'
                        }
                    }
                })
                .state('profile', {
                    abstract: true,
                    url: '/profile',
                    views: {
                        'header': {
                            templateUrl: 'profile/mainHeader/mainHeader.tpl.html',
                            controller: 'MainHeaderController',
                            controllerAs: 'mainHeaderCtrl'
                        }
                    }
                })
                .state('profile.voting', {
                    url: '/voting',
                    views: {
                        'content@': {
                            templateUrl: 'profile/voting/votingContent.tpl.html',
                            controller: 'VotingController',
                            controllerAs: 'votingCtrl'
                        }
                    }
                })
                .state('profile.rating', {
                    url: '/rating',
                    views: {
                        'content@': {
                            templateUrl: 'common/rating/ratingContent.tpl.html',
                            controller: 'RatingController',
                            controllerAs: 'ratingCtrl'
                        }
                    }
                })
                .state('profile.myrating', {
                    url: '/myrating',
                    views: {
                        'content@': {
                            templateUrl: 'profile/myRating/myRating.tpl.html',
                            controller: 'MyRatingController',
                            controllerAs: 'myRatingCtrl'
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
    }])
    .value('UserValue', {})
    .run(['$window', '$rootScope', '$state', 'UserValue',
    function($window, $rootScope, $state, UserValue) {

        $window.app = function(user) {
            $rootScope.$apply(function() {
                angular.extend(UserValue, user);
                $rootScope.$emit('successLogin');
            })
        };

        $rootScope.$on('successLogin', function() {
            $state.go('profile.rating');
        });

}]);
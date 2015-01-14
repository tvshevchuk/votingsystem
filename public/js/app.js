/**
 * Created by tvshevchuk on 1/14/2015.
 */

angular.module('myApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('voting', {
                url: '/',
                templateUrl: 'templates/voting.html'
            })
            .state('rating', {
                url: '/rating',
                templateUrl: 'templates/rating.html'
            })
            .state('playerbase', {
                url: '/playerbase',
                templateUrl: 'templates/playerbase.html'
            })
            .state('addplayer', {
                url: '/addplayer',
                templateUrl: 'templates/addplayer.html'
            });
    }]);
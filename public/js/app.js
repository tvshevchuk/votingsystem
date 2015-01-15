/**
 * Created by tvshevchuk on 1/14/2015.
 */

var app = angular.module('myApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController',
                controllerAs: 'ctrl'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html'
            })
            .state('home.voting', {
                templateUrl: 'templates/voting.html'
            })
            .state('home.rating', {
                templateUrl: 'templates/rating.html'
            })
            .state('home.playerbase', {
                templateUrl: 'templates/playerbase.html'
            })
            .state('home.addplayer', {
                templateUrl: 'templates/addplayer.html'
            });
    }]);
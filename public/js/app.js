/**
 * Created by tvshevchuk on 1/14/2015.
 */

var app = angular.module('myApp', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/voting');

        $stateProvider
            .state('home', {
                abstract: true,
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeController',
                controllerAs: 'ctrl',
                resolve: {
                    parentUser: function($http) {
                        return $http.get('/api/user');
                    },
                    parentLoad: function($http, parentUser) {
                        console.log('there', parentUser);
                        return $http.get('/api/players/' + parentUser.data._id);
                    }
                }
            })
            .state('home.voting', {
                url: '/voting',
                templateUrl: 'templates/voting.html',
                controller: 'VotingController',
                controllerAs: 'ctrl',
                resolve: {
                    allPlayers: function (parentLoad, parentUser) {
                        return _.remove(parentLoad.data, function (player) {
                            return player.player.url != "http://vk.com/tourist_petya"
                                && player.player.url != parentUser.data.url;
                        });
                    }
                }
            })
            .state('home.rating', {
                url: '/rating',
                templateUrl: 'templates/rating.html',
                controller: 'RatingController',
                controllerAs: 'ctrl'
            })
            .state('admin', {
                url:'/admin',
                templateUrl: 'templates/admin.html',
                controller: 'AdminController',
                controllerAs: 'ctrl'
            })
    }]);
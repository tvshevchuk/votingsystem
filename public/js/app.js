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
                    votingType: function() {
                        return 0;
                    },
                    parentLoad: function($http) {
                        return $http.get('/api/players');
                    }
                }
            })
            .state('home.voting', {
                url: '/voting',
                templateUrl: 'templates/voting.html',
                controller: 'VotingController',
                controllerAs: 'ctrl',
                resolve: {
                    allPlayers: function(parentLoad) {
                        return _.remove(parentLoad.data, function(player) {
                            return player.player.url != "http://vk.com/tourist_petya";
                        });
                    },
                    voting: function(votingType) {
                        return votingType;
                    }
                }
            })
            .state('home.rating', {
                url: '/rating',
                templateUrl: 'templates/rating.html',
                controller: 'RatingController',
                controllerAs: 'ctrl'
            });
    }]);
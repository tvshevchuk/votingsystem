(function() {
    'use strict';

    angular.module('mafia').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
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
          .state('profile.admin', {
              url: '/admin',
              views: {
                  'content@': {
                      templateUrl: 'profile/admin/admin.tpl.html',
                      controller: 'AdminController',
                      controllerAs: 'adminCtrl'
                  }
              }
          })
    }

})();

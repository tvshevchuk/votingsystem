/**
 * Created by tvshevchuk on 1/20/2015.
 */

app.controller('HomeController', function($state, $stateParams, DataService) {

    this.goVoting = function(type) {
        DataService.votingType = type;
        $state.go('^.voting', $stateParams, {reload: true});
    };

    this.goRating = function(type) {
        DataService.ratingType = type;
        $state.go('^.rating', $stateParams, {reload: true});
    };

});
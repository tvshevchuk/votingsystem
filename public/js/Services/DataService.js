/**
 * Created by tvshevchuk on 1/27/2015.
 */

app.factory('DataService', function($http) {

    var data = {};
    data.votingType = 0;
    data.ratingType = 0;
    data.myRatingType = 0;

    data.getPlayers = function(id) {
        return $http.get('/api/players/' + id);
    };

    return data;

});
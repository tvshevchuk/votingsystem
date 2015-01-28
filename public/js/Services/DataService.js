/**
 * Created by tvshevchuk on 1/27/2015.
 */

app.factory('DataService', function() {

    var data = {};
    data.votingType = 0;
    data.ratingType = 0;
    data.myRatingType = 0;
    return data;

})
/**
 * Created by tvshevchuk on 1/20/2015.
 */

app.controller('HomeController', function($http, $state, parentLoad) {

    console.log(parentLoad);

    $http.get('/api/user')
        .success(function(user) {
            var index = _.findIndex(parentLoad.data, function(player) {
                return player.url == user.url;
            });
            if (index < 0) {
                $state.go('getout');
            };
        });

});
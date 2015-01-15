/**
 * Created by tvshevchuk on 1/15/2015.
 */

app.controller('LoginController', ['$http', function($http) {

    this.auth = function() {
        $http.get('/auth/vkontakte');
    };

}]);
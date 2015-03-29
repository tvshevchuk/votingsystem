/**
 * Created by Taras on 09.03.2015.
 */

app.controller('StartHeaderController', ['$window', 'PlayersFactory', function($window, PlayersFactory) {

    var self = this;

    self.PlayersFactory = PlayersFactory;

    PlayersFactory.getAllPlayers(0);

    self.loginVk = function() {
        var url = '/auth/vkontakte',
            width = 1000,
            height = 650,
            top = (window.outerHeight - height) / 2,
            left = (window.outerWidth - width) / 2;
        $window.open(url, 'vkontakte_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
    };

}]);
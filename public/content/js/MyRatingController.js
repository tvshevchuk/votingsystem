/**
 * Created by Taras on 18.03.2015.
 */

app.controller('MyRatingController', ['$state', 'UserFactory', 'MyPlayersFactory',
    function($state, UserFactory, MyPlayersFactory) {

        if (!UserFactory.user._id) {
            $state.go('start');
        }

        this.players = MyPlayersFactory.viewPlayers;

}]);
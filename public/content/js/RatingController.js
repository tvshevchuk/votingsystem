/**
 * Created by Taras on 09.03.2015.
 */

app.controller('RatingController', ['$state', 'UserFactory', 'PlayersFactory',
    function($state, UserFactory, PlayersFactory) {

    this.players = PlayersFactory.viewPlayers;

    if (!UserFactory.user._id && $state.current.name != 'start') {
        $state.go('start');
    }

}]);
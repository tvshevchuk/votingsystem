/**
 * Created by Taras on 21.03.2015.
 */

app.controller('MainHeaderController', ['$state', '$stateParams', 'PlayersFactory', 'MyPlayersFactory',
    function($state, $stateParams, PlayersFactory, MyPlayersFactory) {

    PlayersFactory.getAllPlayers(0);

    this.goVoting = function(type) {
        MyPlayersFactory.votingType = type;
        $state.go('profile.voting', $stateParams, {reload: true});
    };

    this.bestPlayer = function(type) {
        PlayersFactory.getAllPlayers(type);
        $state.go('profile.rating');
    };

    this.myBestPlayer = function(type) {
        MyPlayersFactory.getMyPlayers(type);
        $state.go('profile.myrating');
    };

}]);
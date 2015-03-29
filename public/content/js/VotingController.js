/**
 * Created by Taras on 17.03.2015.
 */

app.controller('VotingController', ['$http', '$state', 'UserFactory', 'MyPlayersFactory',
    function($http, $state, UserFactory, MyPlayersFactory) {

        var self = this;

        if (!UserFactory.user._id) {
            $state.go('start');
        }

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return angular.copy(array);
        }

        function comparePlayers() {
            self.leftPlayer = self.array[0];
            self.rightPlayer = self.array[1];
            self.array.splice(0, 2);
            if (self.array.length == 0) {
                self.array = shuffleArray(players);
            } else if (self.array.length == 1) {
                var tempArray = shuffleArray(players);
                if (self.array[0]._id == tempArray[0]._id) {
                    var tempElem = tempArray[0];
                    tempArray[0] = tempArray[tempArray.length - 1];
                    tempArray[tempArray.length - 1] = tempElem;
                }
                self.array = self.array.concat(tempArray);
            }
        }

        var players = [];
        var blockVoting = false;
        self.array = [];

        MyPlayersFactory.getMyPlayersForVoting().then(function(result) {
            players = result;
            self.array = shuffleArray(result);
            comparePlayers();
        });

        self.voteForPlayer = function(isLeft) {
           if (!blockVoting) {

               blockVoting = true;

               var self = this;
               var leftRating, rightRating, myLeftRating, myRightRating;

               switch (MyPlayersFactory.votingType) {
                    case 0:
                        leftRating = this.leftPlayer.rating;
                        rightRating = this.rightPlayer.rating;
                        myLeftRating = this.leftPlayer.myRating;
                        myRightRating = this.rightPlayer.myRating;
                        break;
                    case 1:
                        leftRating = this.leftPlayer.red_rating;
                        rightRating = this.rightPlayer.red_rating;
                        myLeftRating = this.leftPlayer.myRedRating;
                        myRightRating = this.rightPlayer.myRedRating;
                        break;
                    case 2:
                        leftRating = this.leftPlayer.black_rating;
                        rightRating = this.rightPlayer.black_rating;
                        myLeftRating = this.leftPlayer.myBlackRating;
                        myRightRating = this.rightPlayer.myBlackRating;
                        break;
                }

               var ea = 1 / (1 + Math.pow(10, (rightRating - leftRating) / 400));
               var eb = 1 / (1 + Math.pow(10, (leftRating - rightRating) / 400));

               var sa = isLeft ? 1 : 0;
               var sb = isLeft ? 0 : 1;

               var ka = leftRating > 2400 ? 10 : 15;
               var kb = rightRating > 2400 ? 10 : 15;

               leftRating = Math.floor(leftRating + ka * (sa - ea));
               rightRating = Math.floor(rightRating + kb * (sb - eb));

               var mea = 1 / (1 + Math.pow(10, (myRightRating - myLeftRating) / 400));
               var meb = 1 / (1 + Math.pow(10, (myLeftRating - myRightRating) / 400));

               var msa = isLeft ? 1 : 0;
               var msb = isLeft ? 0 : 1;

               var mka = myLeftRating > 2400 ? 10 : 15;
               var mkb = myRightRating > 2400 ? 10 : 15;

               myLeftRating = Math.floor(myLeftRating + mka * (msa - mea));
               myRightRating = Math.floor(myRightRating + mkb * (msb - meb));

               var postLeft, postRight;
               switch (MyPlayersFactory.votingType) {
                   case 0:
                       postLeft = {rating: leftRating, myRating: myLeftRating};
                       postRight = {rating: rightRating, myRating: myRightRating};
                       break;
                   case 1:
                       postLeft = {red_rating: leftRating, myRedRating: myLeftRating};
                       postRight = {red_rating: rightRating, myRedRating: myRightRating};
                       break;
                   case 2:
                       postLeft = {black_rating: leftRating, myBlackRating: myLeftRating};
                       postRight = {black_rating: rightRating, myBlackRating: myRightRating};
               }

               $http.post('/api/player/' + self.leftPlayer._id, postLeft)
                   .success(function () {
                       $http.post('/api/player/' + self.rightPlayer._id, postRight)
                           .success(function () {
                               blockVoting = false;
                               comparePlayers();
                           });
                   });
           }
        }

}]);
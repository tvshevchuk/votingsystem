/**
 * Created by tvshevchuk on 1/22/2015.
 */

app.controller('VotingController', function($http, allPlayers, DataService) {

   function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var temp = array[i];
         array[i] = array[j];
         array[j] = temp;
      }
      return angular.copy(array);
   }

    var array = allPlayers;
    var players = [];
    for (var i = 0; i < array.length; i++) {
        var player = angular.copy(array[i].player);
        player.myRating = array[i].myRatings.myRating;
        player.myRedRating = array[i].myRatings.myRedRating;
        player.myBlackRating = array[i].myRatings.myBlackRating;
        players.push(player);
    }

    var newArray = shuffleArray(players);

   this.comparePlayers = function() {

      this.leftPlayer = newArray[0];
      this.rightPlayer = newArray[1];
       console.log(this.leftPlayer, this.rightPlayer);

      newArray.splice(0, 2);

      if (newArray.length == 0) {
         newArray = shuffleArray(players);
      } else if (newArray.length == 1) {
         var tempArray = shuffleArray(players);
         if (newArray[0]._id == tempArray[0]._id) {
            var tempElem = tempArray[0];
            tempArray[0] = tempArray[tempArray.length - 1];
            tempArray[tempArray.length - 1] = tempElem;
         };
         newArray = newArray.concat(tempArray);
      };
   };

    this.comparePlayers();
    this.blockVoting = false;

   this.voteForPlayer = function(isLeft) {
       if (!this.blockVoting) {

           this.blockVoting = true;

           var self = this;

           var leftRating, rightRating, myLeftRating, myRightRating;
           switch (DataService.votingType) {
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
           switch (DataService.votingType) {
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
                           self.blockVoting = false;
                           self.comparePlayers();
                       });
               });
       }

   };
});
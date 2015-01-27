/**
 * Created by tvshevchuk on 1/22/2015.
 */

app.controller('VotingController', function($http, allPlayers, DataService) {

   console.log(DataService.votingType);

   function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
         var j = Math.floor(Math.random() * (i + 1));
         var temp = array[i];
         array[i] = array[j];
         array[j] = temp;
      }
      return angular.copy(array);
   };

   var newArray = shuffleArray(allPlayers.data);

   this.comparePlayers = function() {

      this.leftPlayer = newArray[0];
      this.rightPlayer = newArray[1];
      newArray.splice(0, 2);

      if (newArray.length == 0) {
         newArray = shuffleArray(allPlayers.data);
      } else if (newArray.length == 1) {
         var tempArray = shuffleArray(allPlayers.data);
         if (newArray[0]._id == tempArray[0]._id) {
            var tempElem = tempArray[0];
            tempArray[0] = tempArray[tempArray.length - 1];
            tempArray[tempArray.length - 1] = tempElem;
         };
         newArray = newArray.concat(tempArray);
      };
   };

   this.comparePlayers();

   this.voteForPlayer = function(isLeft, type) {
      var self = this;

      var ea = 1 / (1 + Math.pow(10, (this.rightPlayer.rating - this.leftPlayer.rating) / 400));
      var eb = 1 / (1 + Math.pow(10, (this.leftPlayer.rating - this.rightPlayer.rating) / 400));

      var sa = isLeft ? 1 : 0;
      var sb = isLeft ? 0 : 1;

      var ka = this.leftPlayer.rating > 2400 ? 10 : 15;
      var kb = this.rightPlayer.rating > 2400 ? 10 : 15;

      this.leftPlayer.rating = Math.floor(this.leftPlayer.rating + ka * (sa - ea));
      this.rightPlayer.rating = Math.floor(this.rightPlayer.rating + kb * (sb - eb));

      $http.post('/api/player/' + self.leftPlayer._id, {rating: self.leftPlayer.rating})
          .success(function() {
             $http.post('/api/player/' + self.rightPlayer._id, {rating: self.rightPlayer.rating})
                 .success(function() {
                    self.comparePlayers();
                 });
          });
   };

});
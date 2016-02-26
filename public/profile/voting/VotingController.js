(function() {
    'use strict';

    angular.module('mafia').controller('VotingController', controller);

    controller.$inject = ['$q', 'PlayerService'];

    function controller($q, PlayerService) {

        var vm = this;

        vm.voteForPlayer = voteForPlayer;

        init();

        function init() {

            vm.players = [];
            vm.blockVoting = false;
            vm.array = [];

            PlayerService.getMyPlayers().then(function(result) {
                vm.players = result;
                vm.array = _.shuffle(result);
                comparePlayers();
            });
        }

        function comparePlayers() {
            vm.leftPlayer = vm.array[0];
            vm.rightPlayer = vm.array[1];
            vm.array.splice(0, 2);
            if (vm.array.length == 0) {
                vm.array = _.shuffle(vm.players);
            } else if (vm.array.length == 1) {
                var tempArray = _.shuffle(vm.players);
                if (vm.array[0]._id == tempArray[0]._id) {
                    var tempElem = tempArray[0];
                    tempArray[0] = tempArray[tempArray.length - 1];
                    tempArray[tempArray.length - 1] = tempElem;
                }
                vm.array = vm.array.concat(tempArray);
            }
        }

        function voteForPlayer(isLeft) {
            if (!vm.blockVoting) {

                vm.blockVoting = true;

                var leftRating, rightRating, myLeftRating, myRightRating;

                leftRating = vm.leftPlayer.rating;
                rightRating = vm.rightPlayer.rating;
                myLeftRating = vm.leftPlayer.myRating;
                myRightRating = vm.rightPlayer.myRating;

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
                postLeft = {rating: leftRating, myRating: myLeftRating};
                postRight = {rating: rightRating, myRating: myRightRating};

                $q.all([
                    PlayerService.voteForPlayer(vm.leftPlayer._id, postLeft),
                    PlayerService.voteForPlayer(vm.rightPlayer._id, postRight)
                ]).then(function () {
                    vm.blockVoting = false;
                    comparePlayers();
                });
            }
        }
    }

})();

app.controller("MainController", ['$scope', function($scope) {

    var showDeckSection = document.getElementsByClassName("pick_card_section");
    var chosenCardOnTable = document.getElementsByClassName("cardOnTable_box");

    $scope.deck = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
    $scope.activeDeck = null;
    $scope.player_attr = [
        {
            name: 'Don',
            card: null
        },
        {
            name: 'John',
            card: null
        },
        {
            name: 'Mike',
            card: null
        },
        {
            name: 'Liz',
            card: null
        },
        {
            name: 'Rob',
            card: null
        }
    ];

    $scope.pickPlayer = function (index) {
        showDeckSection[0].style.display = "flex";
        $scope.activeDeck = index;
    };


    $scope.pickCard = function () {
        $scope.player_attr[$scope.activeDeck].card = this.deck_cards;
        showDeckSection[0].style.display = "none";
        console.log(this.deck_cards);
        $(chosenCardOnTable[$scope.activeDeck]).children().fadeIn();
    };

    $scope.flipCards = function () {
        $('.cardOnTable_box').toggleClass("flipped");

        /*
        var flippedClasses = document.getElementsByClassName('flipped');
        for(var i = 0 ; i < flippedClasses.length ; i++)
        {
            var flip = flippedClasses[i];
            var zeroFlip = flip.classList;

            if(zeroFlip.contains("flipped")){
                zeroFlip.remove("flipped");
            }
        }

        var f = this.classList;
        f.add("flipped");

        this.addEventListener("click", function(){
            f.remove("flipped");
            clickFlip(this);
        });*/
    }
}]);
app.controller("MainController", ['$scope', function($scope) {

    var showDeckSection = document.getElementsByClassName("pick_card_section");
    var chosenCardOnTable = document.getElementsByClassName("cardOnTable_box");
    showDeckSection[0].style.display = "none";

    $scope.deck = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
    $scope.activeDeck = null;
    $scope.trueCard = 0;

    $scope.startMsg = true;
    $scope.flipBtn = false;
    $scope.newRoundBtn = false;

    $scope.player_attr = [
        {
            name: 'Don',
            card: -1,
            status: 'Välj Spelare'
        },
        {
            name: 'John',
            card: -1,
            status: 'Välj Spelare'
        },
        {
            name: 'Mike',
            card: -1,
            status: 'Välj Spelare'
        },
        {
            name: 'Liz',
            card: -1,
            status: 'Välj Spelare'
        },
        {
            name: 'Rob',
            card: -1,
            status: 'Välj Spelare'
        }
    ];

    // SHOWING THE PLAYERS DECK WHEN CLICKING THE DECK
    $scope.pickPlayer = function (index) {
        $scope.player_attr[index].status = "Välj Kort";
        $(showDeckSection[0]).slideDown();
        $scope.activeDeck = index;
    };


    // CHOOSING A CARD FROM THE PLAYERS DECK AND PUTTING IT ON THE TABLE
    $scope.pickCard = function () {
        $scope.player_attr[$scope.activeDeck].card = this.deck_cards;
        $scope.player_attr[$scope.activeDeck].status = "Väntar...";
        $(showDeckSection[0]).slideUp();
        $(chosenCardOnTable[$scope.activeDeck]).children().slideDown();
        $scope.testFlipBtn();
    };

    // ADDING CLASS .FLIPPED TO PERFORM FLIPPED ANIMATION
    $scope.flipCards = function () {
        $('.cardOnTable_box').addClass("flipped");
        $scope.flipBtn = false;
        $scope.newRoundBtn = true;
    };

    $scope.testFlipBtn = function () {
        for(var i = 0 ; i < $scope.player_attr.length ; i++) {
            if($scope.player_attr[i].card >= 0) {
                $scope.trueCard++;
            }
        }
        if($scope.player_attr.length === $scope.trueCard) {
            $scope.flipBtn = true;
            $scope.startMsg = false;

        }
        $scope.trueCard = 0;
    };

    $scope.newRound = function () {
        $scope.startMsg = true;
        $scope.newRoundBtn = false;
        for(var i = 0 ; $scope.player_attr.length ; i++) {
            $scope.player_attr[i].card = -1;
            $(chosenCardOnTable[0]).parent().children().children().slideUp();
            $('.cardOnTable_box').removeClass("flipped");
        }
    }
}]);

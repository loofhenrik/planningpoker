// USING ANGULAR BECAUSE OF DYNAMICAL PRESENTATION OF CONTENT. 

app.controller("MainController", ['$scope', function($scope) {

    var showDeckSection = document.getElementsByClassName("pick_card_section");
    var chosenCardOnTable = document.getElementsByClassName("cardOnTable_box");
    showDeckSection[0].style.display = "none";

    $scope.deck = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
    $scope.activeDeck = null;                           // ACTIVE DECK SELECTED BY PRESENT PLAYER
    $scope.trueCard = 0;

    // VARIABLES CONNECTED TO NG-HIDE/SHOW FOR STATUS SECTION
    $scope.startMsg = true;
    $scope.flipBtn = false;
    $scope.newRoundBtn = false;

    $scope.inputName = "";

    $scope.numberOfPlayers = [2,3,4,5,6,7,8];
    $scope.selectedPlayers = 0;
    $scope.player_attr = [];

    // RUNS WHEN NUMBER OF PLAYERS ARE SELECTED
    $scope.submitPlayers = function () {
        $scope.selectedPlayers = document.getElementsByClassName("selected_players")[0].value;

        // CREATES PLAYERS BASED ON HOW MANY PLAYERS ARE SELECTED
        if ($scope.selectedPlayers > 1 ) {
            for(var i = 0 ; i < $scope.selectedPlayers ; i++) {
                $scope.player_attr.push({
                    name: '',
                    card: -1,
                    status: 'Välj Spelare'
                });
            }
            $('.select_players_form').slideUp(800);
            // DISPLAYS WINDOW FOR CHANGING TOPIC
            $scope.editSubject();
        }
    };

    // HIDES SECTION FOR NEW TOPIC
    $scope.submitSubject = function () {
        if($scope.setMsg.length > 0 && $scope.setMsg.length < 150) {
            $('.subject_msg').slideUp();
        }
    };

    //DISPLAYS SECTION FOR NEW TOPIC
    $scope.editSubject = function () {
        $scope.setMsg = "";
        $('.subject_msg').slideDown();
    };

    // SHOWING THE PLAYERS DECK WHEN CLICKING THE DECK
    $scope.pickPlayer = function (index) {
        $scope.player_attr[index].status = "Välj Kort";
        $scope.activeDeck = index;
        console.log($scope.player_attr[$scope.activeDeck].name.length);
        if($scope.player_attr[$scope.activeDeck].name.length == 0) {
            $('.player_name_form').slideDown();
            $('#player_name_text').focus();
        }
        else {
            $(showDeckSection[0]).slideDown();
        }
    };

    // ADDING PLAYERNAME TO VAR PLAYER_ATTR.NAME IF EMPTY
    $scope.submitPlayer = function () {
        if($scope.inputName.length > 0) {
            $scope.player_attr[$scope.activeDeck].name = $scope.inputName;
            $scope.inputName = "";
            $('.player_name_form').slideUp(800);
            $(showDeckSection[0]).slideDown(800);
        }
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

    // CONTROLLING WETHER ALL PLAYER HAVE CHOOSEN A CARD
    $scope.testFlipBtn = function () {
        for(var i = 0 ; i < $scope.player_attr.length ; i++) {
            if($scope.player_attr[i].card >= 0) {
                $scope.trueCard++;
            }
        }

        // IF TRUE, SHOW BUTTON FOR FLIPPING THE CARDS
        if($scope.player_attr.length === $scope.trueCard) {
            $scope.flipBtn = true;
            $scope.startMsg = false;

        }
        $scope.trueCard = 0;
    };

    // RESET ROUND, BY RESETTING SELECTED CARDS AND STARTS NEW TOPIC
    $scope.newRound = function () {
        $scope.editSubject();

        $scope.startMsg = true;
        $scope.newRoundBtn = false;
        for(var i = 0 ; $scope.player_attr.length ; i++) {
            $scope.player_attr[i].card = -1;
            $scope.player_attr[i].status = "Välj kort";
            $(chosenCardOnTable[0]).parent().children().children().slideUp();
            $('.cardOnTable_box').removeClass("flipped");
        }
    };
}]);
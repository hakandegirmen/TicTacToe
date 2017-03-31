var gameModule = (function () {

    var firstSign;
    var secondSign;
    var turnSign;

    var playerList = [];

    var user1 = {
        name: "",
        win: 0,
        lose: 0,
        tied: 0
    };

    var user2 = {
        name: "",
        win: 0,
        lose: 0,
        tied: 0
    };

    var state = 0;

    function resetEverything() { //To reset everything when play again button in pressed

        playerList = [];

        user1 = {
            name: "",
            win: 0,
            lose: 0,
            tied: 0
        };

        user2 = {
            name: "",
            win: 0,
            lose: 0,
            tied: 0
        };

        state = 0;

    }

    function removeTable() {

        resetEverything();

        if (document.getElementsByTagName("li").length == 9) {
            var table = document.getElementById("table");

            for (i = 1; i < 10; i++) {
                var box = document.getElementById("a" + i);
                table.removeChild(box);
            }
        }
    }

    function generateGameBoard() { // Uses the DOM API to create a game board

        nextRound();
        showPlayerSign();

        for (i = 1; i < 10; i++) {

            var table = document.getElementById("table");
            var box = document.createElement("li");
            var idAtt = document.createAttribute("id");
            idAtt.value = "a" + i;
            box.setAttributeNode(idAtt);
            table.append(box);



        }
        for (i = 1; i < 10; i++) { // event listeners for each li
            document.getElementById("a" + i).addEventListener("click", gameModule.selectSquare, true);


        }

    }

    function getUserInfo() { // Gets user info and puts them into playerlist array

        user1.name = prompt("Player Name for X");
        user2.name = prompt("Player Name for O");

        while (user1.name == user2.name) {

            alert("Player X and Player O cannot have the same name. Please enter again")
            user1.name = prompt("Player Name for X");
            user2.name = prompt("Player Name for O");

        }
        while (user1.name == "") {

            user1.name = prompt("Please Enter Player Name for X");

        }

        while (user2.name == "") {

            user2.name = prompt("Please Enter Player Name for O");
        }

        playerList.push(user1, user2);




    }

    function showPlayerSign() { //Displays which player is assign to which

        document.getElementById("player1").innerHTML = "Player " + firstSign + " is " + user1.name
        document.getElementById("player2").innerHTML = "Player " + secondSign + " is " + user2.name

    }

    function initGame() { // •	Sets up the game, Calls getUserInfo, Calls generateGameBoard

        if (playerList.length == 0) {
            getUserInfo();
            generateGameBoard();


        } else {
            generateGameBoard();

        }
    }



    function getFirstPlayer() { // Get the first sign to stary randomly

        var rnd = 10 * Math.random();
        rnd = Math.round(rnd);

        if (rnd % 2 == 0) {
            var signTTT = "X";

        } else {
            var signTTT = "O";

        }
        return signTTT;

        ;

    }


    function selectSquare() { // Gets called when an li is selected and checks if the li has already been selected or not. Also checkes the win condition and if gave is even or not. Calls nextround function when a new sign is put inside an li

        if (this.innerHTML == "") {

            if (checkWinner(turnSign) == false && checkEven() == false) {

                this.innerHTML = turnSign;
                state++;



                if (checkWinner(turnSign) == true) {

                    alert("player " + turnSign + " has won!")

                    if (turnSign == "X") {

                        user1.win++;
                        user2.lose++;
                        console.log(user1);

                    } else if (turnSign == "O") {

                        user2.win++;
                        user1.lose++;
                        console.log(user2);
                    }

                    fillTable();

                } else if (checkEven() == true) {

                    alert("Game is even!!");
                    user1.tied++;
                    user2.tied++;

                }
                nextRound();



            }
        } else {
            if (checkWinner(turnSign) == true) {
                if (turnSign == "X") {
                    aSign = "O";
                } else {
                    aSign = "X"
                }

                alert("Player " + aSign + " has already won!")
            } else if (checkEven() == true) {
                alert("Game is tied!")
            } else {
                alert("Please pick an empty box")
            }
        }
    }

    function nextRound() { //Checks if it is the first round of the game and if so gets the starging sign. Also changes the sign each turn.


        if (state == 0) {
            firstSign = getFirstPlayer();
            turnSign = firstSign;

            if (firstSign == "X") {
                secondSign = "O";
            } else {
                secondSign = "X";
            }

            document.getElementById("whoseTurn").innerHTML = "Turn of " + firstSign;
            state++;
        } else if (state % 2 == 1 && state != 0) {
            document.getElementById("whoseTurn").innerHTML = "Turn of " + firstSign;
            turnSign = firstSign;

        } else if (state % 2 == 0 && state != 0) {
            document.getElementById("whoseTurn").innerHTML = "Turn of " + secondSign;
            turnSign = secondSign;
        }


    }

    function checkEven() { // Checkes if the game is even or not. Game should be even when state variable is 10.

        evenCheck = false;

        if (state == 10) {
            evenCheck = true;
        }

        return evenCheck;
    }


    function checkWinner(sign) { // Checks the win condition
        var winCheck = false;
        if (state != 0) {
            if (checkSigns(1, 2, 3) ||
                checkSigns(4, 5, 6) ||
                checkSigns(7, 8, 9) ||
                checkSigns(1, 4, 7) ||
                checkSigns(2, 5, 8) ||
                checkSigns(3, 6, 9) ||
                checkSigns(1, 5, 9) ||
                checkSigns(3, 5, 7)) {

                winCheck = true;
            }
            return winCheck;
        }
    }


    function fillTable() { // Fills the empty li tags with spaces
        for (i = 1; i < 10; i++) {
            if (document.getElementById("a" + i).innerHTML == "") {
                document.getElementById("a" + i).innerHTML = " ";

            }
        }
    }

    function displayResults() { // Gets the user info from user objects and displays them

        alert(user1.name + " win:" + user1.win + " lose: " + user1.lose + " tied " + user1.tied + "\n" + user2.name + " win:" + user2.win + " lose: " + user2.lose + " tied " + user2.tied);

    }



    function clearBoard() { // Clears the board and resets the state

        for (i = 1; i < 10; i++) {

            document.getElementById("a" + i).innerHTML = "";

        }
        state = 0;
        nextRound();
    }

    function checkSigns(a, b, c) { // Takes three arguments and uses them as ids for li tags to check if they are same or not.

        var check = false;

        if (document.getElementById("a" + a).innerHTML != "" &&
            document.getElementById("a" + b).innerHTML != "" &&
            document.getElementById("a" + c).innerHTML != "" &&

            document.getElementById("a" + a).innerHTML ==
            document.getElementById("a" + b).innerHTML &&
            document.getElementById("a" + b).innerHTML ==
            document.getElementById("a" + c).innerHTML) {
            check = true;

        }
        return check;

    }

    /*******************************************/

    return {

        initGame: initGame,
        clearBoard: clearBoard,
        selectSquare: selectSquare,
        removeTable: removeTable,
        displayResults: displayResults

    };


}());
document.getElementById("playButton").addEventListener("click", gameModule.clearBoard, false); //Event Listener for "Play again" button

document.getElementById("letsPlay").addEventListener("click", gameModule.initGame, false); //Event Listener for "I want to play" button

document.getElementById("mainMenu").addEventListener("click", gameModule.removeTable, false); //Event Listener for "Main Menu" button

document.getElementById("showResults").addEventListener("click", gameModule.displayResults, false); //Event Listener for "Show Results" button


/***************** These are event listeners to make buttons visible-invisible  *******************/


document.getElementById("mainMenu").addEventListener('click', function () {

    document.getElementById("welcomeLine").style.visibility = "visible";
    document.getElementById("letsPlay").style.visibility = "visible";
    document.getElementById("mainMenu").style.visibility = "hidden";
    document.getElementById("playButton").style.visibility = "hidden";
    document.getElementById("showResults").style.visibility = "hidden";




});


document.getElementById("letsPlay").addEventListener('click', function () {

    document.getElementById("welcomeLine").style.visibility = "hidden";
    document.getElementById("letsPlay").style.visibility = "hidden";
    document.getElementById("mainMenu").style.visibility = "visible";
    document.getElementById("playButton").style.visibility = "visible";
    document.getElementById("showResults").style.visibility = "visible";



});
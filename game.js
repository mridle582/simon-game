var buttonColors = ["red","blue","green", "yellow"];
var gamePattern = []
var userClickedPattern = []
var gameOver = true;
var level = 0;

$("div.btn").click(function (e) { 
    if (!gameOver) {
        var userChosenColor = $(this).attr("id");
        animatePress(userChosenColor);
        playSound(userChosenColor);
        if (!check_answer(userClickedPattern.length-1)) {
            new Audio("sounds/wrong.mp3").play();
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").text("Game Over, Press A Key to Start");
            gameOver = true;
            level = 0;
            userClickedPattern = [];
            gamePattern = [];
        }
        else if (userClickedPattern.length === level){
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    }
});

$(document).keydown(function (e) {
    if (gameOver) {
        gameOver = false;
        nextSequence();
    }
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function check_answer(currentLevel) {
    console.log("Level:" + level);
    console.log("Current Index: " + currentLevel);
    console.log("User Click: " + userClickedPattern);
    console.log("Game Pattern: " +  gamePattern);
    console.log("");
    console.log(userClickedPattern[currentLevel] === gamePattern[currentLevel]);
    return userClickedPattern[currentLevel] === gamePattern[currentLevel];

}

function nextSequence() {
    level+=1;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    
    new Audio("sounds/"+randomChosenColour+".mp3").play();
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);


}

function playSound(key) {
    new Audio("sounds/" + key + ".mp3").play();
    userClickedPattern.push(key);
}
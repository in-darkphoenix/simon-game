var started = false;

var level = 0;

var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound("sounds/" + userChosenColour + ".mp3");

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("sounds/wrong.mp3");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChoosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChoosenColour);

    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound("sounds/" + randomChoosenColour + ".mp3");

}

function playSound(name) {
    var currentSound = new Audio(name);
    currentSound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}



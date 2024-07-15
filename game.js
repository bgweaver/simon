let gamePattern = [];
let userClickedPattern = [];

let gameStart = false;
let level = 0;

let buttonColours = ["red", "blue", "green", "yellow"];

$(".btn").click(function() {
    if (gameStart === true) {
        let userChosenColour = this.id;
        animatePress(this.id);
        playSound(this.id);
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
});

$(".btn").on("touchstart", function() {
    if (gameStart === true) {
        let userChosenColour = this.id;
        animatePress(this.id);
        playSound(this.id);
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
});

$("#start-button").click(function() {
    if (gameStart === false) {
        gameStart = true;
        nextSequence();
        $(this).hide();
    }
});

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    for (let i = 0; i < gamePattern.length; i++) {
        flash(i);
    }

    function flash(i) {
        setTimeout(function() {
            $(`#${gamePattern[i]}`).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
        }, 500 * i);
    }
}

function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function() {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
    if (gameStart === false && $("#start-button").is(":hidden")) {
        gameStart = true;
        nextSequence();
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern.length = 0;
            }, 1000);
        }
    } else {
        let errorSound = new Audio("./sounds/wrong.mp3");
        errorSound.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Click to Restart!");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    userClickedPattern.length = 0;
    gameStart = false;
    $("#start-button").show();
}

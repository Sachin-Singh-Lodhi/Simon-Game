
var gamePattern = [];
var started = false;
var level = 0;
var currentLevel = 0;
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
}

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("success");
    return true;
  }else {
    $("#level-title").html("Game over, Press any key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    return false;
  }
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  if(!checkAnswer(currentLevel)) {
    startOver();
  }
  else {
    currentLevel++;
    if(currentLevel == level) {
      currentLevel = 0;
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
});

function nextSequence() {

  level++;
  $("#level-title").html("Level " + level);

  var userchances = level;

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

$(document).on("keydown", function (event) {
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

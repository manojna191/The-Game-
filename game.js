var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id"); //the sound plays when it is clicked
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

var toggler = false;
$("body").keypress(function(){
if(!toggler){
  $("#level-title").text("Level 0");
  nextSequence();
  toggler = true;
}
});

function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);


  $("#level-title").text("Level " + level);
  level = level+1;
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// The setTimeout function is a native JavaScript function.
// It sets a timer (a countdown set in milliseconds) for an execution of a callback function,
// calling the function upon completion of the timer.

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");//starting we are going to add the class
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed"); //later in just 100 milliseconds we are going to remove class
  }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },500);
    }
  }
  else{
    var audio1 = new Audio("sounds/wrong.mp3");
    audio1.play();

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  toggler = false;
}

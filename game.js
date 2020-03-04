var game = {
  buttonColors: ["red", "blue", "green", "yellow"],
  gamePattern: [],
  userClickedPattern: [],
  started: false,
  level: 0,
  clickTrack: 0
}

$(".btn").click(function(event) {
  playSound(event.target.id);
  animatePress(event.target.id);
  var userChosenColor = event.target.id;
  game.userClickedPattern.push(userChosenColor);
  checkAnswer(game.clickTrack);
})

$(document).keypress(function() {
  if (!game.started) {
    $("h1").text("Level " + game.level);
    nextSequence();
    game.started = true;
  }
});

function nextSequence() {
  game.userClickedPattern = [];
  game.level++;
  $("h1").text("Level " + game.level);
  var randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColor = game.buttonColors[randomNumber];
  game.gamePattern.push(randomChosenColor);
  var i = 0
  var moves = setInterval(function(){
      playSound(game.gamePattern[i]);
      $("#" + game.gamePattern[i]).fadeOut(100).fadeIn(100);
      i++;
      if (i >= game.level) {
        clearInterval(moves);
      }
    }, 600)
}

function playSound(name) {
  var sound = new Audio ("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {$("#" + currentColor).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel) {
  if (game.userClickedPattern[currentLevel] === game.gamePattern[currentLevel]) {
    if (game.gamePattern.length === currentLevel + 1 ) {
      setTimeout(nextSequence(), 1000);
      console.log(game.clickTrack);
      console.log("Correct!");
      game.clickTrack = 0;
    } else {
      console.log(game.clickTrack);
      console.log("Correct!");
      game.clickTrack++;

    }
  } else {
    console.log("Wrong!");
    $("h1").text("Game Over, Press Any Key to Restart");
    var sound = new Audio ("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    startOver();
  }
}

function startOver() {
  game.level = 0;
  game.gamePattern = [];
  game.started = false;
  game.clickTrack = 0;
  game.userClickedPattern = [];
}

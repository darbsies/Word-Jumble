var truth = "";
var currentDisplay = "";
var typed = "";
var initial = "";     //initially randomized word
var backspacePressed = false;
var color = "";
var points = 0;
var secondsLeft = 60;

$( document ).ready(function() {
  newWord();
  $( ".purple-box" ).hide();
  startTimer();

  $('body').bind('keypress', function(e) {

    var key = e.keyCode;
    var letter = String.fromCharCode(key);
    addLetter(letter);
    e.preventDefault();
  });
  $(document).keydown(function(event){
      if (event.which == 8) {
        event.preventDefault();
        if(backspacePressed == false) {
          if(typed != "") {
            if(typed.length == 1) {
              typed = "";
            } else {
              typed = typed.slice(0, typed.length - 1);
            }
            drawWord();
          }
          backspacePressed = true;
        }
      }
   })
  $(document).keyup(function(event){
    if (event.which == 8) {
      backspacePressed = false;
    }
  })

  $( ".button" ).click(function() {
    $( ".purple-box" ).hide();
    typed = "";
    newWord();
    secondsLeft = 60;
    points = 0;
  });
});


var addLetter = function(letter) {
  var current = "";
  if(typed.length == 0) {
    current = currentDisplay;
  } else {
    current = currentDisplay.slice(typed.length);
  }
  if(current.indexOf(letter) != -1) {
    typed = typed + letter;
    if(typed.length == truth.length) {
      if(typed == truth) {
        color = "green";
        points = points + truth.length;
        setTimeout(function() {
          color = "";
          typed = "";
          newWord();
        }, 600);
      } else {
        color = "red";
        points = points - truth.length;
        setTimeout(function() {
          color = "";
          typed = "";
          drawWord();
        }, 600);
      }
      updatePoints();
    }
    drawWord();

  }

}

var drawWord = function() {
    if(typed == "" ) {
      currentDisplay = initial;
    } else {
      var initialCopy = initial;
      for(var index = 0; index < typed.length; index++) {
        var swapIndex = initialCopy.indexOf(typed[index]);
        initialCopy = initialCopy.slice(0, swapIndex) + initialCopy.slice(swapIndex + 1);
      }

      currentDisplay = typed + initialCopy;

    }

    var html = "";
    for(var i = 0; i < currentDisplay.length; i++) {
      var highlight = "";
      if(color != "") {
        highlight = color;
      } else {
        if(i < typed.length) {
          highlight = "typed";
        }
      }
      html = html + "<div class='circle-frame "  + highlight + "'><div class='letter'>"+ currentDisplay[i] + "</div></div>";
    }

    $('.letters').html(html);
}

var randomizeWord = function(word) {
  var randomized = "";
    for(var length = word.length; length > 0; length--) {
      var num = Math.floor(Math.random() * length);
      if(length > 1) {
          if(num == length) {
            randomized = randomized + word.slice(num, num + 1);
            word = word.slice(0, num);
          } else {
            randomized = randomized + word.slice(num, num + 1);
            word = word.slice(0, num) + word.slice(num + 1, length);
          }
      } else {
        randomized = randomized + word;
        word = "";
      }
    }
    return randomized;
}

var newWord = function() {
  $.get( "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=proper-noun&minCorpusCount=1400&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=6&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5", function( data ) {
    var word = data.word;
    word = word.toLowerCase();
    truth = word;
    initial = randomizeWord(word);
    currentDisplay = initial;
    drawWord();
    $( ".letters" ).show();
    $( ".points" ).show();
    $( ".countdown" ).show();
  });
}

var updatePoints = function() {
  $('.point-value').html(points);
}

var updateSeconds = function() {
  if(secondsLeft > 0) {
    secondsLeft--;
  }
  $('.time-value').html(secondsLeft);
  if(secondsLeft == 0) {
    var html = "You scored " + points + " points";
    $('.total-points').html(html);
    $( ".purple-box" ).show();
    $( ".points" ).hide();
    $( ".countdown" ).hide();
    $( ".letters" ).hide();
  }
}

startTimer = function(){
setInterval(
  function(){
    updateSeconds();
}, 1000)};

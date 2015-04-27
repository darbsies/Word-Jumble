$( document ).ready(function() {
  $.get( "http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=800&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=8&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5", function( data ) {
    console.log(data);
    var word = data.word;
    var randomized = randomizeWord(word);
    drawWord(randomized);

  });
});

var drawWord = function(word) {
    var html = "";
    for(var i = 0; i < word.length; i++) {
      html = html + "<div class='circle-frame'><div class='letter'>"+ word[i] + "</div></div>";
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




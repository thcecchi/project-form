var Airtable = require('airtable');
var config = require('./config');
var mykey = config.MY_KEY
var base = new Airtable({apiKey: mykey}).base('appN4cpWc7TV3YYd1');

function sendWord () {
  var newWord = $('#wordField').val();
  if (newWord != "" && $('#wordField').attr('typing')=="true") {
    base('Table 1').create([
      {
        "fields": {
          "Word": newWord
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        return;
      }
    });

    sentAction();
  } else {
    showError();
  }
}

function showError() {
  $("#textContainer").fadeOut(function() {
    $(this).text("You forgot to type something").delay(200).fadeIn();
  });
  $('#wordButton').css("background-color","#EF946C");
  $('#wordButton').css("width","350px");
  $("#wordButton").prop('disabled', true);
  setTimeout(function(){
    $("#wordButton").prop('disabled', false);
    $("#textContainer").fadeOut(function() {
      $(this).text("Send").fadeIn();
    });
  }, 2500);
  setTimeout(function(){
    insertValue ();
    $('#wordButton').css("background-color","#ffffff");
    $('#wordButton').css("width","200px");
  }, 3000);
}

function clearField () {
   $('#wordField').val("");
}

function startTyping () {
  if ($('#wordField').attr('typing')=="false") {
    clearField();
    $('#wordField').css( "color", "#262626" );
  }
}

function blurField () {
  if ($('#wordField').val() === "") {
    insertValue ();
  }
}

function insertValue () {
  $('#wordField').val("Type");
  $('#wordField').css("color", "rgba(255,255,255,.7)");
  $('#wordField').attr('typing', false);
}

function sentAction () {
  $("#textContainer").fadeOut(function() {
    $(this).text("Your message was sent").delay(200).fadeIn();
  });
  $('#wordButton').css("background-color","#69C9C9");
  $('#wordButton').css("width","300px");
  $("#wordField").prop('disabled', true);
  setTimeout(function(){
    $("#wordField").prop('disabled', false);
    $("#textContainer").fadeOut(function() {
      $(this).text("Send").fadeIn();
    });
  }, 2500);
  setTimeout(function(){
    insertValue ();
    $('#wordButton').css("background-color","#ffffff");
    $('#wordButton').css("width","200px");
  }, 3000);
}


$(document).ready(function(){
  insertValue ();
  $('#wordField').on('input', function () {
    $('#wordField').attr('typing', true);
  });
  $('#wordField').on("blur", blurField);
  $('#wordField').on("focus", startTyping);
  $('#wordButton').on("click", sendWord);

  $('#wordField').keypress(function (e) {
    var key = e.which;
      if(key == 13)
        {
          $('#wordButton').click();
          return false;
        }
    });
});

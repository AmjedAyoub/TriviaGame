
$(document).ready(function () {

  //To show the start container and hide the quetion container 
  $(".startContainer").css("display", "flow-root");
  $(".questionContainer").css("display", "none");

  // The quetion timer0
  var time = 30;
  // the answer timer which will start after the user chose the answer
  var time2 = 2;
  // the questio counter
  var count = 1;
  // the question and answers RRAY
  var objArray = []
  // THE INTERVAL FOR THE QUESTION TIMER
  var intervalId;
  // the interval for the answer timer
  var intervalId2;
  // the correct questions counter
  var correct=0;
  // the incorrect answer counter
  var incorrect=0;
  //  a variable to save the correct answer for each question each time 
  var correctAnswer;
  // a variable to save the image url
  var picUrl;

  // function to start the game
  $("#start").click(function () {
    
  //To hide the start container and show the quetion container 
    $(".startContainer").css("display", "none");
    $(".questionContainer").css("display", "flow-root");
    // starts the question timer
    start();
    // display new question 
    newQues();
  });

  // AJAX query API for questions
  var query = "https://opentdb.com/api.php?amount=50&type=multiple";
  $.ajax({
    url: query,
    method: "GET"
  }).then(function (response) {
    // save the respone in the array
    objArray = response.results;
    // console.log(objArray)
  });






// to reset the question timer
  function reset() {

    time = 30;
    // DONE: Change the "display" div to "00:00."
    $(".timer").text("00:00");

  }

// to start the question timer
  function start() {

    clearInterval(intervalId);
    clearInterval(intervalId2);
    intervalId = setInterval(function () {
      if (time > 0) {
        time--;
        var converted = timeConverter(time);
        $(".timer").text(converted);
      }
      else {
        reset();
        newQues();
      }
    }, 1000);

  }

  // to start the answer timer
  function start2() {

    clearInterval(intervalId2);
    intervalId2 = setInterval(function () {
      if (time2 > 0) {
        time2--;
      }
      else {
        time2=2;
        reset();
        newQues();
      }
    }, 1000);

  }

// to append new question
  function newQues() {
    // if the question counter < 16 only 15 question allowed
    if (count < 16) {

      clearInterval(intervalId2);
      var random = Math.floor(Math.random() * objArray.length + 1);
      // console.log(objArray[random].question);


      // clearing weird stuff from the text
      var q = (objArray[random].question).replace(/&quot;/g, '"');
      q = (q).replace(/&#039;/g, "'");
      q = (q).replace(/&laquo;/g, "<<");
      q = (q).replace(/&raquo;/g, ">>");
      q = (q).replace(/&hellip;/g, "...");

      // question information "category" "difficulty" "number"
      $(".question").text(q);
      $("#category").text(objArray[random].category);
      $("#difficulty").text(objArray[random].difficulty);
      $("#qNum").text(count);
      $("#ofq").text(count);
      count++;
      $(".answerPanel").empty();

      // put the answers in an array
      var newArr = objArray[random].incorrect_answers;
      newArr.push(objArray[random].correct_answer);
      correctAnswer = objArray[random].correct_answer;
      // shuffle the answers
      newArr.sort();
      // display answers
      for (let i = 0; i < 4; i++) {
        var newh = $("<h4>");
        newh.addClass("answer");
        newh.attr("data-answer", newArr[i]);
        newh.text(newArr[i])
        $(".answerPanel").append(newh);
      }
    }
    // exeeded the 15 question end game and display info
    else{
      $(".question").text("All done");
      var newDiv = $("<div>");
      var p = $("<h3>");
      var p2 = $("<h3>");
      p.text("Correct answers: "+correct);
      p2.text("Incorrect answers: "+incorrect);
      newDiv.append(p,p2);
      var b =$("<button type='button' class='btn btn-outline-success rest'>");
        var d = $("<div class='spinner-grow text-warning spin' role='status'>");
          var s = $("<span class='sr-only'>")
          s.text("Loading...");     
            var h =$("<h3>")
            h.text("Restart");
            d.append(s);
            b.append(d,h);

      $(".answerPanel").empty();
      $(".answerPanel").append(newDiv,b);
      clearInterval(intervalId);
      clearInterval(intervalId2);
    }
  };


  $(document).on('mouseover', '.answer', function (e) {
    var ans = $(this);
    ans.css("opacity", "0.3");
    ans.css("transition", "opacity 1s");
  });

  $(document).on('mouseout', '.answer', function (e) {
    var ans = $(this);
    ans.css("opacity", "1");

  });

  // to restart the game 
  $(document).on("click", ".rest", function () {
    time2=2;
    count=1;
    correct=0;
    incorrect=0;
    reset();
    newQues();
    start();
  });

  // after the user click 
  // to compare the user answer with the correct answer
  $(document).on("click", ".answer", function () {

    var userAnswer = $(this).attr("data-answer");
    // API for images
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=Boi88Wtkqy6j61XKYNFfl5SbSbL1Hs2c";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var random=Math.floor(Math.random()*response.data.length);
      picUrl=response.data[random].images.preview_webp.url;
      console.log(response);
      
      console.log(picUrl);
    });
// if the answer is correct
    if (userAnswer === correctAnswer) {

      correct++;

      var newDiv = $("<div>");
      var img = $("<img>");
      img.attr("src",picUrl);
      var p = $("<h3>");
      p.text("Correct answer!!!");
      newDiv.append(p,img);
      $(".answerPanel").empty();
      $(".answerPanel").append(newDiv);
      start2();
    }
    // if the answer is incorrect
    else {

      incorrect++;
      var newDiv = $("<div>");
      var img = $("<img>");
      img.attr("src",picUrl);
      var p = $("<h3>");
      p.text("Oh incorrect answer!!!");
      var p2 = $("<h3>");
      p2.text("the correct answer is: "+correctAnswer);
      newDiv.append(p,img,p2);
      $(".answerPanel").empty();
      $(".answerPanel").append(newDiv);
      start2();
    }

  })



// time converter
  function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  };




});